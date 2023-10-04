import { Link } from "react-router-dom";
import Avatar from "@/components/Avatar";
import {
    EmojiIcon,
    MicrophoneIcon,
    SendIcon,
    CancelIcon
} from "@/icons";
import avatar1 from 'image/avatar/avatar1.png';
import './styles.scss';

function Chat({ turnOffDisplayMessageChat }) {
    return (
        <div className='wrap'>
            <div className='heading'>
                <div className='heading-wrap__avatar'>
                    <div className='avatar'>
                        <Avatar name={avatar1} width="40px" height="40px" />
                    </div>
                </div>

                <div className="heading-wrap__user">
                    <div className="heading-user three-dot">
                        Jone Doe
                    </div>
                </div>

                <div className="heading-wrap__threedot">
                    <div className="heading-threedot" onClick={turnOffDisplayMessageChat}>
                        <CancelIcon />
                    </div>
                </div>
            </div>

            <div className="content-wrap" id="conversation">
                <div className="message-previous">
                    <Link to="/" className="message-previous__text">Show Previous Message!</Link>
                </div>

                <div className="message-body">
                    <div className="receiver-wrap">
                        <div className="receiver">
                            <div className="message-text">
                                How are you today ?!
                            </div>
                            <span className="message-time pullRight">
                                Sun
                            </span>
                        </div>
                    </div>
                </div>
                <div className="message-body">
                    <div className="sender-wrap">
                        <div className="sender pullRight">
                            <div className="message-text">
                                I'm fine. Thank you n' you !
                            </div>
                            <span className="message-time pullRight">
                                Sun
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="reply-wrap">
                <div className="reply-wrap__emoji">
                    <div className="reply-emoji">
                        <EmojiIcon />
                    </div>
                </div>
                <div className="reply-wrap__main">
                    <textarea className="reply-main"></textarea>
                </div>
                <div className="reply-wrap__recording">
                    <div className="reply-recording">
                        <MicrophoneIcon />
                    </div>
                </div>
                <div className="reply-wrap__send">
                    <div className="reply-send">
                        <SendIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;