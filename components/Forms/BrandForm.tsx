"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { Loader, LucidePersonStanding } from "lucide-react";
import { FormLabel } from "../react-hook-form";
import { uploadFile } from "@/app/utils/uploadImage";
import TipTapEditor from "../TipTap";
import UploadDocumentsFormField from "./UploadDocumentsFormField";
import { useRouter } from "next/navigation";
import { industries } from "@/lib/utils";
import UpdateImageFormField from "./UpdateImageFormField";

export default function BrandForm() {
  const router = useRouter();

  const FormSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Por favor ingresa el nombre del proyecto" }),
    industry: z.string().min(1, { message: "Por favor ingresa la industria" }),
    description: z
      .string()
      .min(1, { message: "Por favor ingresa una descripción del proyecto" }),
    img: z.string().optional(),
    website: z.string().optional(),
    documents: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
        })
      )
      .optional(),
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      img: "",
      industry: "",
      website: "",
      documents: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const jsonData = JSON.stringify(data);
      const draftResponse = await fetch("/api/brands ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      const response = await draftResponse.json();

      if (response.id) {
        toast({
          variant: "default",
          title: "¡Listo!",
          description: "Tu proyecto se ha creado correctamente",
        });
        form.reset();
        router.push(`/portal/marcas/${response.id}`);
      } else {
        toast({
          variant: "destructive",
          title: "¡Oh!",
          description: "Al parecer hubo un error, intentelo más tarde",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Al parecer hubo un error, intentelo más tarde",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid w-full items-center gap-1.5">
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <UpdateImageFormField {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Marca</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Agregar el nombre de tu marca o organización"
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
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industria</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la industria a la que pertenece tu marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <FormControl>
                    <TipTapEditor onStateChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sitio Web o Red Social</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.example.com"
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
              name="documents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Archivos Adjuntos</FormLabel>
                  <FormDescription>
                    Agregar documentos relacionados a tu marca o organización
                  </FormDescription>
                  <FormControl>
                    <UploadDocumentsFormField {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Crear Marca"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
