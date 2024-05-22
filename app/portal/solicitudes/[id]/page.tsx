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
import { Separator } from "@/components/ui/separator";

export default async function page({ params }: { params: { id: string } }) {
  const session: any = await getAuthSession();

  const data = await getSingleRequest(params.id);
  const request = await data.json();

  if (!session) {
    return <div>Not Authenticated!</div>;
  }

  const sessionEmail = session.user.email;
  const ownerEmail = request.userEmail;

  const userList = [
    "felix@polygonag.com",
    "alba@polygonag.com",
    "rodrigo@polygonag.com",
    "hola@rombo.design",
    ownerEmail,
  ];

  if (!userList.includes(sessionEmail)) {
    return <div>Not Authorized!</div>;
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-8 md:px-0">
      <div className="flex flex-col gap-2 rounded-2xl bg-[#F2F2F2] p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-[#121415]">{request.title}</h1>
          <DropdownMenuComponentRequest request={request} />
        </div>
        <div className="flex items-center gap-8 text-sm">
          <div className="flex items-center gap-1">
            <h3 className="text-[#121415]">Fecha Solicitud:</h3>
            <p className="text-[#6d6d6d]">
              {new Date(request.createdAt).toLocaleDateString("es-Mx", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[#121415]">Creado Por:</p>
            <p className="text-[#6d6d6d]">{request.userEmail}</p>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex w-1/2 flex-col gap-2">
          <DropdownMenuRequestCategory
            id={request.id}
            category={request.category}
          />

          <DropdownMenuRequestStatus id={request.id} status={request.status} />
          <Link className="w-full" href={`/portal/marcas/${request.brand.id}`}>
            <Badge className="w-full text-xs px-2.5 py-1" variant={"primary"}>
              {request.brand.title}
            </Badge>
          </Link>
        </div>

        <div className="flex w-1/2 flex-col items-end gap-4">
          <DropdownMenuRequestPriority
            priority={request.priority}
            id={request.id}
          />
          <p className="text-sm text-[#0062FF]">Lorem, ipsum dolor.</p>
        </div>
      </div>

      {/* <div className="mb-8 grid grid-cols-2 gap-4">
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
      </div> */}
      <TipTapOnlyContent content={request.description} />

      {request.documents && request.documents.length > 0 && (
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl text-[#121415]">Documentos Adjuntos</h2>
          <Separator className="mb-4" />
          <RenderDocuments documents={request.documents} />
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl text-[#121415]">Comentarios</h2>
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
