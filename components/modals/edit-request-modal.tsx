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
import { useEditRequestModal } from "@/hooks/edit-request-modal";
import EditRequestForm from "../Forms/EditRequestForm";

export const EditRequestModal = () => {
  const request = useEditRequestModal((state) => state.request);
  const isOpen = useEditRequestModal((state) => state.isOpen);
  const onClose = useEditRequestModal((state) => state.onClose);

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
            {request && <EditRequestForm request={request} onClose={onClose} />}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
