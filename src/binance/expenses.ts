import { createExpense } from '../utils/binance';

function main() {
    const url = 'sapi/v1/c2c/orderMatch/listUserOrderHistory';
    const query = `timestamp=${Date.now()}&tradeType=SELL`;
    createExpense(url, query).then();
}

export default main;
