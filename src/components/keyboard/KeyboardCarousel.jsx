// src/components/keyboard/KeyboardCarousel.jsx

import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import Keyboard from "./Keyboard";
import Colors from "./colors";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const KeyboardCarousel = ({ designs, onSelect }) => {
  return (
    <div className="flex gap-x-4 no-scrollbar w-fit relative">
      {designs &&
        designs?.map((design, index) => {
          return (
            <div
              onClick={() => onSelect(design)}
              className="flex flex-col m-2 p-2 rounded-lg scale-50"
            >
              <div className="border-2 p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold">{design.design_name}</h2>
                <div className="flex items-center">
                    <div className="">Left</div>
                  <Keyboard
                    alphaColor={Colors[design?.alphas_color]}
                    modifierColor={Colors[design?.modifiers_color]}
                    accentColor={Colors[design?.accents_color]}
                    legendColor={Colors[design?.legends_color]}
                    scale="75"
                  />
                    <div className="">Right</div>
                </div>
                <div className="">Alpha: {design?.alphas_color}</div>
                <div className="">Modifier: {design?.modifiers_color}</div>
                <div className="">Accent: {design?.accents_color}</div>
                <div className="">Legend: {design?.legends_color}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default KeyboardCarousel;
