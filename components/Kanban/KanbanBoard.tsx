"use client";

import KanbanCard from "../Cards/KanbanCard";
import React, { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BacklogColumn from "./BacklogColumn";
import KanbanTitleSection from "./KanbanTitleSection";

type KanbanBoardProps = {
  backlogItems: any;
  todoItems: any;
  inProgressItems: any;
  toTestItems: any;
  completeItems: any;
};

export default function KanbanBoard({
  backlogItems,
  todoItems,
  inProgressItems,
  toTestItems,
  completeItems,
}: KanbanBoardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: any) => {
    if (isDragging && scrollRef.current) {
      scrollRef.current.scrollLeft =
        scrollRef.current.scrollLeft + startX - e.clientX;
      setStartX(e.clientX);
    }
  };

  const handleDragStart = (e: any) => {
    e.preventDefault();
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onDragStart={handleDragStart}
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto py-8"
    >
      {/* <BacklogColumn backlogItems={backlogItems} /> */}
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
