// import { Card, List } from "@/interfaces";
import React, { ElementRef, useRef, useState } from "react";
import ListHeader from "./ListHeader";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { adminList, cn } from "@/lib/utils";
import CardItem from "./CardItem";
import { List } from "./KanBan";
import { CardForm } from "./CardForm";
import { Id } from "@/convex/_generated/dataModel";

const ListItem = ({
  list,
  index,
  brandId,
}: {
  list: List;
  index: number;
  brandId: Id<"brand">;
}) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={provided.draggableProps.style as React.CSSProperties}
          className="w-1/4 select-none"
        >
          <div
            // {...provided.dragHandleProps}
            className="mt-4 w-full rounded-md bg-slate-50 shadow-md"
          >
            <ListHeader list={list} />
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    " px-1 py-3 flex flex-col gap-y-2 rounded-md",
                    list.requests?.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {list?.requests?.map((card, index: number) => (
                    <CardItem key={card._id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              status={list.title}
              brandId={brandId}
              listId={list.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
