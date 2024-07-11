import React from "react";

const Key = ({
  label,
  length,
  alphaColor,
  modifierColor,
  accentColor,
  legendColor,
}) => {

  const widthClass = length ? `${length}` : ""; // Using Tailwind CSS width classes dynamically

  const displayLabel = label === "{empty}" ? "" : label;

  // Default styles for the button
  let buttonStyles = label === "{empty}"
    ? { visibility: "hidden" }
    : {
        backgroundColor: alphaColor,
        color: legendColor,
      };

  const accentKeys = ["{esc}", "{enter}"];
  const modifierKeys = [
    "{ctrl}",
    "{alt}",
    "{esc}",
    "{tab}",
    "{lock}",
    "{shift}",
    "⊞",
    "{enter}",
    "{bksp}",
    "F5",
    "F6",
    "F7",
    "F8",
  ];

  if (modifierKeys.includes(label)) {
    // Set background color for modifier keys
    buttonStyles = {
      ...buttonStyles,
      backgroundColor: modifierColor || accentColor || alphaColor,
    };
  }

  if (accentKeys.includes(label)) {
    // Set background color for accent keys
    buttonStyles = {
      ...buttonStyles,
      backgroundColor: accentColor || modifierColor || alphaColor,
    };
  }

  return (
    <button
      className={`text-black rounded border border-gray-500 ${widthClass} text-[8px] md:text-sm p-0.5 md:p-2 md:m-0.5`}
      style={buttonStyles}
    >
      {displayLabel.replace(/[{}]/g, "")}
    </button>
  );
};

export default Key;
