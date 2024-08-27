"use client";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import UploadDocumentsFormFieldButton from "./UploadDocumentsFormFieldButton";
import TipTapComment from "../TipTapComment";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function CommentForm({
  requestId,
  brandId,
}: {
  requestId: Id<"requests">;
  brandId: Id<"brand">;
}) {
  const create = useMutation(api.comment.create);

  const [loading, setLoading] = useState<boolean>(false);

  const FormSchema = z.object({
    comment: z.string().min(1, { message: "Por favor ingresa un comentario" }),
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
      comment: "",
      documents: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      const promise = create({
        content: data.comment,
        brandId: brandId,
        entityId: requestId,
      });

      toast.promise(promise, {
        loading: "Enviando comentario...",
        success: "Comentario enviado",
        error: "Error al enviar comentario",
      });

      // const desc = data.comment;
      // const documents = data.documents;
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="documents"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormControl>
                <UploadDocumentsFormFieldButton {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormControl>
                <TipTapComment onStateChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {loading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            "Enviar Comentario"
          )}
        </Button>
      </form>
    </Form>
  );
}
