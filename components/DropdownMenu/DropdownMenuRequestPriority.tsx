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
  priority: string;
};

export default function DropdownMenuRequestPriority({ id, priority }: Request) {
  const [position, setPosition] = React.useState<string>(priority);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleStatusChange = async (priority: string) => {
    setLoading(true);
    try {
      const draftResponse = await fetch(`/api/requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priority: priority }),
      });
      const response = await draftResponse.json();

      if (response.message === "Request updated successfully") {
        toast({
          title: "¡Listo!",
          description: "La Prioridad de la solicitud ha sido actualizada!",
          variant: "default",
          duration: 3000,
        });
        setPosition(priority);
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
            <DropdownMenuRadioItem key={"low"} value={"low"}>
              low
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem key={"medium"} value={"medium"}>
              medium
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem key={"high"} value={"high"}>
              high
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem key={"critical"} value={"critical"}>
              critical
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
