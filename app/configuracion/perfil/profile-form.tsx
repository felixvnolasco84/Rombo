import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "El nombre de usuario debe de ser de almenos 2 caracteres.",
    })
    .max(30, {
      message: "El nombre de usuario no debe de ser mayor a 30 carácteres.",
    }),
  email: z
    .string({
      required_error: "Es necesario un correo electronico.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Por favor ingrese una URL válida." }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "Solo un tipo común.",
  urls: [
    { value: "#" },
    { value: "#" },
  ],
}

export function ProfileForm({
  name,
  email,
  profilePicture,
}: {
  name: any
  email: any
  profilePicture: any
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Has enviado los siguientes valores:",
      description: (
        <pre className="bg-slate-950 mt-2 p-4 rounded-md w-[340px]">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Avatar className="w-9 h-9">
          <AvatarImage src={profilePicture} alt="@shadcn" />
          <AvatarFallback>EX</AvatarFallback>
        </Avatar>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de Usuario</FormLabel>
              <FormControl>
                <Input placeholder={name} {...field} />
              </FormControl>
              <FormDescription>
                Este es su nombre para mostrar público. Puede ser tu nombre real
                o un seudónimo. Solo puede cambiar esto una vez cada 30 días.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder={email} {...field} />
              </FormControl>
              <FormDescription>
                Puede administrar direcciones de correo electrónico verificadas
                en la{" "}
                <Link href="/examples/forms">
                  configuración de correo electrónico
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Actualizar Perfil</Button>
      </form>
    </Form>
  )
}
