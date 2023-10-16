import { Box } from "@mui/material";
import Input from "@/components/Input";
import { LoginButton } from "@/components/Button";
import './styles.scss';

const Register = () => {
    return (
        <Box className="login-wrap">
            <h3>#WhatsApp Register</h3>
            <form className="login-form">
                <Input type="text" name='email' placeholder="Email"/>
                <Input type="password" name='password' placeholder="Password" icon='password' />
                <Input type="password" name='password_confirm' placeholder="Password Confirm" icon='password' />
                <LoginButton title="Sign up" />
            </form>
        </Box>
    );
}

export default Register;