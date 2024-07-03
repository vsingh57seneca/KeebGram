import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "../../../../store";
import Comments from '@/functions/Comments'
import EditCommentForm from "@/components/comments/EditCommentForm";

const Comment = () => {
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState({});
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (id) {
      const fetchComment = async () => {
        try {
            const fetchedComment = await Comments.getOne(id);
            setComment(fetchedComment)
        } catch(error) {
            console.error("Failed to fetch comment:", error);
        }
      };
      fetchComment();
    }
  }, [id]);

  useEffect(() => {
        if(comment?.account_id && user) {
            if (comment?.account_id != user?.account_id) {
                toast.error("Unauthorized Access")
                router.push('/feed')
              }
        }
  }, [user, comment])

  return <div><EditCommentForm comment={comment}/></div>;
};

export default Comment;
