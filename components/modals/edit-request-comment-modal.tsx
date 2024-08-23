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
import { useEditRequestCommentModal } from "@/hooks/edit-request-comment-modal";
import EditCommentForm from "../Forms/EditCommentForm";

export const EditRequestCommentModal = () => {
  const comment = useEditRequestCommentModal((state) => state.comment);
  const isOpen = useEditRequestCommentModal((state) => state.isOpen);
  const onClose = useEditRequestCommentModal((state) => state.onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Actualizar Comentario</CardTitle>
            <CardDescription>
              Actualizar el comentario de la solicitud
            </CardDescription>
          </CardHeader>
          <CardContent>
            {comment && <EditCommentForm comment={comment} onClose={onClose} />}

            {/* {request && <EditRequestForm request={request} onClose={onClose} />} */}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
