import React, { useEffect } from "react";
import Posts from "@/functions/Posts";
import PostDisplay from "../posts/PostDisplay";

const ContentDisplay = ({ posts, setPosts }) => {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let results = await Posts.getAll();
        setPosts(results);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="h-full">
        {posts?.length < 1 ? (
          <div className="flex items-center justify-center h-full">
            No Posts Available
          </div>
        ) : (
          <>
            <div className="p-2">
              {posts?.map((post, index) => (
              <div key={index} className={`flex w-full`}>
                <PostDisplay post={post} />
              </div>
              )) }
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ContentDisplay;
