import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"

import { Separator } from "@/components/ui/separator"
import { AccountForm } from "@/app/configuracion/cuenta/cuenta-form"
import { authOptions } from "@/utils/AuthOptions"

export default async function Cuenta() {
  const session: any = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?callbackUrl=/configuracion/cuenta")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg">Cuenta</h3>
        <p className="text-muted-foreground text-sm">
          Actualice la configuración de su cuenta. Establezca su idioma
          preferido y zona horaria.
        </p>
      </div>
      <Separator />
      {/* <AccountForm
        name={session?.user?.name}
        email={session?.user?.email}
        profilePicture={session?.user?.image}
      /> */}
    </div>
  )
}
