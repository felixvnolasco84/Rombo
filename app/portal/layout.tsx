import Link from "next/link"
import { Bell, Home, LucidePanelsTopLeft, MailCheckIcon, Menu, Package2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import React from "react"
import { SidebarNavDashboard } from "./components/sidebar-nav-dashboard"

export default function layout({ children }: { children: React.ReactNode }) {
    const sidebarNavItems = [
        {
            title: "Inicio",
            href: "/portal",
            icon: <Home className="h-4 w-4" />,
        },
        {
            title: "Marcas",
            href: "/portal/marcas",
            icon: <LucidePanelsTopLeft className="h-4 w-4" />,
        },
        {
            title: "Proyectos",
            href: "/portal/proyectos",
            icon: <MailCheckIcon className="h-4 w-4" />,
        },
        {
            title: "Solicitudes",
            href: "/portal/solicitudes",
            icon: <Users className="h-4 w-4" />,
        },
    ]

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2 p-4">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            {/* <DashboardIcon className="h-6 w-6" /> */}
                            <span className="">Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <SidebarNavDashboard items={sidebarNavItems} />{" "}
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="default"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <SidebarNavDashboard items={sidebarNavItems} />
                        </SheetContent>
                    </Sheet>
                    {/* <BreadcrumbComponent /> */}
                </header>
                <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 lg:gap-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
