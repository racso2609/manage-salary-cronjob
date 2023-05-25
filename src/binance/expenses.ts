import axios from 'axios';
import * as dotenv from 'dotenv';
import { generateSignature } from './utils';
dotenv.config();

const HOST_BINANCE = process.env.BINANCE_HOST;
const HOST = 'http://localhost:3001';
const url = 'sapi/v1/c2c/orderMatch/listUserOrderHistory';
const query = `timestamp=${Date.now()}&tradeType=SELL`;
// const LIMIT = 1000;
// const offset = 0;

(async () => {
    const signature = generateSignature(query, process.env.BINANCE_SECRET_KEY);
    const request = await axios.get(
        `${HOST_BINANCE}/${url}?${query}&signature=${signature}`,
        { headers: { 'X-MBX-APIKEY': process.env.BINANCE_API_KEY } }
    );
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
        await axios.post(
            `${HOST}/api/expenses/external/json`,
            { expenses },
            { headers: { Authorization: API_KEY } }
        );
    } catch (error) {
        console.log('failed to create expenses');
    }
})();
