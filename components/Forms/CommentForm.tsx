
"use client"

import * as z from "zod"
import { toast } from "../ui/use-toast"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"


export default function CommentForm({ requestId }: { requestId: string }) {

    const FormSchema = z.object({
        comment: z.string().min(1, { message: "Por favor ingresa un comentario" }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            comment: "",
        },
    })
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const desc = data.comment
            const response = await fetch("/api/comments", {
                method: "POST",
                body: JSON.stringify({ desc, requestId }),
            })
            if (response.ok) {
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
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem className="mb-2">
                                <FormControl>
                                    <Textarea
                                        placeholder="Escribe tu comentario aquí."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Enviar Comentario
                    </Button>
                </form>
            </Form></>

    )
}
