"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {  LucidePersonStanding } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "../ui/textarea"
import { FormLabel } from "../react-hook-form"

type RequestFormProps = {
    projectId: string
}

export default function RequestForm({projectId}: RequestFormProps) {
    const FormSchema = z.object({
        title: z.string().min(1, { message: "Por favor ingresa un título" }),
        category: z
            .string()
            .min(1, { message: "Por favor ingresa una categoría" }),
        description: z.string().min(1, { message: "Por favor ingresa una descripción" }),
        attachments: z.string().optional(),
    })

    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            category: "",
            description: "",
            attachments: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const jsonData = JSON.stringify(data)

            const response = await fetch("/api/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonData,
            })

            console.log(response)

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "¡Oh!",
                    description: "Al parecer hubo un error, intentelo más tarde",
                })
            }
            else {
                toast({
                    variant: "default",
                    title: "¡Listo!",
                    description: "Tu proyecto se ha creado correctamente",
                })
                form.reset()
            }

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "¡Oh!",
                description: "Al parecer hubo un error, intentelo más tarde 🎉",
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="gap-2 grid">
                    <div className="gap-4 grid">
                        <div className="items-center gap-1.5 grid w-full">

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Titulo de la tarea</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="jhon@doe.com"
                                                className="bg-transparent py-0 resize-none"
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
                        <div className="items-center gap-1.5 grid w-full">
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
                                                    <SelectItem
                                                        
                                                        value="Gráficos de Redes Sociales"
                                                    >
                                                        Gráficos de Redes Sociales
                                                    </SelectItem>
                                                    <SelectItem
                                                        
                                                        value="Papelería, Infografías, Folletos"
                                                    >
                                                        Papelería, Infografías, Folletos
                                                    </SelectItem>
                                                    <SelectItem
                                                        
                                                        value="Fotos de Stock Ilimitadas"
                                                    >
                                                        Fotos de Stock Ilimitadas
                                                    </SelectItem>
                                                    <SelectItem  value="Papelería, Infografías, Folletos">

                                                        Papelería, Infografías, Folletos
                                                    </SelectItem>
                                                    <SelectItem  value="Presentaciones">

                                                        Presentaciones
                                                    </SelectItem>
                                                    <SelectItem  value="Reels y Motion Graphics">

                                                        Reels y Motion Graphics
                                                    </SelectItem>
                                                    <SelectItem  value="Branding & Logotipos">

                                                        Branding & Logotipos
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="items-center gap-1.5 grid w-full">

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Descripción</FormLabel>
                                        <FormDescription>
                                            Define los puntos más importantes para entender la tarea que estás solicitando. Las descripciones claras y
                                            detalladas ayudarán a nuestro equipo de diseño a crear mejores diseños y a entregarlos a tiempo.
                                        </FormDescription>
                                        <FormControl>
                                            <Textarea
                                                placeholder="*********"
                                                className="bg-transparent resize-none"
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
                        </div>

                        <div className="items-center gap-1.5 grid w-full">

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
                                                className="bg-transparent resize-none"
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
                        </div>

                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <LucidePersonStanding className="mr-2 w-4 h-4 animate-spin" />
                        )}
                        Enviar Solicitud
                    </Button>
                </div>
            </form>
        </Form>
    )
}
