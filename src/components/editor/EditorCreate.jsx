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
          alphaColor={alphaColor}
          modifierColor={modifierColor}
          accentColor={accentColor}
          legendColor={legendColor}
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
              onChange={(e) => setAlphaColor(e.target.value)}
              className="select select-bordered bg-white"
            >
              <option disabled selected>
                Pick one
              </option>
              {Object.keys(Colors).map((colorName, index) => (
                <option key={index} value={Colors[colorName]}>
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
              onChange={(e) => setModifierColor(e.target.value)}
              className="select select-bordered bg-white"
            >
              <option disabled selected>
                Pick one
              </option>
              {Object.keys(Colors).map((colorName, index) => (
                <option key={index} value={Colors[colorName]}>
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
              onChange={(e) => setAccentColor(e.target.value)}
              className="select select-bordered bg-white"
            >
              <option disabled selected>
                Pick one
              </option>
              {Object.keys(Colors).map((colorName, index) => (
                <option key={index} value={Colors[colorName]}>
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
              onChange={(e) => setLegendColor(e.target.value)}
              className="select select-bordered bg-white"
            >
              <option disabled selected>
                Pick one
              </option>
              {Object.keys(Colors).map((colorName, index) => (
                <option key={index} value={Colors[colorName]}>
                  {colorName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex space-x-4 mt-4">
          <button class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleSaveDesign}>Save</button>
          <button class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={resetColors}>Reset</button>
        </div>
      </div>
    </>
  );
};

export default EditorCreate;