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
import { Loader, LucidePersonStanding } from "lucide-react";
import { FormLabel } from "../react-hook-form";

type ProjectFormProp = {
  brandId: string;
};

export default function ProjectForm({ brandId }: ProjectFormProp) {
  const FormSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Por favor ingresa el nombre del proyecto" }),
    description: z
      .string()
      .min(1, { message: "Por favor ingresa una descripción del proyecto" }),
    img: z.string().optional(),
    brandId: z.string().min(1, { message: "Selecciona un proyecto" }),
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [cover, setCover] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      img: "",
      brandId: brandId,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const jsonData = JSON.stringify(data);
      const response = await fetch("/api/projects", {
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
                    <FormLabel>Nombre del Proyecto</FormLabel>
                    <FormDescription>
                      Agregar el nombre de tu marca o organización
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Nombre del Proyecto"
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
                    <FormLabel>Descripción del Proyectos</FormLabel>
                    <FormDescription>
                      Define los puntos más importantes para entender la tarea
                      que estás solicitando. Las descripciones claras y
                      detalladas ayudarán a nuestro equipo de diseño a crear
                      mejores diseños y a entregarlos a tiempo.
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción"
                        className="resize-none bg-transparent"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      ></Textarea>
                      {/* <TipTapEditor onStateChange={field.onChange} /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormDescription>
                      Selecciona la marca a la que pertenece este proyecto.
                    </FormDescription>
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
              /> */}
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Crear Proyecto"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
