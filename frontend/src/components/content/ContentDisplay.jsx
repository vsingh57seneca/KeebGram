import React, { useEffect, useState } from "react";
import Posts from "@/functions/Posts";
import PostDisplay from "../posts/PostDisplay";
import Accounts from "@/functions/Accounts";

const ContentDisplay = ({ posts, setPosts }) => {
  const [postDetails, setPostDetails] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let results = await Posts.getAll();
        setPosts(results);

        const details = await Promise.all(
          posts.map(async (post) => {
            const account = await Accounts.getOneById(post?.account_id);
            return { ...post, account }
          })
        );

        const postDetailsMap = details.reduce((acc, curr) => {
          acc[curr.account_id] = curr.account;
          return acc;
        }, {});

        setPostDetails(postDetailsMap);

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
                <PostDisplay post={post} owner={postDetails[post?.account_id]?.display_name} />
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
