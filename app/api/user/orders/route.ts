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

    // Получаем заказы пользователя
    const orders = await query(
      `SELECT 
        o.id, o.user_id as userId, o.status, o.total_amount as totalAmount,
        o.shipping_address as shippingAddress, o.payment_method as paymentMethod,
        o.payment_status as paymentStatus, o.cashback_earned as cashbackEarned,
        o.created_at as createdAt, o.delivery_date as deliveryDate
      FROM orders o
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC`,
      [userId],
    )

    // Для каждого заказа получаем его элементы
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await query(
          `SELECT 
          oi.id, oi.order_id as orderId, oi.product_id as productId,
          p.name as productName, 
          (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as productImage,
          oi.quantity, oi.price
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?`,
          [order.id],
        )

        return {
          ...order,
          items: items || [],
        }
      }),
    )

    return NextResponse.json(ordersWithItems)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
