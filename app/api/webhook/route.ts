import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import prisma from "@/utils/ConnectionPool";

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY || "");

const endpointSecret =
  process.env.STRIPE_WEBHOOK_SECRET_CHECKOUT_COMPLETE || "";

console.log("env:" + process.env.STRIPE_WEBHOOK_SECRET_CHECKOUT_COMPLETED);

export async function POST(request: any) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Firma no encontrada" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;

      if (checkoutSessionCompleted === null) {
        console.log("checkoutSessionCompleted es null");
        return NextResponse.json({ error: "checkoutSessionCompleted es null" });
      } else if (checkoutSessionCompleted.metadata === null) {
        console.log("checkoutSessionCompleted.metadata es null");
        return NextResponse.json({
          error: "checkoutSessionCompleted.metadata es null",
        });
      }

      // guardar en una base de datos
      console.log(
        "Consultado producto con id",
        checkoutSessionCompleted.metadata.productId
      );

      console.log(checkoutSessionCompleted);

      const subscription: any = checkoutSessionCompleted.subscription;
      const customer: any = checkoutSessionCompleted.customer;
      
      await prisma.subscription.create({
        data: {
          subscriptionId: subscription,
          customerId: customer,
        },
      });

      // enviar un correo

      console.log({ checkoutSessionCompleted });
      break;
    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
