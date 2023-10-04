import Avatar from "@/components/Avatar";
import avatar1 from 'image/avatar/avatar1.png';
import './styles.scss';

function Sidebar({handleClick}) {
    return (
        <div className='sidebar'>
            {Array.from({ length: 10 }).map((value, index) => (
                <div key={index} className='sidebar-body' onClick={handleClick}>
                    <div className='sidebar-avatar'>
                        <Avatar name={avatar1} width="50px" height="50px" />
                    </div>
                    <div className="sidebar-name">
                        <span className="nameMeta three-dot">Huynh Van Phap</span>
                    </div>
                    <div className="sidebar-time">
                        <span className="timeMeta">23:10 28/09/2023</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Sidebar;