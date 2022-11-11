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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverAuth = void 0;
const jwt_1 = require("./jwt");
const request_1 = __importDefault(require("../helpers/request"));
class DriverAuth extends jwt_1.JWTAuth {
    constructor({ url, region, orgId, authType, email, password }) {
        super({ url, region, orgId, authType, email, password });
    }
    signup({ email, password, firstName, lastName, fields, login, }) {
        return __awaiter(this, void 0, void 0, function* () {
            fields = fields || {};
            const body = Object.assign({ email,
                password,
                firstName,
                lastName }, fields);
            const response = yield (0, request_1.default)({
                url: `${this.url}/org/${this.orgId}/auth/drivers/signup`,
                method: "POST",
                data: body,
            });
            if (login) {
                yield this.login(email, password);
            }
            return response.body;
        });
    }
}
exports.DriverAuth = DriverAuth;
//# sourceMappingURL=driver.js.map