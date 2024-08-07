import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";
import { sendEmailNotification } from "@/app/_actions";

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

//CREATE A NEW BRAND
export const POST = async (req: NextRequest) => {
  const session: any = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }));
  }

  try {
    const body = await req.json();

    const brand = await prisma.brand.create({
      data: { ...body, userEmail: session.user.email },
      include: {
        user: true,
      },
    });

    const board = await prisma.board.create({
      data: {
        brandId: brand.id,
      },
    });

    await prisma.$transaction([
      prisma.list.create({
        data: {
          title: "To Do",
          boardId: board.id,
          order: 1,
        },
      }),
      prisma.list.create({
        data: {
          title: "En Progreso",
          boardId: board.id,
          order: 2,
        },
      }),
      prisma.list.create({
        data: {
          title: "Revisión",
          boardId: board.id,
          order: 3,
        },
      }),
      prisma.list.create({
        data: {
          title: "Completado",
          boardId: board.id,
          order: 4,
        },
      }),
    ]);

    const notification = await prisma.notification.create({
      data: {
        type: "brand",
        message: `Nueva marca creada: ${brand.title}`,
        brandId: brand.id,
        userId: brand.user.id,
      },
    });

    await sendEmailNotification(notification, "hola@rombo.design");

    return new NextResponse(JSON.stringify(brand));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
