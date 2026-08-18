import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const key = searchParams.get("key")

    if (!process.env.DONORS_SECRET || key !== process.env.DONORS_SECRET) {
      return NextResponse.json(
        { error: "Нет доступа" },
        { status: 401 },
      )
    }

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

    const donations = await sql`
      SELECT
        donor_name,
        amount,
        status,
        created_at
      FROM donations
      WHERE status = 'succeeded'
      ORDER BY created_at DESC
    `

    return NextResponse.json({
      donations,
    })
  } catch (error) {
    console.error("Donors error:", error)

    return NextResponse.json(
      { error: "Не удалось получить список донатов" },
      { status: 500 },
    )
  }
}