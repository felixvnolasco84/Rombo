import { GET as getAllSubscriptions } from "@/app/api/subscriptions/[email]/route";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

import { getAuthSession } from "@/utils/AuthOptions";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/lib/stripeUtils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

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

  console.log(dataJson);

  const subscriptions = dataJson.data.map((subscription: any) => {
    return {
      id: subscription.id,
      amount: subscription.plan.amount,
      date: subscription.start_date,
      payment_method: subscription.default_payment_method,
      description: subscription.description,
    };
  });

  const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY || "");



  // const checkout_link: any = await createCheckoutLink(""+user?.stripe_customer_id)

  //TODO: VALIDATE IF THE CUSTOMER HAS A SUBSCRIPTION

  const hasSub: any = await hasSubscription();

  return (
    <div className="min-w-4xl">
      <h2></h2>
      {!hasSub ? (
        <h2>No tienes una subscripción activa</h2>
      ) : (
        <div className="">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Historial de Subscripciones</h1>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full max-w-[300px] pl-8"
                placeholder="Search transactions..."
                type="search"
              />
            </div>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="paid">Activas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="failed">Fallidos</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="date">
              <SelectTrigger>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Fecha</SelectItem>
                <SelectItem value="amount">Monto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full overflow-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Método de Pago</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((subscription: any) => {
                  return (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        {new Date(subscription.date * 1000).toLocaleDateString(
                          "es-Mx",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {(subscription.amount / 100).toLocaleString("es-MX", {
                          style: "currency",
                          currency: "MXN",
                        })}
                      </TableCell>
                      <TableCell>{subscription.payment_method}</TableCell>
                      <TableCell>{subscription.description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <Link href={manage} className="mt-4">
        Administrar Método de Pago
      </Link>

      {/* <Link href={checkout_link} className="mt-4">
        Upgrade
      </Link> */}
    </div>
  );
}
