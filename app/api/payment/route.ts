import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { amount, donorName } = await request.json()

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Некорректная сумма" },
        { status: 400 },
      )
    }

    if (!donorName || typeof donorName !== "string") {
      return NextResponse.json(
        { error: "Укажите имя" },
        { status: 400 },
      )
    }

    const shopId = process.env.YOOKASSA_SHOP_ID
    const secretKey = process.env.YOOKASSA_SECRET_KEY

    if (!shopId || !secretKey) {
      return NextResponse.json(
        { error: "ЮKassa не настроена" },
        { status: 500 },
      )
    }

    const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64")

    const response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": crypto.randomUUID(),
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: {
          value: Number(amount).toFixed(2),
          currency: "RUB",
        },

        confirmation: {
          type: "redirect",
          return_url:
            `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}?payment=success`,
        },

        capture: true,

        description: "Поддержка документального фильма «Три солнца»",

        metadata: {
          donor_name: donorName.trim(),
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("YooKassa error:", data)

      return NextResponse.json(
        { error: "Не удалось создать платёж", details: data },
        { status: response.status },
      )
    }

    return NextResponse.json({
      confirmationUrl: data.confirmation?.confirmation_url,
      paymentId: data.id,
    })
  } catch (error) {
    console.error("Payment route error:", error)

    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 },
    )
  }
}