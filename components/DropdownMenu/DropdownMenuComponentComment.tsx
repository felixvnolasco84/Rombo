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
import { Doc } from "@/convex/_generated/dataModel";
import { useEditRequestCommentModal } from "@/hooks/edit-request-comment-modal";
import { useDeleteRequestCommentModal } from "@/hooks/delete-request-comment-modal";

export default function DropdownMenuComponentComment({
  comment,
}: {
  comment: Doc<"requestsComments">;
}) {
  const editRequestCommentModal = useEditRequestCommentModal();

  const deleteRequestCommentModal = useDeleteRequestCommentModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => editRequestCommentModal.onOpen(comment)}
        >
          <Pencil2Icon className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => deleteRequestCommentModal.onOpen(comment)}
        >
          <Trash2Icon className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
