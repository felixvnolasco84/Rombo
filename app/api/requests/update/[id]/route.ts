import { NextResponse } from "next/server";
import prisma from "@/utils/ConnectionPool";
import { sendEmailNotification } from "@/app/_actions";

//REMOVE DOCUMENT FROM REQUEST

export const POST = async (req: any, { params }: any) => {
  try {
    const id = params.id;
    const body = await req.json();

    const request = await prisma.request.update({
      where: {
        id: id,
      },
      data: {
        documents: {
          set: body.newDocuments,
        },
      },
      include: {
        brand: true,
      },
    });

    const user = await prisma.user.findUnique({
      where: { email: request.userEmail },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found!" });
    }

    const notification = await prisma.notification.create({
      data: {
        type: "request",
        message: `Se han eliminado algun(os) documento(s) en la solicitud ${request.title}`,
        brandId: request.brandId,
        requestId: id,
        userId: user.id,
      },
    });

    await sendEmailNotification(notification, "hola@rombo.design");

    return NextResponse.json({ message: "Document removed!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong!" });
  }
};
