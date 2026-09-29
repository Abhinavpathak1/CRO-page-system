import { NextResponse } from "next/server";
import { db } from "@/db";
import { sites } from "@/db/schema";

export async function GET() {
  try {
    const rows = await db.select().from(sites);
    return NextResponse.json({ sites: rows });
  } catch {
    return NextResponse.json({ sites: [] });
  }
}
