import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "../../../store";
import { getDesignsByUserId, deleteDesign } from "../../functions/Designs";
import DesignPreview from "@/components/editor/DesignPreview";
import KeyboardCarousel from "@/components/keyboard/KeyboardCarousel";
import { useSidebar } from "@/contexts/SidebarContext";
import toast from "react-hot-toast";

const Index = () => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const { setSidebarContent } = useSidebar();

  useEffect(() => {
    setSidebarContent(<div></div>);
    return () => setSidebarContent(null); // Cleanup sidebar content on unmount
  }, [setSidebarContent]);

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, []);

  useEffect(() => {
    if (user && user.account_id) {
      getDesignsByUserId(user.account_id)
        .then((data) => {
          if (data && data.length > 0) {
            setDesigns(data);
            setSelectedDesign(data[0]);
          } else {
            console.log("No designs found or an error occurred.");
          }
        })
        .catch((error) => {
          console.error("Error fetching designs: ", error);
        });
    }
  }, [user]);

  const handleSelect = (design) => {
    setSelectedDesign(design);
  };

  const handleDelete = async (designId) => {
    const response = await deleteDesign(designId);
    if (response && response.status === 200) {
      const updatedDesigns = designs.filter(
        (design) => design.design_id !== designId
      );
      setDesigns(updatedDesigns);
      if (updatedDesigns.length > 0) {
        setSelectedDesign(updatedDesigns[0]);
      } else {
        setSelectedDesign(null);
      }
      toast.success("Design deleted successfully!");
    } else {
      toast.error("Failed to delete design.");
    }
  };

  const handleEdit = (design) => {
    router.push({
      pathname: "/editor/create",
      query: { design: JSON.stringify(design) },
    });
  };

  const handleLeft = () => {
    if (selectedDesign) {
      const currentIndex = designs.findIndex(
        (design) => design.design_id === selectedDesign.design_id
      );
      const newIndex = (currentIndex - 1 + designs.length) % designs.length;
      setSelectedDesign(designs[newIndex]);
    }
  };

  const handleRight = () => {
    if (selectedDesign) {
      const currentIndex = designs.findIndex(
        (design) => design.design_id === selectedDesign.design_id
      );
      const newIndex = (currentIndex + 1) % designs.length;
      setSelectedDesign(designs[newIndex]);
    }
  };

  useEffect(() => {
    console.log(selectedDesign);
  }, [selectedDesign]);

  return (
    <div className="flex flex-col gap-y-8 p-1">
      <DesignPreview design={selectedDesign} />
      <KeyboardCarousel
        designs={designs}
        onSelect={handleSelect}
        selectedDesign={selectedDesign}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onLeft={handleLeft}
        onRight={handleRight}
      />
    </div>
  );
};

export default Index;
