import { useEffect, useRef } from "react";

const useAutoResizeInput = (valueInput) => {
    const textAreaRef = useRef(null);

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
    }, [valueInput]);

    return [
        textAreaRef
    ]
}

export default useAutoResizeInput;