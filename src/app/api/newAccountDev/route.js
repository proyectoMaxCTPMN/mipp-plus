import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';  // Import bcrypt

export async function GET() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const userID = 402760530;
    const password = "Ctpmn0*";  // Ensure password is part of the request

    // Hash the password before inserting
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds are 10 here

    const { data, error } = await supabase
    .from('users')
    .insert([{
      id: userID,
      password: hashedPassword // Store the hashed password
    }])
    .select()

    if (error) {
      console.error("error" + JSON.stringify(error))
      return NextResponse.json({msg: "Error Inserting User", err: JSON.stringify(error)}, {status: 500});
    } else {
      return NextResponse.json({msg: "Successfully Created User"}, {status: 200});
    }
}
