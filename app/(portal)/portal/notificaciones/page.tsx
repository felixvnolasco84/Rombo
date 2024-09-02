"use client";

import React from "react";

import { notificationsColumns } from "@/components/Tables/Notifications/notificationsColumns";
import { NotificationsDataTable } from "@/components/Tables/Notifications/notificationsDataTable";
import { useQueries, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { adminList } from "@/lib/utils";
import NotAutorizedComponent from "@/components/NotAutorizedComponent";

export default function Page() {
  const { user } = useUser();

  const notifications = useQuery(api.notification.getAll, {});

  if (notifications === undefined) {
    return <div>Loading...</div>;
  }

  if (user && !adminList.includes(user?.emailAddresses[0].emailAddress)) {
    return <NotAutorizedComponent />;
  }

  return (
    <NotificationsDataTable
      columns={notificationsColumns}
      data={notifications}
    />
  );
}
