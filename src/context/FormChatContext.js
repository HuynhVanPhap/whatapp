import { createContext, useState } from "react";

export const FormChatContext = createContext();

export const FormChatContextProvider = ({ children }) => {
    const [text, setText] = useState('');

    return (
        <FormChatContext.Provider value={{ text }}>
            { children }
        </FormChatContext.Provider>
    );
}
