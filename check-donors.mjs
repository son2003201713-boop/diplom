import { neon } from "@neondatabase/serverless"
import "dotenv/config"

const databaseUrl =
  process.env.DATABASE_URL ??
  process.env.DATABASE_URL_UNPOOLED

if (!databaseUrl) {
  console.error("Нет DATABASE_URL")
  process.exit(1)
}

const sql = neon(databaseUrl)

const donors = await sql`
  SELECT
    donor_name,
    amount,
    status,
    created_at
  FROM donations
  WHERE status = 'succeeded'
  ORDER BY created_at DESC
`

console.table(donors)