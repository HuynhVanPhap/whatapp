import { useState } from "react";

const useEmoji = () => {
    const [displayEmoji, setDisplayEmoji] = useState(false);

    const toggleDisplayEmoji = () => (displayEmoji) ? setDisplayEmoji(false) : setDisplayEmoji(true);

    const hideDisplayEmoji = () => (displayEmoji) && setDisplayEmoji(false);

    return [
        displayEmoji,
        toggleDisplayEmoji,
        hideDisplayEmoji
    ];
}

export default useEmoji;