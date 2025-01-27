const path = require('path');
const viteTsconfig = require('vite-tsconfig-paths');
const svgrPlugin = require('vite-plugin-svgr');
const tsconfigPaths = viteTsconfig.default;

const { mergeConfig } = require('vite');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      config.base = '/storybook/';
    }

    return mergeConfig(config, {
      plugins: [tsconfigPaths(), svgrPlugin()],
      css: {
        modules: {
          localsConvention: 'camelCase',
        },
      },
    });
  },
};
