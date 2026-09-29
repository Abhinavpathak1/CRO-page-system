import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ events: [] });
    }

    const { desc } = await import("drizzle-orm");
    const { getDb } = await import("@/db");
    const { auditEvents } = await import("@/db/schema");

    const db = getDb();
    const rows = await db
      .select()
      .from(auditEvents)
      .orderBy(desc(auditEvents.ts))
      .limit(50);

    return NextResponse.json({ events: rows });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
