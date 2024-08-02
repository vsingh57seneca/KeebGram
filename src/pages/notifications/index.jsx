import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { notificationsAtom, userAtom } from '../../../store'
import Notifications from '@/functions/Notifications'
import Account from '@/functions/Accounts'
import NotificationsDisplay from '@/components/notifications/manage/NotificationsDisplay'
import { useSidebar } from '@/contexts/SidebarContext'

const index = () => {
    const [notifications, setNotifications] = useAtom(notificationsAtom);
    const [user, setUser] = useAtom(userAtom)
    const { setSidebarContent } = useSidebar();

    useEffect(() => {
      setSidebarContent(<div></div>);
      return () => setSidebarContent(null); // Cleanup sidebar content on unmount
    }, [setSidebarContent]);

      useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
        if (storedUser && storedUser.email) {
          Account.getOne(storedUser.email);
        }
      }, []);

      useEffect(() => {
      }, [setUser])
  
    return (
    <div>{!user ? <p>Loading...</p> : <NotificationsDisplay notifications={notifications} setNotifications={setNotifications} user={user} /> }</div>
  )
}

export default index