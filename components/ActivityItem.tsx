import { format } from "date-fns";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Doc } from "@/convex/_generated/dataModel";
import { generateLogMessage } from "@/lib/generate-log-message";

interface ActivityItemProps {
  item: Doc<"AuditLog">;
}

export const ActivityItem = ({ item }: ActivityItemProps) => {
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
};
