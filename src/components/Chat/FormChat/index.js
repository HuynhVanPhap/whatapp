import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { EmojiIcon, PictureIcon, CancelIcon } from "@/icons";
import { useEmoji, useAutoResizeInput } from '@/hook';
import './styles.scss'

const FormChat = ({
    value,
    images = [],
    handleSelectFile,
    removeImage,
    handleChangeFormChat,
    handleKeyEnter,
    addEmoji
}) => {
    const [displayEmoji, toggleDisplayEmoji, hideDisplayEmoji] = useEmoji();
    const [textAreaRef] = useAutoResizeInput(value);
    
    return (
        <form>
            <div className={`reply-main ${(images.length !== 0) ? 'cbr' : ''}`}>
                {(images.length !== 0) && (<div className='attach-wrap'>
                    <div className='frame-upload plus-upload' onClick={handleSelectFile} >
                        <PictureIcon />
                    </div>

                    {images.map((image, index) => (
                        <div
                            key={index}
                            className='frame-upload upload'
                        >
                            <span className="upload-remove" onClick={() => removeImage(index)}>
                                <CancelIcon />
                            </span>
                            <img src={image.url} alt={image.name} />
                        </div>
                    ))}
                </div>)}
                
                <textarea
                    value={value}
                    onKeyDown={handleKeyEnter}
                    onChange={handleChangeFormChat}
                    ref={textAreaRef}
                    placeholder="Content message here...."
                ></textarea>

                <div className="reply-main__emoji">
                    <div className={(displayEmoji) ? "reply-emoji emoji-active" : "reply-emoji"} onClick={toggleDisplayEmoji}>
                        <EmojiIcon />
                    </div>
                </div>

                <div className={(displayEmoji) ? 'picker-emoji show'  : "picker-emoji"}>
                    <Picker
                        data={data}
                        emojiButtonSize={30}
                        emojiSize={20}
                        onEmojiSelect={addEmoji}
                        maxFrequentRows={4}
                        onClickOutside={hideDisplayEmoji}
                        skin={6}
                        skinTonePosition={'none'}
                        previewPosition={'none'}
                        dynamicWidth={true}
                    />
                </div>
            </div>
        </form>
    );
}

export default FormChat;