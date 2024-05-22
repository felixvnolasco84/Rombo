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
import { services } from "@/lib/utils";

type Request = {
  id: string;
  category: string;
};

export default function DropdownMenuRequestCategory({ id, category }: Request) {
  const [position, setPosition] = React.useState<string>(category);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleStatusChange = async (category: string) => {
    setLoading(true);
    try {
      const draftResponse = await fetch(`/api/requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: category }),
      });
      const response = await draftResponse.json();

      if (response.message === "Request updated successfully") {
        toast({
          title: "¡Listo!",
          description: "La categoria de la solicitud ha sido actualizada!",
          variant: "default",
          duration: 3000,
        });
        setPosition(category);
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
          <Button
            disabled={loading}
            variant={"ghost"}
            className="h-fit w-full p-0 hover:bg-transparent focus-visible:ring-transparent"
          >
            <Badge className="w-full" variant={"primary"}>
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
            {services.map((service) => (
              <DropdownMenuRadioItem key={service.id} value={service.name}>
                {service.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
