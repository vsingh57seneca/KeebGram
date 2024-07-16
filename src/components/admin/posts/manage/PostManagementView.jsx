import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { postsAtom, userAtom } from "../../../../../store";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { IoMdTrash, IoMdInformationCircleOutline } from "react-icons/io";
import Accounts from "@/functions/Accounts";
import PostDisplay from "@/components/posts/PostDisplay";

const PostManagementView = () => {
  const [user, setUser] = useAtom(userAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [postDetails, setPostDetails] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [showPostDetail, setShowPostDetail] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && !user?.is_admin) {
      toast.error("Unauthorized");
      router.push("/feed");
      return;
    }

    const fetchPostsDetails = async () => {
      try {
        const details = await Promise.all(
          posts.map(async (post) => {
            const account = await Accounts.getOneById(post?.account_id);
            return { ...post, account };
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

    fetchPostsDetails();
  }, []);

  useEffect(() => {
    console.log(postDetails);
  }, [postDetails]);

  const onShowDetail = (post, owner) => {
    setSelectedPost({ post: post, owner: owner });
    setShowPostDetail(!showPostDetail);
  };

  return (
    <>
      {!showPostDetail ? (
        <>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Owner</th>
                  <th>Details</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {posts &&
                  posts.map((post, index) => {
                    console.log(post);
                    return (
                      <>
                        <tr>
                          <td>{post?.post_id}</td>
                          <td>{postDetails[post?.account_id]?.display_name}</td>
                          <td>
                            <button
                              className="btn btn-xs btn-info text-white"
                              onClick={() =>
                                onShowDetail(
                                  post,
                                  postDetails[post?.account_id]?.display_name
                                )
                              }
                            >
                              <IoMdInformationCircleOutline />
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-xs btn-error text-white">
                              <IoMdTrash />
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>

              <tfoot>
                <tr>
                  <th>ID</th>
                  <th>Owner</th>
                  <th>Details</th>
                  <th>Delete</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-0 left-0 bg-black/70 w-full flex h-full justify-center items-center">
            <div className="bg-white flex flex-col gap-y-4 rounded-lg border mb-20">
              {selectedPost ? (
                <PostDisplay
                  post={selectedPost?.post}
                  owner={selectedPost?.owner}
                />
              ) : (
                <>No post selected</>
              )}
              <div className="w-full flex justify-between p-4">
                <button className="btn btn-sm text-white btn-error ">Delete</button>
                <button className="btn btn-sm text-black w-fit" onClick={() => {
                    setSelectedPost({})
                    setShowPostDetail(!showPostDetail)
                }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostManagementView;
