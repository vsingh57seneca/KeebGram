import "@/styles/globals.css";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "@/components/navigation/NavBar";
import { useAtom } from "jotai";
import { postsAtom, userAtom } from "../../store";
import Account from "@/functions/Accounts";
import React, { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useAtom(userAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This sets `isClient` to true when the component is mounted on the client side
    setIsClient(true);
  }, []);

  return (
    <div className="bg-white text-black max-h-screen flex">
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "red",
              color: "#fff",
            },
          },
        }}
      />
      {isClient && window.location.pathname !== "/" && (
        <div className="flex">
          <NavBar user={user} posts={posts} setPosts={setPosts} />
        </div>
      )}
      <div className="w-px bg-gradient-to-b from-white via-gray-700 to-white"></div>
      <div className="md:min-h-screen h-[calc(100vh-58px)] p-4 overflow-hidden overflow-y-auto w-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
