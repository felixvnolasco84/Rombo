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

Video;
export const metadata: Metadata = {
  title:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
  description:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <section className="items-center gap-6 grid md:py-10 pt-6 pb-8 container">
      <div className="flex flex-col items-start gap-2">
        <div className="relative flex-col justify-center items-center grid lg:grid-cols-2 lg:px-0 lg:max-w-none h-[800px]">
          <div className="top-4 md:top-8 right-4 md:right-8 absolute flex items-center text-sm">
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

          <div className="relative lg:flex flex-col hidden bg-muted dark:border-r rounded-md h-full max-h-[800px] text-white">
            <Video
              controls={false}
              autoPlay={true}
              minResolution="1080p"
              loop={true}
              className="top-0 left-0 absolute w-full h-full object-center object-cover"
              src={Rombo}
            />

            <div className="bottom-0 left-0 absolute flex flex-col gap-4 p-10">
              <div className="relative z-20 flex items-center bg-black/30 p-1 rounded-md w-fit font-medium text-lg">
                Rombo
              </div>
              <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2 bg-black/30 p-1 rounded-md w-fit">
                  <p className="text-lg">
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                    Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed
                    augue semper porta.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="flex flex-col justify-center space-y-6 mx-auto w-full sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="font-semibold text-2nvxl tracking-tight">
                  Iniciar Sesión
                </h1>
                <p className="text-muted-foreground">
                  Ingresa tu correo electrónico para iniciar sesión
                </p>
              </div>
              <SignupFormSection className="text-lg" />
              <p className="px-8 text-center text-muted-foreground text-sm">
                Dando click en iniciar sesión, aceptas nuestro{" "}
                <Link
                  href="/terminos"
                  className="hover:text-primary underline underline-offset-4"
                >
                  Términos de Uso
                </Link>{" "}
                y{" "}
                <Link
                  href="/privacidad"
                  className="hover:text-primary underline underline-offset-4"
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
