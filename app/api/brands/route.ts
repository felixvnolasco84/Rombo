import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";

//GET ALL BRANDS
export const GET = async () => {
  const session: any = await getAuthSession();
  if (!session) {
    return NextResponse.redirect("/login");
  }
  const brands = await prisma.brand.findMany({
    where: {
      userEmail: session.user.email,
    },
  });
  return NextResponse.json(brands);
};

//CREATE A NEW PROJECT
export const POST = async (req: NextRequest) => {
  const session: any = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }));
  }

  try {
    const body = await req.json();
    const brand = await prisma.brand.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(brand));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
