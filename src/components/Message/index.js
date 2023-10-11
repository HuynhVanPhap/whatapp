import Avatar from "@/components/Avatar";
import './styles.scss';

const Message = ({ avatar, content, time, position }) => {
    return (
        <div className={(position === 'owner') ? "message owner" : 'message' }>
            <div className='message-info'>
                <Avatar name={avatar} width="40px" height="40px" />
                <span>Just Now</span>
            </div>

            <div className='message-content'>
                <p>{content}</p>
                
                {/* <div className='message-content__image'>
                    <img src="https://economictimes.indiatimes.com/thumb/msid-100851345,width-720,height-1280,resizemode-4,imgsize-66304/avatar-3-release-date-plot-and-everything-we-know-so-far.jpg?from=mdr" alt="Image" />
                </div> */}
            </div>
        </div>
    );
}

export default Message;