"use strict";
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
exports.PrivateApiHandler = void 0;
const helpers_1 = require("../utils/helpers");
class PrivateApiHandler {
    _update({ persist, endpoint, fields, exclude, params, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fields) {
                return;
            }
            // Update the instance
            Object.assign(this, Object.assign(Object.assign({}, this), fields));
            if (persist && endpoint) {
                yield this._save({ endpoint, fields, exclude, params });
            }
        });
    }
    _save({ endpoint, fields, exclude = [], params }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.api) {
                throw new Error("APIHandler not initialised");
            }
            let body = null;
            if (!fields) {
                body = Object.assign({}, this);
                exclude = exclude.concat(["api", "id", "createdAt"]);
                for (let field of exclude) {
                    (0, helpers_1.deleteFromObject)(field, body);
                }
            }
            else {
                body = Object.assign({}, fields);
            }
            if (!fields) {
                return;
            }
            return this.api.request({
                method: "PATCH",
                endpoint: endpoint,
                params: params,
                data: body,
            });
        });
    }
}
exports.PrivateApiHandler = PrivateApiHandler;
//# sourceMappingURL=custom.js.map