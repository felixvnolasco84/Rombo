// import { Card, List } from "@/interfaces";
import React from "react";
import ListHeader from "./ListHeader";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { adminList, cn } from "@/lib/utils";
import CardItem from "./CardItem";
import { getAuthSession } from "@/utils/AuthOptions";
// import CreateCard from "./CreateCard";

const ListItem = ({ list, index }: { list: any; index: number }) => {
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
            {...provided.dragHandleProps}
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
                    list?.cards?.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {list?.requests?.map((card: any, index: number) => (
                    <CardItem key={card.id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            {/* <CreateCard listId={list.id} /> */}
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
