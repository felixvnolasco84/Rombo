import { NextResponse } from "next/server";
import prisma from "@/utils/ConnectionPool";

//REMOVE DOCUMENT FROM REQUEST

export const POST = async (req: any, { params }: any) => {
  try {
    const id = params.id;
    const body = await req.json();
    const response = await prisma.request.update({
      where: {
        id: id,
      },
      data: {
        documents: {
          set: body.newDocuments,
        },
      },
    });

    console.log(response);
    return NextResponse.json({ message: "Document removed!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong!" });
  }
};
