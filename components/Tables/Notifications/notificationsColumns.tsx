"use client";

import Link from "next/link";
import { format } from "date-fns";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatars } from "@/components/AvatarComponent";
import BrandItem from "./_components/BrandItem";

export const notificationsColumns: ColumnDef<Doc<"AuditLog">>[] = [
  {
    accessorKey: "entityTitle",
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
      const item = row.original;
      return (
        <li className="flex items-center gap-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.userImage} />
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold lowercase text-neutral-700">
                {item.userName}
              </span>{" "}
              {generateLogMessage(item)}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(item._creationTime), "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </li>
      );
    },
  },

  {
    accessorKey: "brandId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Marca
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const brandId = row.original.brandId;
      return <BrandItem brandId={brandId} />;
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
  // {
  //   accessorKey: "content",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Status
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const content = row.original.content;

  //     return <span>{content}</span>;
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

  {
    id: "actions",
    cell: ({ row }) => {
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
            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
