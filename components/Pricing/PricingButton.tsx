"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";

type PricingButtonProps = {
  // customer_id: string;
  priceId: string;
  disabled?: boolean;
};

export default function PricingButton({
  priceId,
  disabled,
}: // customer_id,
PricingButtonProps) {
  const [loading, setloading] = useState<boolean>(false);

  return (
    <Button
      disabled={disabled}
      onClick={async () => {
        try {
          setloading(true);
          const res = await fetch("/api/checkout_sessions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ priceId }),
          });
          const data = await res.json();

          if (data.error == "Customer not found") {
            toast({
              title: "Error",
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">
                    {data.error === "Customer not found" && "Se necesita una sesión para continuar"}
                  </code>
                </pre>
              ),
            });
            return;
          }
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
      // disabled={customer_id === ""}
    >
      {loading ? "Cargando..." : "Comenzar gratis"}
    </Button>
  );
}
