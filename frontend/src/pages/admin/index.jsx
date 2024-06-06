import React, { useState, useEffect} from 'react'
import NavBar from '@/components/navigation/NavBar'
import Account from '@/functions/Accounts.js'

const index = () => {
    const [user, setUser] = useState({});
  
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      if (storedUser && storedUser.email) {
        Account.getOne(storedUser.email);
      }
    }, []);

  return (
    <>
    <div className="flex min-h-screen">
      <div className={`w-fit`}>
        <NavBar user={user} />
      </div>
      <div className="w-px min-h-screen bg-gradient-to-b from-white via-gray-700 to-white hidden md:block"></div>
      <div className={`m-4 w-full justify-center items-center flex`}>
        Admin Panel
      </div>
    </div>
  </>
  )
}

export default index