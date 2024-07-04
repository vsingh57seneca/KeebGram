import React from "react";
import Key from "./Key";

const KeyRow = ({
  keys,
  alphaColor,
  modifierColor,
  accentColor,
  legendColor,
}) => {

  const defaultWidth = "flex-1";
  const keyLengths = {
    "{bksp}": `flex-[3]`,
    "{space}": `flex-[15]`,
    "{shift}": `flex-[4]`,
    "{tab}": `flex-[2]`,
    "\\": `flex-[2]`,
    "{enter}": `flex-[4]`,
    "{lock}": `flex-[3]`,
    "{ctrl}": `flex-[2]`,
    "{alt}": `flex-[2]`,
    "⊞": `flex-[2]`,
  };


  return (
    <div className="flex">
      {keys.map((key, index) => (
        <Key
          key={index}
          label={key}
          length={keyLengths[key] || defaultWidth}
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
