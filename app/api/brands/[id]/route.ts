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
export const DELETE = async (id: any) => {
  try {
    const brand = await prisma.brand.delete({ where: { id } });
    return new NextResponse(JSON.stringify(brand));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};

// UPDATE SINGLE BRAND
export const PUT = async (req: any, id: any) => {
  const body: any = await req.json();
  const { title } = body;

  try {
    const brand = await prisma.brand.update({
      where: { id: id },
      data: { title: title },
    });

    return new NextResponse(JSON.stringify(brand));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
