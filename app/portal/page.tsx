import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";
import KanbanBoard from "@/components/Kanban/KanbanBoard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function page() {
  const session: any = await getAuthSession();

  const requests = await prisma.request.findMany({
    where: {
      userEmail: session.user.email,
    },
    select: {
      id: true,
      title: true,
      priority: true,
      status: true,
      category: true,
      brand: true,
    },
  });

  const backlog = requests.filter((request) => request.status === "backlog");

  const todo = requests.filter((request) => request.status === "todo");
  const inProgress = requests.filter(
    (request) => request.status === "in progress"
  );
  const toTest = requests.filter((request) => request.status === "to-test");
  const complete = requests.filter((request) => request.status === "complete");

  return (
    <>
      {requests.length > 0 ? (
        <KanbanBoard
          backlogItems={backlog}
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
      )}
    </>
  );
}
