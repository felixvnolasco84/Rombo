import { NextResponse } from "next/server";
import prisma from "@/utils/ConnectionPool";

// CREATE A NOTIFICATION

export const POST = async (req: any) => {
  const body: any = await req.json();

  try {
    const notification = await prisma.notification.create({
      data: { ...body },
    });

    return NextResponse.json({ message: "Notification created successfully" });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
