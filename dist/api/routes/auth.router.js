"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_moddleware_1 = require("../middleware/auth.moddleware");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', (0, auth_moddleware_1.validateUserDTO)(), auth_controller_1.loginUser);
authRouter.post('/signup', (0, auth_moddleware_1.validateUserDTO)(), auth_controller_1.signupUser);
authRouter.post('/refresh-tokens', auth_controller_1.refreshAccessToken);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map