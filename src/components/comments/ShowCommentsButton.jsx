import React, { useEffect, useState } from "react";
import Comment from "@/functions/Comments";
import { MdChatBubbleOutline } from 'react-icons/md'

const ShowCommentsButton = ({ post, showComments, setShowComments }) => {
  return <>
    <div className="">
      <MdChatBubbleOutline onClick={() => setShowComments(!showComments)} size={25} />
    </div>
  </>;
};

export default ShowCommentsButton;
