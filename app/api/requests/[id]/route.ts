import { NextResponse } from "next/server";
import prisma from "@/utils/ConnectionPool";
import { sendEmailNotification } from "@/app/_actions";
import { revalidatePath } from "next/cache";

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

    console.log(body)
    
    const request = await prisma.request.update({
      where: { id: id },
      data: {
        ...body,
      },
      include: {
        brand: {
          include: {
            Board: true
          }
        },
      },
    });

    const ListIds = await prisma.list.findMany({
      where: { boardId: request.brand.Board[0].id},
      select: { id: true, title: true },
    });

    const user = await prisma.user.findUnique({
      where: { email: request.userEmail },
      select: { id: true },
    });

    const notification = await prisma.notification.create({
      data: {
        type: "request",
        message: `Solicitud actualizada: ${request.title}	`,
        brandId: request.brandId,
        requestId: id,
        userId: user!.id,
      },
      include: {
        request: true,
      },
    });

    await sendEmailNotification(notification, "hola@rombo.design");
    revalidatePath(`/portal/solicitudes/${id}`);
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

  const request = await prisma.request.findUnique({
    where: { id: id },
    select: { title: true, userEmail: true, brandId: true },
  });

  if (!request) {
    throw new Error("Request not found");
  }

  const user = await prisma.user.findUnique({
    where: { email: request.userEmail },
    select: { id: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    await prisma.$transaction([
      // prisma.notification.deleteMany({
      //   where: { requestId: id },
      // }),
      prisma.request.delete({
        where: { id: id },
      }),
      prisma.notification.create({
        data: {
          type: "request",
          message: `Solicitud eliminada: ${request.title}`,
          brandId: request.brandId,
          userId: user.id,
        },
      }),
    ]);

    return NextResponse.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
