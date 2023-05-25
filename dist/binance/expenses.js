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
const axios_1 = require("axios");
const dotenv = require("dotenv");
const utils_1 = require("./utils");
dotenv.config();
const HOST_BINANCE = process.env.BINANCE_HOST;
const HOST = 'http://localhost:3001';
const url = 'sapi/v1/c2c/orderMatch/listUserOrderHistory';
const query = `timestamp=${Date.now()}&tradeType=SELL`;
// const LIMIT = 1000;
// const offset = 0;
(() => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log('failed to create expenses');
    }
}))();
//# sourceMappingURL=expenses.js.map