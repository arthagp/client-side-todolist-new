import Image from 'next/image'
import CardTodo from '@/components/CardTodo'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CardTodo/>
    </main>
  )
}
