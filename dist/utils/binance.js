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
exports.createEntries = exports.createExpense = void 0;
const axios_1 = require("axios");
const dotenv = require("dotenv");
const utils_1 = require("../binance/utils");
dotenv.config();
const HOST_BINANCE = process.env.BINANCE_HOST;
const HOST = 'http://localhost:3001';
const createExpense = (url, query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const signature = (0, utils_1.generateSignature)(query, process.env.BINANCE_SECRET_KEY);
    const request = yield axios_1.default.get(`${HOST_BINANCE}/${url}?${query}&signature=${signature}`, { headers: { 'X-MBX-APIKEY': process.env.BINANCE_API_KEY } });
    const expenses = request.data.data
        .flat()
        .filter((order) => order.orderStatus === 'COMPLETED')
        .map((expense) => ({
        orderId: expense.orderNumber,
        orderType: 'P2P',
        seller: expense.counterPartNickName,
        unitPrice: expense.unitPrice,
        fiat: expense.fiat,
        asset: expense.asset,
        note: '',
        amount: expense.amount,
        date: expense.createTime,
        total: expense.totalPrice,
    }));
    const API_KEY = 'ApiKey ' + process.env.API_KEY;
    try {
        yield axios_1.default.post(`${HOST}/api/expenses/external/json`, { expenses }, { headers: { Authorization: API_KEY } });
    }
    catch (error) {
        console.log((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message);
        console.log('failed to create expenses');
    }
});
exports.createExpense = createExpense;
const createEntries = (url, query) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    const signature = (0, utils_1.generateSignature)(query, process.env.BINANCE_SECRET_KEY);
    const request = yield axios_1.default.get(`${HOST_BINANCE}/${url}?${query}&signature=${signature}`, { headers: { 'X-MBX-APIKEY': process.env.BINANCE_API_KEY } });
    const entriesAndExpenses = request.data.data;
    const entries = entriesAndExpenses
        .filter((entry) => entry.amount[0] !== '-')
        .map((entry) => {
        var _a;
        return ({
            orderId: entry.transactionId,
            orderType: 'C2C',
            seller: (_a = entry.orderId) !== null && _a !== void 0 ? _a : entry.conunterpartyId,
            unitPrice: '',
            fiat: '',
            asset: entry.currency,
            note: entry.note,
            amount: entry.amount,
            date: entry.transactionTime,
            total: '',
        });
    });
    const expenses = entriesAndExpenses
        .filter((expense) => expense.amount[0] === '-')
        .map((expense) => {
        var _a;
        return ({
            orderId: expense.transactionId,
            orderType: 'C2C',
            seller: (_a = expense.orderId) !== null && _a !== void 0 ? _a : expense.conunterpartyId,
            unitPrice: '',
            fiat: '',
            asset: expense.currency,
            note: expense.note,
            amount: expense.amount.slice(1, expense.amount.length),
            date: expense.transactionTime,
            total: '',
        });
    });
    const API_KEY = 'ApiKey ' + process.env.API_KEY;
    console.log(entries);
    try {
        yield axios_1.default.post(`${HOST}/api/expenses/external/json`, { expenses }, { headers: { Authorization: API_KEY } });
    }
    catch (error) {
        console.log((_d = (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message);
        console.log('fail expenses add');
    }
    try {
        yield axios_1.default.post(`${HOST}/api/entries/external/json`, { entries }, { headers: { Authorization: API_KEY } });
    }
    catch (error) {
        console.log((_f = (_e = error === null || error === void 0 ? void 0 : error.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message);
        console.log('fail entries add');
    }
});
exports.createEntries = createEntries;
//# sourceMappingURL=binance.js.map