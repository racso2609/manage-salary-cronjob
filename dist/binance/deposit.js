"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binance_1 = require("src/utils/binance");
const url = 'sapi/v1/pay/transactions';
const query = `timestamp=${Date.now()}`;
(0, binance_1.createEntries)(url, query).then();
//# sourceMappingURL=deposit.js.map