import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { postsAtom, userAtom } from "../../../store";
import FinishSetup from "@/components/feed/FinishSetup";
import ContentDisplay from "@/components/content/ContentDisplay";
import socket from "../../../store";
import toast from "react-hot-toast";
import { useSidebar } from "@/contexts/SidebarContext";
import Account from "@/functions/Accounts";
import Posts from "@/functions/Posts";

const Index = () => {
  const [user, setUser] = useAtom(userAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const { setSidebarContent } = useSidebar();

  useEffect(() => {
    setSidebarContent(<div></div>);
    return () => setSidebarContent(null); // Cleanup sidebar content on unmount
  }, [setSidebarContent]);

  const fetchPosts = async () => {
    const postArray = await Posts.getAll();
    if (postArray.length > 0) {
      const reversedArray = await postArray.reverse();
      setPosts(reversedArray);
    } else if (postArray?.response?.status === 404) {
      toast.error(postArray?.response?.data);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser && storedUser.email) {
      Account.getOne(storedUser.email);
    }
    fetchPosts();
  }, [setUser, setPosts]);

  useEffect(() => {
    socket.on("refresh_posts", () => {
      fetchPosts();
    });
  }, []);

  return (
    <>
      {!user?.is_verified ? (
        <>Verify</>
      ) : (
        <>
          {!user?.setup_finished ? (
            <FinishSetup user={user} />
          ) : (
            <ContentDisplay posts={posts} setPosts={setPosts} />
          )}
        </>
      )}
    </>
  );
};

export default Index;
