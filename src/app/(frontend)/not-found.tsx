import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex justify-center items-center pt-(--header-height)">
      <div className="flex flex-1 flex-col justify-center items-center  text-center">
        <div className="prose prose-base flex flex-col items-center">
          <AlertTriangle className="size-16 text-warning" />
          <h1 className="font-bold mt-12 text-warning-foreground max-w-lg">Page Not Found</h1>
          <p className=" text-muted-foreground max-w-lg">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable. Please check the address or return to the home page.
          </p>
        </div>
        <Button asChild className="px-8 mt-8">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}