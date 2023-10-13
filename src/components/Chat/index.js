import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/Avatar";
import Message from "@/components/Message";
import { useUploadImage } from '@/hook';
import FormChat from "./FormChat";
import {
    MicrophoneIcon,
    SendIcon,
    CancelIcon,
    PictureIcon
} from "@/icons";
import avatar1 from 'image/avatar/avatar1.png';
import './styles.scss';

function Chat({ turnOffDisplayMessageChat }) {
    const [images, fileInputRef, handleSelectFile, handleOnChangeUpload, removeImage] = useUploadImage();

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
                {/* <div className="message-previous">
                    <Link to="/" className="message-previous__text">Show Previous Message!</Link>
                </div> */}

                <Message
                    avatar={avatar1}
                    content='Hello ! How are you ?'
                />
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
                        images={images}
                        handleSelectFile={handleSelectFile}
                        removeImage={removeImage}
                    />
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