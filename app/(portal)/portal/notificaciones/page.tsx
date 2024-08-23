"use client";

import React from "react";

import { notificationsColumns } from "@/components/Tables/Notifications/notificationsColumns";
import { NotificationsDataTable } from "@/components/Tables/Notifications/notificationsDataTable";
import { useQueries, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Page() {
  const notifications = useQuery(api.notification.getAll, {});

  if (notifications === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <NotificationsDataTable
      columns={notificationsColumns}
      data={notifications}
    />
  );
}
