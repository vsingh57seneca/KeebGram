import React, { useEffect, useState } from "react";
import { Keyboard, Colors } from "../keyboard";
import Scraper from "@/functions/KeebFinderScraper";
import ProductsDisplay from "./ProductsDisplay";

const EditorCreate = () => {
  const [layout, setLayout] = useState("default");
  const [alphaColor, setAlphaColor] = useState();
  const [modifierColor, setModifierColor] = useState({});
  const [accentColor, setAccentColor] = useState({});
  const [legendColor, setLegendColor] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await Scraper.query(alphaColor, modifierColor, accentColor, legendColor, products, setProducts);
    };
      fetchProducts();
  }, [alphaColor, modifierColor, accentColor, legendColor]);

  useEffect(() => { console.log(products)}, [products])

  return (
    <>
      <div className="m-2">
        <Keyboard
          layout={layout}
          alphaColor={`#${alphaColor?.value}`}
          modifierColor={`#${modifierColor?.value}`}
          accentColor={`#${accentColor?.value}`}
          legendColor={`#${legendColor?.value}`}
        />

        <div className="m-4">
          <div className="grid grid-cols-2 gap-x-4">
            <div className="dropdown">
              <div className="flex items-center">
                <h1>Alpha</h1>
              </div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm w-full bg-white text-black hover:bg-white"
              >
                {alphaColor?.name ? alphaColor?.name : "Select Alpha"}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content p-2 shadow w-full rounded-box bg-white overflow-y-auto h-[150px] z-[20]"
              >
                {Object.keys(Colors).map((colorName, index) => (
                  <li
                    key={index}
                    className="p-1"
                    onClick={() => setAlphaColor(Colors[colorName])}
                  >
                    <div
                      className={`${
                        alphaColor?.name === colorName &&
                        "bg-gray-300 rounded-md"
                      } px-2`}
                    >
                      {colorName}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <div className="flex items-center">
                <h1>Modifier</h1>
              </div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm w-full bg-white text-black hover:bg-white"
              >
                {modifierColor?.name ? modifierColor?.name : "Select Modifier"}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content p-2 shadow w-full rounded-box bg-white overflow-y-auto h-[150px] z-[20]"
              >
                {Object.keys(Colors).map((colorName, index) => (
                  <li
                    key={index}
                    className="p-1"
                    onClick={() => setModifierColor(Colors[colorName])}
                  >
                    <div
                      className={`${
                        modifierColor?.name === colorName &&
                        "bg-gray-300 rounded-md"
                      } px-2`}
                    >
                      {colorName}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <div className="flex items-center">
                <h1>Accent</h1>
              </div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm w-full bg-white text-black hover:bg-white"
              >
                {accentColor?.name ? accentColor?.name : "Select Accent"}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content p-2 shadow w-full rounded-box bg-white overflow-y-auto h-[150px] z-[20]"
              >
                {Object.keys(Colors).map((colorName, index) => (
                  <li
                    key={index}
                    className="p-1"
                    onClick={() => setAccentColor(Colors[colorName])}
                  >
                    <div
                      className={`${
                        accentColor?.name === colorName &&
                        "bg-gray-300 rounded-md"
                      } px-2`}
                    >
                      {colorName}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <div className="flex items-center">
                <h1>Legend</h1>
              </div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm w-full bg-white text-black hover:bg-white"
              >
                {legendColor?.name ? legendColor?.name : "Select Legend"}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content p-2 shadow w-full rounded-box bg-white overflow-y-auto h-[150px] z-[20]"
              >
                {Object.keys(Colors).map((colorName, index) => (
                  <li
                    key={index}
                    className="p-1"
                    onClick={() => setLegendColor(Colors[colorName])}
                  >
                    <div
                      className={`${
                        legendColor?.name === colorName &&
                        "bg-gray-300 rounded-md"
                      } px-2`}
                    >
                      {colorName}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <ProductsDisplay products={products} />
      </div>
    </>
  );
};

export default EditorCreate;
