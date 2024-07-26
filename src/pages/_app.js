import "@/styles/globals.css";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "@/components/navigation/NavBar";
import { useAtom } from "jotai";
import { postsAtom, userAtom } from "../../store";
import React, { useState, useEffect } from "react";
import { NotificationProvider } from "@/contexts/NotificationContext";
import SidebarComponent from "@/components/global_components/SidebarComponent";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useAtom(userAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [isClient, setIsClient] = useState(false);
  const [hideSecondaryOnRoot, setHideSecondaryOnRoot] = useState(false);

  useEffect(() => {
    if (window.location.pathname == "/") {
      setHideSecondaryOnRoot(!hideSecondaryOnRoot);
    }
    setIsClient(true);
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_KEY}>
      <SidebarProvider>
        <NotificationProvider>
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
            <div className="md:min-h-screen h-[calc(100vh-58px)] overflow-hidden overflow-y-auto w-full flex">
              <div className="w-full">
                <Component {...pageProps} />
              </div>
              <div
                className={`lg:w-full lg:flex hidden p-1 ${
                  isClient && window.location.pathname == "/" && "lg:hidden"
                }`}
              >
                <SidebarComponent />
              </div>
            </div>
          </div>
        </NotificationProvider>
      </SidebarProvider>
    </GoogleOAuthProvider>
  );
}
