import { createCustomerIfNull } from "@/lib/stripeUtils";
import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log(data)
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
      customer: data.customer_id,
      success_url:
        process.env.SUCCESS_URL || "https://www.rombo.design/success",
      cancel_url: process.env.CANCEL_URL || "https://www.rombo.design/",
       
    });

    await createCustomerIfNull();


    return NextResponse.json({ url: session.url, session: session });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
