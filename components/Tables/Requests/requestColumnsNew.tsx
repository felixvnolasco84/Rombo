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

export const requestColumnsNew: ColumnDef<Doc<"requests">>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tarea
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.original.title;
      return (
        <Link
          className="hover:underline"
          href={`/portal/solicitudes/${row.original._id}`}
        >
          <span>{title.length < 40 ? title : title.slice(0, 40) + "..."}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "category",
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
      const category = row.original.category;
      return (
        <Badge
          variant={"outline"}
          className="w-full justify-center bg-[#F5F5F5] text-xs font-medium"
        >
          {
            // truncate category if it's too long
            category.length < 16 ? category : category.slice(0, 16) + "..."
          }
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
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
      const status = row.original.status;
      return (
        <Badge
          variant={"outline"}
          className={`${
            status === "TO DO"
              ? "bg-[#C0D5F7]"
              : status === "IN PROGRESS"
                ? "bg-[#FBDFC7]"
                : status === "IN REVIEW"
                  ? "bg-[#FCDBF9]"
                  : status === "DONE"
                    ? "bg-[#DFFCAD]"
                    : "bg-red-100 text-red-800"
          } w-full text-xs font-normal text-[#121415] justify-center leading-none`}
        >
          {status}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "priority",
  //   accessorFn: (value) =>
  //     value.priority.charAt(0).toUpperCase() + value.priority.slice(1),
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Prioridad
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const priority = row.original.priority;
  //     return (
  //       <Badge
  //         variant={"outline"}
  //         className={`text-xs font-medium w-full justify-center ${
  //           priority === "LOW"
  //             ? "bg-[#EAFFF7] text-[#44C195]"
  //             : priority === "MEDIUM"
  //             ? "bg-[#FEF6E7] text-[#FF9B57]"
  //             : "bg-[#FDE7E7] text-[#F67376]"
  //         }`}
  //       >
  //         {priority === "LOW"
  //           ? "LOW"
  //           : priority === "MEDIUM"
  //           ? "MEDIUM"
  //           : priority === "HIGH"
  //           ? "HIGH"
  //           : "CRITICAL"}
  //       </Badge>
  //     );
  //   },
  // },
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
  //   accessorKey: "updatedAt",
  //   accessorFn: (value) =>
  //     new Date(value.updatedAt).toLocaleDateString("es-Mx", {
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "numeric",
  //     }),
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Actualizado
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;
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
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/portal/solicitudes/${request._id}`}>
                Ver detalles
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
