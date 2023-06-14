"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validUserSchema = joi_1.default.object({
    login: joi_1.default.string().required(),
    password: joi_1.default.string().required().min(5).max(12)
});
//# sourceMappingURL=user.dto.js.map