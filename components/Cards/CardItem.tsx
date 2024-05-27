"use client";
// import { Card, User } from "@/interfaces";
import { Draggable } from "@hello-pangea/dnd";
import React, { useState } from "react";
import CardModal from "./CardModal";

// const CardItem = ({ card, index }: { card: Card; index: number }) => {
const CardItem = ({ card, index }: { card: any; index: number }) => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={provided.draggableProps.style as React.CSSProperties} // Aquí está el cambio
            onClick={() => setIsModal(true)}
            role="button"
            className="truncate rounded-md bg-white px-3 py-2 text-sm shadow-md"
          >
            {card.title}
            <div className="mt-3 flex justify-end gap-2">
              {/* {card?.users?.map((user: User) => ()} */}
              {card?.users?.map((user: any) => (
                <div className="" key={user.id}>
                  <img
                    src={user?.image}
                    alt=""
                    className="h-7 w-7 rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Draggable>
      {/* {isModal && (
        <CardModal id={card.id} isModal={isModal} setIsModal={setIsModal} />
      )} */}
    </>
  );
};

export default CardItem;
