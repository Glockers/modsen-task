"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const init_1 = __importDefault(require("./db/init"));
const routes_1 = __importDefault(require("./api/routes"));
const logger_1 = __importDefault(require("./api/utils/logger"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = require("./config/passport.config");
const authenticateAccess_middleware_1 = require("./api/middleware/authenticateAccess.middleware");
const cors_1 = __importDefault(require("cors"));
const logger = (0, logger_1.default)(__filename);
(0, init_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.API_PORT || 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
passport_1.default.use('access', passport_config_1.accessJWTStrategy);
app.get('/protected', authenticateAccess_middleware_1.authenticateAccess, (req, res) => {
    res.json({ message: 'Защищенный маршрут' });
});
app.use('/api/v1', routes_1.default);
app.listen(PORT, () => {
    logger.info(`[server]: Server is running at ${process.env.API_HOST}:${PORT}`);
});
//# sourceMappingURL=index.js.map