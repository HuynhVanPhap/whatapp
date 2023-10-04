import { Stack } from "@mui/material";
import { EllipsisVerticalIcon, CommentIcon } from "@/icons";
import SearchBox from "@/components/SearchBox";
import Sidebar from "@/components/Sidebar";
import Avatar from "@/components/Avatar";
import avatar1 from 'image/avatar/avatar1.png';
import './styles.scss';

function SideOne({ toggleDisplayNewChat, turnOnDisplayMessageChat  }) {
    return (
        <div className="side-one">
            <Stack className="side-one__wrap">
                <div className="heading">
                    <div className="heading-avatar">
                        <Avatar name={avatar1} width="40px" height="40px" />
                    </div>
                    <div className="heading-option">
                        <div className="heading-option__dot pullRight">
                            <EllipsisVerticalIcon />
                        </div>
                        <div
                            className="heading-option__compose pullRight"
                            onClick={toggleDisplayNewChat}
                        >
                            <CommentIcon />
                        </div>
                    </div>
                </div>
                <SearchBox />

                <div className="sidebar-wrap">
                    <Sidebar handleClick={turnOnDisplayMessageChat} />
                </div>

                <div className="clear"></div>
            </Stack>
        </div>
    );
}

export default SideOne;