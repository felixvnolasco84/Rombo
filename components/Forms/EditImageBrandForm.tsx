"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { DialogClose, DialogFooter } from "../ui/dialog";
import UpdateImageFormField from "./UpdateImageFormField";

type RequestFormProps = {
  brand: any;
};

export default function EditImageBrandForm({ brand }: RequestFormProps) {
  const FormSchema = z.object({
    img: z.string().min(1, { message: "Por favor ingresa una imagen" }),
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      img: brand.img,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      const jsonData = JSON.stringify(data);
      const response = await fetch(`/api/brands/${brand.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      const responseJson = await response.json();

      if (responseJson?.message === "Brand updated successfully") {
        toast({
          variant: "default",
          title: "¡Listo!",
          description: "La marca ha sido actualizada 🎉",
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    {/* <FormLabel>Seleccciona o suel</FormLabel> */}
                    <FormControl>
                      <UpdateImageFormField img={brand.img} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
