"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathName = usePathname();
  return (
    <section className="mb-auto flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 0) ||
          pathName === item.route;
        return (
          <SheetClose key={item.label}>
            <Link
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } 
            flex items-center justify-start gap-4 bg-transparent p-4 `}
              href={item.route}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                className={`${isActive ? "" : "invert-colors"}`}
                height={20}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MoblieNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent className="background-light900_dark200  border-none">
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/assets/images/site-logo.svg"}
            width={23}
            height={23}
            alt="Devflow"
          />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk ">
            Dev
            <span className="text-primary-500">OverFlow</span>
          </p>
        </Link>
        <div className=" w-full">
          <SheetClose className="w-full">
            <NavContent />
            <SignedOut>
              <div className=" bottom-0 mt-10  flex flex-col gap-3 ">
                <SheetClose asChild>
                  <Link href={"sign-in"}>
                    <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full   rounded-lg px-4 py-3 shadow-none">
                      <span className="primary-text-gradient">Log In</span>
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={"sign-in"}>
                    <Button className="small-medium light-border-2  btn-secondary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SignedOut>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MoblieNav;
