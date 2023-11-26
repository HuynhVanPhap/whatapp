import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/context";
import { onSnapshot, limit, query, collection, orderBy, startAfter, getDocs } from "firebase/firestore";
import { db } from '@/config/firebase';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [lastKey, setLastKey] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(query(
            collection(db, `chats/${data.chatId}/messages`), orderBy('date', 'desc'), limit(20)
        ), (snapshot) => {
            if (snapshot.docs.length > 0) {
                setMessages(snapshot.docs.reverse().map(doc => {
                    return doc.data();
                }));
                
                setNewMessage(snapshot.docs[0]);
                setLastKey(snapshot.docs[snapshot.docs.length - 1]);
                setLoadMore(false);
            }
        });

        return () => {
            unSub();
        }
    }, [data.chatId]);

    const loadPreviousMessages = async () => {
        setLoading(true);

        if (lastKey !== null) {
            await getDocs(query(
                collection(db, `chats/${data.chatId}/messages`), orderBy('date', 'desc'), startAfter(lastKey), limit(10))
            ).then(cols => {
                if (cols.docs.length > 0) {
                    const arr = cols.docs.reverse().map(doc => {
                        return doc.data();
                    });

                    setMessages(prevState => [
                        ...arr,
                        ...prevState
                    ]);
                    
                    setLastKey(cols.docs[cols.docs.length - 1]);
                    setLoadMore(true);
                } else {
                    setLastKey(null);
                }
            });
        }

        setLoading(false);
        return true;
    }

    return [
        messages,
        loading,
        loadPreviousMessages,
        newMessage,
        lastKey,
        loadMore
    ];
}

export default useChat;