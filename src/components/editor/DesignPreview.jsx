// src/components/editor/DesignPreview.jsx

import React from "react";
import { Keyboard } from "../keyboard";
import { Colors } from "../keyboard";

const DesignPreview = ({ design, onEdit, onDelete }) => {
  if (!design) {
    return <div>No design selected.</div>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow max-w-full">
      <Keyboard
        alphaColor={Colors[design?.alphas_color]}
        modifierColor={Colors[design?.modifiers_color]}
        accentColor={Colors[design?.accents_color]}
        legendColor={Colors[design?.legends_color]}
        scale=""
      />
      <h2 className="text-lg font-bold mt-6">{design.design_name}</h2>
    </div>
  );
};

export default DesignPreview;
