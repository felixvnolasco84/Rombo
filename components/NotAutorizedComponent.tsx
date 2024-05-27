import Link from "next/link";

export default function NotAutorizedComponent() {
  return (
    <div className="mt-4 flex h-[100dvh] w-full items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl">
          No Autorizado
        </h1>
        <p className="text-gray-500 dark:text-gray-400 md:text-xl">
          No tienes permisos para ver esta página
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
