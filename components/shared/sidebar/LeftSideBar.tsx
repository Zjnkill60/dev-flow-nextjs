"use client";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { SignedOut, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const pathName = usePathname();
  const { userId } = useAuth();
  console.log(userId);
  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex 
    h-screen flex-col gap-10 border-r p-5 pt-36 shadow-light-300 max-sm:hidden lg:w-[266px] "
    >
      {sidebarLinks.map((item) => {
        const isActive = pathName === item.route;
        if (item.route === "/profile") {
          if (userId) {
            item.route = `/profile/${userId}`;
          }
        }
        return (
          <div key={item.label}>
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
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } sm:hidden lg:block`}
              >
                {item.label}
              </p>
            </Link>
          </div>
        );
      })}

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href={"sign-in"}>
            <Button className="small-medium light-border-2 btn-secondary min-h-[41px] w-full   rounded-lg px-4 py-3 shadow-none">
              <span className="primary-text-gradient sm:hidden lg:block">
                Log In
              </span>
              <Image
                src="assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className=" invert-colors lg:hidden"
              />
            </Button>
          </Link>
          <Link href={"sign-in"}>
            <Button className="small-medium light-border-2  btn-tertiary   text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
              <span className="sm:hidden lg:block">Sign Up</span>
              <Image
                src="assets/icons/sign-up.svg"
                alt="login"
                width={20}
                height={20}
                className="text-dark400_light900 invert-colors  lg:hidden"
              />
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSideBar;
