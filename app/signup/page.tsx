import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/AuthOptions";
import { getServerSession } from "next-auth/next";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignupFormSection } from "@/components/Forms/SignupFormSection";
import Video from "next-video";
import Rombo from "@/videos/Rombo.mp4";


export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-start gap-2">
        <div className="relative grid h-[800px] flex-col items-center justify-center overflow-hidden rounded-xl border lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="absolute right-4 top-4 flex items-center text-sm md:right-8 md:top-8">
            <span>Ya tienes una cuenta?</span>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "link", size: "sm" }),
                ""
              )}
            >
              Inicia Sesión
            </Link>
          </div>

          <div className="relative hidden h-full max-h-[800px] flex-col rounded-md bg-muted text-white dark:border-r lg:flex">
            <Video
              controls={false}
              autoPlay={true}
              minResolution="1080p"
              loop={true}
              className="absolute left-0 top-0 h-full w-full object-cover object-center"
              src={Rombo}
            />

            {/* <div className="absolute bottom-0 left-0 flex flex-col gap-4 p-10">
              <div className="relative z-20 flex w-fit items-center rounded-md bg-black/30 p-1 text-lg font-medium">
                Rombo
              </div>
              <div className="relative z-20 mt-auto">
                <blockquote className="w-fit space-y-2 rounded-md bg-black/30 p-1">
                  <p className="text-lg">
                  </p>
                </blockquote>
              </div>
            </div> */}
            
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2nvxl font-semibold tracking-tight">
                  Iniciar Sesión
                </h1>
                <p className="text-muted-foreground">
                  Ingresa tu correo electrónico para iniciar sesión
                </p>
              </div>
              <SignupFormSection className="text-lg" />
              <p className="px-8 text-center text-sm text-muted-foreground">
                Dando click en iniciar sesión, aceptas nuestro{" "}
                <Link
                  href="/terminos"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Términos de Uso
                </Link>{" "}
                y{" "}
                <Link
                  href="/privacidad"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Politicas de Privacidad
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
