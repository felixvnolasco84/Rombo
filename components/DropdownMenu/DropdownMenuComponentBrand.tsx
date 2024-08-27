"use client";

import { useState } from "react";
import * as React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Doc } from "@/convex/_generated/dataModel";
import { useEditBrandModal } from "@/hooks/edit-brand-modal";
import { useDeleteBrandModal } from "@/hooks/delete-brand-modal";

export default function DropdownMenuComponentBrand({
  brand,
}: {
  brand: Doc<"brand">;
}) {
  const editBrandModal = useEditBrandModal();
  const deleteBrandModal = useDeleteBrandModal();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-1"
            onClick={() => editBrandModal.onOpen(brand)}
          >
            <Pencil2Icon className="h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deleteBrandModal.onOpen(brand)}
            className="flex items-center gap-1"
          >
            <Trash2Icon className="h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
