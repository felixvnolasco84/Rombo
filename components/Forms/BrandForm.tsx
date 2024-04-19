"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";
import { LucidePersonStanding } from "lucide-react";
import { FormLabel } from "../react-hook-form";
import { uploadFile } from "@/app/utils/uploadImage";
import TipTapEditor from "../TipTap";
import UploadDocumentsFormField from "./UploadDocumentsFormField";

export default function BrandForm() {
  const FormSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Por favor ingresa el nombre del proyecto" }),
    description: z
      .string()
      .min(1, { message: "Por favor ingresa una descripción del proyecto" }),
    img: z.string().optional(),
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [cover, setCover] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const image = await uploadFile(file);
      setCover(image);
    } else {
      setCover("");
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      img: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const jsonData = JSON.stringify(data);
      const response = await fetch("/api/brands ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      console.log(response);
      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "¡Oh!",
          description: "Al parecer hubo un error, intentelo más tarde",
        });
      } else {
        toast({
          variant: "default",
          title: "¡Listo!",
          description: "Tu proyecto se ha creado correctamente",
        });
        form.reset();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Al parecer hubo un error, intentelo más tarde",
      });
    }}
    // console.log(data);
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagen de la Marca</FormLabel>
                    <FormDescription>
                      Agregar una imagen de tu marca o organización
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          handleFileChange(e);
                          field.onChange(e);
                        }}
                        disabled={isLoading}
                        // {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Nombre de la Marca</FormLabel>
                    <FormDescription>
                      Agregar el nombre de tu marca o organización
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Nombre de la Marca"
                        className="resize-none bg-transparent py-0"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción de la Marca</FormLabel>
                    <FormDescription>
                      Agregar una descripción de tu marca o organización
                    </FormDescription>
                    <FormControl>
                      {/* <Textarea
                        placeholder="Descripción de la marca"
                        className="resize-none bg-transparent"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      ></Textarea> */}
                      <TipTapEditor onStateChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <FormField  
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subir Documentos</FormLabel>
                  <FormDescription>
                    Drag and drop files here or click to select files from yourdevice.
                  </FormDescription>
                  <FormControl>
                    {/* <Textarea
                      placeholder="Descripción de la marca"
                      className="resize-none bg-transparent"
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    ></Textarea> */}
                    <UploadDocumentsFormField />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <LucidePersonStanding className="mr-2 h-4 w-4 animate-spin" />
            )}
            Crear Marca
          </Button>
        </div>
      </form>
    </Form>
  );
}
