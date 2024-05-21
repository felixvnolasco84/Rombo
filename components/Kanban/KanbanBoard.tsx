"use client";

import KanbanCard from "../Cards/KanbanCard";
import React, { useState, useRef } from "react";
	import { DndProvider } from "react-dnd";
  import { HTML5Backend } from "react-dnd-html5-backend";
import BacklogColumn from "./BacklogColumn";

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
    //   onMouseDown={handleMouseDown}
    //   onMouseUp={handleMouseUp}
    //   onMouseMove={handleMouseMove}
    //   onDragStart={handleDragStart}
    //   ref={scrollRef}
      className="flex max-w-5xl gap-6 overflow-x-auto px-4 py-8 md:px-6 md:py-12 lg:gap-12"
    >
      <BacklogColumn backlogItems={backlogItems} />
      <div className="h-fit w-fit space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">To Do</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{todoItems.length} Tareas</span>
          </div>
        </div>
        <div className="h-fit w-fit space-y-4">
          {todoItems.map((request: any) => (
            <KanbanCard key={request.id} request={request} />
          ))}
        </div>
      </div>
      <div className="h-fit w-fit space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">En Progreso</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{inProgressItems.length} Tareas</span>
          </div>
        </div>
        <div className="h-fit w-fit space-y-4">
          {inProgressItems.map((request: any) => (
            <KanbanCard key={request.id} request={request} />
          ))}
        </div>
      </div>
      <div className="h-fit w-fit space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Revisión</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{toTestItems.length} Tareas</span>
          </div>
        </div>
        <div className="h-fit w-fit space-y-4">
          {toTestItems.map((request: any) => (
            <KanbanCard key={request.id} request={request} />
          ))}
        </div>
      </div>
      <div className="h-fit w-fit space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Completado</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{completeItems.length} Tareas</span>
          </div>
        </div>
        <div className="h-fit w-fit space-y-4">
          {completeItems.map((request: any) => (
            <KanbanCard key={request.id} request={request} />
          ))}
        </div>
      </div>
    </div>
  );
}
