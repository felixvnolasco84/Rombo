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
import { Id } from "@/convex/_generated/dataModel";

type Request = {
  id: Id<"requests"> | undefined;
  status: string | undefined;
};

export default function DropdownMenuRequestStatus({ id, status }: Request) {
  const [currentStatus, setCurrentStatus] = React.useState<string | undefined>(
    status
  );
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
        window.location.reload();
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
            <Badge
              className={`${
                currentStatus === "To Do"
                  ? "bg-green-100 text-green-800"
                  : currentStatus === "En Progreso"
                    ? "bg-yellow-100 text-yellow-800"
                    : currentStatus === "Revisión"
                      ? "bg-blue-100 text-blue-800"
                      : currentStatus === "Completado"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
              }  w-full text-xs  px-2.5 py-1 `}
              variant={"requestStatus"}
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                // currentStatus
                currentStatus
              )}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Cambiar Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={currentStatus}
            onValueChange={handleStatusChange}
          >
            <DropdownMenuRadioItem value="To Do">To Do</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="En Progreso">
              En Progreso
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Revisión">
              Revisión
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Completado">
              Completado
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
