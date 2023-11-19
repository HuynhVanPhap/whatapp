import { Box } from "@mui/material";
import Input from "@/components/Input";
import FileInput from "@/components/FileInput";
import { LoginButton } from "@/components/Button";
import { Link } from 'react-router-dom';
import { useRegister } from '@/hook';
import './styles.scss';

const Register = () => {
    const [err, register] = useRegister();

    return (
        <Box className="login-wrap">
            <h3>#WhatsApp Register</h3>
            <form className="login-form" onSubmit={register}>
                <Input type="text" name='name' placeholder="Your name"/>
                <Input type="text" name='email' placeholder="Email"/>
                <Input type="password" name='password' placeholder="Password" icon='password' />
                {/* <Input type="password" name='password_confirm' placeholder="Password Confirm" icon='password' /> */}
                <FileInput name='avatar' />
                { err && <span>Something went wrong..!</span> }
                <LoginButton title="Sign up" />
            </form>
            <p>You do have an account ? <Link to="/login">Login</Link></p>
        </Box>
    );
}

export default Register;