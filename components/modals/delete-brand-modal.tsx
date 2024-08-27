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
import { useDeleteBrandModal } from "@/hooks/delete-brand-modal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const DeleteBrandModal = () => {
  const brand = useDeleteBrandModal((state) => state.brand);
  const isOpen = useDeleteBrandModal((state) => state.isOpen);
  const onClose = useDeleteBrandModal((state) => state.onClose);

  const router = useRouter();

  const remove = useMutation(api.brands.remove);
  const restore = useMutation(api.brands.restore);

  const handleDelete = async () => {
    if (!brand) return;
    try {
      const onRemove = () => {
        const promise = remove({ id: brand._id });
        toast.promise(promise, {
          loading: "Deleting brand...",
          success: "Brand deleted successfully.",
          error: "Failed to delete brand.",
        });
        router.push("/portal/marcas");
      };
      onRemove();
    } catch (err) {
      toast.error("Failed to delete brand.");
    }
  };

  const onRestore = () => {
    if (!brand) return;

    const promise = restore({ id: brand._id });

    toast.promise(promise, {
      loading: "Restoring brand...",
      success: "Brand restored successfully.",
      error: "Failed to restore brand.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Eliminar Marca</CardTitle>
            <CardDescription>
              ¿Estás seguro de que deseas eliminar esta marca? Esta acción no se
              puede deshacer.
            </CardDescription>
          </CardHeader>

          <CardFooter className="mt-4 justify-end space-x-2">
            <Button variant={"primary"} size={"sm"} onClick={handleDelete}>
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
