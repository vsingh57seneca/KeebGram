import React, { useEffect, useState } from "react";
import { Keyboard, Colors } from "../keyboard";
import { createDesign } from "../../functions/Designs";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "../../../store";

const EditorCreate = () => {

    const router = useRouter();
    const [user, setUser] = useAtom(userAtom);
  const [layout, setLayout] = useState("default");
    const [designName, setDesignName] = useState("");
  const [alphaColor, setAlphaColor] = useState("white");
  const [modifierColor, setModifierColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [legendColor, setLegendColor] = useState("black");

  useEffect(() => {
    if (!user) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }
  }, [user, setUser]);

  const handleSaveDesign = async () => {
    if (!user) {
        alert("User not found. Please log in again.")
        return;
    }
    const design = {
        user_id: user.account_id,
        design_name: designName,
        alphas_color: alphaColor,
        modifiers_color: modifierColor,
        accents_color: accentColor,
        legends_color: legendColor
    }

    const response = await createDesign(design);
    if (response && response.status === 201) {
        alert("Design saved successfully!");
        router.push('/editor');
    } else {
        alert("An error occurred. Failed to save design.")
    }
  };

  const resetColors = () => {
    setAlphaColor("white");
    setModifierColor("white");
    setAccentColor("white");
    setLegendColor("black");
    setDesignName("");
  }

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

        <div className="flex space-x-4 mt-4">
          <button class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleSaveDesign}>Save</button>
          <button class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={resetColors}>Reset</button>
        </div>
        <ProductsDisplay products={products} />
      </div>
    </>
  );
};

export default EditorCreate;