"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, LucidePersonStanding } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "../ui/textarea"

export default function RequestForm() {
    const FormSchema = z.object({
        title: z.string().min(1, { message: "Por favor ingresa un título" }),
        category: z
            .string()
            .min(1, { message: "Por favor ingresa una categoría" }),
        description: z.string().min(1, { message: "Por favor ingresa una descripción" }),
        attachments: z.string().min(1, { message: "Por favor ingresa una descripción" }),
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
                            <Label htmlFor="email">Titulo de la tarea</Label>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
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
                            <Label htmlFor="">Categoria</Label>
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormControl>
                                            <Input
                                                placeholder="*********"
                                                className="bg-transparent py-0 resize-none"
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

                        <div className="items-center gap-1.5 grid w-full">
                            <Label htmlFor="password">Descripcion</Label>
                            <FormDescription>
                                Define los puntos más importantes para entender la tarea que estás solicitando. Las descripciones claras y
                                detalladas ayudarán a nuestro equipo de diseño a crear mejores diseños y a entregarlos a tiempo.
                            </FormDescription>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormControl>
                                            <Textarea
                                                placeholder="*********"
                                                className="bg-transparent py-0 resize-none"
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
                            <Label htmlFor="password">Adjuntos</Label>
                            <FormDescription>
                                Arrastra o da click para subir los archivos que consideres que el diseñador necesita revisar o conocer para crear
                                tu diseño. Documentos como lista de precios, presentación corporativa, moodboards, o pantallazos con
                                referencias de estilo que viste y te gustaron.
                            </FormDescription>
                            <FormField
                                control={form.control}
                                name="attachments"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormControl>
                                            <Textarea
                                                placeholder="*********"
                                                className="bg-transparent py-0 resize-none"
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
                        Iniciar Sesión
                    </Button>
                </div>
            </form>
        </Form>
    )
}
