import { useContext } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { AuthContext, ChatContext } from "@/context";
import { db } from '@/config/firebase';

const useLastMessage = () => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const updateSeen = async () => {
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId+".lastMessage.isSeen"]: true 
        });
    }

    return [
        updateSeen
    ];
}

export default useLastMessage;