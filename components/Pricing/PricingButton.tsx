"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

type PricingButtonProps = {
  customer_id: string;
  priceId: string;
};

export default function PricingButton({
  priceId,
  customer_id,
}: PricingButtonProps) {
  const [loading, setloading] = useState<boolean>(false);

  if (customer_id === "") {
  }

  return (
    <Button
      onClick={async () => {
        try {
          setloading(true);
          const res = await fetch("/api/checkout_sessions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ priceId, customer_id }),
          });
          const data = await res.json();
          console.log(data);
          window.location.href = data.url;
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setloading(false);
        }
      }}
      variant="primary"
      className="mt-8 w-full xl:mt-16"
      size={"lg"}
      disabled={customer_id === ""}
    >
      {loading ? "Cargando..." : "Comenzar gratis"}
    </Button>
  );
}
