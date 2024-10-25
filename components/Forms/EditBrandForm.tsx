"use client";

import React, { useState } from "react";
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
import { FormLabel } from "../react-hook-form";
import TipTapEditor from "../TipTap";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { industries } from "@/lib/utils";
import UpdateImageFormField from "./UpdateImageFormField";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Doc } from "@/convex/_generated/dataModel";
import { on } from "events";

type RequestFormProps = {
  brand: Doc<"brand">;
  onClose?: () => void;
};

export default function EditBrandForm({ brand, onClose }: RequestFormProps) {
  const update = useMutation(api.brands.update);

  const FormSchema = z.object({
    img: z.string().optional(),
    title: z.string().min(1, { message: "Por favor ingresa un título" }),
    industry: z.string().min(1, { message: "Por favor ingresa una industria" }),
    website: z.string().optional(),
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
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: brand.title,
      description: brand.description,
      website: brand.website,
      img: brand.img,
      documents: [],
      industry: brand.industry,
    },
  });

  const handleUpdate = (data: z.infer<typeof FormSchema>) => {
    const promise = update({
      id: brand._id,
      title: data.title,
      description: data.description,
      industry: data.industry,
      website: data.website,
    });

    toast.promise(promise, {
      loading: "Actualizando marca...",
      success: () => {
        onClose && onClose();
        return "Marca actualizada.";
      },
      error: "Error al actualizar la marca.",
    });
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleUpdate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            {/* <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <UpdateImageFormField img={brand.img || ""}  onChange={field.onChange} />
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
            <div className="grid w-full items-center gap-1.5">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Industria</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Escoge un tipo de entregable" />
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
                name="website"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={field.value}
                        className="resize-none bg-transparent py-0"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
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
