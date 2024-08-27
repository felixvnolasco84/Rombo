import { Doc } from "@/convex/_generated/dataModel";

export const generateLogMessage = (log: Doc<"AuditLog">) => {
  const { entityTitle, entityType, action } = log;

  switch (action) {
    case "CREATE":
      return `created ${entityType.toLowerCase()} "${entityTitle}"`;
    case "UPDATE":
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case "DELETE":
      return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    case "ARCHIVE":
      return `archived ${entityType.toLowerCase()} "${entityTitle}"`;
    case "RESTORE":
      return `restored ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};
