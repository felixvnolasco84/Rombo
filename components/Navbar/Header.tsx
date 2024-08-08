"use client";

import Logo from "@/public/svg/Logo.svg";

import {
  UserButton,
  OrganizationSwitcher,
  useOrganization,
  useAuth,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";

export const Header = () => {
  const { organization } = useOrganization();

  const auth = useAuth();

  return (
    <div className="container sticky top-0 z-50 mt-2 flex justify-between rounded-md bg-background px-4 py-6">
      <Link
        href={"/"}
        className="relative h-[16.11px] w-[102.66px] xl:h-[40.44px] xl:w-[196px]"
      >
        <Image
          src={Logo}
          alt="Logo"
          fill
          sizes="(100vw - 2rem) 100vh"
          className="object-fill object-center"
        />
      </Link>
      <div className="flex items-center gap-x-4">
        <div className="block flex-1 lg:hidden">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "376px",
                },
                organizationSwitcherTrigger: {
                  padding: "6px",
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                },
              },
            }}
          />
        </div>
        {/* <InviteButton organization={organization} /> */}
        <UserButton />
        {auth.isLoaded && auth.isSignedIn && (
          <Link href={"/portal"}>
            <Button variant={"primary"}>Portal</Button>
          </Link>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};
