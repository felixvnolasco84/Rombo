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

// UPDATE SINGLE BRAND
export const PUT = async (req: any, { params }: any) => {
  const id = params.id;
  const body: any = await req.json();

  try {
    const brand = await prisma.brand.findUnique({
      where: { id: id },
    });

    if (!brand) {
      throw new Error("Brand not found");
    }

    const [updatedBrand, user] = await prisma.$transaction([
      prisma.brand.update({
        where: { id: id },
        data: { ...body },
      }),
      prisma.user.findUnique({
        where: { email: brand.userEmail },
        select: { id: true },
      }),
    ]);

    await prisma.notification.create({
      data: {
        type: "brand",
        message: `Marca actualizada: ${updatedBrand.title}`,
        brandId: id,
        userId: user!.id,
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

// DELETE SINGLE BRAND
export const DELETE = async (req: any, { params }: any) => {
  const id = params.id;
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: id },
    });

    if (!brand) {
      throw new Error("Brand not found");
    }

    const title = brand.title;
    const user = await prisma.user.findUnique({
      where: { email: brand.userEmail },
    });

    await prisma.$transaction([
      // prisma.notification.deleteMany({ where: { brandId: id } }),
      prisma.brand.delete({ where: { id: id } }),
      prisma.notification.create({
        data: {
          type: "brand",
          message: `Marca eliminada: ${title}`,
          userId: user!.id,
        },
      }),
    ]);

    return NextResponse.json({ message: "Brand deleted successfully" });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
