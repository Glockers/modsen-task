"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidationMiddleware = exports.createValidationMiddleware = void 0;
const meetup_dto_1 = require("../dto/meetup.dto");
const validateDTO_middlware_1 = require("./validateDTO.middlware");
function createValidationMiddleware() {
    return (0, validateDTO_middlware_1.validateDTO)(meetup_dto_1.createMeetupSchema);
}
exports.createValidationMiddleware = createValidationMiddleware;
function updateValidationMiddleware() {
    return (0, validateDTO_middlware_1.validateDTO)(meetup_dto_1.updateMeetupSchema);
}
exports.updateValidationMiddleware = updateValidationMiddleware;
//# sourceMappingURL=meetup.middleware.js.map