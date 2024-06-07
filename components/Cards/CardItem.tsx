"use client";
// import { Card, User } from "@/interfaces";
import Link from "next/link";
import DropdownMenuRequestCategory from "../DropdownMenu/DropdownMenuRequestCategory";
import DropdownMenuRequestPriority from "../DropdownMenu/DropdownMenuRequestPriority";
import DropdownMenuRequestStatus from "../DropdownMenu/DropdownMenuRequestStatus";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={provided.draggableProps.style as React.CSSProperties}
            key={card.id}
            className="w-full overflow-hidden rounded-lg bg-white shadow-md"
          >
            <CardHeader className="border-b border-b-[#D1D1D1] px-4 pb-2 pt-4">
              <Link
                className="hover:underline"
                href={`/portal/solicitudes/${card.id}`}
              >
                <CardTitle className="] text-lg font-normal text-[#121415]">
                  {card.title}
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col gap-y-2">
                <DropdownMenuRequestCategory
                  id={card.id}
                  category={card.category}
                />

                <Badge
                  variant={"outline"}
                  className="bg-[#F5F5F5] px-2.5 py-1 font-normal"
                >
                  {card.brand.title}
                </Badge>
                <DropdownMenuRequestStatus id={card.id} status={card.status} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end px-3 pb-4 pt-0">
              <DropdownMenuRequestPriority
                priority={card.priority}
                id={card.id}
              />
            </CardFooter>
          </Card>

          // <div
          //   {...provided.draggableProps}
          //   {...provided.dragHandleProps}
          //   ref={provided.innerRef}
          //   style={provided.draggableProps.style as React.CSSProperties} // Aquí está el cambio
          //   onClick={() => setIsModal(true)}
          //   role="button"
          //   className="truncate rounded-md bg-white px-3 py-2 text-sm shadow-md"
          // >
          //   {card.title}
          //   <div className="mt-3 flex justify-end gap-2">
          //     {/* {card?.users?.map((user: User) => ()} */}
          //     {card?.users?.map((user: any) => (
          //       <div className="" key={user.id}>
          //         <img
          //           src={user?.image}
          //           alt=""
          //           className="h-7 w-7 rounded-full"
          //         />
          //       </div>
          //     ))}
          //   </div>
          // </div>
        )}
      </Draggable>
      {/* {isModal && (
        <CardModal id={card.id} isModal={isModal} setIsModal={setIsModal} />
      )} */}
    </>
  );
};

export default CardItem;
