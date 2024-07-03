import React from "react";

const Key = ({
  label,
  length,
  alphaColor,
  modifierColor,
  accentColor,
  legendColor,
}) => {

  const widthClass = length ? `${length}` : "w-12";
  const displayLabel = label === "{empty}" ? "" : label;

  // Default styles for the button
  let buttonStyles = label === "{empty}"
    ? { width: "2.5rem", visibility: "hidden" }
    : {
        backgroundColor: alphaColor,
        color: legendColor,
        padding: "0.5rem",
        borderRadius: "0.25rem",
        border: "1px solid #ccc",
        width: "2.5rem",
        minWidth: "2.5rem",
        borderTopColor: "white",
        borderTopWidth: "2px",
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
      className={`text-black p-2 rounded border border-gray-500 mb-2 ${widthClass}`}
      style={buttonStyles}
    >
      {displayLabel.replace(/[{}]/g, "")}
    </button>
  );
};

export default Key;
