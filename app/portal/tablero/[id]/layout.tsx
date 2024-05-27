import BoardNavbar from "@/components/Cards/BoardNavbar";
import prisma from "@/utils/ConnectionPool";
import React from "react";

const BoardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  // const board: any = await prisma.board.findUnique({
  //   where: { id: params.boardId },
  //   include: { Users: true },
  // });
  return (
    <div
      className="relative h-[85vh] bg-cover bg-center bg-no-repeat"
      // style={{ backgroundImage: `url(${board?.image})` }}
    >
      {/* <BoardNavbar board={board} /> */}
      {/* <div className="absolute inset-0 bg-black/10" /> */}
      <div>{children}</div>
    </div>
  );
};

export default BoardLayout;
