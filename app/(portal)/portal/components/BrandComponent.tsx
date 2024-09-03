import Spinner from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Link from "next/link";

export function BrandComponent({ brandId }: { brandId: Id<"brand"> }) {
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
