import { NextResponse } from "next/server";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db.select().from(activities).orderBy(desc(activities.ts)).limit(20);
    return NextResponse.json({ activities: rows });
  } catch {
    return NextResponse.json({ activities: [] });
  }
}
