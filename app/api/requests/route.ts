import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/AuthOptions";
import prisma from "@/utils/ConnectionPool";

//GET ALL REQUESTS

export const GET = async () => {
  const session: any = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }));
  }
  try {
    // const body = await req.json();
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
};

//CREATE REQUEST
export const POST = async (req: any) => {
  const session: any = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }));
  }
  try {
    const body = await req.json();
    const request = await prisma.request.create({
      data: {
        ...body,
        userEmail: session.user.email,
      },
      include: {
        brand: true,
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
