import React from "react";
import KeyRow from "./KeyRow";

const Keyboard = ({
  layout = "default",
  alphaColor,
  modifierColor,
  accentColor,
  legendColor,
}) => {
  const layouts = {
    default: [
      "{esc} {empty} F1 F2 F3 F4 {empty} F5 F6 F7 F8 {empty} F9 F10 F11 F12",
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{ctrl} ⊞ {alt} {space} {alt} ⊞ {ctrl}",
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{.com} @ {space}",
    ],
  };

  return (
<<<<<<< HEAD
    <div className="border-2 p-1 bg-black drop-shadow-lg">
=======
    <div id="keyboard" className="border-2 p-1 bg-black drop-shadow-lg">
>>>>>>> origin/dn
      {layouts[layout].map((row, index) => (
        <KeyRow
          key={index}
          keys={row.split(" ")}
          alphaColor={alphaColor}
          modifierColor={modifierColor}
          accentColor={accentColor}
          legendColor={legendColor}
        />
      ))}
    </div>
  );
};

export default Keyboard;
