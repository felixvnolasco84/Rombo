import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"

import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/app/configuracion/perfil/profile-form"
import { authOptions } from "@/utils/AuthOptions"

export default async function page() {
  const session: any = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?callbackUrl=/configuracion/perfil")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg">Perfil</h3>
        <p className="text-muted-foreground text-sm">
          Así es como otros te verán en el sitio.
        </p>
      </div>
      <Separator />
      <ProfileForm name={session?.user?.name} email={session.user?.email} profilePicture={session.user?.image} />
    </div>
  )
}
