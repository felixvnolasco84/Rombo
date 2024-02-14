"use client";

import { Button } from "../ui/button";

export default function PricingButton({ priceId }: { priceId: string }) {
  return (
    <Button
      onClick={async () => {
        const res = fetch("/api/checkout_sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priceId }),
        });
        const data = (await res).json();
        window.location.href = (await data).url;
      }}
      variant="primary"
      className="w-full lg:mt-8 xl:mt-16"
      size={"lg"}
    >
      Comenzar gratis
    </Button>
  );
}
