import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";
import { sendEmailNotification } from "@/app/_actions";

//CREATE A COMMENT

export const POST = async (req: any) => {
  const session: any = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }));
  }
  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: {
        ...body,
        userEmail: session.user.email,
      },
      include: {
        request: true,
        user: true,
      },
    });

    const notification = await prisma.notification.create({
      data: {
        type: "comment",
        message: `Nuevo comentario en la solicitud ${comment.request.title}`,
        brandId: comment.request.brandId,
        requestId: comment.requestId,
        commentId: comment.id,
        userId: comment.user.id,
      },
    });

    const response = await sendEmailNotification(
      notification,
      "hola@rombo.design"
    );

    console.log(response);

    return new NextResponse(JSON.stringify({ message: "Comment created!" }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
