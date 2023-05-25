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
const dotenv = require("dotenv");
const binance_1 = require("src/utils/binance");
const time_1 = require("src/utils/time");
dotenv.config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const monthsToUpdate = (0, time_1.getMontshToUpdate)();
    monthsToUpdate.forEach(({ startTimestamp, endTimestamp }) => {
        const url = 'sapi/v1/c2c/orderMatch/listUserOrderHistory';
        const query = `timestamp=${Date.now()}&tradeType=SELL&startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}`;
        (0, binance_1.createExpense)(url, query).then();
    });
}))();
//# sourceMappingURL=fillBinanceExpensesFromJanuaryToActual.js.map