import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/context";
import { doc, onSnapshot, limit, query, collection } from "firebase/firestore";
import { db } from '@/config/firebase';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        }
    }, [data.chatId]);

    const loadPreviousMessages = () => {

    }

    return [
        messages,
        loadPreviousMessages
    ];
}

export default useChat;