import React, { useEffect } from "react";
import { IoMdTrash } from "react-icons/io";
import Notifications from '@/functions/Notifications'
import { useNotification } from "@/contexts/NotificationContext";
import toast from "react-hot-toast";

const NotificationsDisplay = ({ notifications, setNotifications, user }) => {
    const { isNewNotification, setIsNewNotification } = useNotification() || {};

    useEffect(() => {
        markUserNotificationsRead(user?.account_id);
    }, [])

    const markUserNotificationsRead = async (account_id) => {
        const response = await Notifications.markUserNotificationsRead(account_id);
        if(response?.status === 200) {
            setIsNewNotification(false);
            fetchNotifications(account_id);
        }
    }

    const fetchNotifications = async (account_id) => {
        const response = await Notifications.getUserNotifications(account_id);

        if (response?.status == 200) {
          setNotifications(response?.data);
        } else {
            setNotifications([])
            setIsNewNotification(false);
          return;
        }
      };

      const handleDelete = async (notification_id) => {
        const response = await Notifications.delete(notification_id)

       if(response?.status === 200) {
        toast.success(response?.data)
        fetchNotifications(user?.account_id)
       } else {
        toast.error(response?.response?.data)
        fetchNotifications(user?.account_id)
       }
      }

  return (
    <div className="p-4 flex flex-col">
      <h1 className=" font-bold">Notifications</h1>

      {notifications.length < 1 ? (
        <p>No notifications</p>
      ) : (
        <>
          {notifications &&
            notifications?.map((notification, index) => {
              return (
                <div className="p-4 flex items-center justify-between">
                  <p>{notification?.message}</p>
                  <button>
                    <IoMdTrash className="text-red-500" onClick={() => handleDelete(notification?.notification_id)}/>
                  </button>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default NotificationsDisplay;
