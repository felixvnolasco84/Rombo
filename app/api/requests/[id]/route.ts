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

//DELETE REQUEST

export const DELETE = async (id: any) => {
  try {
    const post = await prisma.request.delete({
      where: { id: id },
    });

    return new NextResponse(JSON.stringify(post));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};

//UPDATE REQUEST
export const PUT = async (req: any, { params }: any) => {
  try {
    const body = await req.json();
    const id = params.id;

    const post = await prisma.request.update({
      where: { id: id },
      data: {
        ...body,
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
