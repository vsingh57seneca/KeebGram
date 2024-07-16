// src/components/editor/DesignPreview.jsx

import React from "react";
import { Keyboard } from "../keyboard";

const DesignPreview = ({ design, onEdit, onDelete }) => {
    if (!design) {
        return <div>No design selected.</div>;
    }

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow mt-4 mx-4">
            <h2 className="text-lg font-bold">{design.design_name}</h2>
            <Keyboard
                alphaColor={design.alphas_color}
                modifierColor={design.modifiers_color}
                accentColor={design.accents_color}
                legendColor={design.legends_color}
            />
            <div className="mt-4 flex justify-between">
                <button className="btn btn-primary" onClick={() => onEdit(design)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(design.design_id)}>Delete</button>
            </div>
        </div>
    );
};

export default DesignPreview;
