import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const databaseUrl =
  process.env.DATABASE_URL ??
  process.env.DATABASE_URL_UNPOOLED

    if (!databaseUrl) {
      return NextResponse.json(
        { error: "База данных не настроена" },
        { status: 500 },
      )
    }

    const sql = neon(databaseUrl)

    const result = await sql`
      SELECT COALESCE(SUM(amount), 0) AS raised
      FROM donations
      WHERE status = 'succeeded'
    `

    const raised = Number(result[0]?.raised ?? 0)

    return NextResponse.json(
      { raised },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    )
  } catch (error) {
    console.error("Fundraising API error:", error)

    return NextResponse.json(
      { error: "Не удалось получить сумму сбора" },
      { status: 500 },
    )
  }
}