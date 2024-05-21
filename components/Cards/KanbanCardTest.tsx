import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DropdownMenuRequestCategory from "../DropdownMenu/DropdownMenuRequestCategory";
import DropdownMenuRequestPriority from "../DropdownMenu/DropdownMenuRequestPriority";
import DropdownMenuRequestStatus from "../DropdownMenu/DropdownMenuRequestStatus";
import { Item } from "../Kanban/BacklogColumn";
import { ItemTypes } from "../Kanban/ItemTypes";

type KanbanCardTestProps = {
  index: number;
  request: any;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

interface DragItem extends Item {
  index: number;
}

export default function KanbanCardTest({
  request,
  index,
  moveCard,
}: KanbanCardTestProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id: request.id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Card
      style={{ opacity }}
      ref={ref}
      data-handler-id={handlerId}
      key={request.id}
      className="w-[270px] overflow-hidden rounded-lg bg-white shadow-md"
    >
      <CardHeader className="bg-gray-100 p-4">
        <Link
          className="hover:underline"
          href={`/portal/solicitudes/${request.id}`}
        >
          <CardTitle className="text-lg font-semibold text-gray-800">
            {request.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Categoría</div>
            <DropdownMenuRequestCategory
              id={request.id}
              category={request.category}
            />

            {/* <div className="font-medium text-gray-800">{request.category}</div> */}
          </div>
          <div>
            <div className="text-sm text-gray-600">Prioridad</div>
            <DropdownMenuRequestPriority
              priority={request.priority}
              id={request.id}
            />
            {/* <Badge className="text-xs" variant="secondary">
              {request.priority}
            </Badge> */}
          </div>
          <div>
            <div className="text-sm text-gray-600">Status</div>
            <DropdownMenuRequestStatus
              id={request.id}
              status={request.status}
            />
          </div>
          <div>
            <div className="text-sm text-gray-600">Marca</div>
            <div className="text-sm font-medium text-gray-800">
              {request.brand.title}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
