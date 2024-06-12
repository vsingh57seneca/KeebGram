import ContentDisplay from "@/components/content/ContentDisplay";
import NavBar from "@/components/navigation/NavBar";
import React, { useEffect, useState } from "react";
import Account from "@/functions/Accounts.js";
import Posts from "@/functions/Posts.js";
import { useAtom } from "jotai";
import { postsAtom, userAtom } from "../../../store";
import FinishSetup from "@/components/feed/FinishSetup";

const index = () => {
  const [user, setUser] = useAtom(userAtom);
  const [posts, setPosts] = useAtom(postsAtom);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser && storedUser.email) {
      Account.getOne(storedUser.email);
    }
    const fetchPosts = async () => {
      const postArray = await Posts.getAll();
      setPosts(postArray?.reverse())
    };
    fetchPosts();
  }, []);

  return (
    <>
      {!user?.setup_finished ? <FinishSetup user={user} /> : <ContentDisplay posts={posts} setPosts={setPosts} />}
    </>
  );
};

export default index;
