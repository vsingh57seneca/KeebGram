import ContentDisplay from "@/components/content/ContentDisplay";
import React, { useEffect } from "react";
import Account from "@/functions/Accounts.js";
import Posts from "@/functions/Posts.js";
import { useAtom } from "jotai";
import { postsAtom, userAtom } from "../../../store";
import FinishSetup from "@/components/feed/FinishSetup";
import socket from "../../../store";
import toast from "react-hot-toast";

const Index = () => {
  const [user, setUser] = useAtom(userAtom);
  const [posts, setPosts] = useAtom(postsAtom);

  const fetchPosts = async () => {
    const postArray = await Posts.getAll();
    if (postArray.length > 0) {
      const reversedArray = await postArray.reverse();
      return setPosts(reversedArray);
    } else if (postArray?.response.status === 404) {
      toast.error(postArray?.response?.data);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser && storedUser.email) {
      Account.getOne(storedUser.email);
    }
    let fetchedPosts = fetchPosts();
    setPosts(fetchedPosts);
  }, []);

  useEffect(() => {
    socket.on("refresh_posts", () => {
      console.log("Refresh posts");
      fetchPosts();
    });
  }, [socket]);

  return (
    <>
      {!user?.setup_finished ? (
        <FinishSetup user={user} />
      ) : (
        <ContentDisplay posts={posts} setPosts={setPosts} />
      )}
    </>
  );
};

export default Index;
