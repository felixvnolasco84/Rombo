"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormLabel } from "../react-hook-form";
import TipTapEditor from "../TipTap";
import { useRouter } from "next/navigation";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import TipTapComment from "../TipTapComment";

type RequestFormProps = {
  comment: Doc<"requestsComments">;
  onClose: () => void;
};

export default function EditCommentForm({
  comment,
  onClose,
}: RequestFormProps) {
  const update = useMutation(api.comment.update);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const FormSchema = z.object({
    content: z
      .string()
      .min(1, { message: "Por favor ingresa una descripción" }),
    documents: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
        })
      )
      .optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: comment.content,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const promise = update({
      commentId: comment._id,
      content: data.content,
    });

    toast.promise(promise, {
      loading: "Actualizando comentario...",
      success: () => {
        // router.push("/");
        onClose();
        return "Comentario actualizado";
      },
      error: "Error al actualizar comentario",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Comentario</FormLabel>
                    <FormControl>
                      <TipTapComment
                        hasContent={true}
                        postContent={field.value}
                        onStateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="documents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Archivos Adjuntos</FormLabel>
                    <FormDescription>
                      Agregar documentos relacionados a tu marca o organización
                    </FormDescription>
                    <FormControl>
                      <UploadDocumentsFormField
                        files={comment?.documents}
                        objectId={{ id: comment.id, type: "comment" }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" size={"sm"}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant={"primary"}
              type="submit"
              disabled={isLoading}
              size={"sm"}
            >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                "Actualizar"
              )}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
