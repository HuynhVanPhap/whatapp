import { useContext } from 'react';
import { AuthContext, ChatContext } from "@/context";
import Avatar from "@/components/Avatar";
import './styles.scss';

const Message = ({
    content,
    images = [],
    date,
    sender
}) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    return (
        <div
            className={`message ${sender === currentUser.uid && 'owner'}`}
        >
            {(sender !== currentUser.uid) && (
                <div className='message-info'>
                    <Avatar
                        name={(sender === currentUser.uid) ? currentUser.photoURL : data.user.photoURL}
                        width="35px"
                        height="35px"
                    />
                </div>
            )}

            <div className='message-content'>
                {content && (<p>{content}</p>)}
                
                {images.map((image, index) => (
                    <div
                        key={index}
                        className='message-content__image'
                    >
                        <img src={image} alt="Image" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Message;