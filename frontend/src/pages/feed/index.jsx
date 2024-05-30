import React, { useEffect, useState } from "react";
import NavBar from "@/components/navigation/NavBar";
import FinishSetup from "@/components/FinishSetup";
import axios from "axios";

const Index = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setSetupComplete(JSON.parse(storedUser).setup_finished);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stored user:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateUser = async () => {
      try {
        if (user) {
          const getAccountResponse = await axios.get(
            "http://localhost:3001/getAccountByEmail",
            {
              params: {
                email: user.email,
              },
            }
          );
          setUser(getAccountResponse.data);
          setSetupComplete(getAccountResponse.data.setup_finished);
          localStorage.setItem("user", JSON.stringify(getAccountResponse.data));
        }
      } catch (error) {
        console.error("Error updating account details:", error);
        alert(error.response.data);
      }
    };
    updateUser();
  }, [user]);

  const handleSetupComplete = () => {
    setSetupComplete(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex">
        <div className={`w-fit ${setupComplete ? "m-2" : ""}`}>
          <NavBar user={user} />
        </div>
        <div className="w-px min-h-screen bg-gradient-to-b from-white via-gray-700 to-white hidden md:block"></div>
        <div
          className={`m-4 w-full justify-center items-center ${
            setupComplete ? "flex" : "hidden"
          }`}
        >
          Content
        </div>
      </div>
      {!setupComplete && (
        <FinishSetup user={user} onComplete={handleSetupComplete} />
      )}
    </>
  );
};

export default Index;
