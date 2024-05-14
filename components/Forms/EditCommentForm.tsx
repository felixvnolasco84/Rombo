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
import { useToast } from "@/components/ui/use-toast";
import { FormLabel } from "../react-hook-form";
import TipTapEditor from "../TipTap";
import { useRouter } from "next/navigation";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { PUT as UpdateRequest } from "@/app/api/requests/[id]/route";
import UploadDocumentsFormField from "./UploadDocumentsFormField";

type RequestFormProps = {
  comment: any;
};

export default function EditCommentForm({ comment }: RequestFormProps) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const FormSchema = z.object({
    id: z.string(),
    desc: z.string().min(1, { message: "Por favor ingresa una descripción" }),
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
      id: comment.id,
      desc: comment.desc,
      documents: comment.documents,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data)
    setIsLoading(true);
    try {
      const jsonData = JSON.stringify(data);

      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      // const response = await UpdateRequest(data, request.id);
      const responseJson = await response.json();

      console.log(responseJson);

      if (responseJson.message === "Comment updated!") {
        toast({
          title: "¡Listo!",
          description: "Tu comentario se ha actualizado!",
          variant: "default",
          duration: 3000,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "¡Oh!",
        description: "Al parecer hubo un error, intentelo más tarde 🎉",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Comentario</FormLabel>
                    <FormDescription></FormDescription>
                    <FormControl>
                      <TipTapEditor
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
            <div className="grid w-full items-center gap-1.5">
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
                        objectId={{ id: comment.id, type: "comment"}}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Actualizar
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
