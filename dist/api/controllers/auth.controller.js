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
exports.refreshAccessToken = exports.loginUser = exports.signupUser = void 0;
const passport_config_1 = require("../../config/passport.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.SECRET_JWT || 'secret';
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationPayload = req.validatedPayload;
    res.send(validationPayload);
});
exports.signupUser = signupUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationPayload = req.validatedPayload;
    console.log(validationPayload);
    const tokens = (0, passport_config_1.generateTokens)({ username: 'max' });
    return res.json(tokens);
    // res.send(validationPayload);
});
exports.loginUser = loginUser;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    // Проверка и валидация Refresh токена
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, jwtSecret);
        console.log(decoded);
        const username = decoded.username;
        const user = { username }; // В данном примере предполагается, что userId верен
        const tokens = (0, passport_config_1.generateTokens)(user);
        return res.json(tokens);
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Неверный Refresh токен' });
    }
});
exports.refreshAccessToken = refreshAccessToken;
//# sourceMappingURL=auth.controller.js.map