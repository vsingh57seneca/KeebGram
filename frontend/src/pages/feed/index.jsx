import ContentDisplay from "@/components/content/ContentDisplay";
import NavBar from "@/components/navigation/NavBar";
import React, { useEffect, useState } from "react";
import Account from "@/functions/Accounts.js";
import Posts from "@/functions/Posts.js";

const index = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser && storedUser.email) {
      Account.getOne(storedUser.email);
    }

    const posts = Posts.getAll();
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        <div className={`w-fit`}>
          <NavBar user={user} posts={posts} setPosts={setPosts} />
        </div>
        <div className="w-px min-h-screen bg-gradient-to-b from-white via-gray-700 to-white hidden md:block"></div>
        <div className="w-full lg:ml-10">
          <ContentDisplay posts={posts} setPosts={setPosts} />
        </div>
      </div>
    </>
  );
};

export default index;
