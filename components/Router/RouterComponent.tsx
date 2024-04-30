"use client";
import { useRouter } from "next/navigation";

type Auth = {
  message: string;
};

export default function RouterComponent({ auth }: { auth: Auth }) {
  const router = useRouter();
  if (auth.message === "Not Authenticated!") {
    router.push("/login");
  }
  return <div>RouterComponent</div>;
}
