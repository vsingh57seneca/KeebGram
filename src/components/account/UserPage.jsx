import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Accounts from "../../functions/Accounts";
import Designs from "../../functions/Designs";

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query; 

  const [user, setUser] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username]);

  const fetchUserData = async () => {
    try {
      console.log("this is the username:" + username)
      const userData = await Accounts.getOneByUsername(username);
   
      if (userData) {
        console.log("this is the user data:" + userData)
        setUser(userData);
        const userDesigns = await Designs.getDesignsByUserId(userData.account_id);
        setDesigns(userDesigns || []);
      } else {
        console.log("user not found")
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User {username} not found</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center">
        <img
          src={`${API_URL[0]}/images/avatar_${user.account_id}.jpg`}
          alt="User Avatar"
          className="w-24 h-24 rounded-full"
        />
        <h1 className="ml-4 text-2xl font-semibold">{user.display_name}</h1>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Designs</h2>
        <ul className="mt-4">
          {designs.length > 0 ? (
            designs.map((design) => (
              <li key={design.design_id} className="p-2 border-b">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => console.log(`Clicked on design: ${design.design_name}`)}
                >
                  {design.design_name}
                </button>
              </li>
            ))
          ) : (
            <li>No designs available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
