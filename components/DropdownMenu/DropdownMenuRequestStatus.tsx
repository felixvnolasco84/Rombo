"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { toast } from "../ui/use-toast";
import { Loader } from "lucide-react";
import { getStatusColor } from "@/lib/utils";

type Request = {
  id: string;
  status: string;
};

export default function DropdownMenuRequestStatus({ id, status }: Request) {
  const [currentStatus, setCurrentStatus] = React.useState<string>(status);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleStatusChange = async (status: string) => {
    setLoading(true);
    try {
      const draftResponse = await fetch(`/api/requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      });
      const response = await draftResponse.json();

      if (response.message === "Request updated successfully") {
        toast({
          title: "¡Listo!",
          description: "El status de la solicitud ha sido actualizado!",
          variant: "default",
          duration: 3000,
        });
        setCurrentStatus(status);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const color = getStatusColor(currentStatus);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={loading}
            variant={"ghost"}
            className="h-fit w-full p-0 hover:bg-transparent focus-visible:ring-transparent"
          >
            <Badge
              className={`${
                currentStatus === "todo"
                  ? "bg-green-100 text-green-800"
                  : currentStatus === "in progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : currentStatus === "to-test"
                  ? "bg-blue-100 text-blue-800"
                  : currentStatus === "complete"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }  w-full text-xs  px-2.5 py-1 `}
              variant={"requestStatus"}
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                currentStatus
              )}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Estado de la solicitud</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={currentStatus}
            onValueChange={handleStatusChange}
          >
            <DropdownMenuRadioItem value="backlog">
              Backlog
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="todo">To Do</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="in progress">
              In progress
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="to-test">
              En Aprobación
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="complete">
              Completado
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
