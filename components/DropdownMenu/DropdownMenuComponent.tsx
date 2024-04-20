"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { handleDeleteSinglePost } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";

type Props = {
  editPath: string;
  deleteId: string;
};

export default function DropdownMenuComponent({ editPath, deleteId }: Props) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link className="w-full" href={editPath}>
          <DropdownMenuItem>Editar</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <p onClick={() => handleDeleteSinglePost(deleteId, router)}>
            Eliminar
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
