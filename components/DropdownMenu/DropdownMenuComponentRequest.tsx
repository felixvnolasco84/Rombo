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
import { MenuIcon, RefreshCcw, Trash2Icon } from "lucide-react";
import EditRequestForm from "../Forms/EditRequestForm";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function DropdownMenuComponentRequest({
  request,
}: {
  request: any;
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const draftResponse = await fetch(`/api/requests/${request.id}`, {
        method: "DELETE",
      });
      const response = await draftResponse.json();
      if (response.message === "Request deleted successfully") {
        toast({
          title: "¡Listo!",
          description: " Tu solicitud se ha eliminado!",
          variant: "default",
          duration: 3000,
        });
        router.push("/portal/solicitudes");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center gap-1">
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? "Editar" : "Eliminar"}
            </DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? "Editar solicitud" : "¿Estás seguro?"}
            </DialogDescription>
          </DialogHeader>
          {isEditDialogOpen ? (
            <EditRequestForm
              setIsEditDialogOpen={setIsEditDialogOpen}
              request={request}
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
    </div>
  );
}
