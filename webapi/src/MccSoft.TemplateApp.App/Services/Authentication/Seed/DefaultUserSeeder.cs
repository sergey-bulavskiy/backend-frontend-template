using System.Text.Json;
using MccSoft.LowLevelPrimitives;
using MccSoft.TemplateApp.Domain;
using MccSoft.TemplateApp.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace MccSoft.TemplateApp.App.Services.Authentication.Seed;

public class DefaultUserSeeder
{
    private readonly IOptions<IdentityOptions> _identityOptions;
    private readonly IOptions<DefaultUserOptions> _defaultUserOptions;
    private readonly UserManager<User> _userManager;
    private readonly TemplateAppDbContext _dbContext;

    public DefaultUserSeeder(
        IOptions<IdentityOptions> identityOptions,
        IOptions<DefaultUserOptions> defaultUserOptions,
        UserManager<User> userManager,
        TemplateAppDbContext dbContext
    )
    {
        _identityOptions = identityOptions;
        _defaultUserOptions = defaultUserOptions;
        _userManager = userManager;
        _dbContext = dbContext;
    }

    public async Task SeedUser()
    {
        var tenant = await SeedTenant();

        using var forceTenant = CustomTenantIdAccessor.SetCustomTenantId(tenant.Id);

        DefaultUserOptions defaultUser = _defaultUserOptions.Value;
        if (
            string.IsNullOrEmpty(defaultUser.UserName) || string.IsNullOrEmpty(defaultUser.Password)
        )
            return;

        var userName = defaultUser.UserName;
        var password = defaultUser.Password;

        User existingUser = await _userManager.FindByNameAsync(userName);
        if (existingUser != null)
        {
            var isPasswordCorrect = await _userManager.CheckPasswordAsync(existingUser, password);
            if (isPasswordCorrect)
                return;
        }

        // preserve password settings to later reset to them
        PasswordOptions passwordOptions = _identityOptions.Value.Password;
        var serializedPasswordOptions = JsonSerializer.Serialize(passwordOptions);
        try
        {
            // adjust Password settings to allow setting the default password
            passwordOptions.RequireNonAlphanumeric = false;
            passwordOptions.RequiredLength = 0;
            passwordOptions.RequireUppercase = false;
            passwordOptions.RequireLowercase = false;
            passwordOptions.RequireDigit = false;

            if (existingUser == null)
            {
                var user = new User() { UserName = userName, };
                await _userManager.CreateAsync(user);
                await _userManager.AddPasswordAsync(user, password);
            }
            else
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(existingUser);
                var result = await _userManager.ResetPasswordAsync(existingUser, token, password);
                if (!result.Succeeded)
                {
                    throw new InvalidOperationException($"Reset password failed, {result}");
                }
            }
        }
        finally
        {
            //reset settings to default
            _identityOptions.Value.Password = JsonSerializer.Deserialize<PasswordOptions>(
                serializedPasswordOptions
            );
        }
    }

    private async Task<Tenant> SeedTenant()
    {
        var tenant = _dbContext.Tenants.OrderBy(x => x.Id).FirstOrDefault() ?? new Tenant();
        if (tenant.Id != 0)
            return tenant;

        _dbContext.Add(tenant);
        await _dbContext.SaveChangesAsync();

        return tenant;
    }
}
