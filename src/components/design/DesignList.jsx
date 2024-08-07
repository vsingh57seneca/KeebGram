import React from "react";

const DesignList = ({ designs }) => {
  return (
    <div className="design-list">
      {designs.map((design) => (
        <div
          key={design.design_id}
          className="design-item border p-2 rounded mb-2 cursor-pointer"
          onClick={() => console.log("Design clicked:", design.design_id)}
        >
          <h3>{design.design_name}</h3>
          {/* You can add more design details here if needed */}
        </div>
      ))}
    </div>
  );
};

export default DesignList;
