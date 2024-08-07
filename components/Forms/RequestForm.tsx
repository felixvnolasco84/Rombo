"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useMutation } from "convex/react";
import { FormLabel } from "../react-hook-form";
import { api } from "@/convex/_generated/api";
import TipTapEditor from "../TipTap";
import { useRouter } from "next/navigation";
import UploadDocumentsFormField from "./UploadDocumentsFormField";
import { services } from "@/lib/utils";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

type RequestFormProps = {
  brandId: Id<"brand">;
};

export default function RequestForm({ brandId }: RequestFormProps) {
  const create = useMutation(api.requests.create);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const FormSchema = z.object({
    title: z.string().min(1, { message: "Por favor ingresa un título" }),
    category: z.string().min(1, { message: "Por favor ingresa una categoría" }),
    description: z
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
    brandId: z.string(),
    status: z.string(),
    priority: z.string().min(1, { message: "Por favor ingresa una prioridad" }),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      documents: [],
      brandId: brandId,
      status: "To Do",
      priority: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const promise = create({
      title: data.title,
      description: data.description,
      brandId: brandId,
      category: data.category,
      deadline: "2022-12-31",
    })
      .then((documentId) => {
        router.push(`/portal/solicitudes/${documentId}`);
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
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
          </div>
          <Button disabled={isLoading}>
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Enviar Solicitud"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
