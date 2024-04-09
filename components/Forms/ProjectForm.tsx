"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { LucidePersonStanding } from "lucide-react"
import { FormLabel } from "../react-hook-form"
import { uploadFile } from "@/app/utils/uploadImage"

export default function ProjectForm() {
    const FormSchema = z.object({
        title: z.string().min(1, { message: "Por favor ingresa el nombre del proyecto" }),
        description: z.string().min(1, { message: "Por favor ingresa una descripción del proyecto" }),
        img: z.string().optional(),
    })

    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [cover, setCover] = useState<string>("")

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
          const image = await uploadFile(file)
          setCover(image)
        } else {
          setCover("")
        }
      }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            img: ""
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const jsonData = JSON.stringify(data)
            const response = await fetch("/api/projects", {
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
                title: "Oops!",
                description: "Al parecer hubo un error, intentelo más tarde",
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
                                        <FormLabel>Nombre del Proyecto</FormLabel>
                                        <FormDescription>Agregar el nombre de tu marca o organización</FormDescription>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter project name"
                                                className="bg-transparent py-0 resize-none"
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
                        <div className="items-center gap-1.5 grid w-full">
                            
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Descripción del Proyectos</FormLabel>
                                        <FormDescription>Define los puntos más importantes para entender la tarea que estás solicitando. Las descripciones claras y detalladas ayudarán a nuestro equipo de diseño a crear mejores diseños y a entregarlos a tiempo.</FormDescription>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter project description"
                                                className="bg-transparent py-0 resize-none"
                                                autoCapitalize="none"
                                                autoComplete="off"
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
                        Crear Proyecto
                    </Button>
                </div>
            </form>
        </Form>
    )
}