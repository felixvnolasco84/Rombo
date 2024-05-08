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
import { useToast } from "@/components/ui/use-toast";
import { FormLabel } from "../react-hook-form";
import TipTapEditor from "../TipTap";
import { useRouter } from "next/navigation";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { PUT as UpdateRequest } from "@/app/api/requests/[id]/route";

type RequestFormProps = {
  request: any;
};

export default function EditRequestForm({ request }: RequestFormProps) {
  // console.log(request);

  const FormSchema = z.object({
    title: z.string().min(1, { message: "Por favor ingresa un título" }),
    category: z.string().min(1, { message: "Por favor ingresa una categoría" }),
    description: z
      .string()
      .min(1, { message: "Por favor ingresa una descripción" }),
    attachments: z.string().optional(),
    brandId: z.string(),
    status: z.string(),
    priority: z.string(),
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: request.title,
      category: request.category,
      description: request.description,
      attachments: "",
      brandId: request.brandId,
      status: request.status,
      priority: request.priority,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data)
    setIsLoading(true);
    try {
      const jsonData = JSON.stringify(data);

      const response = await fetch(`/api/requests/${request.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      // const response = await UpdateRequest(data, request.id);
      const responseJson = await response.json();

      router.push(`/portal/solicitudes/${responseJson.id}`);

      if (!response) {
        toast({
          variant: "destructive",
          title: "¡Oh!",
          description: "Al parecer hubo un error, intentelo más tarde",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "¡Oh!",
        description: "Al parecer hubo un error, intentelo más tarde 🎉",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const services = [
    {
      id: 1,
      name: "Gráficos de Redes Sociales",
    },
    {
      id: 2,
      name: "Papelería, Infografías, Folletos",
    },
    {
      id: 3,
      name: "Fotos de Stock Ilimitadas",
    },
    {
      id: 4,
      name: "Presentaciones",
    },
    {
      id: 5,
      name: "Reels y Motion Graphics",
    },
    {
      id: 6,
      name: "Branding & Logotipos",
    },
  ];

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

            {/* TODO */}
            {/* <div className="grid w-full items-center gap-1.5">

                            <FormField
                                control={form.control}
                                name="attachments"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">

                                        <FormLabel>Adjuntos</FormLabel>

                                        <FormDescription>
                                            Arrastra o da click para subir los archivos que consideres que el diseñador necesita revisar o conocer para crear
                                            tu diseño. Documentos como lista de precios, presentación corporativa, moodboards, o pantallazos con
                                            referencias de estilo que viste y te gustaron.
                                        </FormDescription>
                                        <FormControl>
                                            <Textarea
                                                placeholder="*********"
                                                className="resize-none bg-transparent"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                {...field}
                                            ></Textarea>
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
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Actualizar
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
