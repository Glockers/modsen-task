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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getAll = exports.getOneById = exports.deleteById = exports.create = void 0;
const meetup_dal_1 = require("../dal/meetup.dal");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdMeetup = yield (0, meetup_dal_1.createMeetup)(payload);
        return { data: createdMeetup, status: 200 };
    }
    catch (e) {
        return { data: 'Error with create new meetup', status: 500 };
    }
});
exports.create = create;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selecteMeetup = yield (0, meetup_dal_1.deleteMeetupById)(id);
        if (selecteMeetup) {
            yield selecteMeetup.destroy();
            return { data: 'meetup удален!', status: 200 };
        }
        else {
            return { data: 'meetup не найден', status: 404 };
        }
    }
    catch (error) {
        console.error('Ошибка при удалении meetup:', error);
        return { data: 'meetup не найден', status: 500 };
    }
});
exports.deleteById = deleteById;
const getOneById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meetup = yield (0, meetup_dal_1.getMeetup)(id);
        if (meetup) {
            return {
                status: 200,
                data: meetup.toJSON()
            };
        }
        else {
            return {
                status: 404,
                data: 'Такой ID не найден'
            };
        }
    }
    catch (error) {
        console.error('Ошибка на сервере при поиске meetup', error);
        return {
            status: 500,
            data: 'Ошибка на сервере при поиске meetup'
        };
    }
});
exports.getOneById = getOneById;
const getAll = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, meetup_dal_1.getAllMeetup)(params);
        return {
            data: res,
            status: 200
        };
    }
    catch (ex) {
        return {
            data: 'Exception on server',
            status: 500
        };
    }
});
exports.getAll = getAll;
const update = (meetupId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, meetup_dal_1.updateMeetup)(meetupId, payload);
        return {
            data: 'Пользователь обновлен',
            status: 200
        };
    }
    catch (ex) {
        return {
            data: 'Пользователь с таким ID не найден',
            status: 404
        };
    }
});
exports.update = update;
//# sourceMappingURL=meetup.service.js.map