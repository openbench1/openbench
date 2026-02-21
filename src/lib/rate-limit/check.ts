import { NextRequest, NextResponse } from "next/server";
import { getOptionalUserId } from "@/lib/auth/helpers";
import { anonymousLimiter, authenticatedLimiter } from "./index";

export async function checkRateLimit(
  request: NextRequest
): Promise<NextResponse | null> {
  const userId = await getOptionalUserId();
  const identifier =
    userId ??
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  const limiter = userId ? authenticatedLimiter : anonymousLimiter;
  const { success, limit, remaining, reset } = await limiter.limit(identifier);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
          "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  return null;
}
