import { useContext, useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import Message from "@/components/Message";
import { useUploadImage, useChat, useScrollToLast, useLastMessage } from '@/hook';
import FormChat from "./FormChat";
import { ChatContext, AuthContext } from "@/context";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from '@/config/firebase';
import { v4 as uuid } from "uuid";
import {
    MicrophoneIcon,
    SendIcon,
    CancelIcon,
    PictureIcon
} from "@/icons";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import './styles.scss';

function Chat({ turnOffDisplayMessageChat }) {
    const [text, setText] = useState('');
    const [images, fileInputRef, setImages, handleSelectFile, handleOnChangeUpload, removeImage] = useUploadImage();
    const { data } = useContext(ChatContext);
    const [messages] = useChat(); // Lấy tất cả dữ liệu của đoạn chat
    const { currentUser } = useContext(AuthContext);
    const [ elementToScrollRef ] = useScrollToLast(messages);
    const [ updateSeen ] = useLastMessage();

    useEffect(() => {
        (data.user?.lastMessage?.isSeen === false) && updateSeen();
    }, []);

    const addEmoji = (e) => {
        const codeArray = [];
        const sym = e.unified.split("_");
        
        sym.forEach((el) => {
            codeArray.push("0x" + el);
        });

        let emoji = String.fromCodePoint(...codeArray);
        setText(text + emoji);
    }

    const handleKeyEnter = (e) => {
        if (e.code === 'Enter' && !e.shiftKey){
            e.preventDefault();
            handleSendMessage();
        }
    }

    const handleScroll = (e) => {
        if (e.target.scrollTop === 0) {
            alert('Yo !!!');
        }
    }

    const handleChangeFormChat = (e) => {
        setText(e.target.value);
    }

    const handleSendMessage = async () => {
        if (/\S/g.exec(text) === null && images.length === 0) {
            alert('Không thể gởi tin nhắn rỗng');
            return false;
        }

        if (images.length !== 0) {
            const imagesURL = [];

            await Promise.all(images.map(async image => {
                const storageRef = ref(storage, uuid());
                const uploadTask = uploadBytesResumable(storageRef, image.file);

                imagesURL.push(await uploadTask.then(async () => {
                    return await getDownloadURL(uploadTask.snapshot.ref);
                }));
            }));

            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    images: [...imagesURL]
                })
            });
        } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            });
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId+".lastMessage"]: {
                context: (images.length > 0)
                    ? `Bạn đã gởi ${images.length} ảnh`
                    : text,
                date: serverTimestamp(),
                isSeen: true
            }
        });

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId+".lastMessage"]: {
                context: (images.length > 0)
                    ? `${currentUser.displayName.split(' ', 1).toString()} đã gởi cho bạn ${images.length} ảnh`
                    : text,
                date: serverTimestamp(),
                isSeen: false
            }
        });

        setText('');
        setImages([]);
    }

    return (
        <div className='wrap'>
            <div className='heading'>
                <div className='heading-wrap__avatar'>
                    <div className='avatar'>
                        <Avatar
                            name={data.user.photoURL}
                            width="40px"
                            height="40px"
                        />
                    </div>
                </div>

                <div className="heading-wrap__user">
                    <div className="heading-user three-dot">
                        { data.user.displayName }
                    </div>
                </div>

                <div className="heading-wrap__threedot">
                    <div className="heading-threedot" onClick={turnOffDisplayMessageChat}>
                        <CancelIcon />
                    </div>
                </div>
            </div>

            <div className="content-wrap" id="conversation">
                {/* <div className="message-previous">
                    <Link to="/" className="message-previous__text">Show Previous Message!</Link>
                </div> */}
                <div className="messages-wrap" ref={elementToScrollRef} onScroll={handleScroll}>
                    {messages.map((message) => (
                        <Message
                            key={message.id}
                            content={message.text}
                            images={message.images}
                            sender={message.senderId}
                            date={message.date}
                        />
                    ))}
                </div>
            </div>

            <div className="reply-wrap">
                <div className="reply-wrap__picture">
                    <input
                        type='file'
                        name='file'
                        multiple
                        style={{display: 'none'}}
                        ref={fileInputRef}
                        onChange={handleOnChangeUpload}
                    />
                    <div className="reply-picture" onClick={handleSelectFile}>
                        <PictureIcon />
                    </div>
                </div>

                <div className="reply-wrap__main">
                    <FormChat
                        value={text}
                        images={images}
                        handleSelectFile={handleSelectFile}
                        removeImage={removeImage}
                        handleChangeFormChat={handleChangeFormChat}
                        handleKeyEnter={handleKeyEnter}
                        addEmoji={addEmoji}
                    />
                </div>
                
                <div className="reply-wrap__recording">
                    <div className="reply-recording">
                        <MicrophoneIcon />
                    </div>
                </div>
                <div className="reply-wrap__send">
                    <div className="reply-send" onClick={handleSendMessage}>
                        <SendIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;