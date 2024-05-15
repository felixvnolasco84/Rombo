"use server";

import { Resend } from "resend";
import * as z from "zod";
import NotificationEmailTemplate from "./emails/notification/notificationEmailTemplate";
import prisma from "@/utils/ConnectionPool";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailNotification(
  notification: z.infer<any>,
  email: string
) {
  const { message, type } = notification;

  if (type === "brand") {
    const brand = await prisma.brand.findUnique({
      where: {
        id: notification.brandId,
      },
    });

    if (!brand) {
      return { success: false, error: "Brand not found" };
    }

    try {
      const data = await resend.emails.send({
        from: "hola@rombo.design",
        to: [email],
        cc: [""],
        subject: `Notificación de ${brand.title}`,
        react: NotificationEmailTemplate({
          type,
          message,
          brand,
        }),
      });
      return { success: true, data };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  } else if (type === "request") {
    const request = await prisma.request.findUnique({
      where: {
        id: notification.requestId,
      },
    });

    if (!request) {
      return { success: false, error: "Request not found" };
    }

    try {
      const data = await resend.emails.send({
        from: "hola@rombo.design",
        to: [email],
        cc: [""],
        subject: `Notificación de solicitud: ${request.title}`,
        react: NotificationEmailTemplate({
          type,
          message,
          request,
        }),
      });
      return { success: true, data };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  }
  // if (result.error) {
  //   return { success: false, error: result.error.format() };
  // }
}
