import User from "@/components/User";
import './styles.scss';

function Sidebar({ users = [], turnOnDisplayMessageChat}) {
    return (
        <div className='sidebar'>
            {users.sort((userA, userB) => {
                const a = userA?.lastMessage?.date ?? userA.displayName;
                const b = userB?.lastMessage?.date ?? userB.displayName;
                
                return b - a;
            }).map((user, index) => (
                <User
                    key={user.uid}
                    user={user}
                    turnOnDisplayMessageChat={turnOnDisplayMessageChat}
                />
            ))}

            {users.length === 0 && (
                <div className="no-found">No data was found</div>
            )}
        </div>
    );
}

export default Sidebar;