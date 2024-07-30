import { createCustomerIfNull } from "@/lib/stripeUtils";
import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log(data);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

    const customerId = await createCustomerIfNull();

    if (!customerId) {
      return NextResponse.json({ error: "Customer not found" });
    } 
 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: customerId,
      subscription_data: {
        trial_period_days: 14,
      },
      success_url:
        process.env.SUCCESS_URL || "https://www.rombo.design/success",
      cancel_url: process.env.CANCEL_URL || "https://www.rombo.design/",
    });

    return NextResponse.json({ url: session.url, session: session });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
