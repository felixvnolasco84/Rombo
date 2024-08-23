"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useDeleteRequestCommentModal } from "@/hooks/delete-request-comment-modal";

export const DeleteRequestCommentModal = () => {
  const removeComment = useMutation(api.comment.remove);
  const comment = useDeleteRequestCommentModal((state) => state.comment);
  const isOpen = useDeleteRequestCommentModal((state) => state.isOpen);
  const onClose = useDeleteRequestCommentModal((state) => state.onClose);

  const handleRemove = () => {
    if (!comment) {
      return;
    }
    const promise = removeComment({
      id: comment._id,
    });
    toast.promise(promise, {
      loading: "Eliminando comentario...",
      success: () => {
        onClose();
        return "Comentario eliminado";
      },
      error: "Error al eliminar comentario",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Eliminar Comentario</CardTitle>
            <CardDescription>
              ¿Estás seguro que deseas eliminar este comentario?
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-end space-x-2">
            <Button variant={"primary"} size={"sm"} onClick={handleRemove}>
              Eliminar
            </Button>
            <Button variant={"outline"} size={"sm"} onClick={onClose}>
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
