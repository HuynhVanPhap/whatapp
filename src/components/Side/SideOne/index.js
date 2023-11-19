import { useContext, useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import { collection, query, where, getDocs, and, orderBy} from "firebase/firestore";
import { db } from '@/config/firebase';
import { CommentIcon } from "@/icons";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import SearchBox from "@/components/SearchBox";
import Sidebar from "@/components/Sidebar";
import Avatar from "@/components/Avatar";
import { AuthContext, UserChatsContext } from "@/context";
import { useString } from "@/hook";
import './styles.scss';

function SideOne({ toggleDisplayNewChat, turnOnDisplayMessageChat  }) {
    const [users, setUsers] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { userChats } = useContext(UserChatsContext);
    const [upperName] = useString();

    const filterUsersChat = async (userName) => {
        setUsers(userChats.filter((user) => {
            return user.displayName.search(upperName(userName)) !== -1 && user;
        }));
    }
    
    // Không thực hiện được vì cấu trúc database không phù hợp
    // const filterUsersChat = async (userName) => {
    //     const userChatsRef = collection(db, 'userChats');
    //     const upperDisplayName = (userName !== '') ? upperName(userName) : '';

    //     const searchUserChatsQuery = query(
    //         userChatsRef,
    //         orderBy('displayName', 'desc'),
    //         and(
    //             and(
    //                 where('displayName', '>=', upperDisplayName),
    //                 where('displayName', '<=', upperDisplayName+'\uf8ff')
    //             ),
    //             and(
    //                 where("displayName", "!=", currentUser.displayName)
    //             )
    //         )
    //     );

    //     try {
    //         const userChatsArr = [];
    //         const querySnapshot = await getDocs(searchUserChatsQuery);

    //         querySnapshot.forEach((doc) => {
    //             userChatsArr.push(doc.data());
    //         });
    //         setUsers(userChatsArr);
    //     } catch(error) {
    //         console.log(`Search user's chats had been error : ${error}`);
    //     }
    // }

    return (
        <div className="side-one">
            <Stack className="side-one__wrap">
                <div className="heading">
                    <div className="heading-avatar">
                        <Avatar name={currentUser.photoURL} width="40px" height="40px" />
                    </div>
                    <div className="heading-name">
                        <span className="three-dot">{currentUser.displayName}</span>
                    </div>
                    <div className="heading-option">
                        <div className="heading-option__dot pullRight">
                            <Button 
                                variant="outlined"
                                size='small'
                                onClick={() => signOut(auth)}
                            >
                                Logout
                            </Button>
                        </div>
                        <div
                            className="heading-option__compose pullRight"
                            onClick={toggleDisplayNewChat}
                        >
                            <CommentIcon />
                        </div>
                    </div>
                </div>
                <SearchBox 
                    handleFilter={filterUsersChat}
                />

                <div className="sidebar-wrap">
                    <Sidebar users={users.length > 0 ? users : userChats} turnOnDisplayMessageChat={turnOnDisplayMessageChat} />
                </div>

                <div className="clear"></div>
            </Stack>
        </div>
    );
}

export default SideOne;