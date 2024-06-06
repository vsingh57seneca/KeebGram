import React, { useEffect, useState } from "react";
import Posts from "@/functions/Posts";
import PostDisplay from "../posts/PostDisplay";
import { useAtom } from "jotai";
import { displayImageAtom } from "../../../store";

const ContentDisplay = ({ posts, setPosts }) => {
  const [displayImage, setDisplayImage] = useAtom(displayImageAtom);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let results = await Posts.getAll();
        // setPosts(results.data); // Assuming `results.data` contains the posts
        setPosts(results.data.reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-h-screen overflow-hidden overflow-y-auto p-4">
      <div className="flex flex-col mx-4">
        {" "}
        {/* Ensures vertical stacking with spacing */}
        {!posts || posts.length < 1
          ? <div className="flex items-center justify-center min-h-screen">No Posts Available</div>
          : posts?.map((post, index) => (
              <div key={index} className="flex">
                <PostDisplay post={post} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default ContentDisplay;
