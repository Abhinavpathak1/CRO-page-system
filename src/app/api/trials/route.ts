import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { trials } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const rows = await db.select().from(trials).orderBy(desc(trials.createdAt));
    return NextResponse.json({ trials: rows });
  } catch {
    return NextResponse.json({ trials: [] });
  }
}
