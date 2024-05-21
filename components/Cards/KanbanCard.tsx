import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DropdownMenuRequestCategory from "../DropdownMenu/DropdownMenuRequestCategory";
import DropdownMenuRequestPriority from "../DropdownMenu/DropdownMenuRequestPriority";
import DropdownMenuRequestStatus from "../DropdownMenu/DropdownMenuRequestStatus";

export default function KanbanCard({ request }: { request: any }) {
  return (
    <Card
      key={request.id}
      className="w-[270px] overflow-hidden rounded-lg bg-white shadow-md"
    >
      <CardHeader className="bg-gray-100 p-4">
        <Link
          className="hover:underline"
          href={`/portal/solicitudes/${request.id}`}
        >
          <CardTitle className="text-lg font-semibold text-gray-800">
            {request.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Categoría</div>
            <DropdownMenuRequestCategory
              id={request.id}
              category={request.category}
            />

            {/* <div className="font-medium text-gray-800">{request.category}</div> */}
          </div>
          <div>
            <div className="text-sm text-gray-600">Prioridad</div>
            <DropdownMenuRequestPriority
              priority={request.priority}
              id={request.id}
            />
            {/* <Badge className="text-xs" variant="secondary">
              {request.priority}
            </Badge> */}
          </div>
          <div>
            <div className="text-sm text-gray-600">Status</div>
            <DropdownMenuRequestStatus
              id={request.id}
              status={request.status}
            />
          </div>
          <div>
            <div className="text-sm text-gray-600">Marca</div>
            <div className="text-sm font-medium text-gray-800">
              {request.brand.title}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
