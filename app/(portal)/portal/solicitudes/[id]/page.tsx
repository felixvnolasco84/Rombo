"use client";


import { useUser, useAuth } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import CommentForm from "@/components/Forms/CommentForm";
import TipTapOnlyContent from "@/components/TipTapOnlyContent";
import DropdownMenuComponentRequest from "@/components/DropdownMenu/DropdownMenuComponentRequest";
import RenderDocuments from "@/components/Forms/components/renderDocuments";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import DropdownMenuRequestStatus from "@/components/DropdownMenu/DropdownMenuRequestStatus";
import DropdownMenuRequestCategory from "@/components/DropdownMenu/DropdownMenuRequestCategory";
import DropdownMenuRequestPriority from "@/components/DropdownMenu/DropdownMenuRequestPriority";
import CommentSection from "@/components/CommentSection";
import NotAutorizedComponent from "@/components/NotAutorizedComponent";
import TimeAgoDate from "@/components/TimeAgoDate";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { adminList } from "@/lib/utils";
import ApproveRequestButton from "@/components/Buttons/ApproveRequestButton";
import { Id } from "@/convex/_generated/dataModel";
import Spinner from "@/components/spinner";
import Image from "next/image";

function BrandComponent({ brandId }: { brandId: Id<"brand"> }) {

  const brand = useQuery(api.brands.getById, { brandId });

  if (brand === undefined) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <Link className="w-full" href={`/portal/marcas/${brand?._id}`}>
      <Badge className="w-full px-2.5 py-1.5 text-xs" variant={"primary"}>
        {brand?.title}
      </Badge>
    </Link>
  );
}

export default function Page({ params }: { params: { id: Id<"requests"> } }) {
  const { user } = useUser();

  const request = useQuery(api.requests.getById, { requestId: params.id });

  if (request === undefined) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (request === null) {
    return <div>404</div>;
  }

  // if (request.userId !== user?.id) {
  //   return <NotAutorizedComponent />;
  // }

  return (
    <section className="flex w-full flex-col gap-8">
      <div className="flex items-center">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/portal">Portal</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/portal/solicitudes">Solicitudes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{request.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl bg-[#F2F2F2] p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-[#121415]">{request.title}</h1>
          <DropdownMenuComponentRequest request={request} />
        </div>
        <div className="flex items-center gap-8 text-sm">
          <div className="flex items-center gap-1">
            <h3 className="text-[#121415]">Fecha Solicitud:</h3>
            <p className="text-[#6d6d6d]">
              {new Date(request._creationTime).toLocaleDateString("es-Mx", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[#121415]">Creado Por:</p>
            <div className="flex items-center gap-x-1">
              <Image
                src={user?.imageUrl || ""}
                width={24}
                height={24}
                alt="user profile"
                className="aspect-square rounded-full"
              />
              <p className="">{user?.fullName}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex w-1/2 flex-col gap-2">
          <Badge
            className="w-full bg-[#F5F5F5] px-2.5 py-1.5 font-normal"
            variant={"outline"}
          >
            {request.category}
          </Badge>
          {/* {adminList.includes(session.user.email) ? ( */}
          {false ? (
            <DropdownMenuRequestStatus
              id={request?._id}
              status={request?.status}
            />
          ) : (
            <Badge
              className={`${
                request.status === "To Do"
                  ? "bg-green-100 text-green-800"
                  : request.status === "in progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : request.status === "to-test"
                      ? "bg-blue-100 text-blue-800"
                      : request.status === "complete"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
              }  w-full text-xs  px-2.5 py-1.5 `}
              variant={"requestStatus"}
            >
              {request.status === "To Do"
                ? "To Do"
                : request.status === "in progress"
                  ? "In Progress"
                  : request.status === "to-test"
                    ? "To Test"
                    : "Done"}
            </Badge>
          )}
          <BrandComponent brandId={request.brandId} />
        </div>

        <div className="flex w-1/2 flex-col items-end gap-4">
          <DropdownMenuRequestPriority
            priority={request.priority || ""}
            id={request._id}
          />
          <p className="text-sm text-[#0062FF]">
            <TimeAgoDate date={request.deadline || ""} />
          </p>
        </div>
      </div>

      {request.status == "IN REVIEW" && (
        <ApproveRequestButton request={request} />
      )}

      {request.description ? (
        <TipTapOnlyContent content={request.description} />
      ) : (
        <p className="text-sm text-gray-500">No existe una descripción.</p>
      )}

      {/* <div className="flex flex-col gap-1">
        <Accordion
          defaultValue={request.documents.length === 0 ? "" : "documents"}
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value="documents">
            <AccordionTrigger>
              <h2 className="mb-4 text-2xl text-[#121415]">
                Documentos Adjuntos
              </h2>
            </AccordionTrigger>
            <AccordionContent>
              {request.documents && request.documents.length > 0 ? (
                <RenderDocuments documents={request.documents} />
              ) : (
                <p className="text-sm text-gray-500">
                  No hay documentos adjuntos.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Accordion
        defaultValue={request.comments.length === 0 ? "" : "comments"}
        type="single"
        collapsible
        className="w-full"
      >
        <AccordionItem value="comments">
          <AccordionTrigger>
            <h2 className="mb-4 text-2xl text-[#121415]">Comentarios</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-4">
                {request.comments.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No existen comentarios.
                  </p>
                ) : (
                  <CommentSection
                    userEmail={sessionEmail}
                    comments={request.comments}
                  />
                )}
              </div>

              <div className="space-y-4">
                <CommentForm requestId={request.id} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
    </section>
  );
}
