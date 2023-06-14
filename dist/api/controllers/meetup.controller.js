"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getOneById = exports.updateById = exports.deleteById = exports.create = void 0;
const DBService = __importStar(require("../../db/services/meetup.service"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedPayload = req.validatedPayload;
    const result = yield DBService.create(validatedPayload);
    res.status(result.status).send(result);
});
exports.create = create;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield DBService.deleteById(id);
    res.status(result.status).send(result);
});
exports.deleteById = deleteById;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const validatedPayload = req.validatedPayload;
    const result = yield DBService.update(id, validatedPayload);
    res.status(result.status).send(result);
});
exports.updateById = updateById;
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield DBService.getOneById(id);
    res.status(result.status).send(result.data);
});
exports.getOneById = getOneById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.query;
    const meetupsResult = yield DBService.getAll(params);
    res.status(meetupsResult.status).send(meetupsResult);
});
exports.getAll = getAll;
//# sourceMappingURL=meetup.controller.js.map