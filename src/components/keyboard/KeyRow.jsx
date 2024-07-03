import React from "react";
import Key from "./Key";

const KeyRow = ({
  keys,
  alphaColor,
  modifierColor,
  accentColor,
  legendColor,
}) => {

  const keyLengths = {
    "{bksp}": "flex-[3]",
    "{space}": "flex-[5]",
    "{shift}": "flex-[3]",
    "{tab}": "flex-[0.5]",
    "\\": "flex-[0.5]",
    "{enter}": "flex-[2]",
    "{lock}": "flex-[2]",
    "{ctrl}": "flex-[0.5]",
    "{alt}": "flex-[0.5]",
    "⊞": "flex-[0.5]",
  };

  return (
    <div className="flex gap-2 w-full">
      {keys.map((key, index) => (
        <Key
          key={index}
          label={key}
          length={keyLengths[key]}
          alphaColor={alphaColor}
          modifierColor={modifierColor}
          accentColor={accentColor}
          legendColor={legendColor}
        />
      ))}
    </div>
  );
};

export default KeyRow;
