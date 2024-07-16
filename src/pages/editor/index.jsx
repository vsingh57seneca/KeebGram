import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "../../../store";
import { getDesignsByUserId, deleteDesign } from "../../functions/Designs";
import { Keyboard, Colors } from "@/components/keyboard";
import DesignPreview from "@/components/editor/DesignPreview";
import KeyboardCarousel from "@/components/keyboard/KeyboardCarousel";

const Index = () => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const observers = useRef([]);

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

  useEffect(() => {
    observers.current.forEach((observer) => observer.disconnect());
    observers.current = [];

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const designIndex = entry.target.getAttribute("data-index");
          setSelectedDesign(designs[designIndex]);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    const designElements = document.querySelectorAll(".carousel-item");
    designElements.forEach((element) => {
      observer.observe(element);
      observers.current.push(observer);
    });

    return () => {
      observers.current.forEach((observer) => observer.disconnect());
    };
  }, [designs]);

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
      alert("Design deleted successfully!");
    } else {
      alert("Failed to delete design.");
    }
  };

  const handleEdit = (design) => {
    router.push({
      pathname: "/editor/create",
      query: { design: JSON.stringify(design) },
    });
  };

  useEffect(() => {
    console.log(selectedDesign);
  }, [selectedDesign]);

  return (
    <div className="flex flex-col w-full p-4">
      <button
        className="btn btn-sm btn-success text-white w-fit"
        onClick={() => router.push("/editor/create")}
      >
        Create
      </button>
        <DesignPreview  design={selectedDesign} onDelete={handleDelete} onEdit={handleEdit} />

        <KeyboardCarousel designs={designs} onSelect={handleSelect} />
    </div>
  );
};

export default Index;
