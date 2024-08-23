"use client";

import * as React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, Trash2Icon } from "lucide-react";
import { useEditRequestModal } from "@/hooks/edit-request-modal";
import { useDeleteRequestModal } from "@/hooks/delete-request-modal";

export default function DropdownMenuComponentRequest({
  request,
}: {
  request: any;
}) {
  const editRequestDialog = useEditRequestModal();

  const deleteRequestDialog = useDeleteRequestModal();

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => editRequestDialog.onOpen(request)}>
            <Pencil2Icon className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deleteRequestDialog.onOpen(request)}
            className="flex items-center gap-1"
          >
            <Trash2Icon className="h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
