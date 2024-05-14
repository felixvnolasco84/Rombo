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

//UPDATE REQUEST
export const PUT = async (req: any, { params }: any) => {
  try {
    const body = await req.json();
    const id = params.id;

    const request = await prisma.request.update({
      where: { id: id },
      data: {
        ...body,
      },
      include: {
        brand: true,
      },
    });

    const user = await prisma.user.findUnique({
      where: { email: request.userEmail },
      select: { id: true },
    });

    await prisma.notification.create({
      data: {
        type: "request",
        message: `Solicitud actualizada: ${request.title}	`,
        brandId: request.brandId,
        requestId: id,
        userId: user!.id,
      },
    });

    return NextResponse.json({ message: "Request updated successfully" });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};

//DELETE REQUEST

export const DELETE = async (req: any, { params }: any) => {
  const id = params.id;

  try {
    await prisma.$transaction([
      prisma.notification.deleteMany({
        where: { requestId: id },
      }),
      prisma.request.delete({
        where: { id: id },
      }),
    ]);

    // const user = await prisma.user.findUnique({
    //   where: { email: request.userEmail },
    //   select: { id: true },
    // });

    // await prisma.notification.create({
    //   data: {
    //     type: "request",
    //     message: `Solicitud eliminada: ${request.title}`,
    //     brandId: request.brandId,
    //     requestId: id,
    //     userId: user!.id,
    //   },
    // });

    return NextResponse.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
