import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';  // Import bcrypt

export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const body = await request.json();

    const userID = body.userID
    const formData = body.formData

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
        return NextResponse.json({ msg: "Missing required fields" }, { status: 400 });
    }

    if (formData.password !== formData.confirm_password) {
        return NextResponse.json({ msg: "Passwords do not match" }, { status: 400 });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const { data, error } = await supabase
        .from('users')
        .update({
            first_name: formData.first_name,
            last_name: formData.last_name,
            second_last_name: formData.second_last_name,
            email: formData.email,
            phone: formData.phone,
            has_ownership: (formData.title == 2) ? formData.has_ownership : null,
            position: formData.position,
            title: formData.title,
            password: hashedPassword,  // ✅ Store hashed password
            is_pswchange: false,
        })
        .eq('id', userID)
        .select()

    if (error) {
        console.error("Error: ", error)
        return NextResponse.json({ msg: "Error Updating", err: error }, { status: 500 });
    } else {

        return NextResponse.json({ msg: "Successfully Saved" }, { status: 200 });
        
    }
}
