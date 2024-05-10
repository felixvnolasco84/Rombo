"use client";

import * as z from "zod";
import { toast } from "../ui/use-toast";
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

export default function CommentForm({ requestId }: { requestId: string }) {
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
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const desc = data.comment;
      const documents = data.documents;
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ requestId, desc, documents }),
      });
      if (response.ok) {
        form.reset();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "¡Oh!",
        description: "Al parecer hubo un error, intentelo más tarde 🎉",
      });
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
                {/* <Textarea
                  placeholder="Escribe tu comentario aquí."
                  {...field}
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Enviar Comentario
        </Button>
      </form>
    </Form>
  );
}
