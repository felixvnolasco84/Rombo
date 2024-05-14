import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";
import { notificationsColumns } from "@/components/Tables/Notifications/notificationsColumns";
import { NotificationsDataTable } from "@/components/Tables/Notifications/notificationsDataTable";

export default async function page() {
  const session: any = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  const notifications = await prisma.notification.findMany({
    include: {
      brand: true,
      request: true,
      comment: true,
      user: true,
    },
  });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return (
    <NotificationsDataTable
      columns={notificationsColumns}
      data={notifications}
    />
  );
}
