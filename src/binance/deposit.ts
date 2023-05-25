import { createEntries } from '../utils/binance';

function main() {
    const url = 'sapi/v1/pay/transactions';
    const query = `timestamp=${Date.now()}`;

    createEntries(url, query).then();
}

export default main;
