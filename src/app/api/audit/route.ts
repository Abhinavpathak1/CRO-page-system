import { NextResponse } from "next/server";
import { db } from "@/db";
import { auditEvents } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db.select().from(auditEvents).orderBy(desc(auditEvents.ts)).limit(50);
    return NextResponse.json({ events: rows });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
