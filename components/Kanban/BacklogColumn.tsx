import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanCard from "../Cards/KanbanCard";
import { useCallback, useState } from "react";
import KanbanCardTest from "../Cards/KanbanCardTest";

type BacklogColumnProps = {
  backlogItems: any;
};
export type Item = {
  id: string;
  title: string;
  priority: string;
  status: string;
  category: string;
  brand: any;
};

export default function BacklogColumn({ backlogItems }: BacklogColumnProps) {
  const [cards, setCards] = useState(backlogItems || []);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((request: Item, index: number) => {
    return (
      <KanbanCardTest
        index={index}
        moveCard={moveCard}
        key={request.id}
        request={request}
      />
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-fit w-fit space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Backlog</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{backlogItems.length} Tareas</span>
          </div>
        </div>
        <div className="h-fit w-fit space-y-4">
          <div className="flex flex-col gap-4">
            {cards.map((request: any, i: any) => renderCard(request, i))}
          </div>
          {/* {backlogItems.map((request: any) => (
            <KanbanCard key={request.id} request={request} />
          ))} */}
        </div>
      </div>
    </DndProvider>
  );
}
