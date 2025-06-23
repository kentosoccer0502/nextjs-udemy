'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ClientComponent() {
  console.log('Client')
  const [count, setCount] = useState(0)
  const router = useRouter()
    return (
    <div>
      クライアント
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Link href="/about">About</Link>
      <button onClick={() => router.push('/about')}>About</button>
    </div>
  )
}
