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

type Request = {
  id: string;
  status: string;
};

export default function DropdownMenuRequestStatus({ id, status }: Request) {
  const [position, setPosition] = React.useState<string>(status);
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
        setPosition(status);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button disabled={loading} variant={"ghost"} className="h-fit p-0">
            <Badge variant={"outline"}>
              {loading ? <Loader className="h-4 w-4 animate-spin" /> : position}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Estado de la solicitud</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={position}
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
