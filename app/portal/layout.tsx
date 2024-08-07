"use client";

import Link from "next/link";

import {
  Bell,
  Home,
  LucidePanelsTopLeft,
  Menu,
  PlusCircle,
  Users,
} from "lucide-react";

import React from "react";
import { SidebarNavDashboard } from "./components/sidebar-nav-dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  // if (!session) {
  //   return <NotAutorizedComponent />;
  // }

  // const user = await prisma.user.findFirst({
  //   where: { email: session.user?.email },
  // });

  // const data = await getAllSubscriptions({
  //   params: { customer_id: user?.stripe_customer_id },
  // });

  // const subscriptionsJson = await data.json();

  // const subsriptions = subscriptionsJson.data;

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
      title: "Solicitudes",
      href: "/portal/solicitudes",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Notificaciones",
      href: "/portal/notificaciones",
      icon: <Bell className="h-4 w-4" />,
    },
  ];

  return (
    <div className="py-4">
      <div className="grid w-full overflow-hidden rounded-2xl shadow-md md:grid-cols-[220px_1fr] lg:xl:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="">Dashboard</span>
              </Link>
            </div>
            <div className="flex-1">
              <SidebarNavDashboard items={sidebarNavItems} />{" "}
            </div>
          </div>
        </div>
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
}
