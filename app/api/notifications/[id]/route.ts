import { NextResponse } from "next/server";
import prisma from "@/utils/ConnectionPool";

//GET A SINGLE NOTIFICATION
export const GET = async (req: any, { params }: any) => {
  const id = params.id;

  const markRead = req.markRead === "true";

  try {
    const notification = await prisma.notification.findUnique({
      where: {
        id: id,
      },
    });

    if (markRead) {
      await prisma.notification.update({
        where: {
          id: id,
        },
        data: {
          read: true,
        },
      });
    }

    return new NextResponse(JSON.stringify(notification));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
