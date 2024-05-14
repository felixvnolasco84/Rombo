import { NextResponse } from "next/server";
import prisma from "@/utils/ConnectionPool";

// GET SINGLE BRAND
export const GET = async (id: any) => {
  try {
    const post = await prisma.brand.findFirst({
      where: { id: id },
      include: {
        user: true,
        requests: true,
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

// DELETE SINGLE BRAND
export const DELETE = async (req: any, { params }: any) => {
  const id = params.id;
  try {
    const brand = await prisma.brand.delete({
      where: { id },
      include: { user: true },
    });

    await prisma.notification.create({
      data: {
        type: "brand",
        message: `Marca eliminada: ${brand.title}`,
        brandId: id,
        userId: brand.user.id,
      },
    });

    return NextResponse.json({ message: "Brand deleted successfully" });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};

// UPDATE SINGLE BRAND
export const PUT = async (req: any, { params }: any) => {
  const id = params.id;
  const body: any = await req.json();

  try {
    await prisma.brand.update({
      where: { id: id },
      data: { ...body },
    });

    await prisma.notification.create({
      data: {
        type: "brand",
        message: `Marca actualizada: ${body.title}`,
        brandId: id,
        userId: body.userId,
      },
    });

    return NextResponse.json({ message: "Brand updated successfully" });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
