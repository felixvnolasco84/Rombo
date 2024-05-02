import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function GET(request: any) {
  const { email } = request.params;
  const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY || "");
  const customer = await stripe.customers.list({});
  return NextResponse.json(customer);
}
