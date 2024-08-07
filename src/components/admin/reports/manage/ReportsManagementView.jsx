import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { userAtom } from "../../../../../store";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { IoMdTrash, IoMdInformationCircleOutline, IoIosAddCircleOutline } from "react-icons/io";
import Accounts from "@/functions/Accounts";
import Posts from "@/functions/Posts";
import Comments from "@/functions/Comments";
import PostDisplay from "@/components/posts/PostDisplay";
import Reports from "@/functions/Reports";

const ReportsManagementView = () => {
  const [user, setUser] = useAtom(userAtom);
  const [posts, setPosts] = useState([]);
  const [details, setDetails] = useState({});
  const [selectedPost, setSelectedPost] = useState({});
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [comments, setComments] = useState([]);
  const [reports, setReports] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user && !user?.is_admin) {
      toast.error("Unauthorized");
      router.push("/feed");
      return;
    }

    const fetchReportedItems = async () => {
      try {
        const [reportedPosts, reportedComments, reports] = await Promise.all([
          Posts.getReported(),
          Comments.getReported(),
          Reports.getAll(),
        ]);

        setPosts(reportedPosts);
        setComments(reportedComments);
        setReports(reports);

        const accountIds = [
          ...new Set([
            ...(reportedPosts ?? []).map(post => post.account_id),
            ...(reportedComments ?? []).map(comment => comment.account_id),
          ]),
        ];

        const accounts = await Promise.all(
          accountIds.map(id => Accounts.getOneById(id))
        );

        const accountDetails = accounts.reduce((acc, account) => {
          acc[account.account_id] = account.display_name;
          return acc;
        }, {});

        setDetails(accountDetails);
      } catch (error) {
        console.error('Error fetching reported items:', error);
      }
    };

    fetchReportedItems();
  }, [user, router]);

  const onShowDetail = (post, owner) => {
    setSelectedPost({ post, owner });
    setShowPostDetail(!showPostDetail);
  };

  const getReportDescription = (report_id) => {
    return reports.find(r => r.report_id === report_id).description;
  };

  const removeReport = async (type, id) => {
    console.log(`type: ${type}, id: ${id}`);
    try {
      if (type === 'post') {
        await Posts.removeReport(id);
      } else if (type === 'comment') {
        await Comments.removeReport(id);
      }
      await updateList(type);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePostComment = async (type, id) => {
    try {
      if (type === 'post') {
        await Posts.delete(id);
      } else if (type === 'comment') {
        await Comments.delete(id);
      }
      await updateList(type);
    } catch (error) {
      console.error(error);
    }
  };

  const updateList = async (type) => {
    console.log("Inside UpdateList");
    if (type === 'post') {
      const updatedPosts = await Posts.getReported();
      setPosts(updatedPosts);
    } else if (type === 'comment') {
      const updatedComments = await Comments.getReported();
      setComments(updatedComments);
    }
  }

  return (
    <>
      <br />
      {!showPostDetail ? (
        <>
          <h3>Reported Posts</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Owner</th>
                  <th>Details</th>
                  <th>Report Cause</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {posts?.length > 0 ? posts.map((post) => (
                  <tr key={post.post_id}>
                    <td>{post.post_id}</td>
                    <td>{details[post.account_id]}</td>
                    <td>
                      <button
                        className="btn btn-xs btn-info text-white"
                        onClick={() => onShowDetail(post, details[post.account_id])}
                      >
                        <IoMdInformationCircleOutline />
                      </button>
                    </td>
                    <td>{getReportDescription(post.is_reported)}</td>
                    <td>
                      <button className="btn btn-xs btn-success text-white" onClick={() => removeReport('post', post.post_id)}>
                        <IoIosAddCircleOutline />
                      </button>
                      <button className="btn btn-xs btn-error text-white" onClick={() => deletePostComment('post', post.post_id)}>
                        <IoMdTrash />
                      </button>
                    </td>
                  </tr>
                )) : <></>
                }
              </tbody>
              <tfoot>
                <tr>
                  <th>ID</th>
                  <th>Owner</th>
                  <th>Details</th>
                  <th>Report Cause</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <br />
          <h3>Reported Comments</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Owner</th>
                  <th>Content</th>
                  <th>Report Cause</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {comments?.length > 0 ? comments.map((comment) => (
                  <tr key={comment.comment_id}>
                    <td>{comment.comment_id}</td>
                    <td>{details[comment.account_id]}</td>
                    <td>{comment.content}</td>
                    <td>{getReportDescription(comment.is_reported)}</td>
                    <td>
                      <button className="btn btn-xs btn-success text-white" onClick={() => removeReport('comment', comment.comment_id)}>
                        <IoIosAddCircleOutline />
                      </button>
                      <button className="btn btn-xs btn-error text-white" onClick={() => deletePostComment('comment', comment.comment_id)}>
                        <IoMdTrash />
                      </button>
                    </td>
                  </tr>
                )) : <></>
                }
              </tbody>
              <tfoot>
                <tr>
                  <th>ID</th>
                  <th>Owner</th>
                  <th>Content</th>
                  <th>Report Cause</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : (
        <div className="absolute top-0 left-0 bg-black/70 w-full flex h-full justify-center items-center">
          <div className="bg-white flex flex-col gap-y-4 rounded-lg border mb-20">
            {selectedPost ? (
              <PostDisplay post={selectedPost.post} owner={selectedPost.owner} />
            ) : (
              <>No post selected</>
            )}
            <div className="w-full flex justify-between p-4">
              <button
                className="btn btn-sm text-white w-fit"
                onClick={() => {
                  setSelectedPost(null);
                  setShowPostDetail(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <br />
    </>
  );
};

export default ReportsManagementView;
