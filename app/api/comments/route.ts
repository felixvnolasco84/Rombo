import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";

//CREATE A COMMENT

export const POST = async (req: any) => {
  const session: any = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }));
  }

  try {
    const body = await req.json();
    await prisma.comment.create({
      data: {
        ...body,
        userEmail: session.user.email,
      },
    });

    return new NextResponse(JSON.stringify({ message: "Comment created!" }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
