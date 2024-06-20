import React, { useState, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useRouter } from "next/router";
import { userAtom } from "../../../store";
import { useAtom } from "jotai";


const CommentActionBar = ({ comment }) => {
    const [user, setUser] = useAtom(userAtom);
    const router = useRouter();

    console.log(comment)
  return (
    <div>
      <div className="p-2 flex flex-col gap-y-4">
        <div
          className={`cursor-pointer flex ${ comment?.account_id != user?.account_id && 'hidden'}`}
        >
          <MdOutlineEdit
            size={20}
            onClick={() => router.push(`/comments/edit/${comment?.comment_id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentActionBar;
