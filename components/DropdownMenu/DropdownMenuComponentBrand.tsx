"use client";

import { useState } from "react";
import * as React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import EditBrandForm from "../Forms/EditBrandForm";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { on } from "events";
import { Doc } from "@/convex/_generated/dataModel";

export default function DropdownMenuComponentBrand({
  brand,
}: {
  brand: Doc<"brand">;
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const remove = useMutation(api.brands.remove);
  const restore = useMutation(api.brands.restore);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const onRemove = () => {
        const promise = remove({ id: brand._id });
        toast.promise(promise, {
          loading: "Deleting brand...",
          success: "Brand deleted successfully.",
          error: "Failed to delete brand.",
        });
        router.push("/portal/brands");
      };
      onRemove();
    } catch (err) {
      toast.error("Failed to delete brand.");
    } finally {
      setLoading(false);
    }
  };

  const onRestore = () => {
    const promise = restore({ id: brand._id });

    toast.promise(promise, {
      loading: "Restoring brand...",
      success: "Brand restored successfully.",
      error: "Failed to restore brand.",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-1"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Pencil2Icon className="h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center gap-1"
          >
            <Trash2Icon className="h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={isEditDialogOpen || isDeleteDialogOpen}
        onOpenChange={
          isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
        }
      >
        <DialogContent
          className={"max-h-screen overflow-y-scroll lg:max-w-screen-lg"}
        >
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? "Editar" : "Eliminar"}
            </DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? "Editar Marcas" : "¿Estás seguro?"}
            </DialogDescription>
          </DialogHeader>
          {isEditDialogOpen ? (
            <EditBrandForm
              setIsEditDialogOpen={setIsEditDialogOpen}
              brand={brand}
            />
          ) : (
            <DialogFooter>
              <Button
                onClick={handleDelete}
                disabled={loading}
                variant="destructive"
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </Button>
              <Button variant="secondary">Cancelar</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
