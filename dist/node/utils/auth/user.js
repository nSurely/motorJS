"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuth = void 0;
const jwt_1 = require("./jwt");
class UserAuth extends jwt_1.JWTAuth {
    constructor({ url, region, orgId, authType, email, password }) {
        super({ url, region, orgId, authType, email, password });
    }
}
exports.UserAuth = UserAuth;
//# sourceMappingURL=user.js.map