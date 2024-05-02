import { NextResponse } from "next/server";
import { Stripe } from "stripe";

//GET request to get all subscriptions

export async function GET(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY || "");
  const subscriptions = await stripe.subscriptions.list();
  return NextResponse.json(subscriptions);
}
