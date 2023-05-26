import { createEntries } from "utils/binance";

export default async function handler() {
  const url = "sapi/v1/pay/transactions";
  const query = `timestamp=${Date.now()}`;

  await createEntries(url, query);
}
