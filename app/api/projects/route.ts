import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";
import { Project } from "@/app/portal/proyectos/components/ProjectCard";


//GET ALL PROJECTS
export const GET = async () => {
    const session: any = await getAuthSession();
    if (!session) {
        return NextResponse.redirect("/login");
    }
    const projects = await prisma.project.findMany({
        where: {
            userEmail: session.user.email,
        },
    });
    return NextResponse.json(projects);
}


//CREATE A NEW PROJECT
export const POST = async (req: NextRequest) => {
    const session: any = await getAuthSession()

    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }))
    }

    try {
        const body = await req.json()
        const post = await prisma.project.create({
            data: { ...body, userEmail: session.user.email },
        })

        return new NextResponse(JSON.stringify(post))
    } catch (err) {
        console.log(err)
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" })
        )
    }
}