import { NextRequest, NextResponse } from "next/server";
import { auditStore } from "@/lib/store/store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const audit = await auditStore.getAudit(id);

  if (!audit) {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }

  return NextResponse.json(audit, { status: 200 });
}
