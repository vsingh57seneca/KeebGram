import React from "react";
import { useRouter } from "next/router";
import Keyboard from "./Keyboard";
import Colors from "./colors";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const KeyboardCarousel = ({
  designs,
  onSelect,
  selectedDesign,
  onEdit,
  onDelete,
  onLeft,
  onRight,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between m-auto gap-x-4">
        <button
          className="btn btn-sm btn-success text-white w-fit"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/editor/create");
          }}
        >
          Create
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(selectedDesign);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(selectedDesign.design_id);
          }}
        >
          Delete
        </button>
      </div>
      <div className="flex w-full justify-center scale-75">
        {designs &&
          designs.map((design) => (
            <div
              key={design.design_id}
              className={`absolute ${
                selectedDesign?.design_id === design?.design_id ? `z-20` : ``
              }`}
              onClick={() => onSelect(design)}
            >
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLeft();
                  }}
                >
                  <FaChevronCircleLeft size={30} />
                </button>
                <Keyboard
                  alphaColor={Colors[design?.alphas_color]}
                  modifierColor={Colors[design?.modifiers_color]}
                  accentColor={Colors[design?.accents_color]}
                  legendColor={Colors[design?.legends_color]}
                  scale="50"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRight();
                  }}
                >
                  <FaChevronCircleRight size={30} />
                </button>
              </div>

              <div className=" flex justify-center">
                {designs &&
                  designs.map((design) => (
                    <div
                      key={design.design_id}
                      className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${
                        selectedDesign?.design_id === design?.design_id
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                      onClick={() => onSelect(design)}
                    />
                  ))}
              </div>

              <div className="grid grid-cols-2 text-center">
                <div className="col-span-1">
                  <h1 className="font-bold">Alpha</h1>
                  <p>{selectedDesign?.alphas_color}</p>
                </div>
                <div className="col-span-1">
                  <h1 className="font-bold">Modifiers</h1>
                  <p>{selectedDesign?.modifiers_color}</p>
                </div>
                <div className="col-span-1">
                  <h1 className="font-bold">Accents</h1>
                  <p>{selectedDesign?.accents_color}</p>
                </div>
                <div className="col-span-1">
                  <h1 className="font-bold">Legends</h1>
                  <p>{selectedDesign?.legends_color}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default KeyboardCarousel;
