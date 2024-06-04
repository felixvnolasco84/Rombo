import ListContainer from "@/components/Cards/KanbanList";
import prisma from "@/utils/ConnectionPool";

import React from "react";

const BoardPage = async ({ params }: { params: { boardId: string } }) => {
  const list = await prisma.list.findMany({
    include: {
      requests: {
        orderBy: {
          order: "asc",
        },
        include: {
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
      <ListContainer list={list} />
    </div>
  );
};

export default BoardPage;
