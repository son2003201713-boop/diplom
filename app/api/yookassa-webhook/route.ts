import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body?.event !== "payment.succeeded") {
      return NextResponse.json({ ok: true })
    }

    const paymentId = body?.object?.id

    if (!paymentId) {
      return NextResponse.json({ ok: true })
    }

    const shopId = process.env.YOOKASSA_SHOP_ID
    const secretKey = process.env.YOOKASSA_SECRET_KEY

    const databaseUrl =
      process.env.DATABASE_URL ??
      process.env.DATABASE_URL_UNPOOLED

    if (!shopId || !secretKey || !databaseUrl) {
      console.error("Missing environment variables")

      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      )
    }

    const auth = Buffer.from(
      `${shopId}:${secretKey}`,
    ).toString("base64")

    const paymentResponse = await fetch(
      `https://api.yookassa.ru/v3/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    )

    if (!paymentResponse.ok) {
      console.error(
        "Failed to verify YooKassa payment:",
        await paymentResponse.text(),
      )

      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 500 },
      )
    }

    const payment = await paymentResponse.json()

    if (
      payment.status !== "succeeded" ||
      payment.paid !== true ||
      payment.amount?.currency !== "RUB"
    ) {
      return NextResponse.json({ ok: true })
    }

    const amount = Number(payment.amount.value)

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 },
      )
    }

    const donorConsent =
      payment.metadata?.donor_consent === "true"

    const creditsConsent =
      payment.metadata?.credits_consent === "true"

    const donorName =
      donorConsent &&
      typeof payment.metadata?.donor_name === "string" &&
      payment.metadata.donor_name.trim()
        ? payment.metadata.donor_name.trim()
        : null

    const sql = neon(databaseUrl)

    await sql`
      INSERT INTO donations (
        payment_id,
        amount,
        status,
        donor_name,
        donor_consent,
        credits_consent
      )
      VALUES (
        ${payment.id},
        ${amount},
        ${payment.status},
        ${donorName},
        ${donorConsent},
        ${creditsConsent}
      )

      ON CONFLICT (payment_id) DO UPDATE
      SET
        donor_name = EXCLUDED.donor_name,
        donor_consent = EXCLUDED.donor_consent,
        credits_consent = EXCLUDED.credits_consent
    `

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("YooKassa webhook error:", error)

    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 500 },
    )
  }
}