import { GET as getSingleRequest } from "@/app/api/requests/[id]/route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getAuthSession } from "@/utils/AuthOptions";
import { PersonStanding } from "lucide-react";
import CommentForm from "@/components/Forms/CommentForm";
import TipTapOnlyContent from "@/components/TipTapOnlyContent";
import DropdownMenuComponentRequest from "@/components/DropdownMenu/DropdownMenuComponentRequest";
import RenderDocuments from "@/components/Forms/components/renderDocuments";
import DropdownMenuComponentComment from "@/components/DropdownMenu/DropdownMenuComponentComment";
import DropdownMenuRequestStatus from "@/components/DropdownMenu/DropdownMenuRequestStatus";
import DropdownMenuRequestCategory from "@/components/DropdownMenu/DropdownMenuRequestCategory";
import DropdownMenuRequestPriority from "@/components/DropdownMenu/DropdownMenuRequestPriority";

export default async function page({ params }: { params: { id: string } }) {
  const session: any = await getAuthSession();

  const data = await getSingleRequest(params.id);
  const request = await data.json();

  if (!session) {
    return <div>Not Authenticated!</div>;
  }

  if (
    session.user.email !==
    (request.userEmail ||
      "felix@polygonag.com" ||
      "alba@polygonag.com" ||
      "rodrigo@polygonag.com")
  ) {
    return <div>Not Authorized!</div>;
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8 md:px-0">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{request.title}</h1>
        <DropdownMenuComponentRequest request={request} />
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-gray-600">Categoría</h3>
          <DropdownMenuRequestCategory
            id={request.id}
            category={request.category}
          />
        </div>
        <div className="">
          <h3 className="font-semibold text-gray-600">Prioridad</h3>
          <DropdownMenuRequestPriority
            priority={request.priority}
            id={request.id}
          />
          {/* <Badge variant={"outline"}>{request.priority}</Badge> */}
        </div>
        <div>
          <h3 className="font-semibold text-gray-600">Status</h3>
          <DropdownMenuRequestStatus id={request.id} status={request.status} />
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
        <div className="col-span-1">
          <h3 className="font-semibold text-gray-600">Marca</h3>
          <Link href={`/portal/marcas/${request.brand.id}`}>
            <Badge variant={"outline"}>{request.brand.title}</Badge>
          </Link>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="mb-2 text-base font-bold">Documentos Adjuntos</h2>
        <RenderDocuments documents={request.documents} />
      </div>
      <div className="my-4">
        <TipTapOnlyContent content={request.description} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comentarios</h2>
        <div className="space-y-4">
          {request.comments.length === 0 ? (
            <div className="flex flex-col items-center gap-4">
              <PersonStanding className="h-12 w-12" />
              <h3 className="text-xl font-bold">No tenemos comentarios</h3>
            </div>
          ) : (
            request.comments.map((comment: any, index: any) => (
              <div
                key={index}
                className="flex items-start space-x-4 rounded-md border p-4"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    alt="User avatar"
                    src="/placeholder-avatar.jpg"
                  />
                  <AvatarFallback>
                    {comment.userEmail.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-semibold">{comment.userEmail}</p>

                    {session.user.email === comment.userEmail && (
                      <DropdownMenuComponentComment comment={comment} />
                    )}
                  </div>

                  <TipTapOnlyContent content={comment.desc} />
                  {/* <p className="text-sm text-gray-600">{comment.desc}</p> */}
                  <RenderDocuments documents={comment.documents} />
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
