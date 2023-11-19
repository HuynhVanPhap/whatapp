import { useState } from "react";
import { Box } from "@mui/material";
import Input from "@/components/Input";
import { LoginButton } from "@/components/Button";
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/config/firebase';
import './styles.scss';

function Login() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setErr(true);
        }
    }

    return (
        <Box className="login-wrap">
            <h3>#WhatsApp Login</h3>
            <form className="login-form" onSubmit={handleOnSubmit}>
                <Input type="text" name='email' placeholder="Email"/>
                <Input type="password" name='password' placeholder="Password" icon='password' />
                { err && <span>Something went wrong..!</span> }
                <LoginButton title="Login"/>
            </form>
            <p>You don't have an account ? <Link to="/register">Register</Link></p>
        </Box>
    );
}

export default Login;