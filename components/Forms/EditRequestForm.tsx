"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import UploadDocumentsFormField from "./UploadDocumentsFormField";
import { services } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";

type RequestFormProps = {
  request: Doc<"requests">;
  onClose: () => void;
};

export default function EditRequestForm({
  request,
  onClose,
}: RequestFormProps) {
  const update = useMutation(api.requests.update);

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
    brandId: z.string(),
    status: z.string(),
    priority: z.string().min(1, { message: "Por favor ingresa una prioridad" }),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: request.title,
      category: request.category,
      description: request.description,
      brandId: request.brandId,
      status: request.status,
      priority: request.priority,
      // documents: request.documents,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const promise = update({
        id: request._id,
        title: data.title,
        description: data.description,
        category: data.category,
      });

      toast.promise(promise, {
        loading: "Actualizando solicitud...",
        success: () => {
          onClose();
          return "Solicitud actualizada con éxito";
        },
        error: "Error al actualizar la solicitud",
      });
    } catch (error: any) {
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
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Titulo de la tarea</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jhon@doe.com"
                        className="resize-none bg-transparent py-0"
                        autoCapitalize="none"
                        autoComplete="email"
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
                          <SelectItem key={"LOW"} value={"LOW"}>
                            Bajo
                          </SelectItem>
                          <SelectItem key={"MEDIUM"} value={"MEDIUM"}>
                            Medio
                          </SelectItem>
                          <SelectItem key={"HIGH"} value={"HIGH"}>
                            Alto
                          </SelectItem>
                          <SelectItem key={"CRITICAL"} value={"CRITICAL"}>
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
                      <UploadDocumentsFormField
                        objectId={{ id: request.id, type: "request" }}
                        files={request?.documents}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} variant={"primary"}>
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                "Actualizar"
              )}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
