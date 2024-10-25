"use client";

import Link from "next/link";
import DropdownMenuRequestPriority from "../DropdownMenu/DropdownMenuRequestPriority";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import { AppWindow, Grip } from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";
import { adminList } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useRequestModal } from "@/hooks/request-modal";
import { Button } from "../ui/button";

const CardItem = ({
  card,
  index,
}: {
  card: Doc<"requests">;
  index: number;
}) => {

  const requestModal = useRequestModal();
  const { user } = useUser();

  if (!user) return null;

  return (
    <>
      <Draggable
        isDragDisabled={
          !adminList.includes(user.emailAddresses[0].emailAddress)
        }
        draggableId={card._id}
        index={index}
      >
        {(provided) => (
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={provided.draggableProps.style as React.CSSProperties}
            key={card._id}
            className="group w-full overflow-hidden rounded-lg bg-white shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-b-[#D1D1D1] px-4 pb-2 pt-4">
              <Link
                className="hover:underline"
                href={`/portal/solicitudes/${card._id}`}
              >
                <CardTitle className="text-lg font-normal leading-none text-[#121415]">
                  {card.title}
                </CardTitle>
              </Link>
              <div className="flex items-center space-x-1">
                <Grip className="hidden h-3 w-3 cursor-grab text-[#121415] transition-opacity duration-300 ease-linear group-hover:block" />
                <Button
                  onClick={() => requestModal.onOpen(card)}
                  variant={"ghost"}
                  size={"icon"}
                >
                  <AppWindow className="hidden h-3 w-3 cursor-pointer text-[#121415] transition-opacity duration-300 ease-linear group-hover:block" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col gap-y-2">
                <Badge
                  className="w-full bg-[#F5F5F5] px-2.5 py-1 font-normal"
                  variant={"outline"}
                >
                  {card.category}
                </Badge>
                {/* <DropdownMenuRequestCategory
                  id={card.id}
                  category={card.category}
                /> */}
                {/* <Badge
                  variant={"outline"}
                  className="bg-[#F5F5F5] px-2.5 py-1 font-normal"
                >
                  {card.brand.title}
                </Badge> */}

                {true ? (
                  <Badge
                    className={`${
                      card.status === "TO DO"
                        ? "bg-green-100 text-green-800"
                        : card.status === "IN PROGRESS"
                          ? "bg-yellow-100 text-yellow-800"
                          : card.status === "IN REVIEW"
                            ? "bg-blue-100 text-blue-800"
                            : card.status === "DONE"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                    }  w-full text-xs  px-2.5 py-1 `}
                    variant={"requestStatus"}
                  >
                    {card.status === "TO DO"
                      ? "TO DO"
                      : card.status === "IN PROGRESS"
                        ? "In Progress"
                        : card.status === "IN REVIEW"
                          ? "IN REVIEW"
                          : "DONE"}
                  </Badge>
                ) : (
                  <Badge
                    className={`${
                      card.status === "TO DO"
                        ? "bg-green-100 text-green-800"
                        : card.status === "IN PROGRESS"
                          ? "bg-yellow-100 text-yellow-800"
                          : card.status === "IN REVIEW"
                            ? "bg-blue-100 text-blue-800"
                            : card.status === "DONE"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                    }  w-full text-xs  px-2.5 py-1 `}
                    variant={"requestStatus"}
                  >
                    {card.status === "TO DO"
                      ? "TO DO"
                      : card.status === "IN PROGRESS"
                        ? "In Progress"
                        : card.status === "IN REVIEW"
                          ? "IN REVIEW"
                          : "DONE"}
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end px-3 pb-4 pt-0">
              <DropdownMenuRequestPriority
                priority={card.priority || ""}
                id={card._id}
              />
            </CardFooter>
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default CardItem;
