"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

import { toast } from "../ui/use-toast";

type Request = {
  request: any;
  autorization: boolean;
};

export default function ApproveRequestButton({
  request,
  autorization,
}: Request) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleApproveRequest = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/requests/${request.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Completado" }),
      });
      const data = await response.json();

      if (data.message == "Request updated successfully") {
        toast({
          title: "¡Listo!",
          description: "Se ha aprobado la solicitud correctamente",
          variant: "default",
          duration: 3000,
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "¡Oh!",
        description: "Al parecer hubo un error, intentelo más tarde",
      });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleApproveRequest}
      variant={"primary"}
      disabled={!autorization || loading}
    >
      {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Aprobar"}
    </Button>
  );
}
