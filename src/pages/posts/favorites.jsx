import ContentDisplay from "@/components/content/ContentDisplay";
import React, { useEffect } from "react";
import Posts from "@/functions/Posts.js";
import { useAtom } from "jotai";
import { postsAtom } from "../../../store";
import socket from "../../../store";
import toast from "react-hot-toast";
import { useSidebar } from "@/contexts/SidebarContext";

const Index = () => {
  const [posts, setPosts] = useAtom(postsAtom);
  const { setSidebarContent } = useSidebar();

  useEffect(() => {
    setSidebarContent(<div></div>);
    return () => setSidebarContent(null); // Cleanup sidebar content on unmount
  }, [setSidebarContent]);

  const fetchPosts = async (account_id) => {
    const postArray = await Posts.getLiked(account_id);
    if (postArray.length > 0) {
      const reversedArray = await postArray.reverse();
      return setPosts(reversedArray);
    } else if (postArray?.response?.status === 404) {
      toast.error(postArray?.response?.data);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    let fetchedPosts = fetchPosts(storedUser.account_id);
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
    <ContentDisplay posts={posts} setPosts={setPosts} />
    </>
  );
};

export default Index;