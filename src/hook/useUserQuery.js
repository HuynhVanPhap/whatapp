import { useState, useContext } from "react";
import { collection, query, where, getDocs, and, or, orderBy} from "firebase/firestore";
import { AuthContext } from "@/context";
import { db } from '@/config/firebase';
import { useString } from "@/hook";

const useUserQuery = () => {
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [upperName] = useString();

    const handleSetUserName = (e) => {
        setUserName(e.target.value);
    }

    const filterNewUsersChat = async () => {
        const usersRef = collection(db, 'users');
        const upperDisplayName = (userName !== '') ? upperName(userName) : '';
        
        const searchUsersQuery = query(
            usersRef,
            orderBy('displayName', 'desc'),
            and(
                and(
                    where('displayName', '>=', upperDisplayName),
                    where('displayName', '<=', upperDisplayName+'\uf8ff')
                ),
                and(
                    where("displayName", "!=", currentUser.displayName)
                )
            )
        );

        try {
            const usersArr = [];
            const querySnapshot = await getDocs(searchUsersQuery);

            querySnapshot.forEach((doc) => {
                usersArr.push(doc.data());
            });

            setUsers(usersArr);
        } catch(error) {
            console.log(error);
        }
    }

    const filterUsersChat = async () => {
        // const userChatsRef = collection(db, 'userChats');
        // upperName(userName);
        console.log(3);
    }

    // const searchUserChatByName = async () => {
    //     const userChatsRef = collection(db, 'userChats');
    //     const upperDisplayName = (userName !== '') ? upperName(userName) : '';

    //     const searchUserChatsQuery = query(
    //         userChatsRef,
    //         orderBy('displayName', 'desc')
    //     );

    //     try {
    //         const userChatsArr = [];
    //         const querySnapshot = await getDocs(searchUserChatsQuery);

    //         querySnapshot.forEach((doc) => {
    //             userChatsArr.push(doc.data());
    //         });

    //         setUsers(userChatsArr);
    //     } catch(error) {
    //         console.log(`Search users's chat had been error : ${error}`);
    //     }
    // }

    const getUsers = async () => {
        try {
            const arr = [];
            const data = await getDocs(query(
                collection(db, 'users'),
                where("uid", "!=", currentUser.uid)
            ));
    
            data.forEach((doc) => {
                arr.push(doc.data());
            });
            
            setUsers([...arr]);
        } catch (err) {
            console.log(`Get users error : ${err}`);
        }
    };

    return [
        users,
        userName,
        handleSetUserName,
        filterNewUsersChat,
        filterUsersChat,
        getUsers
    ];
}

export default useUserQuery;