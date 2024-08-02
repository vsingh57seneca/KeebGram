import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Accounts from '@/functions/Accounts'
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { userAtom } from "../../../store";

const VerifyToken = () => {
  const router = useRouter();
  const { token } = router.query;
  const [user, setUser] = useAtom(userAtom);

  const verify = async (token) => {
    let results = await Accounts.verify(token);

    console.log(results)
    
    if(results.status === 200) {
      console.log(results);
      toast.success(results?.data?.message);
      setUser(results?.data?.user);
      localStorage.setItem('user', JSON.stringify(results?.data?.user));
      router.push('/')
    }
  }
  useEffect(() => {
    if (token) {  
      verify(token);
    }
  }, [token]);
  return (
    <div className="flex flex-col w-full items-center justify-center h-full">
      <span className="loading loading-spinner loading-md text-yellow-500"></span>
      <p className="font-semibold">Verifying Account...</p>
    </div>
  );
};

export default VerifyToken;
