import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { postsAtom, userAtom } from "../../../store";
import FinishSetup from "@/components/feed/FinishSetup";
import ContentDisplay from "@/components/content/ContentDisplay";
import socket from "../../../store";
import toast from "react-hot-toast";
import { useSidebar } from "@/contexts/SidebarContext";
import Account from "@/functions/Accounts";
import Posts from "@/functions/Posts";

const VerificationModal = () => (
  <div className="modal modal-open">
    <div className="modal-box" style={{ backgroundColor: "white", color: "black" }}>
      <h3 className="font-bold text-lg">Verification Required!</h3>
      <p className="py-4">Your account must be verified to continue.</p>
      <p className="py-4">Please verify your account by following the instructions sent to your email.</p>
    </div>
  </div>
);

const Index = () => {
  const [user, setUser] = useAtom(userAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [loading, setLoading] = useState(true);
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
      Account.getOne(storedUser.email).then(() => {
        fetchPosts().then(() => {
          setLoading(false);
        });
      });
    } else {
      setLoading(false);
    }
  }, [setUser, setPosts]);

  useEffect(() => {
    socket.on("refresh_posts", () => {
      fetchPosts();
    });
    return () => {
      socket.off("refresh_posts");
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!user?.is_verified ? (
        <VerificationModal />
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
