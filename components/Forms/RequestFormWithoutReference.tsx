"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucidePersonStanding } from "lucide-react";
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
import { Textarea } from "../ui/textarea";
import { FormLabel } from "../react-hook-form";
import TipTapEditor from "../TipTap";
import { services } from "@/lib/utils";

type RequestFormProps = {
  projects: any[];
};

export default function RequestFormWithoutReference({
  projects,
}: RequestFormProps) {
  const FormSchema = z.object({
    title: z.string().min(1, { message: "Por favor ingresa un título" }),
    category: z.string().min(1, { message: "Por favor ingresa una categoría" }),
    description: z
      .string()
      .min(1, { message: "Por favor ingresa una descripción" }),
    attachments: z.string().optional(),
    projectId: z.string(),
    status: z.string(),
    priority: z.string(),
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      attachments: "",
      projectId: "",
      status: "backlog",
      priority: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const jsonData = JSON.stringify(data);

      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

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
          description: "Tu solicitud ha sido enviada con éxito 🎉",
        });
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
                name="projectId"
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
                          {projects.map((project) => {
                            return (
                              <SelectItem key={"low"} value={"low"}>
                                {project.title}
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
            {isLoading && (
              <LucidePersonStanding className="mr-2 h-4 w-4 animate-spin" />
            )}
            Enviar Solicitud
          </Button>
        </div>
      </form>
    </Form>
  );
}
