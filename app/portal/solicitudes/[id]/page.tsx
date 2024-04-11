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
        <section className="mx-auto px-4 md:px-0 py-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-3xl">{request.title}</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Menu className="w-6 h-6" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link className="w-full" href={`#`}>
                            <DropdownMenuItem>
                                Editar
                            </DropdownMenuItem>
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

            <div className="gap-4 grid grid-cols-2 mb-8">
                <div>
                    <h3 className="font-semibold text-gray-600">Category</h3>
                    <Link href={`/portal/solicitudes?category=${request.category}`}>
                        <Badge variant={"outline"}>{request.category}</Badge>
                    </Link>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-600">Created By</h3>
                    <p>{request.userEmail}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-600">Created At</h3>
                    <p>{new Date(request.createdAt).toLocaleDateString("es-Mx", {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-600">Updated At</h3>
                    <p>{new Date(request.updatedAt).toLocaleDateString("es-Mx", {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</p>
                </div>
                <div className="col-span-2">
                    <h3 className="font-semibold text-gray-600">Project</h3>
                    <Link href={`/portal/proyectos/${request.project.id}`}>
                        <Badge variant={"outline"}>{request.project.title}</Badge>
                    </Link>
                </div>
            </div>

            <div className="mb-4">
                <TipTapEditor isEditable={false} showToolbar={false} hasContent={true} postContent={request.description} />
            </div>

            <div className="space-y-4">
                <h2 className="font-bold text-2xl">Comentarios</h2>
                <div className="space-y-2">
                    {
                        request.comments.length === 0 ? (
                            <div className="flex flex-col items-center gap-4">
                                <PersonStanding className="w-12 h-12" />
                                <h3 className="font-bold text-xl">No tenemos comentarios</h3>
                            </div>
                        ) : (
                            request.comments.map((comment: any, index: any) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage alt="User avatar" src="/placeholder-avatar.jpg" />
                                        <AvatarFallback>{comment.userEmail.slice(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{comment.userEmail}</p>
                                        <p className="text-gray-600 text-sm">{comment.desc}</p>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
                <div className="space-y-4">
                    <CommentForm requestId={request.id} />
                </div>
            </div>
        </section>
    )
}
