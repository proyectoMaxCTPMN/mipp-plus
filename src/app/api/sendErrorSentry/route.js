import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
class SentryExampleAPIError extends Error {
  constructor(message) {
    super(message);
    this.name = "SentryExampleAPIError";
  }
}
// A faulty API route to test Sentry's error monitoring
export async function POST(request) {
    const {errorMessage} = await request.json();

  throw new SentryExampleAPIError(errorMessage);
  return NextResponse.json({ data: "Testing Sentry Error..." });
}
