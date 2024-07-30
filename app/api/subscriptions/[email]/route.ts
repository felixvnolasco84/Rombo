import { NextResponse } from "next/server";
import { Stripe } from "stripe";

//GET request to a specific subscription

export async function GET(request: any) {
  const { customer_id } = request.params;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
  const subscriptions = await stripe.subscriptions.list({
    customer: customer_id,
  });
  return NextResponse.json(subscriptions);
}
