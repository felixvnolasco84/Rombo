import { GET as getSingleRequest } from "@/app/api/requests/[id]/route"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import TipTapEditor from "@/components/TipTap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
CommentForm
import Link from "next/link";
import { Menu, PersonStanding } from "lucide-react";
import CommentForm from "@/components/Forms/CommentForm";


export default async function page({ params }: { params: { id: string } }) {

    const data = await getSingleRequest(params.id);
    const request = await data.json();

    console.log(request)

    return (
      <section className="mx-auto w-full max-w-2xl px-4 py-8 md:px-0">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{request.title}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu className="h-6 w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link className="w-full" href={`#`}>
                <DropdownMenuItem>Editar</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <p
                // onClick={() => handleDeleteSinglePost(data.slug, router)}
                >
                  Eliminar
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-600">Categoría</h3>
            <Link href={`/portal/solicitudes?category=${request.category}`}>
              <Badge variant={"outline"}>{request.category}</Badge>
            </Link>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Creado Por</h3>
            <p>{request.userEmail}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Creado</h3>
            <p>
              {new Date(request.createdAt).toLocaleDateString("es-Mx", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Actualizado</h3>
            <p>
              {new Date(request.updatedAt).toLocaleDateString("es-Mx", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="col-span-2">
            <h3 className="font-semibold text-gray-600">Proyecto</h3>
            <Link href={`/portal/proyectos/${request.project.id}`}>
              <Badge variant={"outline"}>{request.project.title}</Badge>
            </Link>
          </div>
          <div className="">
            <h3 className="font-semibold text-gray-600">Prioridad</h3>
            {/* <Link href={`/portal/proyectos/${request.project.id}`}> */}
            <Badge variant={"outline"}>{request.priority}</Badge>
            {/* </Link> */}
          </div>
        </div>

        <div className="mb-4">
          <TipTapEditor
            isEditable={false}
            showToolbar={false}
            hasContent={true}
            postContent={request.description}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Comentarios</h2>
          <div className="space-y-2">
            {request.comments.length === 0 ? (
              <div className="flex flex-col items-center gap-4">
                <PersonStanding className="h-12 w-12" />
                <h3 className="text-xl font-bold">No tenemos comentarios</h3>
              </div>
            ) : (
              request.comments.map((comment: any, index: any) => (
                <div key={index} className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      alt="User avatar"
                      src="/placeholder-avatar.jpg"
                    />
                    <AvatarFallback>
                      {comment.userEmail.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{comment.userEmail}</p>
                    <p className="text-sm text-gray-600">{comment.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="space-y-4">
            <CommentForm requestId={request.id} />
          </div>
        </div>
      </section>
    );
}
