import { NextResponse } from "next/server";
import { createEntries } from "utils/binance";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  const url = "sapi/v1/pay/transactions";
  const query = `timestamp=${Date.now()}`;

  await createEntries(url, query);
  return new NextResponse(null, {
    status: 200,
  });
}
