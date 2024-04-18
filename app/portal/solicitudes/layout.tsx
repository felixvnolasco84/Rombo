import { Breadcrumb, BreadcrumbLink, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
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
                                <Link href="#">Solicitudes</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm">
                        <Link className="flex items-center gap-1" href="/portal/solicitudes/new">
                            <PlusCircle className="aspect-square w-4" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Agregar Solicitud
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>
            {children}
        </div >
    )
}
