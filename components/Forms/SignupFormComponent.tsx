"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader, PanelsTopLeftIcon } from "lucide-react";

export default function SignupFormComponent() {
  const FormSchema = z.object({
    name: z
      .string()
      .min(2, { message: "El nombre debe de ser de al menos 2 carácteres." }),
    email: z.string().email({ message: "Correo electrónico Inválido" }),
    password: z
      .string()
      .min(1, { message: "Por favor ingresa una contraseña" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Por favor ingresa una contraseña" }),
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    if (data.password !== data.confirmPassword) {
      return toast({
        variant: "destructive",
        title: "¡Oh!",
        description: "Las contraseñas no coinciden",
      });
    }
    try {
      const jsonData = JSON.stringify(data);
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
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Nombre</Label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input
                        placeholder="Jhon Doe"
                        className="resize-none bg-transparent py-0"
                        autoCapitalize="none"
                        autoComplete="name"
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

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Correo Electronico</Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
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

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input
                        placeholder="*********"
                        className="resize-none bg-transparent py-0"
                        type="password"
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Confirmar Contraseña</Label>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input
                        placeholder="*********"
                        className="resize-none bg-transparent py-0"
                        type="password"
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
          </div>
          <Button disabled={isLoading}>
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" size={24} />
            ) : (
              "Registrarse"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
