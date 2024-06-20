import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { userAtom } from "../../../store";

const ProductDetails = dynamic(
  () => import("../../components/products/ProductDetails"),
  {
    ssr: false,
  }
);

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!productId) {
    return <div>Loading...</div>;
  }

  return <ProductDetails user={user} />;
};

export default ProductPage;
