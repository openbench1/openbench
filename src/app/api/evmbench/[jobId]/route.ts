import { NextRequest, NextResponse } from "next/server";
import { getJobStatus } from "@/lib/evmbench/client";
import { parseEVMBenchResult } from "@/lib/evmbench/parser";

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { jobId } = await params;

    if (!jobId) {
      return NextResponse.json(
        { error: "Missing job ID" },
        { status: 400 }
      );
    }

    const { job } = await getJobStatus(jobId);

    if (job.status === "completed" && job.result) {
      const report = parseEVMBenchResult(job.result);
      return NextResponse.json({
        status: "completed",
        report,
      });
    }

    if (job.status === "failed") {
      return NextResponse.json({
        status: "failed",
        error: job.error || "Analysis failed",
      });
    }

    // Still processing
    return NextResponse.json({
      status: job.status, // "queued" or "running"
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("EVMBench status error:", message);
    return NextResponse.json(
      { error: "Failed to check EVMBench status", message },
      { status: 500 }
    );
  }
}
