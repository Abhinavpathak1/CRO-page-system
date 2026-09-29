import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { activities } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const rows = await db.select().from(activities).orderBy(desc(activities.ts)).limit(20);
    return NextResponse.json({ activities: rows });
  } catch {
    return NextResponse.json({ activities: [] });
  }
}
