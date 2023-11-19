import { useEffect, useRef } from "react";

const useScrollToLast = (condition) => {
    const elementToScrollRef = useRef(null);

    useEffect(() => {
        elementToScrollRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }, [condition]);

    return [
        elementToScrollRef
    ]
}

export default useScrollToLast;