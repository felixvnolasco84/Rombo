import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import DropdownMenuRequestCategory from "../DropdownMenu/DropdownMenuRequestCategory";
import DropdownMenuRequestPriority from "../DropdownMenu/DropdownMenuRequestPriority";
import DropdownMenuRequestStatus from "../DropdownMenu/DropdownMenuRequestStatus";
import { Badge } from "../ui/badge";

export default function KanbanCard({ request }: { request: any }) {
  return (
    <Card
      key={request.id}
      className="w-full overflow-hidden rounded-lg bg-white shadow-md"
    >
      <CardHeader className="border-b border-b-[#D1D1D1] px-4 pb-2 pt-4">
        <Link
          className="hover:underline"
          href={`/portal/solicitudes/${request.id}`}
        >
          <CardTitle className="] text-lg font-normal text-[#121415]">
            {request.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-y-2">
          <DropdownMenuRequestCategory
            id={request.id}
            category={request.category}
          />

          <Badge
            variant={"outline"}
            className="bg-[#F5F5F5] px-2.5 py-1 font-normal"
          >
            {request.brand.title}
          </Badge>
          <DropdownMenuRequestStatus id={request.id} status={request.status} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end px-3 pb-4 pt-0">
        <DropdownMenuRequestPriority
          priority={request.priority}
          id={request.id}
        />
      </CardFooter>
    </Card>
  );
}
