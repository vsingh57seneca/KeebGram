import React, { useEffect } from 'react'
import { useAtom } from "jotai";
import { postsAtom, userAtom } from "../../../../../store";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import UserManagementView from '@/components/admin/users/manage/UserManagementView';

const index = () => {
    const [user, setUser] = useAtom(userAtom);
    const router = useRouter();
  
    useEffect(() => {
      if(user && !user?.is_admin) {
        toast.error("Unauthorized")
        router.push('/feed')
      }
    }, []);

  return (
    <div className="h-full p-4">
      <h1 className="font-bold col-span-full">User Management</h1>
        <UserManagementView />
    </div>
  )
}

export default index