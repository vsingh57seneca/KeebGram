import React, {useEffect} from "react";
import socket from "../../../store";

const CommentsDisplay = ({ comments, post, showComments, setShowComments }) => {
    
  return (
    <>
      {showComments ? (
        <>
          <button
            className="text-sm text-blue-400 font-semibold hover:text-blue-700"
            onClick={() => setShowComments(!showComments)}
          >
            Hide comments
          </button>
          <div>
            {comments?.map((comment, index) => {
              return (
                <div key={index} className="w-full flex flex-col border-2 p-4">
                  <div className="flex gap-x-4 w-full">
                    <img src={comment?.display_image} />
                    <h1>{comment?.display_name}</h1>
                    <p>{comment?.comment_date}</p>
                  </div>
                  <div className="">
                    <p>{comment?.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <button
            className="text-sm text-blue-400 font-semibold hover:text-blue-700"
            onClick={() => setShowComments(!showComments)}
          >
            {`Show comments (${comments?.length})`}
          </button>
        </>
      )}
    </>
  );
};

export default CommentsDisplay;
