import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Button } from "./ui/button";
import { Activity } from "lucide-react";
import { ActivityItem } from "./ActivityItem";

export default function ActivitySheet({ entityId }: { entityId: Id<"brand"> }) {
  const activity = useQuery(api.auditLog.getByBrand, {
    brandId: entityId,
  });

  if (activity === undefined) {
    return <></>;
  }

  if (entityId === undefined) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"primary"} size={"icon"}>
          <Activity className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Actividad</SheetTitle>
          <SheetDescription>
            <ol className="mt-4 space-y-4">
              {activity.map((log) => (
                <ActivityItem key={log._id} item={log} />
              ))}
            </ol>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
