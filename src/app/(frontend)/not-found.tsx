import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className=" flex flex-1 py-16 justify-center items-center">
      <div className="flex max-w-md flex-col items-center text-center gap-6">
        <div className="flex items-center justify-center rounded-full bg-warning/10 p-6">
          <AlertTriangle className="size-14 text-warning" />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Page not found
          </h1>
          <p className="text-muted-foreground">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
            Let’s get you back on track.
          </p>
        </div>

        <Button asChild size="lg" className="mt-4 px-8">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  )
}