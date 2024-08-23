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
import UploadDocumentsFormField from "./UploadDocumentsFormField";
import { industries } from "@/lib/utils";
import UpdateImageFormField from "./UpdateImageFormField";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Doc } from "@/convex/_generated/dataModel";

type RequestFormProps = {
  brand: Doc<"brand">;
  setIsEditDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditBrandForm({
  brand,
  setIsEditDialogOpen,
}: RequestFormProps) {
  const update = useMutation(api.brands.update);

  const FormSchema = z.object({
    img: z.string().optional(),
    title: z.string().min(1, { message: "Por favor ingresa un título" }),
    industry: z.string().min(1, { message: "Por favor ingresa una industria" }),
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

  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     img: brand.img,
  //     title: brand.title,
  //     industry: brand.industry,
  //     description: brand.description,
  //     documents: brand.documents,
  //   },
  // });

  const onChange = (content: any) => {
    // update({
    //   id: brand._id,
    //   title: form.getValues("title"),
    //   estimatedTime
    //   content,
    // });
  };

  const onTitleChange = (title: string) => {
    const promise = update({
      id: brand._id,
      title: title,
    });

    toast.promise(promise, {
      loading: "Actualizando marca...",
      success: "Marca actualizada correctamente.",
      error: "Error al actualizar la marca.",
    });
  };

  const onWebsiteChange = (website: string) => {
    const promise = update({
      id: brand._id,
      website: website,
    });

    toast.promise(promise, {
      loading: "Actualizando marca...",
      success: "Marca actualizada correctamente.",
      error: "Error al actualizar la marca.",
    });
  };

  const handleIndustryChange = (industry: string) => {
    const promise = update({
      id: brand._id,
      industry: industry,
    });

    toast.promise(promise, {
      loading: "Actualizando marca...",
      success: "Marca actualizada correctamente.",
      error: "Error al actualizar la marca.",
    });
  };

  const handleDescriptionChange = (description: string) => {
    const promise = update({
      id: brand._id,
      description: description,
    });

    toast.promise(promise, {
      loading: "Actualizando marca...",
      success: "Marca actualizada correctamente.",
      error: "Error al actualizar la marca.",
    });
  };

  // async function onSubmit(data: z.infer<typeof FormSchema>) {
  //   try {
  //     setIsLoading(true);
  //     const jsonData = JSON.stringify(data);
  //     const response = await fetch(`/api/brands/${brand.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: jsonData,
  //     });

  //     const responseJson = await response.json();

  //     if (responseJson.message === "Brand updated successfully") {
  //       toast({
  //         variant: "default",
  //         title: "¡Listo!",
  //         description: "Tu marca ha sido actualizada 🎉",
  //       });
  //       setIsEditDialogOpen && setIsEditDialogOpen(false);
  //     }
  //   } catch (error: any) {
  //     toast({
  //       variant: "destructive",
  //       title: "¡Oh!",
  //       description: "Al parecer hubo un error, intentelo más tarde",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="grid gap-2">
      <div className="grid gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label>Titulo</Label>
          <Input
            placeholder={brand.title}
            className="resize-none bg-transparent py-0"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Website</Label>
          <Input
            placeholder={brand.website}
            className="resize-none bg-transparent py-0"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
            onChange={(e) => onWebsiteChange(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Industria</Label>
          <Select
            onValueChange={handleIndustryChange}
            defaultValue={brand.industry}
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
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label>Descripción</Label>
          <TipTapEditor
            hasContent={true}
            postContent={brand.description}
            onStateChange={handleDescriptionChange}
          />
        </div>
      </div>
    </div>

    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)}>
    //     <div className="grid gap-2">
    //       <div className="grid gap-4">
    //         <div className="grid w-full items-center gap-1.5">
    //           <FormField
    //             control={form.control}
    //             name="img"
    //             render={({ field }) => (
    //               <FormItem className="space-y-1">
    //                 <FormControl>
    //                   <UpdateImageFormField img={brand.img}  />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //         </div>

    //         <div className="grid w-full items-center gap-1.5">
    //           <FormField
    //             control={form.control}
    //             name="title"
    //             render={({ field }) => (
    //               <FormItem className="space-y-1">
    //                 <FormLabel>Titulo de la tarea</FormLabel>
    //                 <FormControl>
    //                   <Input
    //                     placeholder="jhon@doe.com"
    //                     className="resize-none bg-transparent py-0"
    //                     autoCapitalize="none"
    //                     autoComplete="email"
    //                     autoCorrect="off"
    //                     disabled={isLoading}
    //
    //                   ></Input>
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //         </div>
    //         <div className="grid w-full items-center gap-1.5">
    //           <FormField
    //             control={form.control}
    //             name="industry"
    //             render={({ field }) => (
    //               <FormItem className="space-y-1">
    //                 <FormLabel>Industria</FormLabel>
    //                 <FormControl>
    //                   <Select
    //                     onValueChange={field.onChange}
    //                     defaultValue={field.value}
    //                   >
    //                     <SelectTrigger>
    //                       <SelectValue placeholder="Escoge un tipo de entregable" />
    //                     </SelectTrigger>
    //                     <SelectContent>
    //                       {industries.map((industry) => (
    //                         <SelectItem key={industry} value={industry}>
    //                           {industry}
    //                         </SelectItem>
    //                       ))}
    //                     </SelectContent>
    //                   </Select>
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //         </div>

    //         <div className="grid w-full items-center gap-1.5">
    //           <FormField
    //             control={form.control}
    //             name="description"
    //             render={({ field }) => (
    //               <FormItem className="space-y-1">
    //                 <FormLabel>Descripción</FormLabel>
    //                 <FormDescription></FormDescription>
    //                 <FormControl>
    //                   <TipTapEditor
    //                     hasContent={true}
    //                     postContent={field.value}
    //                     onStateChange={field.onChange}
    //                   />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //         </div>

    //         <div className="grid w-full items-center gap-1.5">
    //           <FormField
    //             control={form.control}
    //             name="documents"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Archivos Adjuntos</FormLabel>
    //                 <FormDescription>
    //                   Agregar documentos relacionados a tu marca o organización
    //                 </FormDescription>
    //                 <FormControl>
    //                   <UploadDocumentsFormField
    //                     files={brand?.documents}
    //                     objectId={{ id: brand.id, type: "brand" }}
    //
    //                   />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //         </div>
    //       </div>
    //       <DialogFooter>
    //         <DialogClose asChild>
    //           <Button type="button" variant="outline">
    //             Cancelar
    //           </Button>
    //         </DialogClose>
    //         <Button type="submit" disabled={isLoading}>
    //           {isLoading ? (
    //             <Loader className="h-4 w-4 animate-spin" />
    //           ) : (
    //             "Actualizar"
    //           )}
    //         </Button>
    //       </DialogFooter>
    //     </div>
    //   </form>
    // </Form>
  );
}
