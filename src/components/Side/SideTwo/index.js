import { Stack } from '@mui/material';
import SearchBox from "@/components/SearchBox";
import Sidebar from "@/components/Sidebar";
import { ArrowLeftIcon } from '@/icons';
import './styles.scss';

function SideTwo({ displayNewChat, toggleDisplayNewChat, turnOnDisplayMessageChat }) {
    return (
        <div className={(displayNewChat) ? 'side-two showSide' : 'side-two'}>
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
                
                <SearchBox placeholder="Search people..." />
                
                <div className="sidebar-wrap">
                    <Sidebar handleClick={turnOnDisplayMessageChat} />
                </div>
            </Stack>
        </div>
    );
}

export default SideTwo;