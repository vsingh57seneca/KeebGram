import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import Posts from '@/functions/Posts';
import Comments from '@/functions/Comments';

const ReportsWidget = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchReportedPosts = async () => {
      let posts = await Posts.getReported();
      setPosts(posts);
    };

    const fetchReportedComments = async () => {
      let comments = await Comments.getReported();
      setComments(comments);
    }

    fetchReportedPosts();
    fetchReportedComments();
  }, []);

  return (
    <div className="stats shadow w-full bg-white text-black">
      <div className="stat">
        <div className="stat-title">Reported Posts and Comments</div>
        <div className="stat-value">
        {(posts?.length ?? 0) + (comments?.length ?? 0) > 0 ? (posts?.length ?? 0) + (comments?.length ?? 0) : "0"}
        </div>
        <div className="flex justify-between">
          <div className="stat-desc">Total Reports</div>
          <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => router.push('/admin/reports/manage')}>
            <div className="stat-desc">Reports</div>
            <FaExternalLinkAlt size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsWidget;
