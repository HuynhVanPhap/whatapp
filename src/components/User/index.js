import Avatar from "@/components/Avatar";
import './styles.scss';

const User = ({ user, turnOnDisplayMessageChat }) => {
    return (
        <div className='sidebar-body' onClick={() => turnOnDisplayMessageChat(user)}>
            <div className='sidebar-avatar'>
                <Avatar name={user.photoURL} width="50px" height="50px" />
            </div>
            <div className="sidebar-name">
                <span className={`nameMeta three-dot ${user?.lastMessage?.isSeen === false && 'notSeen'}`}>{user.displayName}</span>
                <span className="lastMessage three-dot">{user?.lastMessage?.context}</span>
            </div>
            <div className="sidebar-time">
                {user?.lastMessage?.isSeen === false && (<p className="alert"></p>)}
                <p className="timeMeta">{user?.lastMessage?.time}</p>
            </div>
        </div>
    );
}

export default User;