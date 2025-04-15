import { query } from "@/lib/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Получаем ID пользователя
    const users = await query("SELECT id FROM users WHERE email = ?", [session.user.email])

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const userId = users[0].id

    // Получаем активную подписку пользователя
    const subscriptions = await query(
      `SELECT 
        id, user_id as userId, plan, status,
        next_delivery_date as nextDeliveryDate, expiry_date as expiryDate
      FROM subscriptions
      WHERE user_id = ? AND status = 'active'
      ORDER BY expiry_date DESC
      LIMIT 1`,
      [userId],
    )

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json(null)
    }

    return NextResponse.json(subscriptions[0])
  } catch (error) {
    console.error("Error fetching subscription:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
