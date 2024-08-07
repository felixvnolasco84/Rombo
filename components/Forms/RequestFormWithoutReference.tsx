"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, LucidePersonStanding } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
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

import { FormLabel } from "../react-hook-form";
import TipTapEditor from "../TipTap";
import { Brand, services } from "@/lib/utils";
import UploadDocumentsFormField from "./UploadDocumentsFormField";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

type RequestFormProps = {
  brands: Brand[];
};

export default function RequestFormWithoutReference({
  brands,
}: RequestFormProps) {
  const FormSchema = z.object({
    title: z.string().min(1, { message: "Por favor ingresa un título" }),
    category: z.string().min(1, { message: "Por favor ingresa una categoría" }),
    description: z
      .string()
      .min(1, { message: "Por favor ingresa una descripción" }),
    // documents: z
    //   .array(
    //     z.object({
    //       name: z.string(),
    //       url: z.string(),
    //     })
    //   )
    //   .optional(),
    brandId: z.string().min(1, { message: "Por favor selecciona un proyecto" }),
    priority: z.string().min(1, { message: "Por favor ingresa una prioridad" }),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      // documents: [],
      brandId: "",
      priority: "LOW",
    },
  });

  const create = useMutation(api.requests.create);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);

      const promise = create({
        title: data.title,
        category: data.category,
        description: data.description,
        brandId: data.brandId as Id<"brand">,
        priority: data.priority,
        deadline: new Date().toISOString(),
      })
        .then((documentId) => {
          router.push(`/portal/solicitudes/${documentId}`);
        })
        .catch((error) => {
          toast.error("Ocurrió un error al enviar la solicitud");
        });

      toast.promise(promise, {
        loading: "Enviando solicitud...",
        success: "Solicitud enviada",
        error: "Ocurrió un error al enviar la solicitud",
      });
    } catch (error: any) {
      toast.error("Ocurrió un error al enviar la solicitud");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Titulo de la tarea</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Escribe un título para tu tarea"
                        className="resize-none bg-transparent py-0"
                        autoCapitalize="none"
                        type="text"
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
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Escoge un tipo de entregable" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.name}>
                              {service.name}
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
                name="priority"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Prioridad</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Prioridad del Entregable" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key={"low"} value={"low"}>
                            Bajo
                          </SelectItem>
                          <SelectItem key={"medium"} value={"medium"}>
                            Medio
                          </SelectItem>
                          <SelectItem key={"high"} value={"high"}>
                            Alto
                          </SelectItem>
                          <SelectItem key={"critical"} value={"critical"}>
                            Urgente
                          </SelectItem>
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
                  <FormItem className="space-y-1">
                    <FormLabel>Descripción</FormLabel>
                    <FormDescription>
                      Define los puntos más importantes para entender la tarea
                      que estás solicitando. Las descripciones claras y
                      detalladas ayudarán a nuestro equipo de diseño a crear
                      mejores diseños y a entregarlos a tiempo.
                    </FormDescription>
                    <FormControl>
                      <TipTapEditor onStateChange={field.onChange} />
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
                      <UploadDocumentsFormField {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Proyecto</FormLabel>

                    <FormDescription>
                      Selecciona el proyecto que desea relacionar
                    </FormDescription>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un Proyecto" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((brand) => {
                            return (
                              <SelectItem key={brand._id} value={brand._id}>
                                {brand.title}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Enviar Solicitud"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
