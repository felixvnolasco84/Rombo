import { getServerSession } from "next-auth";
import Stripe from "stripe";

import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { authOptions } from "@/utils/AuthOptions";
const prisma = new PrismaClient();

//price_1NarR3APMZcBliJSoefCKTi5

export const stripe = new Stripe(
  String(process.env.STRIPE_TEST_SECRET_KEY),
  {}
);

export async function hasSubscription() {
  const session: any = await getServerSession(authOptions);

  if (session) {
    const user: any = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    const subscriptions = await stripe.subscriptions.list({
      customer: String(user?.stripe_customer_id),
    });

    console.log(subscriptions);

    return subscriptions.data.length > 0;
  }

  return false;
}

export async function createCheckoutLink(customer: string) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/",
    customer: customer,
    line_items: [
      {
        price: "price_1NarR3APMZcBliJSoefCKTi5",
      },
    ],
    mode: "subscription",
  });

  return checkout.url;
}

export async function updateCreateCheckoutLink(
  customer: string,
  priceId: string
) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/",
    customer: customer,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
  });

  return checkout.url;
}

export async function createCustomerIfNull() {
  const session: any = await getServerSession(authOptions);

  if (session) {
    const user: any = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    if (!user?.stripe_customer_id) {
      const customer = await stripe.customers.create({
        email: String(user?.email),
      });

      const newUser = await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          stripe_customer_id: customer.id,
        },
      });

      return newUser?.stripe_customer_id;
    }
    const user2 = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });
    return user2?.stripe_customer_id;
  }
}

// Generate Customer portal
export async function generateCustomerPortalLink(customerId: string) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXTAUTH_URL + "/dashboard/settings/billing",
    });

    console.log();

    return portalSession.url;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
