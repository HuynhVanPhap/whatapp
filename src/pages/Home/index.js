import { useState } from 'react';
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useMessageChat } from "@/hook";
import SideOne from "@/components/Side/SideOne";
import SideTwo from "@/components/Side/SideTwo";
import Chat from "@/components/Chat";
import { UserChatsContextProvider } from "@/context";
import { FacebookIcon } from "@/icons";
import './styles.scss';

function Home() {
    const [displayNewChat, setDisplayNewChat] = useState(false);
    const [displayMessageChat, turnOnDisplayMessageChat, turnOffDisplayMessageChat] = useMessageChat();

    const toggleDisplayNewChat = () => (displayNewChat) ? setDisplayNewChat(false) : setDisplayNewChat(true);

    return (
        <>
            <Grid container className="chat-wrap">
                <Grid item xs={4} className="side">
                    <UserChatsContextProvider>
                        <SideOne
                            toggleDisplayNewChat={toggleDisplayNewChat}
                            turnOnDisplayMessageChat={turnOnDisplayMessageChat}
                        />
                    </UserChatsContextProvider>

                    <SideTwo
                        displayNewChat={displayNewChat}
                        toggleDisplayNewChat={toggleDisplayNewChat}
                        turnOnDisplayMessageChat={turnOnDisplayMessageChat}
                    />
                </Grid>
                <Grid
                    item
                    xs={8}
                    className={(displayMessageChat) ? "conversation show" : "conversation"}>
                    {(displayMessageChat) && (
                        <Chat
                            turnOffDisplayMessageChat={turnOffDisplayMessageChat}
                        />
                    )}
                </Grid>
            </Grid>

            <Grid container className='bottom-wrap'>
                <Grid item xs={6} className='bottom__direct-by'>
                    Directed by author : huynhvanphap198@gmail.com
                </Grid>
                <Grid item xs={6} className='bottom__social'>
                    <Link to="/">
                        <FacebookIcon />
                    </Link>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;