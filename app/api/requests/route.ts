import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";
import { now } from "next-auth/client/_utils";

//GET ALL REQUESTS
export const GET = async () => {
  const session: any = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }));
  }

  if (
    session.user.email == "felix@polygonag.com" ||
    session.user.email == "rodrigo@polygonag.com" ||
    session.user.email == "alba@polygonag.com" ||
    session.user.email == "hola@rombo.design"
  ) {
    try {
      const requests = await prisma.request.findMany({
        include: {
          brand: true,
        },
      });
      return new NextResponse(JSON.stringify(requests));
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  } else {
    try {
      const requests = await prisma.request.findMany({
        where: {
          userEmail: session.user.email,
        },
        include: {
          brand: true,
        },
      });
      return new NextResponse(JSON.stringify(requests));
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" })
      );
    }
  }
};

//CREATE REQUEST
export const POST = async (req: any) => {
  const session: any = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }));
  }
  try {
    const body = await req.json();

    if (!body) {
      return new NextResponse(JSON.stringify({ message: "Body is required!" }));
    }

    const { category } = body;

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category is required!" })
      );
    }

    switch (category) {
      case "Gráficos de Redes Sociales":
        body.deadline = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1);
        break;
      case "Papelería, Infografías, Folletos":
        body.deadline = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1);
        break;
      case "Fotos de Stock Ilimitadas":
        body.deadline = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1);
        break;
      case "Presentaciones":
        body.deadline = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
        break;
      case "Reels y Motion Graphics":
        body.deadline = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
        break;
      case "Branding & Logotipos":
        body.deadline = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);
        break;
      case "Ilustraciones":
        body.deadline = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
        break;
      case "Páginas Web":
        body.deadline = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);
        break;
      default:
        return new NextResponse(
          JSON.stringify({ message: "Category is invalid!" })
        );
    }

    const request = await prisma.request.create({
      data: {
        ...body,
        userEmail: session.user.email,
        order: 0,
      },
      include: {
        brand: true,
      },
    });

    const board = await prisma.board.findFirst({
      where: {
        brandId: body.brandId,
      },
      include: {
        lists: true,
      },
    });

    if (!board) {
      return new NextResponse(JSON.stringify({ message: "Board not found!" }));
    }

    const todoList = board.lists.find((list) => list.title === "To Do");

    if (!todoList) {
      return new NextResponse(JSON.stringify({ message: "List not found!" }));
    }

    // const addRequesttodoList = await prisma.list.update({
    await prisma.list.update({
      where: {
        id: todoList.id,
      },
      data: {
        requests: {
          connect: {
            id: request.id,
          },
        },
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    //TODO: IMPROVE THIS CODE
    await prisma.notification.create({
      data: {
        type: "request",
        message: `Nueva solicitud: ${request.title}`,
        brandId: request.brandId,
        requestId: request.id,
        userId: user!.id,
      },
    });

    return NextResponse.json({ request });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
