"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = exports.accessJWTStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Конфигурация JWT-токенов
const jwtSecret = process.env.SECRET_JWT || 'secret';
const jwtOptions = {
    secretOrKey: jwtSecret,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()
};
exports.accessJWTStrategy = new passport_jwt_1.Strategy(jwtOptions, (payload, done) => {
    const test = 1;
    if (test > 0) {
        return done(null, { username: test });
    }
    else {
        return done(null, false);
    }
});
// Генерация Access и Refresh токенов
function generateTokens(user) {
    const accessToken = jsonwebtoken_1.default.sign({ username: user.username }, jwtSecret, { expiresIn: '1m' });
    const refreshToken = jsonwebtoken_1.default.sign({ username: user.username }, jwtSecret, { expiresIn: '40m' });
    return { accessToken, refreshToken };
}
exports.generateTokens = generateTokens;
//# sourceMappingURL=passport.config.js.map