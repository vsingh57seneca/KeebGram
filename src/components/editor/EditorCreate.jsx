import React, { useState } from "react";
import { Keyboard, Colors } from "../keyboard";

const EditorCreate = () => {
  const [layout, setLayout] = useState("default");

  const [alphaColor, setAlphaColor] = useState("white");
  const [modifierColor, setModifierColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [legendColor, setLegendColor] = useState("black");

  return (
    <>
      <div className="grid gap-2">
        <Keyboard
          layout={layout}
          alphaColor={alphaColor}
          modifierColor={modifierColor}
          accentColor={accentColor}
          legendColor={legendColor}
        />
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
    </>
  );
};

export default EditorCreate;
