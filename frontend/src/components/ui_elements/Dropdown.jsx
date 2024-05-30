import React, { useEffect, useState } from "react";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

const Dropdown = ({ dropdownTitle, list, selectedItem, setSelectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  // useEffect(() => {
  //   if (selectedItem === null && list.length > 0) {
  //     setSelectedItem(list[0]?.name);
  //   }
  // }, [list]);
  
  const handleSelection = (e) => {
    setSelectedItem(e);
    toggleDropdown();
  };
  
  return (
    <div>
      {list && (
        <div
          className="flex relative border-2 rounded py-2"
          onClick={toggleDropdown}
        >
          <div className="w-full px-2">
            {selectedItem && selectedItem}
          </div>
          <div className="flex items-center border-l pl-1">
            {isOpen ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />}
          </div>

          {isOpen && (
            <div className="absolute mt-10 bg-white border-2 rounded-md w-full p-2 h-32 overflow-y-auto z-20">
              {list.map((item, index) => {
                return (
                  <div
                    className="hover:bg-gray-300 p-1 rounded"
                    onClick={(e) => {
                      handleSelection(item.name);
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
