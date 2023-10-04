import { useState } from 'react';
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import SideOne from "@/components/Side/SideOne";
import SideTwo from "@/components/Side/SideTwo";
import Chat from "@/components/Chat";
import { FacebookIcon } from "@/icons";
import './styles.scss';

function Home() {
    const [displayNewChat, setDisplayNewChat] = useState(false);
    const [displayMessageChat, setDisplayMessageChat] = useState(false);

    const toggleDisplayNewChat = () => (displayNewChat) ? setDisplayNewChat(false) : setDisplayNewChat(true);
    const turnOnDisplayMessageChat = () => setDisplayMessageChat(true);
    const turnOffDisplayMessageChat = () => setDisplayMessageChat(false);

    return (
        <>
            <Grid container className="chat-wrap">
                <Grid item xs={4} className="side">
                    <SideOne
                        toggleDisplayNewChat={toggleDisplayNewChat}
                        turnOnDisplayMessageChat={turnOnDisplayMessageChat}
                    />
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
                    <Chat turnOffDisplayMessageChat={turnOffDisplayMessageChat} />
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