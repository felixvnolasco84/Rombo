import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";

export default async function page() {
  const session: any = await getServerSession(authOptions);

  const notifications = await prisma.notification.findMany({
    where: {
      userId: session.user.id,
    },
  });

  console.log(notifications);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return <div>page</div>;
}
