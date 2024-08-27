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
import EditRequestForm from "../Forms/EditRequestForm";
import { useEditBrandModal } from "@/hooks/edit-brand-modal";
import EditBrandForm from "../Forms/EditBrandForm";

export const EditBrandModal = () => {
  const brand = useEditBrandModal((state) => state.brand);
  const isOpen = useEditBrandModal((state) => state.isOpen);
  const onClose = useEditBrandModal((state) => state.onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Actualizar Solicitud</CardTitle>
            <CardDescription>
              Actualiza la información de tu solicitud
            </CardDescription>
          </CardHeader>
          <CardContent>
            {brand && <EditBrandForm brand={brand} onClose={onClose} />}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
