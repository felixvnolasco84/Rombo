import Link from "next/link"
import { Bell, Home, MailCheckIcon, Menu, Package2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import React from "react"
import { SidebarNavDashboard } from "./components/sidebar-nav-dashboard"

export default function layout({ children }: { children: React.ReactNode }) {
    const sidebarNavItems = [
        {
            title: "Inicio",
            href: "/portal",
            icon: <Home className="w-4 h-4" />,
        },
        {
            title: "Proyectos",
            href: "/portal/proyectos",
            icon: <MailCheckIcon className="w-4 h-4" />,
        },
        {
            title: "Solicitudes",
            href: "/portal/solicitudes",
            icon: <Users className="w-4 h-4" />,
        },
    ]

    return (
        <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] w-full min-h-screen">
            <div className="md:block hidden bg-muted/40 border-r">
                <div className="flex flex-col gap-2 p-4 h-full max-h-screen">
                    <div className="flex items-center px-4 lg:px-6 border-b h-14 lg:h-[60px]">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            {/* <DashboardIcon className="w-6 h-6" /> */}
                            <span className="">Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <SidebarNavDashboard items={sidebarNavItems} />{" "}
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex items-center gap-4 bg-muted/40 px-4 lg:px-6 border-b h-14 lg:h-[60px]">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="default"
                                className="md:hidden shrink-0"
                            >
                                <Menu className="w-5 h-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <SidebarNavDashboard items={sidebarNavItems} />
                        </SheetContent>
                    </Sheet>
                    {/* <BreadcrumbComponent /> */}
                </header>
                <main className="flex flex-col flex-1 gap-4 lg:gap-6 bg-muted/40 p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}
