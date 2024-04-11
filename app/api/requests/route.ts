import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";


//GET ALL REQUESTS

export const GET = async () => {
    const session: any = await getAuthSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }))
    }
    try {
        // const body = await req.json();
        const requests = await prisma.request.findMany(
            {
                where: {
                    userEmail: session.user.email
                },
                include: {
                    project: true,                    
                }

            }
        );
        return new NextResponse(JSON.stringify(requests))

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" })
        )
    }
}

//CREATE REQUEST
export const POST = async (req: any) => {
    const session: any = await getAuthSession();

    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }))
    }
    try {
        const body = await req.json();
        console.log(body)
        const request = await prisma.request.create({
            data: {
                ...body,
                userEmail: session.user.email
            }
        });
        return new NextResponse(JSON.stringify(request))
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" })
        )
    }
}

