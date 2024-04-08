import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";


//GET ALL REQUESTS

export const GET = async () => {
    const session = await getAuthSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }))
    }

    try {
        // const body = await req.json();
        const requests = await prisma.request.findMany();
        return new NextResponse(JSON.stringify(requests))

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" })
        )
    }
}