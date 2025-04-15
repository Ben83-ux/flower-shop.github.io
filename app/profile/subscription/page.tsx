import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { query } from "@/lib/db"
import ProfileLayout from "@/components/profile/ProfileLayout"
import SubscriptionInfo from "@/components/profile/SubscriptionInfo"
import { redirect } from "next/navigation"

export default async function SubscriptionPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login")
  }

  // Получаем данные пользователя
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
    redirect("/login")
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

  const userData = {
    ...user,
    addresses: addresses || [],
  }

  return (
    <ProfileLayout user={userData} activeTab="subscription">
      <SubscriptionInfo />
    </ProfileLayout>
  )
}
