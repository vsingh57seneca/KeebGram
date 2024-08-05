import React, { useState, useEffect } from "react";
import { MdOutlineEdit, MdReport } from "react-icons/md";
import { useRouter } from "next/router";
import { userAtom } from "../../../store";
import { useAtom } from "jotai";
import { motion } from "framer-motion";
import ReportDisplay from "@/components/reports/ReportDisplay";


const CommentActionBar = ({ comment }) => {
    const [user, setUser] = useAtom(userAtom);
    const [showReportsModal, setShowReportsModal] = useState(false);
    const router = useRouter();

    const handleCloseModal = () => {
      setShowReportsModal(false);
    };


  return (
    <>
    <ReportDisplay
     onClose={handleCloseModal}
     id={comment?.comment_id}
     type={"comment"}
     setShowModal={setShowReportsModal}
     showModal={showReportsModal} 
     />
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
        <motion.div
          whileHover={{ rotateZ: 360, scale: 1.5 }}
          transition={{ duration: 0.5 }}
          className={`cursor-pointer flex hover:text-green-500 ease-in-out transition-all duration-0`}
          onClick={() => setShowReportsModal(!showReportsModal)}
        >
          <MdReport className="text-red-500" size={30}/>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default CommentActionBar;
