import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";

//EDIT A COMMENT

export const PUT = async (req: any, {params} : any) => {

  const id = params.id;
  const session: any = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }));
  }

  try {
    const body = await req.json();
    await prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        desc: body.desc,
        documents: body.documents,
      },
    });

    return NextResponse.json({ message: "Comment updated!" });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};

//DELETE A COMMENT

export const DELETE = async (req: any, { params }: any) => {
  const id = params.id;

  const session: any = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }));
  }

  try {
    const comment = await prisma.comment.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Comment deleted!" });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
