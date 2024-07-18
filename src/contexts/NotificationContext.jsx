import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [isNewNotification, setIsNewNotification] = useState(false);

    return (
        <NotificationContext.Provider value={{ isNewNotification, setIsNewNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};
