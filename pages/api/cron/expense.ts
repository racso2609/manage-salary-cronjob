import { createExpense } from "utils/binance";

export default async function handler() {
  const url = "sapi/v1/c2c/orderMatch/listUserOrderHistory";
  const query = `timestamp=${Date.now()}&tradeType=SELL`;
  await createExpense(url, query);
}
