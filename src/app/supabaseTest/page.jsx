
import { createClient } from '../utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: credentials, error } = await supabase.from('credentials').select()

  console.log(credentials)
  console.log(error)
  return (
    <ul>
      {credentials?.map((credentials, index) => (
        <li key={index}>{JSON.stringify(credentials)}</li>
      ))}
    </ul>
  )
}
