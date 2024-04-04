import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, LucidePersonStanding } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function LoginFormComponent() {
    const FormSchema = z.object({
        email: z.string().email({ message: "Correo electrónico Inválido" }),
        password: z
            .string()
            .min(1, { message: "Por favor ingresa una contraseña" }),
    })

    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
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
                        <div className="items-center gap-1.5 grid w-full max-w-sm">
                            <Label htmlFor="email">Correo Electronico</Label>
                            <FormField
                                control={form.control}
                                name="email"
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
                        <div className="items-center gap-1.5 grid w-full max-w-sm">
                            <Label htmlFor="password">Contraseña</Label>
                            <FormField
                                control={form.control}
                                name="password"
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
