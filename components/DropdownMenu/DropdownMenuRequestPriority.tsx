"use client";

import { useState } from "react";

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
import { Loader } from "lucide-react";
import { getPriorityColor } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

type Request = {
  id: Id<"requests">;
  priority: string;
};

export default function DropdownMenuRequestPriority({ id }: Request) {
  const update = useMutation(api.requests.update);

  const request = useQuery(api.requests.getById, {
    requestId: id,
  });

  const handleStatusChange = async (priority: string) => {
    try {
      const promise = update({
        id: id,
        priority,
      });

      toast.promise(promise, {
        loading: "Cambiando prioridad...",
        success: "Prioridad actualizada",
        error: "Error al cambiar prioridad",
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (request === undefined) {
    return <Loader />;
  }

  if (request === null) {
    return <div>404</div>;
  }

  const color = getPriorityColor(request.priority);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="h-fit p-0 hover:bg-transparent focus-visible:ring-transparent"
        >
          <Badge
            className={`${color} px-2.5 py-1 w-full rounded-md`}
            variant={"requestPriority"}
          >
            {request.priority}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Cambiar Prioridad</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={request.priority}
          onValueChange={handleStatusChange}
        >
          <DropdownMenuRadioItem key={"LOW"} value={"LOW"}>
            LOW
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem key={"MEDIUM"} value={"MEDIUM"}>
            MEDIUM
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem key={"HIGH"} value={"HIGH"}>
            HIGH
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem key={"CRITICAL"} value={"CRITICAL"}>
            CRITICAL
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
