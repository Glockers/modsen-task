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
exports.updateMeetup = exports.getAllMeetup = exports.getMeetup = exports.deleteMeetupById = exports.createMeetup = void 0;
const sequelize_1 = require("sequelize");
const Meetup_1 = __importDefault(require("../models/Meetup"));
const createMeetup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return Meetup_1.default.create(payload);
});
exports.createMeetup = createMeetup;
const deleteMeetupById = (meetupId) => __awaiter(void 0, void 0, void 0, function* () {
    return Meetup_1.default.findByPk(meetupId);
});
exports.deleteMeetupById = deleteMeetupById;
const getMeetup = (meetupId) => __awaiter(void 0, void 0, void 0, function* () {
    return Meetup_1.default.findByPk(meetupId);
});
exports.getMeetup = getMeetup;
const getAllMeetup = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const queryOptions = {};
    if (params.filter) {
        queryOptions.where = Object.assign(Object.assign({}, queryOptions), { tags: {
                [sequelize_1.Op.contains]: [params.filter]
            } });
    }
    if (params.sortBy && params.sortOrder) {
        queryOptions.order = [[params.sortBy, params.sortOrder]];
    }
    if (params.limit && params.page) {
        queryOptions.offset = (params.page - 1) * params.limit;
        queryOptions.limit = params.limit;
    }
    if (params.search) {
        queryOptions.where = Object.assign(Object.assign({}, queryOptions), { title: {
                [sequelize_1.Op.like]: `%${params.search}%`
            } });
    }
    return Meetup_1.default.findAll(queryOptions);
});
exports.getAllMeetup = getAllMeetup;
const updateMeetup = (meetupId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const meetup = yield Meetup_1.default.findByPk(meetupId);
    if (!meetup) {
        throw new Error('meetup not found');
    }
    const updatedMeetup = yield meetup.update(payload);
    return updatedMeetup;
});
exports.updateMeetup = updateMeetup;
//# sourceMappingURL=meetup.dal.js.map