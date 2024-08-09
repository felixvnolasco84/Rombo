"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

type Request = {
  request: any;
};

export default function ApproveRequestButton({ request }: Request) {
  const update = useMutation(api.requests.update);

  const [loading, setLoading] = useState<boolean>(false);

  const handleApproveRequest = () => {
    try {
      const promise = update({
        id: request._id,
        status: "DONE",
      });

      toast.promise(promise, {
        loading: "Aprobando solicitud...",
        success: "Solicitud aprobada",
        error: "Error al aprobar la solicitud",
      });
    } catch (error) {
      toast.error("Error al aprobar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleApproveRequest}
      variant={"primary"}
      // disabled={!autorization || loading}
    >
      {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Aprobar"}
    </Button>
  );
}
