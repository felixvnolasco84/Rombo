import ListContainer from "@/components/Cards/KanbanList";
import prisma from "@/utils/ConnectionPool";

import React from "react";

const BoardPage = async ({ params }: { params: { boardId: string } }) => {
  const list = await prisma.list.findMany({
    where: { boardId: params.boardId },
    include: {
      requests: {
        orderBy: {
          order: "asc",
        },
        include: {
          //   users: true,
          user: true,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="w-full overflow-x-auto p-4">
      <ListContainer boardId={params.boardId} list={list} />
    </div>
  );
};

export default BoardPage;
