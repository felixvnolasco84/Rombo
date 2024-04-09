import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";


 
//GET SINGLE REQUEST

export const GET = async (id: string) => {
    const session = await getAuthSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }))
    }
    try {
        // const body = await req.json();
        const request = await prisma.request.findUnique({
            where: {
                id: id
            }
        });
        return new NextResponse(JSON.stringify(request))

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" })
        )
    }
}


