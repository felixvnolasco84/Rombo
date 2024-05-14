import { NextResponse } from "next/server";
import prisma from "@/utils/ConnectionPool";

//REMOVE DOCUMENT FROM COMMENT

export const POST = async (req: any, { params }: any) => {
  try {
    const id = params.id;
    const body = await req.json();
    const response = await prisma.brand.update({
      where: {
        id: id,
      },
      data: {
        documents: {
          set: body.newDocuments,
        },
      },
    });

    await prisma.notification.create({
      data: {
        type: "brand",
        message: `Documentos actualizados en la marca ${response.title}`,
        brandId: response.id,
        userId: response.userEmail,
      },
    });
    return NextResponse.json({ message: "Document removed!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong!" });
  }
};
