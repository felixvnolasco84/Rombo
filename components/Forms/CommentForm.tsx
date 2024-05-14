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
import { useState } from "react";
import { Loader } from "lucide-react";

export default function CommentForm({ requestId }: { requestId: string }) {
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
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const desc = data.comment;
      const documents = data.documents;
      const draftResponse = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ requestId, desc, documents }),
      });

      const response = await draftResponse.json();

      if (response.message == "Comment created!") {
        toast({
          title: "¡Listo!",
          description: "Tu comentario se ha enviado!",
          variant: "default",
          duration: 3000,
        });
        form.reset();
        
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "¡Oh!",
        description: "Al parecer hubo un error, intentelo más tarde 🎉",
      });
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
