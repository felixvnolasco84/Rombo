import { NextResponse } from "next/server";
import prisma from "@/utils/ConnectionPool";

//GET SINGLE REQUEST

export const GET = async (id: any) => {
  try {
    const post = await prisma.request.findUnique({
      where: { id: id },
      include: {
        brand: true,
        comments: true,
      },
    });

    return new NextResponse(JSON.stringify(post));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
