"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importStar(require("node-fetch"));
function isJsonString(str = "") {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
/**
 * Parses the JSON returned by a network request
 */
function parseJSON({ response, method, url, params }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (response.status >= 200 && response.status < 300) {
            if (response.status === 204 || response.status === 205) {
                return null;
            }
            let responseObject = yield response.json();
            return { status: response.status, body: responseObject };
        }
        // Get the response body as text
        let responseBody = yield response.text();
        // If the response body is JSON, parse it
        if (isJsonString(responseBody)) {
            responseBody = JSON.parse(responseBody);
        }
        // Log the error
        switch (response.status) {
            case 401:
            case 403:
            case 404:
                // do nothing. Remove below console.log
                console.error("API call failed", {
                    url: url,
                    method: method,
                    status: response.status,
                    response: responseBody,
                    params: params || {},
                });
                break;
            default:
                console.error("API call failed", {
                    url: url,
                    method: method,
                    status: response.status,
                    response: responseBody,
                    params: params || {},
                });
                break;
        }
        const error = {
            status: response.status,
            body: responseBody,
        };
        throw error;
    });
}
/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus({ response, method }) {
    return response;
}
function request({ method, url, data = null, headers, params }) {
    return new Promise((resolve, reject) => {
        let requestOptions = {
            method: method,
            redirect: "follow",
        };
        let requestHeaders = new node_fetch_1.Headers();
        if (data) {
            requestHeaders.append("Content-Type", "application/json");
            requestOptions.body = JSON.stringify(data);
        }
        if (headers) {
            for (const [key, value] of Object.entries(headers)) {
                requestHeaders.append(key, value);
            }
        }
        requestOptions.headers = requestHeaders;
        (0, node_fetch_1.default)(`${url}?${new URLSearchParams(Object.assign({}, params))}`, requestOptions)
            .then((response) => {
            return checkStatus({
                response: response,
                method: method,
            });
        })
            .then((response) => {
            resolve(parseJSON({
                response: response,
                method: method,
                url: url,
                params: params,
            }));
        })
            .catch((error) => {
            reject(error);
        });
    });
}
exports.default = request;
//# sourceMappingURL=request.js.map