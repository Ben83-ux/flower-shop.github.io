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

    const users = await query(
      `SELECT 
        u.id, u.name, u.email, u.phone, u.role, u.cashback, 
        u.bonus_level as bonusLevel, 
        u.discount_percent as discountPercent,
        u.created_at as createdAt
      FROM users u
      WHERE u.email = ?`,
      [session.user.email],
    )

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = users[0]

    // Получаем адреса пользователя
    const addresses = await query(
      `SELECT 
        id, user_id as userId, street, house, apartment, city, 
        postal_code as postalCode, is_default as isDefault
      FROM addresses
      WHERE user_id = ?`,
      [user.id],
    )

    return NextResponse.json({
      ...user,
      addresses: addresses || [],
    })
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userData = await request.json()

    // Получаем ID пользователя
    const users = await query("SELECT id FROM users WHERE email = ?", [session.user.email])

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const userId = users[0].id

    // Обновляем данные пользователя
    await query(
      `UPDATE users SET 
        name = ?, 
        phone = ?
      WHERE id = ?`,
      [userData.name, userData.phone, userId],
    )

    // Получаем обновленные данные пользователя
    const updatedUsers = await query(
      `SELECT 
        u.id, u.name, u.email, u.phone, u.role, u.cashback, 
        u.bonus_level as bonusLevel, 
        u.discount_percent as discountPercent,
        u.created_at as createdAt
      FROM users u
      WHERE u.id = ?`,
      [userId],
    )

    // Получаем адреса пользователя
    const addresses = await query(
      `SELECT 
        id, user_id as userId, street, house, apartment, city, 
        postal_code as postalCode, is_default as isDefault
      FROM addresses
      WHERE user_id = ?`,
      [userId],
    )

    return NextResponse.json({
      ...updatedUsers[0],
      addresses: addresses || [],
    })
  } catch (error) {
    console.error("Error updating user data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
