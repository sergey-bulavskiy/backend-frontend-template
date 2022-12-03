//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.17.0.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming
import * as Types from '../api-client';
import { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

import { throwException, isAxiosError } from '../api-client';
import { getAxios, getBaseUrl } from './helpers';

export function create(dto: Types.CreateProductDto , cancelToken?: CancelToken | undefined): Promise<Types.ProductDto> {
    let url_ = getBaseUrl() + "/api/products";
      url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(dto);

    let options_: AxiosRequestConfig = {
        data: content_,
        method: "POST",
        url: url_,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        cancelToken
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processCreate(_response);
    });
}

function processCreate(response: AxiosResponse): Promise<Types.ProductDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 400) {
        const _responseText = response.data;
        let result400: any = null;
        let resultData400  = _responseText;
        result400 = Types.ValidationProblemDetails.fromJS(resultData400);
        return throwException("A server side error occurred.", status, _responseText, _headers, result400);

    } else if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        result200 = Types.ProductDto.fromJS(resultData200);
        return Promise.resolve<Types.ProductDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.ProductDto>(null as any);
}

export function delete_(id?: number | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
    let url_ = getBaseUrl() + "/api/products?";
    if (id === null)
        throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
        url_ += "id=" + encodeURIComponent("" + id) + "&";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        method: "DELETE",
        url: url_,
        headers: {
        },
        cancelToken
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processDelete(_response);
    });
}

function processDelete(response: AxiosResponse): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 400) {
        const _responseText = response.data;
        let result400: any = null;
        let resultData400  = _responseText;
        result400 = Types.ValidationProblemDetails.fromJS(resultData400);
        return throwException("A server side error occurred.", status, _responseText, _headers, result400);

    } else if (status === 200) {
        const _responseText = response.data;
        return Promise.resolve<void>(null as any);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<void>(null as any);
}

/**
 * @param search (optional) 
 * @param productType (optional) 
 * @param lastStockUpdatedAt (optional) 
 * @param offset (optional) Offset of list.
 * @param limit (optional) Number of requested records.
 * @param sortBy (optional) Field name for sorting in DB.
 * @param sortOrder (optional) Sort direction. Ascending or Descending.
 */
export function search(search?: string | null | undefined, productType?: Types.ProductType | null | undefined, lastStockUpdatedAt?: Date | null | undefined, offset?: number | null | undefined, limit?: number | null | undefined, sortBy?: string | null | undefined, sortOrder?: Types.SortOrder | undefined , cancelToken?: CancelToken | undefined): Promise<Types.PagedResultOfProductListItemDto> {
    let url_ = getBaseUrl() + "/api/products?";
    if (search !== undefined && search !== null)
        url_ += "Search=" + encodeURIComponent("" + search) + "&";
    if (productType !== undefined && productType !== null)
        url_ += "ProductType=" + encodeURIComponent("" + productType) + "&";
    if (lastStockUpdatedAt !== undefined && lastStockUpdatedAt !== null)
        url_ += "LastStockUpdatedAt=" + encodeURIComponent(lastStockUpdatedAt ? "" + Types.formatDate(lastStockUpdatedAt) : "") + "&";
    if (offset !== undefined && offset !== null)
        url_ += "Offset=" + encodeURIComponent("" + offset) + "&";
    if (limit !== undefined && limit !== null)
        url_ += "Limit=" + encodeURIComponent("" + limit) + "&";
    if (sortBy !== undefined && sortBy !== null)
        url_ += "SortBy=" + encodeURIComponent("" + sortBy) + "&";
    if (sortOrder === null)
        throw new Error("The parameter 'sortOrder' cannot be null.");
    else if (sortOrder !== undefined)
        url_ += "SortOrder=" + encodeURIComponent("" + sortOrder) + "&";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        method: "GET",
        url: url_,
        headers: {
            "Accept": "application/json"
        },
        cancelToken
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processSearch(_response);
    });
}

function processSearch(response: AxiosResponse): Promise<Types.PagedResultOfProductListItemDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 400) {
        const _responseText = response.data;
        let result400: any = null;
        let resultData400  = _responseText;
        result400 = Types.ValidationProblemDetails.fromJS(resultData400);
        return throwException("A server side error occurred.", status, _responseText, _headers, result400);

    } else if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        result200 = Types.PagedResultOfProductListItemDto.fromJS(resultData200);
        return Promise.resolve<Types.PagedResultOfProductListItemDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.PagedResultOfProductListItemDto>(null as any);
}

export function patch(id: number, dto: Types.PatchProductDto , cancelToken?: CancelToken | undefined): Promise<Types.ProductDto> {
    let url_ = getBaseUrl() + "/api/products/{id}";

    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(dto);

    let options_: AxiosRequestConfig = {
        data: content_,
        method: "PATCH",
        url: url_,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        cancelToken
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processPatch(_response);
    });
}

function processPatch(response: AxiosResponse): Promise<Types.ProductDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 400) {
        const _responseText = response.data;
        let result400: any = null;
        let resultData400  = _responseText;
        result400 = Types.ValidationProblemDetails.fromJS(resultData400);
        return throwException("A server side error occurred.", status, _responseText, _headers, result400);

    } else if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        result200 = Types.ProductDto.fromJS(resultData200);
        return Promise.resolve<Types.ProductDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.ProductDto>(null as any);
}

export function get(id: number , cancelToken?: CancelToken | undefined): Promise<Types.ProductDto> {
    let url_ = getBaseUrl() + "/api/products/{id}";

    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        method: "GET",
        url: url_,
        headers: {
            "Accept": "application/json"
        },
        cancelToken
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processGet(_response);
    });
}

function processGet(response: AxiosResponse): Promise<Types.ProductDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 400) {
        const _responseText = response.data;
        let result400: any = null;
        let resultData400  = _responseText;
        result400 = Types.ValidationProblemDetails.fromJS(resultData400);
        return throwException("A server side error occurred.", status, _responseText, _headers, result400);

    } else if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        result200 = Types.ProductDto.fromJS(resultData200);
        return Promise.resolve<Types.ProductDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.ProductDto>(null as any);
}