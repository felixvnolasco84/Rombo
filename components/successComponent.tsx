function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessComponent() {
  return (
    <div
      key="1"
      className="flex h-screen flex-col items-center justify-center rounded-2xl bg-muted/40 shadow-lg dark:bg-gray-900"
    >
      <Card className="max-w-md p-8 text-center shadow-md">
        <CardHeader>
          <div className="mx-auto mb-6 flex items-center justify-center rounded-full bg-green-500 p-6">
            <CheckIcon className="h-12 w-12 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">
            ¡Subcripción Completada!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            ¡Felicidades! Has completado tu subscripción de manera exitosa.
            Ahora puedes acceder a más funcionalidades.
          </p>
          <Button asChild className="w-full" variant="primary">
            <Link href={"/configuracion/subscripcion"}>Ver detalles</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
