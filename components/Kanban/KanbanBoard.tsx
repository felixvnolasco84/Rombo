"use client";

import KanbanCard from "../Cards/KanbanCard";
import KanbanTitleSection from "./KanbanTitleSection";

type KanbanBoardProps = {
  todoItems: any;
  inProgressItems: any;
  toTestItems: any;
  completeItems: any;
};

export default function KanbanBoard({
  todoItems,
  inProgressItems,
  toTestItems,
  completeItems,
}: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto py-8">
      <div className="h-fit w-1/4 space-y-4">
        <KanbanTitleSection title="To Do" items={todoItems} />
        <div className="h-fit w-full space-y-4">
          {todoItems.map((request: any) => (
            <KanbanCard key={request.id} request={request} />
          ))}
        </div>
      </div>
      <div className="h-fit w-1/4 space-y-4">
        <KanbanTitleSection title="En Progreso" items={inProgressItems} />
        <div className="h-fit w-full space-y-4">
          {inProgressItems.map((request: any) => (
            <KanbanCard key={request.id} request={request} />
          ))}
        </div>
      </div>
      <div className="h-fit w-1/4 space-y-4">
        <KanbanTitleSection title="Revisión" items={toTestItems} />
        <div className="h-fit w-full space-y-4">
          {toTestItems.map((request: any) => (
            <KanbanCard key={request.id} request={request} />
          ))}
        </div>
      </div>
      <div className="h-fit w-1/4 space-y-4">
        <KanbanTitleSection title="Completado" items={completeItems} />

        <div className="h-fit w-full space-y-4">
          {completeItems.map((request: any) => (
            <KanbanCard key={request.id} request={request} />
          ))}
        </div>
      </div>
    </div>
  );
}
