"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PersonStandingIcon } from "lucide-react"
import LoginFormComponent from "./LoginFormComponent"


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function LoginFormSection({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl: any = searchParams.get("callbackUrl")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <LoginFormComponent />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="border-t w-full" />
        </div>
        <div className="relative flex justify-center uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O Continuar con
          </span>
        </div>
      </div>
      <Button
        onClick={() => signIn("google")}
        variant="outline"
        type="button"
        className="text-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <PersonStandingIcon className="mr-1 w-4 h-4 animate-spin" />
        ) : (
          <PersonStandingIcon className="mr-1 w-4 h-4 animate-spin" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}
