import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Designs from "@/functions/Designs";
import Accounts from '@/functions/Accounts';
import KeebFinderScraper from '@/functions/KeebFinderScraper';
import { useAtom } from "jotai";
import { userAtom } from "../../../store";
import { Colors, Keyboard } from "@/components/keyboard";
import { useSidebar } from "@/contexts/SidebarContext";
import ProductsDisplay from "@/components/editor/ProductsDisplay";

const DesignPage = () => {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [user, setUser] = useAtom(userAtom);
  const [design, setDesign] = useState({});
  const [owner, setOwner] = useState({});
  const { setSidebarContent } = useSidebar();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (router.query.id) {
      setId(Number.parseInt(router.query.id));
    }
  }, [router.query]);

  const fetchDesign = async (id) => {
    const results = await Designs.getDesignById(id);
    if (results) {
      setDesign(results[0]);
    }
  };

  const fetchOwner = async (userId) => {
    if (userId) {
      const results = await Accounts.getOneById(userId);
      setOwner(results);
    }
  };

  const fetchProducts = async (design) => {
    if (design) {
      await KeebFinderScraper.query(
        Colors[design?.alphas_color]?.value,
        Colors[design?.modifiers_color]?.value,
        Colors[design?.accents_color]?.value,
        Colors[design?.legends_color]?.value,
        products,
        setProducts
      );
    }
  };

  useEffect(() => {
    if (id > 0) {
      fetchDesign(id);
    }
  }, [id]);

  useEffect(() => {
    if (design && Object.keys(design).length > 0) {
      fetchOwner(design?.user_id);
      fetchProducts(design);
    }
  }, [design]);

  useEffect(() => {
    // This useEffect will trigger every time `products` is updated
    setSidebarContent(<ProductsDisplay products={products} design={design} />);
  }, [products, design, setSidebarContent]);

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h1 className="font-bold">{design?.design_name || "Loading..."}</h1>

      <Keyboard
        id={design?.design_id}
        accentColor={Colors[design?.accents_color]}
        alphaColor={Colors[design?.alphas_color]}
        modifierColor={Colors[design?.modifiers_color]}
        legendColor={Colors[design?.legends_color]}
      />
      <h1><span className="font-semibold">Created by: </span>{owner?.display_name || "Loading..."}</h1>

      <div className="grid grid-cols-2">
        <div className="col-span-1"><h1><span className="font-semibold">Alphas: </span>{design?.alphas_color}</h1></div>
        <div className="col-span-1"><h1><span className="font-semibold">Modifiers: </span>{design?.modifiers_color}</h1></div>
        <div className="col-span-1"><h1><span className="font-semibold">Accents: </span>{design?.accents_color}</h1></div>
        <div className="col-span-1"><h1><span className="font-semibold">Legends: </span>{design?.legends_color}</h1></div>
      </div>
    </div>
  );
};

export default DesignPage;
