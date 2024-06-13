import React, { useEffect, useState } from "react";
import Image from "next/image";
import SignInForm from "@/components/root/SignInForm";

export default function Home() {
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="">
          {" "}
          <Image
            className="rounded-lg hidden lg:flex"
            src="/images/landing-page/custom-keycap.png"
            alt=""
            width={450}
            height={150}
            priority={true}
          />
        </div>
        <div className="">
          <SignInForm />
        </div>
      </div>
    </>
  );
}
