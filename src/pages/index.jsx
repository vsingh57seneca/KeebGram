import React, { useEffect, useState } from "react";
import Image from "next/image";
import SignInForm from "@/components/root/SignInForm";
import { motion } from "framer-motion";


export default function Home() {
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full">
          <Image
            className="rounded-lg hidden lg:flex"
            src="/images/landing-page/custom-keycap.png"
            alt=""
            width={450}
            height={150}
            priority={true}
          />
          <SignInForm />
      </div>
    </>
  );
}
