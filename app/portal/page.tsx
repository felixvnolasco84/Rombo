import { getAuthSession } from "@/utils/AuthOptions";
import ListContainer from "@/components/Cards/KanbanList";
import prisma from "@/utils/ConnectionPool";
import KanbanBoard from "@/components/Kanban/KanbanBoard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function page() {
  const session: any = await getAuthSession();

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

  console.log(list);

  // const requests = await prisma.request.findMany({
  //   where: {
  //     userEmail: session.user.email,
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     priority: true,
  //     status: true,
  //     category: true,
  //     brand: true,
  //   },
  // });

  // const todo = requests.filter((request) => request.status === "todo");
  // const inProgress = requests.filter(
  //   (request) => request.status === "in progress"
  // );
  // const toTest = requests.filter((request) => request.status === "to-test");
  // const complete = requests.filter((request) => request.status === "complete");

  return (
    <>
      <div className="w-full overflow-x-auto p-4">
        <ListContainer list={list} />
      </div>
      {/* {requests.length > 0 ? (
        <KanbanBoard
          todoItems={todo}
          inProgressItems={inProgress}
          toTestItems={toTest}
          completeItems={complete}
        />
      ) : (
        <Link className="w-full" href="/portal/solicitudes/new">
          <Button
            variant="ghost"
            className="flex h-96 w-full items-center justify-center rounded-lg border border-gray-300"
          >
            No hay solicitudes registradas
          </Button>
        </Link>
      )} */}
    </>
  );
}
