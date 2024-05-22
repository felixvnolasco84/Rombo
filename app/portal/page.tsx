import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";
import KanbanCard from "@/components/Cards/KanbanCard";
import KanbanBoard from "@/components/Kanban/KanbanBoard";

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
      <KanbanBoard
        backlogItems={backlog}
        todoItems={todo}
        inProgressItems={inProgress}
        toTestItems={toTest}
        completeItems={complete}
      />
    </>
  );
}
