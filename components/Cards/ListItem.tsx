// import { Card, List } from "@/interfaces";
import React from "react";
import ListHeader from "./ListHeader";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import CardItem from "./CardItem";
// import CreateCard from "./CreateCard";

// const ListItem = ({ list, index }: { list: List; index: number }) => {
const ListItem = ({ list, index }: { list: any; index: number }) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={provided.draggableProps.style as React.CSSProperties} // Aquí está el cambio
          className="h-full w-[272px] shrink-0 select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="my-11 w-full rounded-md bg-slate-50 pb-2 shadow-md"
          >
            <ListHeader list={list} />
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2 rounded-md",
                    list?.cards?.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {/* {list?.cards?.map((card: Card, index: number) => ( */}
                  {list?.cards?.map((card: any, index: number) => (
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
