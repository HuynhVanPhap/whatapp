import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState, useContext } from "react";
import { db } from '@/config/firebase';
import { AuthContext } from "@/context";
import { useDateTime } from "@/hook";

export const UserChatsContext =  createContext();

export const UserChatsContextProvider = ({ children }) => {
    const [userChats, setUserChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [formatTimeLastMessage] = useDateTime();

    useEffect(() => {
        const getUsersChat = () => {
            const unSub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setUserChats(Object.entries(doc.data()).map((user, index) => {
                    if (user[1]?.lastMessage?.date) {
                        user[1].lastMessage.time = formatTimeLastMessage(user[1]?.lastMessage?.date.toDate());
                    }
                    return user[1];
                }));
            });
    
            return () => {
                unSub();
            };
        };

        currentUser.uid && getUsersChat();
    }, [currentUser.uid])

    return (
        <UserChatsContext.Provider value={{ userChats }}>
            { children }
        </UserChatsContext.Provider>
    );
}