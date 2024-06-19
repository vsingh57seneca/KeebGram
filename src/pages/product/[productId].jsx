import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const ProductDetails = dynamic(
  () => import("../../components/products/ProductDetails"),
  {
    ssr: false,
  }
);

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  if (!productId) {
    return <div>Loading...</div>;
  }

  return <ProductDetails />;
};

export default ProductPage;
