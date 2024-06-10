"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/utils";

export const notificationsColumns: ColumnDef<any>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value: any) =>
  //         table.toggleAllPageRowsSelected(!!value)
  //       }
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value: any) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "message",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mensaje
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const message = row.original.message;
      const name = row.original.user.name;

      const textBeforeColon = message.split(":")[0];
      return (
        <div className="flex items-center gap-1">
          {/* truncate text if its too long */}
          <span className="text-black/50">
            {textBeforeColon.length > 40
              ? textBeforeColon.slice(0, 40)
              : textBeforeColon}{" "}
            por{" "}
          </span>
          <span>{name}</span>
        </div>
      );
    }
  },
    // {
    //   accessorKey: "type",
    //   accessorFn: (value) =>
    //     value.type.charAt(0).toUpperCase() + value.type.slice(1),
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Tipo
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => {
    //     const type = row.original.type;
    //     return (
    //       <Badge
    //         variant={"outline"}
    //         className={`text-xs font-medium ${
    //           type === "comment"
    //             ? "bg-green-100 text-green-800"
    //             : type === "request"
    //             ? "bg-yellow-100 text-blue-800"
    //             : "bg-red-100 text-purple-800"
    //         }`}
    //       >
    //         {type}
    //       </Badge>
    //     );
    //   },
    // },
  {
    accessorKey: "request.category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Solicitud
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const request = row.original.request;
      return (
        <>
          <Link
            href={request !== null ? `/portal/solicitudes/${request.id}` : "#"}
          >
            <Badge
              className="w-full justify-center bg-[#F3F3F3] font-normal leading-none text-[#121415]"
              variant={"outline"}
            >
              {request !== null ? request.category : <>Sin solicitud</>}
            </Badge>
          </Link>
        </>
      );
    },
  },
  {
    accessorKey: "request.status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status:any = row.getValue("request_status");
      if (!status) {
        return (
          <Badge
            variant={"outline"}
            className="w-full justify-center bg-[#F3F3F3] px-2.5 py-1 text-xs font-normal text-[#121415]"
          >
            Sin Estado
          </Badge>
        );
      }
      const color = getStatusColor(status);
      return (
        <Badge
          variant={"requestStatus"}
          className={`${
            status === "To Do"
              ? "bg-[#C0D5F7]"
              : status === "in progress"
              ? "bg-[#FBDFC7]"
              : status === "to-test"
              ? "bg-[#FCDBF9]"
              : status === "complete"
              ? "bg-[#DFFCAD]"
              : "bg-red-100 text-red-800"
          } w-full text-xs font-normal text-[#121415] justify-center leading-none px-2.5 py-1`}
        >
          {status === "To Do"
            ? "To Do"
            : status === "in progress"
            ? "In Progress"
            : status === "to-test"
            ? "To Test"
            : "Done"}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "brand.title",
  //   accessorFn: (value) => (
  //     // <Link href={`/portal/marcas/${value.brand.title}`}>
  //     // console.log(value.brand.title)
  //     <Badge>{value.brand.title}</Badge>
  //     // </Link>
  //   ),
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Marca
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const brand = row.original.brand;
  //     return (
  //       <>
  //         {brand !== null ? (
  //           <Link href={`/portal/marcas/${brand.id}`}>
  //             <Badge variant={"outline"}>{brand.title}</Badge>
  //           </Link>
  //         ) : (
  //           <Badge variant={"outline"}>Sin marca</Badge>
  //         )}
  //       </>
  //     );
  //   },
  // },

  // {
  //   accessorKey: "user.name",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Usuario
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "createdAt",
    accessorFn: (value) =>
      new Date(value.createdAt).toLocaleDateString("es-Mx", {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      }),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;
      const id =
        request.type === "request"
          ? request.requestId
          : request.type === "comment"
          ? request.requestId
          : request.brandId;

      let url = "";

      if (request.type === "request" && request.requestId) {
        url = `/portal/solicitudes/${id}`;
      } else if (request.type === "comment" && request.requestId) {
        url = `/portal/solicitudes/${id}`;
      } else if (request.type === "brand" && request.brandId) {
        url = `/portal/marcas/${id}`;
      } else {
        url = "";
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(request.title)}
            >
              Copiar nombre de la solicitud
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            {url !== "" ? (
              <DropdownMenuItem>
                <Link href={url}>
                  {request.type === "request" && request.requestId
                    ? "Ver solicitud"
                    : request.type === "comment" && request.requestId
                    ? "Ver comentario"
                    : request.type === "brand" && request.brandId
                    ? "Ver marca"
                    : ""}
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                No existen acciones disponibles
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
