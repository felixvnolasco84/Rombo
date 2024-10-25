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
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Loader, LucidePersonStanding } from "lucide-react";
import { FormLabel } from "../react-hook-form";
import TipTapEditor from "../TipTap";
import { useRouter } from "next/navigation";
import { industries } from "@/lib/utils";
import UpdateImageFormField from "./UpdateImageFormField";

export default function BrandForm() {

  const create = useMutation(api.brands.create);

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


  const handleBrandCreate = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    const promise = create({
      title: data.title,
      description: data.description,
      industry: data.industry,
      website: data.website,
      img: data.img,
      // orgid: organization.id,
    })
      // .then((documentId) => documentModal.onOpen(documentId));
      .then((documentId) => {
        router.push(`/portal/marcas/${documentId}`);
      })
      .catch((error) => {
        toast.error("Failed to create a new Brand.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    toast.promise(promise, {
      loading: "Creating a new Brand...",
      success: "Brand created successfully.",
      error: "Failed to create a new Brand.",
    });
  };


  async function onSubmit(data: z.infer<typeof FormSchema>) {

    handleBrandCreate(data);
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
                    {/* <UploadDocumentsFormField {...field} /> */}
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
