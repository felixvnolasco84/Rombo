import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center px-4">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Portal</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Marcas</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {/* <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>All Products</BreadcrumbPage>
                        </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </div>
  );
}