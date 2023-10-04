import { Box } from "@mui/material";
import Input from "@/components/Input";
import { LoginButton } from "@/components/Button";
import './styles.scss';

function Login() {
    return (
        <Box className="login-wrap">
            <h3>#WhatsApp Login</h3>
            <form className="login-form">
                <Input type="text" placeholder="Email"/>
                <Input type="password" placeholder="Password" icon='password' />
                <LoginButton title="Login" />
            </form>
        </Box>
    );
}

export default Login;