import { Breadcrumb, BreadcrumbLink, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">

            <div className="flex items-center px-4">
                <Breadcrumb className="md:flex hidden">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="#">Portal</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="#">Proyectos</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {/* <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>All Products</BreadcrumbPage>
                        </BreadcrumbItem> */}
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2 ml-auto">
                    <Button size="sm">
                        <Link className="flex items-center gap-1" href="/portal/proyectos/new">
                            <PlusCircle className="w-4 aspect-square" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Agregar Proyecto
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>
            {children}
        </div >
    )
}
