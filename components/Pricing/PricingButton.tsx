"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function PricingButton({ priceId }: { priceId: string }) {

  const [loading, setloading] = useState<boolean>(false);

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
            body: JSON.stringify({ priceId }),
          });
          const data = await res.json();
          window.location.href = data.url;
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setloading(false);
        }
      }}
      variant="primary"
      className="mt-8 xl:mt-16 w-full"
      size={"lg"}
      disabled={loading}
    >
      {loading ? "Cargando..." : "Comenzar gratis"}
    </Button>
  );
}