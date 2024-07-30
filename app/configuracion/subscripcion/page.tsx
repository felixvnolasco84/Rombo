import { GET as getAllSubscriptions } from "@/app/api/subscriptions/[email]/route";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { getAuthSession } from "@/utils/AuthOptions";
import {
  generateCustomerPortalLink,
  hasSubscription,
  updateCreateCheckoutLink,
} from "@/lib/stripeUtils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CalendarIcon, RefreshCwIcon } from "lucide-react";

export default async function page() {
  const session: any = await getAuthSession();
  const prisma = new PrismaClient();

  if (!session) {
    return { redirect: "/login" };
  }

  const user = await prisma.user.findFirst({
    where: { email: session.user?.email },
  });

  if (!user) {
    return <p>404</p>;
  }

  const manage: any = await generateCustomerPortalLink(
    "" + user?.stripe_customer_id
  );
  const data = await getAllSubscriptions({
    params: { customer_id: user?.stripe_customer_id },
  });

  const dataJson = await data.json();

  const subscriptions = dataJson.data.map((subscription: any) => {
    return {
      id: subscription.id,
      amount: subscription.plan.amount,
      date: subscription.start_date,
      payment_method: subscription.default_payment_method,
      description: subscription.description,
      product: subscription.plan.product,
    };
  });

  const productsIds = subscriptions.map((subscription: any) => {
    return subscription.product;
  });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

  const productsDraft = await stripe.products.list({
    ids: productsIds,
  });

  const products = productsDraft.data;

  const actualSubscription = products[0];

  console.log(actualSubscription);

  if (!actualSubscription.default_price) {
    return <p>404</p>;
  }

  // const checkout_link: any = await updateCreateCheckoutLink(
  //   "" + user?.stripe_customer_id,
  //   actualSubscription.default_price.toString()
  // );

  //TODO: VALIDATE IF THE CUSTOMER HAS A SUBSCRIPTION

  const hasSub: any = await hasSubscription();

  return (
    <div className="min-w-4xl">
      <h2></h2>
      {!hasSub ? (
        <h2>No tienes una subscripción activa</h2>
      ) : (
        <Card>
          <CardHeader>Subscripción activa</CardHeader>
          <CardContent>
            <h2>{actualSubscription.name}</h2>
          </CardContent>
          <CardFooter className="flex flex-col gap-1">
            <Link href={manage} className="mt-4">
              <Button>Administrar Método de Pago</Button>
            </Link>

            <div className="mt-4 flex w-full justify-between gap-1 text-sm">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(actualSubscription.created).toLocaleDateString(
                    "es-Mx",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <RefreshCwIcon className="h-4 w-4" />
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(actualSubscription.updated).toLocaleDateString(
                    "es-Mx",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>

            {/* <Link href={checkout_link} className="mt-4">
              Upgrade
            </Link> */}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
