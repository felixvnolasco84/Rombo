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
import { Loader, MenuIcon, Trash2Icon } from "lucide-react";
import EditRequestForm from "../Forms/EditRequestForm";
import { toast } from "../ui/use-toast";
import EditCommentForm from "../Forms/EditCommentForm";

export default function DropdownMenuComponentComment({
  comment,
}: {
  comment: any;
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteComment = async () => {
    try {
      setLoading(true);
      const draftResponse = await fetch(`/api/comments/${comment.id}`, {
        method: "DELETE",
      });

      const response = await draftResponse.json();
      setIsDeleteDialogOpen(false);
      if (response.message == "Comment deleted!") {
        toast({
          title: "¡Listo!",
          description: "Tu comentario se ha eliminado!",
          variant: "default",
          duration: 3000,
        });
      } else {
        toast({
          title: "¡Ups!",
          description: "Algo salió mal!",
          variant: "default",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? "Editar" : "Eliminar"}
            </DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? "Editar comentario" : "¿Estás seguro?"}
            </DialogDescription>
          </DialogHeader>
          {isEditDialogOpen ? (
            <EditCommentForm comment={comment} />
          ) : (
            <DialogFooter>
              <DialogClose>
                <Button onClick={handleDeleteComment} variant="destructive">
                  {loading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <>Eliminar</>
                  )}
                </Button>
              </DialogClose>
              <DialogClose>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
