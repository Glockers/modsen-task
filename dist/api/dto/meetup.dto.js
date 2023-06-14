"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMeetupsSchema = exports.updateMeetupSchema = exports.createMeetupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createMeetupSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string(),
    location: joi_1.default.string().required(),
    datetime: joi_1.default.date().required(),
    tags: joi_1.default.array().items(joi_1.default.string()).required()
});
exports.updateMeetupSchema = joi_1.default.object({
    title: joi_1.default.string(),
    description: joi_1.default.string(),
    location: joi_1.default.string(),
    datetime: joi_1.default.date(),
    tags: joi_1.default.array().items(joi_1.default.string())
});
exports.filterMeetupsSchema = joi_1.default.object({
    search: joi_1.default.string(),
    filter: joi_1.default.array().items(joi_1.default.string()),
    page: joi_1.default.number().integer().min(1),
    limit: joi_1.default.number().integer().min(1)
});
//# sourceMappingURL=meetup.dto.js.map