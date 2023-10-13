import { useEffect, useRef, useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { EmojiIcon, PictureIcon, CancelIcon } from "@/icons";
import './styles.scss'

const FormChat = ({ images = [], handleSelectFile, removeImage }) => {
    const [value, setValue] = useState('');
    const [displayEmoji, setDisplayEmoji] = useState(false);
    const textAreaRef = useRef(null);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const toggleDisplayEmoji = () => (displayEmoji) ? setDisplayEmoji(false) : setDisplayEmoji(true);

    const hideDisplayEmoji = () => (displayEmoji) && setDisplayEmoji(false);

    const addEmoji = (e) => {
        const codeArray = [];
        const sym = e.unified.split("_");
        
        sym.forEach((el) => {
            codeArray.push("0x" + el);
        });

        let emoji = String.fromCodePoint(...codeArray);
        setValue(value + emoji);
    }

    useEffect(() => {
        if (textAreaRef.current.scrollHeight === 0) {
            textAreaRef.current.style.height = "30px";
        } else if (textAreaRef.current.scrollHeight < 110) {
            const contentWrap = document.querySelector('.content-wrap');
            const replyWrap = document.querySelector('.reply-wrap');
            
            textAreaRef.current.style.height = "30px";
            replyWrap.style.height = `60px`;
            contentWrap.style.height = `calc(100% - 120px)`;
            
            const increase = textAreaRef.current.scrollHeight - 30;
            const replyWrapHeight = increase + 60;
            const contentWrapHeight = increase + 120;
            
            contentWrap.style.height = (increase > 0) && `calc(100% - ${contentWrapHeight}px)`;
            replyWrap.style.height = (increase > 0) && `${replyWrapHeight}px`;
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }, [value]);
    
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
                    onChange={handleChange}
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