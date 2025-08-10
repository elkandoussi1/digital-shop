import {useRouter} from 'next/router'
export default function Success(){
  const router = useRouter()
  const {session_id} = router.query
  return (
    <main style={{padding:20}}>
      <h1>شكراً لشرائك!</h1>
      <p>ستتلقى رابط التحميل عبر البريد (في حال ربطت الويب هوك) — Session ID: {String(session_id || '')}</p>
    </main>
  )
}
