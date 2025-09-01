import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const body = await request.json()

  const userID = body.userID
  const passwordForm = body.passwordForm

  if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
    return NextResponse.json({ msg: "Missing required fields" }, { status: 400 })
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    return NextResponse.json({ msg: "Passwords do not match" }, { status: 400 })
  }

  // 1. Obtener la contraseña actual en DB
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('password')
    .eq('id', userID)
    .single()

  if (userError || !user) {
    return NextResponse.json({ msg: "User not found" }, { status: 404 })
  }

  // 2. Verificar que la contraseña actual sea correcta
  const isMatch = await bcrypt.compare(passwordForm.currentPassword, user.password)
  if (!isMatch) {
    return NextResponse.json({ msg: "Current password is incorrect" }, { status: 401 })
  }

  // 3. Encriptar la nueva contraseña
  const hashedPassword = await bcrypt.hash(passwordForm.newPassword, 10)

  // 4. Actualizar en DB
  const { error: updateError } = await supabase
    .from('users')
    .update({
      password: hashedPassword,
      is_pswchange: false
    })
    .eq('id', userID)

  if (updateError) {
    console.error("Error updating password", updateError)
    return NextResponse.json({ msg: "Error updating password" }, { status: 500 })
  }

  return NextResponse.json({ msg: "Password successfully updated" }, { status: 200 })
}
