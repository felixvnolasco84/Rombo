import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(request: Request) {
  const data = await request.json();
  const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY || "");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: process.env.SUCCESS_URL || "https://www.rombo.design/success",
    cancel_url: process.env.CANCEL_URL || "https://www.rombo.design/",
  });

  return NextResponse.json({ url: session.url });
}
