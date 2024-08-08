import React, { useEffect, useState } from "react";
import { FaShieldAlt, FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import { DEBUG, API_URL } from "../../../config";
import CommentsDisplay from "../comments/CommentsDisplay";
import Designs from "@/functions/Designs";
import PostActionBar from "./PostActionBar";
import { Colors, Key, Keyboard } from "../keyboard";

const PostDisplay = ({ post, owner }) => {
  const [showComments, setShowComments] = useState(false);
  const router = useRouter();
  const [design, setDesign] = useState([]);

  const handleAvatarClick = () => {
    // Navigate to the user's profile page using their username
    console.log(owner);
    router.push(`/account/${owner.display_name}`);
  };

  const fetchDesign = async () => {
    if (post?.design_id != null) {
      const results = await Designs.getDesignById(post?.design_id);
      setDesign(results[0]);
    }
  };

  useEffect(() => {
    if (post?.design_id) {
      fetchDesign(post?.design_id);
    }
  }, []);

  return (
    <div className="flex w-full justify-between border">
      <div className="w-full">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-4 p-2 w-fit">
            <button className="focus:outline-none" onClick={handleAvatarClick}>
              <img
                src={`${API_URL[0]}/images/avatar_${owner?.account_id}.jpg`}
                className="w-12 h-12 rounded-full object-cover"
                alt="User Avatar"
              />
            </button>
            <div className="flex flex-col">
              <h1 className="font-semibold">
                {owner?.display_name}
                {owner?.is_admin ? <FaShieldAlt className="inline-block ml-2 text-blue-500" title="Admin" /> : null}
                {owner?.is_vendor ? <FaCheck className="inline-block ml-2 text-green-500" title="Vendor" /> : null}
              </h1>
              <p className="text-xs">{post?.created_at}</p>
            </div>
          </div>
          <div className="w-fit p-4 flex flex-col gap-y-4">
            <p>{post?.content_text}</p>
            <div className="overflow-hidden overflow-y-auto no-scrollbar">
              {post?.content_image && (
                <Image
                  className="rounded-lg max-w-[80%]"
                  src={post.content_image}
                  alt="Post Content"
                  layout="responsive"
                  width={700} // Adjust width to match your image's aspect ratio
                  height={475} // Adjust height to match your image's aspect ratio
                />
              )}
              {post?.design_id && (
                <>
                  <h1 className="text-lg font-bold">{design?.design_name}</h1>
                  <Keyboard
                    accentColor={Colors[design?.accents_color]}
                    alphaColor={Colors[design?.alphas_color]}
                    legendColor={Colors[design?.legends_color]}
                    modifierColor={Colors[design?.modifiers_color]}
                  />
                </>
              )}
            </div>
          </div>
          {showComments && (
            <CommentsDisplay
              post={post}
              showComments={showComments}
              setShowComments={setShowComments}
            />
          )}
        </div>
      </div>
      <div>
        <PostActionBar
          post={post}
          setShowComments={setShowComments}
          showComments={showComments}
        />
      </div>
    </div>
  );
};

export default PostDisplay;
