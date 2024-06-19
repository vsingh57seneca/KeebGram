import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Posts from "@/functions/Posts";
import EditPostForm from "@/components/posts/EditPostForm";
import { useAtom } from "jotai";
import { userAtom } from "../../../../store";
import toast from "react-hot-toast";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    console.log("Router query id:", id);
    if (id) {
      const fetchPost = async () => {
        try {
          console.log("Fetching post with ID:", id);
          const fetchedPost = await Posts.getOne(id);
          setPost(fetchedPost);
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      };
      fetchPost();
    }
  }, [id]);

  useEffect(() => {
    if (post?.account_id && user) {
      if (post?.account_id != user?.account_id) {
        toast.error("Unauthorized Access")
        router.push('/feed')
      }
    } 
  }, [user, post]);

  return (
    <div>
      <EditPostForm post={post} />
    </div>
  );
};

export default Post;
