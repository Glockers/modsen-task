"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserDTO = void 0;
const user_dto_1 = require("../dto/user.dto");
const validateDTO_middlware_1 = require("./validateDTO.middlware");
function validateUserDTO() {
    return (0, validateDTO_middlware_1.validateDTO)(user_dto_1.validUserSchema);
}
exports.validateUserDTO = validateUserDTO;
//# sourceMappingURL=auth.moddleware.js.map