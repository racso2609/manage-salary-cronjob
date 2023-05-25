"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binance_1 = require("../utils/binance");
const time_1 = require("../utils/time");
const monthsToUpdate = (0, time_1.getMontshToUpdate)();
monthsToUpdate.forEach(({ startTimestamp, endTimestamp }) => {
    const url = 'sapi/v1/pay/transactions';
    const query = `timestamp=${Date.now()}&startTime=${startTimestamp}&endTime=${endTimestamp}`;
    (0, binance_1.createEntries)(url, query).then();
});
//# sourceMappingURL=fillEntriesOfTheYear.js.map