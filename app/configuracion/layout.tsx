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
  {
    title: "Subscripciones",
    href: "/configuracion/subscripcion",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <section className="grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-start gap-2">
        <div className="hidden md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
            <p className="text-muted-foreground">
              Administre la configuración de su cuenta y establezca las
              preferencias de correo electrónico.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col gap-12 lg:flex-row">
            <aside className="w-fit">
              <SideNavbar items={sidebarNavItems} />
            </aside>
            <div className="max-w-6xl">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
