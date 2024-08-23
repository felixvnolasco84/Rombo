"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useDeleteRequestModal } from "@/hooks/delete-request-modal";
import { useRouter } from "next/navigation";

export const DeleteRequestModal = () => {
  const router = useRouter();
  const removeRequest = useMutation(api.requests.remove);
  const request = useDeleteRequestModal((state) => state.request);
  const isOpen = useDeleteRequestModal((state) => state.isOpen);
  const onClose = useDeleteRequestModal((state) => state.onClose);

  const handleRemove = () => {
    if (!request) {
      return;
    }
    const promise = removeRequest({
      id: request._id,
    });
    toast.promise(promise, {
      loading: "Eliminando solicitud...",
      success: () => {
        //TODO: REDIRECT PROPERLY
        router.push("/");
        onClose();
        return "Solicitud eliminada";
      },
      error: "Error al eliminar solicitud",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Eliminar Solicitud</CardTitle>
            <CardDescription>
              ¿Estás seguro de que deseas eliminar esta solicitud?
            </CardDescription>
          </CardHeader>
          {/* <CardContent>
          </CardContent> */}
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
