// import { GET as getAllSubscriptions } from "@/app/api/subscriptions/[email]/route";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { getAuthSession } from "@/utils/AuthOptions";
import {
  generateCustomerPortalLink,
  hasSubscription,
} from "@/lib/stripeUtils";

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
        <></>
        // <Card>

        //   <CardHeader>Subscripción activa</CardHeader>
        //   <CardContent>
        //     <h2>{actualSubscription.name}</h2>
        //   </CardContent>
        //   <CardFooter className="flex flex-col gap-1">
        //     <Link href={manage} className="mt-4">
        //       <Button>Administrar Método de Pago</Button>
        //     </Link>

        //     <div className="mt-4 flex w-full justify-between gap-1 text-sm">
        //       <div className="flex items-center gap-1">
        //         <CalendarIcon className="h-4 w-4" />
        //         <span className="text-gray-500 dark:text-gray-400">
        //           {new Date(actualSubscription.created).toLocaleDateString(
        //             "es-Mx",
        //             {
        //               year: "numeric",
        //               month: "2-digit",
        //               day: "numeric",
        //             }
        //           )}
        //         </span>
        //       </div>
        //       <div className="flex items-center gap-1">
        //         <RefreshCwIcon className="h-4 w-4" />
        //         <span className="text-gray-500 dark:text-gray-400">
        //           {new Date(actualSubscription.updated).toLocaleDateString(
        //             "es-Mx",
        //             {
        //               year: "numeric",
        //               month: "2-digit",
        //               day: "numeric",
        //             }
        //           )}
        //         </span>
        //       </div>
        //     </div>

        //     <Link href={checkout_link} className="mt-4">
        //       Upgrade
        //     </Link>
        //   </CardFooter>
        // </Card>
      )}
    </div>
  );
}
