"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDTO = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const objectUtils_1 = require("../utils/objectUtils");
const logger = (0, logger_1.default)(__filename);
function validateDTO(schema) {
    return function validateMiddleware(req, res, next) {
        const payload = req.body;
        if ((0, objectUtils_1.isEmptyObject)(payload)) {
            res.status(400).send({
                status: 400,
                message: 'Ничего не введено'
            });
            return;
        }
        const validationResult = schema.validate(payload);
        if (validationResult.error) {
            res.status(400).send(validationResult.error.details);
            logger.error(validationResult.error.details);
        }
        else {
            req.validatedPayload = validationResult.value;
            next();
        }
    };
}
exports.validateDTO = validateDTO;
//# sourceMappingURL=validateDTO.middlware.js.map