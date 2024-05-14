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
import EditRequestForm from "../Forms/EditRequestForm";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import EditBrandForm from "../Forms/EditBrandForm";

export default function DropdownMenuComponentBrand({ brand }: { brand: any }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const draftResponse = await fetch(`/api/brands/${brand.id}`, {
        method: "DELETE",
      });
      const response = await draftResponse.json();
      if (response.message === "Brand deleted successfully") {
        toast({
          title: "¡Listo!",
          description: " Tu marca ha sido eliminada",
          variant: "default",
          duration: 3000,
        });
        router.push("/portal/marcas");
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
              {isEditDialogOpen ? "Editar solicitud" : "¿Estás seguro?"}
            </DialogDescription>
          </DialogHeader>
          {isEditDialogOpen ? (
            <EditBrandForm setIsEditDialogOpen={setIsEditDialogOpen} brand={brand} />
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
