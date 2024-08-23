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
import { Doc } from "@/convex/_generated/dataModel";

export const notificationsColumns: ColumnDef<Doc<"notifications">>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const userId = row.original.userId;
      return (
        <div className="flex items-center gap-1">
          <span>{userId}</span>
        </div>
      );
    },
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
    accessorKey: "content",
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
      const content = row.original.content;

      return <span>{content}</span>;
    },
  },

  {
    accessorKey: "_creationTime",
    accessorFn: (value) =>
      new Date(value._creationTime).toLocaleDateString("es-Mx", {
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

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const request = row.original;
  //     const id =
  //       request.type === "request"
  //         ? request.requestId
  //         : request.type === "comment"
  //           ? request.requestId
  //           : request.brandId;

  //     let url = "";

  //     if (request.type === "request" && request.requestId) {
  //       url = `/portal/solicitudes/${id}`;
  //     } else if (request.type === "comment" && request.requestId) {
  //       url = `/portal/solicitudes/${id}`;
  //     } else if (request.type === "brand" && request.brandId) {
  //       url = `/portal/marcas/${id}`;
  //     } else {
  //       url = "";
  //     }

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Acciones</DropdownMenuLabel>
  //           {/* <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(request.title)}
  //           >
  //             Copiar nombre de la solicitud
  //           </DropdownMenuItem> */}
  //           <DropdownMenuSeparator />
  //           {url !== "" ? (
  //             <DropdownMenuItem>
  //               <Link href={url}>
  //                 {request.type === "request" && request.requestId
  //                   ? "Ver solicitud"
  //                   : request.type === "comment" && request.requestId
  //                     ? "Ver comentario"
  //                     : request.type === "brand" && request.brandId
  //                       ? "Ver marca"
  //                       : ""}
  //               </Link>
  //             </DropdownMenuItem>
  //           ) : (
  //             <DropdownMenuItem>
  //               No existen acciones disponibles
  //             </DropdownMenuItem>
  //           )}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
