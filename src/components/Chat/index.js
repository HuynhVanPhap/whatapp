import { useContext, useEffect, useState, memo } from "react";
import Avatar from "@/components/Avatar";
import Message from "@/components/Message";
import { useUploadImages, useChat, useScrollToLast, useLastMessage } from '@/hook';
import FormChat from "./FormChat";
import { ChatContext, AuthContext } from "@/context";
import { arrayUnion, doc, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from '@/config/firebase';
import { v4 as uuid } from "uuid";
import { debounce } from 'lodash';
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
    const [images, fileInputRef, setImages, handleSelectFile, handleOnChangeUpload, removeImage] = useUploadImages();
    const { data } = useContext(ChatContext);
    const [messages, loading, loadPreviousMessages, newMessage, lastKey, loadMore] = useChat(); // Lấy tất cả dữ liệu của đoạn chat
    const { currentUser } = useContext(AuthContext);
    const [ elementToScrollRef ] = useScrollToLast(newMessage);
    const [ updateSeen ] = useLastMessage();

    // console.log('Chat UI');
    
    useEffect(() => {
        (data.user?.lastMessage?.isSeen === false) && updateSeen();
    }, []);

    useEffect(() => {
        const messagesElement = document.querySelector('.messages-wrap');

        messagesElement.addEventListener('scroll', handleScroll);

        if (loadMore && lastKey !== null) {
            messagesElement.querySelector(`:nth-child(${messagesElement.children.length - 20})`).scrollIntoView({ behavior: 'smooth' });
        }

        return () => {
            messagesElement.removeEventListener('scroll', handleScroll);
        }
    }, [lastKey]);

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

    const handleScroll = async (e) => {
        if (lastKey !== null) {
            if (e.target.scrollTop === 0 && loading === false) {
                await loadPreviousMessages();
            }
        }

        return false;
    };

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

            await setDoc(doc(db, `chats/${data.chatId}/messages`, uuid()), {
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                images: [...imagesURL]
            });
        } else {
            await setDoc(doc(db, `chats/${data.chatId}/messages`, uuid()), {
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now()
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
                <div className="messages-wrap" ref={elementToScrollRef}>
                    {messages.map((message) => (
                        <Message
                            key={message.id}
                            id={message.id}
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

export default memo(Chat);