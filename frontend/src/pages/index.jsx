import React, { useEffect, useState } from "react";
import Image from "next/image";
import SignInForm from "@/components/root/SignInForm";

export default function Home() {

  useEffect(() => {
    localStorage.removeItem('user');
  }, [])
  return (
    <div className="min-h-screen flex relative">
      <div className="flex items-center justify-center w-full gap-x-4">
        <div className="hidden lg:flex">
        <Image
            className="rounded-lg"
            src="/images/landing-page/custom-keycap.png"
            alt=""
            width={450}
            height={150}
            priority={true}
          />
        </div>
        <div className="lg:w-1/4 md:w-2/3"><SignInForm /></div>
      </div>
    </div>
  );
}
