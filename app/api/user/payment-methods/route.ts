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

    // Получаем способы оплаты пользователя
    const paymentMethods = await query(
      `SELECT 
        id, user_id as userId, type, last_four as lastFour,
        is_default as isDefault, card_type as cardType
      FROM payment_methods
      WHERE user_id = ?
      ORDER BY is_default DESC`,
      [userId],
    )

    return NextResponse.json(paymentMethods || [])
  } catch (error) {
    console.error("Error fetching payment methods:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
