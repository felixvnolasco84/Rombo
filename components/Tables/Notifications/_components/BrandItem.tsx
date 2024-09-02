import Spinner from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

export default function BrandItem({ brandId }: { brandId: Id<"brand"> }) {
  const brand = useQuery(api.brands.getById, {
    brandId,
  });

  if (brand === undefined) {
    return <Spinner size={"icon"} />;
  }
  if (brand === null) {
    return <></>;
  }

  return (
    <Link
      href={`/portal/marcas/${brandId}`}
      className="flex items-center gap-x-1"
    >
      {brand.img && (
        <Image
          src={brand.img}
          alt={brand.title}
          width={24}
          height={24}
          className="aspect-square rounded-full object-cover"
        />
      )}
      <span>{brand.title}</span>
    </Link>
  );
}
