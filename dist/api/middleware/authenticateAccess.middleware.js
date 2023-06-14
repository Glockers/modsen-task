"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAccess = void 0;
const passport_1 = __importDefault(require("passport"));
function authenticateAccess(req, res, next) {
    passport_1.default.authenticate('access', { session: false }, (err, user) => {
        console.log(err, user);
        if (err || !user) {
            return res.status(401).json({ error: 'Неверный Access токен' });
        }
        req.user = user;
        return next();
    })(req, res, next);
}
exports.authenticateAccess = authenticateAccess;
//# sourceMappingURL=authenticateAccess.middleware.js.map