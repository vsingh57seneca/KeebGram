import React, { useEffect, useState } from "react";
import { Keyboard, Colors } from "../keyboard";
import { createDesign, updateDesign } from "../../functions/Designs";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "../../../store";
import html2canvas from "html2canvas-pro";
import { useSidebar } from "@/contexts/SidebarContext";
import ProductsDisplay from "./ProductsDisplay";
import KeebFinderScraper from "@/functions/KeebFinderScraper";
import toast from "react-hot-toast";

const EditorCreate = ({ initialData }) => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);

  const [designName, setDesignName] = useState("");
  const [alphaColor, setAlphaColor] = useState("white");
  const [modifierColor, setModifierColor] = useState("white");
  const [accentColor, setAccentColor] = useState("white");
  const [legendColor, setLegendColor] = useState("black");
  const [designId, setDesignId] = useState(null);

  const { setSidebarContent } = useSidebar();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setSidebarContent(<ProductsDisplay products={products} />);
  }, [setSidebarContent]);

  useEffect(() => {
    if (initialData) {
      setDesignName(initialData.design_name);
      setAlphaColor(initialData.alphas_color);
      setModifierColor(initialData.modifiers_color);
      setAccentColor(initialData.accents_color);
      setLegendColor(initialData.legends_color);
      setDesignId(initialData.design_id);
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && !user) {
      setUser(storedUser);
    }
  }, [user, setUser]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await KeebFinderScraper.query(
        !initialData ? Colors[alphaColor]?.value : Colors[initialData?.alphas_color]?.value,
        !initialData ? Colors[modifierColor]?.value : Colors[initialData?.modifiers_color]?.value,
        !initialData ? Colors[accentColor]?.value : Colors[initialData?.accents_color]?.value,
        !initialData ? Colors[legendColor]?.value : Colors[initialData?.legends_color]?.value,
        products,
        setProducts
      );
    };

    fetchProducts();
  }, [initialData, alphaColor, modifierColor, accentColor, legendColor]);

  useEffect(() => {
    console.log(products);
    setSidebarContent(<ProductsDisplay products={products} />);
  }, [products]);

  const handleCancel = () => {
    router.push("/editor");
  };

  const handleSaveDesign = async () => {
    if (!user) {
      toast.error("User not found. Please log in again.");
      return;
    }

    const design = {
      user_id: user.account_id,
      design_name: designName,
      alphas_color: alphaColor,
      modifiers_color: modifierColor,
      accents_color: accentColor,
      legends_color: legendColor,
    };

    try {
      let response;
      if (designId) {
        response = await updateDesign({ ...design, design_id: designId });
      } else {
        response = await createDesign(design);
      }

      console.log("Response:", response);

      if (response && (response.status === 201 || response.status === 200)) {
        toast.success("Design saved successfully!");
        router.push("/editor");
      } else {
        throw new Error(
          "Failed to save design. Status code: " + response.status
        );
      }
    } catch (error) {
      console.error("Save design error:", error);
      toast.error(error.message || "An error occurred. Failed to save design.");
    }
  };

  const resetColors = () => {
    setAlphaColor("white");
    setModifierColor("white");
    setAccentColor("white");
    setLegendColor("black");
    setDesignName("");
  };

  return (
    <>
      <div className="m-2">
        <Keyboard
          alphaColor={Colors[alphaColor]}
          modifierColor={Colors[modifierColor]}
          accentColor={Colors[accentColor]}
          legendColor={Colors[legendColor]}
        />

        <div className="grid grid-cols-2 gap-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Design Name</span>
            </div>
            <input
              type="text"
              placeholder="Enter design name"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              className="input input-bordered w-full max-w-xs bg-white placeholder-black"
            />
          </label>
        </div>

        <div className="grid grid-cols-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Alpha</span>
            </div>
            <select
              value={alphaColor}
              onChange={(e) => setAlphaColor(e.target.value)}
              className="select select-bordered bg-white"
            >
              <option value="" disabled>
                Pick one
              </option>
              {Object.keys(Colors).map((colorName, index) => (
                <option key={index} value={colorName}>
                  {colorName}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Modifiers</span>
            </div>
            <select
              value={modifierColor}
              onChange={(e) => setModifierColor(e.target.value)}
              className="select select-bordered bg-white"
            >
              <option value="" disabled>
                Pick one
              </option>
              {Object.keys(Colors).map((colorName, index) => (
                <option key={index} value={colorName}>
                  {colorName}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Accents</span>
            </div>
            <select
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="select select-bordered bg-white"
            >
              <option value="" disabled>
                Pick one
              </option>
              {Object.keys(Colors).map((colorName, index) => (
                <option key={index} value={colorName}>
                  {colorName}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Legends</span>
            </div>
            <select
              value={legendColor}
              onChange={(e) => setLegendColor(e.target.value)}
              className="select select-bordered bg-white"
            >
              <option value="" disabled>
                Pick one
              </option>
              {Object.keys(Colors).map((colorName, index) => (
                <option key={index} value={colorName}>
                  {colorName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex space-x-4 mt-4">
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={handleSaveDesign}
          >
            Save
          </button>
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={resetColors}
          >
            Reset
          </button>
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default EditorCreate;
