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
        <motion.div
          initial={{ x: -1000, scale: 0 }}
          animate={{ x: 0, scale: 1 }}
          transition={{ duration: 1.5 }}
          className=""
        >
          <Image
            className="rounded-lg hidden lg:flex"
            src="/images/landing-page/custom-keycap.png"
            alt=""
            width={450}
            height={150}
            priority={true}
          />
        </motion.div>
        <motion.div
          initial={{ y: -1000, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className=""
        >
          <SignInForm />
        </motion.div>
      </div>
    </>
  );
}
