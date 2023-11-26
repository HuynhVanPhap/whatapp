import { useState, useContext } from "react";
import { doc, updateDoc, serverTimestamp, collection, getCountFromServer } from "firebase/firestore";
import { db } from '@/config/firebase';
import { AuthContext, ChatContext } from "@/context";

const useMessageChat = () => {
    const [displayMessageChat, setDisplayMessageChat] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    const turnOnDisplayMessageChat = async(user) => {
        // Check whether the group (chats in firestore) exists, if not create
        const combinedId = currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;

        try {
            const res = await getCountFromServer(collection(db, `chats/${combinedId}/messages`));

            if (res.data().count === 0) {
                // Create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        date: serverTimestamp()
                    }
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        date: serverTimestamp()
                    }
                });
            }
        } catch (err) {
            console.log(`Check chats in firestore error : ${err}`);
        }
        
        dispatch({
            type: "CHANGE_USER",
            payload: user
        });
        setDisplayMessageChat(true);

    }

    const turnOffDisplayMessageChat = () => setDisplayMessageChat(false);

    return [
        displayMessageChat,
        turnOnDisplayMessageChat,
        turnOffDisplayMessageChat
    ];
}

export default useMessageChat;