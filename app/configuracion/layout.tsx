import { Metadata } from "next"

import { Separator } from "@/components/ui/separator"
import { SideNavbar } from "@/components/Navbar/Side/SideNavbar"

export const metadata: Metadata = {
  title: "Tu Espacio Personal en G-TIMIN: Gestiona Tu Cuenta con Facilidad",
  description:
    "Accede a tu cuenta personal en G-TIMIN y descubre un espacio diseñado para ti. Gestiona tu perfil, guarda tus favoritos y personaliza tu experiencia científica. Tu cuenta en G-TIMIN es la puerta a una comunidad apasionada que comparte tu interés por la exploración y el descubrimiento científico.",
}

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/configuracion/perfil",
  },
  {
    title: "Cuenta",
    href: "/configuracion/cuenta",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <section className="items-center gap-6 grid md:py-10 pt-6 pb-8">
      <div className="flex flex-col items-start gap-2">
        <div className="md:block hidden">
          <div className="space-y-0.5">
            <h2 className="font-bold text-2xl tracking-tight">Configuración</h2>
            <p className="text-muted-foreground">
              Administre la configuración de su cuenta y establezca las
              preferencias de correo electrónico.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex lg:flex-row flex-col gap-12">
            <aside className="w-fit">
              <SideNavbar items={sidebarNavItems} />
            </aside>
            <div className="max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
