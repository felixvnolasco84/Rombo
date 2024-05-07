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
import { LucidePersonStanding } from "lucide-react";
import { FormLabel } from "../react-hook-form";
import { uploadFile } from "@/app/utils/uploadImage";
import TipTapEditor from "../TipTap";
import UploadDocumentsFormField from "./UploadDocumentsFormField";
import { useRouter } from "next/navigation";

const industries = [
  "Agricultura",
  "Arquitectura",
  "Arte y Entretenimiento",
  "Automotriz",
  "Bienes Raíces",
  "Comercio",
  "Comunicación",
  "Construcción",
  "Consultoría",
  "Diseño",
  "Educación",
  "Energía",
  "Finanzas",
  "Gastronomía",
  "Gobierno",
  "Industria",
  "Ingeniería",
  "Inmobiliaria",
  "Legal",
  "Manufactura",
  "Medicina",
  "Publicidad",
  "Recursos Humanos",
  "Salud",
  "Seguros",
  "Servicios",
  "Tecnología",
  "Telecomunicaciones",
  "Transporte",
  "Turismo",
  "Ventas",
];

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
    documents: z.array(z.string()).optional(),
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [cover, setCover] = useState<string>("");

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
    // console.log(data);
    try {
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
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {/* <div className="grid w-full items-center gap-1.5">
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

              </div> */}

          <div className="grid w-full items-center gap-1.5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Marca</FormLabel>
                  <FormDescription>
                    Agregar el nombre de tu marca o organización
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="Nombre de la Marca"
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
                  <FormDescription>
                    Selecciona la industria a la que pertenece tu marca
                  </FormDescription>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una Industria" />
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

          <div className="grid w-full items-center gap-1.5">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Sitio web</FormLabel>
                  <FormDescription>
                    Agregar la URL de tu sitio web o red social
                  </FormDescription>
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
                    {/* <Textarea
                      placeholder="Descripción de la marca"
                      className="resize-none bg-transparent"
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    ></Textarea> */}
                    <UploadDocumentsFormField {...field} />
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
