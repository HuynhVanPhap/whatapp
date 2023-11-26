import { useState, useContext, useEffect } from "react";
import { collection, query, where, getDocs, and, orderBy} from "firebase/firestore";
import { AuthContext } from "@/context";
import { db } from '@/config/firebase';
import { useString } from "@/hook";
import { Stack } from '@mui/material';
import SearchBox from "@/components/SearchBox";
import Sidebar from "@/components/Sidebar";
import { ArrowLeftIcon } from '@/icons';
import './styles.scss';

function SideTwo({ displayNewChat, toggleDisplayNewChat, turnOnDisplayMessageChat }) {
    const [users, setUsers] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [upperName] = useString();

    useEffect(() => {
        // console.log('Bị 2 lần render vào lần truy cập đầu tiên'); // Bị 2 lần render vào lần đầu
        displayNewChat && getUsers();
    }, [displayNewChat]);

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

    const filterNewUsersChat = async (userName) => {
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

    return (
        <div className={`side-two ${displayNewChat && 'showSide'}`}>
            <Stack className='side-two__wrap'>
                <div className='heading heading-message'>
                    <div
                        className='heading__back'
                    >
                        <div className='icon-wrap__back' onClick={toggleDisplayNewChat}>
                            <ArrowLeftIcon />
                        </div>
                    </div>
                    <div className='heading__title'>
                        New Chat
                    </div>
                </div>
                
                <SearchBox
                    placeholder="Search people..."
                    handleFilter={filterNewUsersChat}
                />
                
                <div className="sidebar-wrap">
                    <Sidebar users={users} turnOnDisplayMessageChat={turnOnDisplayMessageChat} />
                </div>
            </Stack>
        </div>
    );
}

export default SideTwo;