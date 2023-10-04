import { Box, Container } from '@mui/material';
import './styles.scss';

function AuthLayout({children}) {
    return (
        <Container
            maxWidth="xl"
            disableGutters
            className="container"
        >
            <Box className="limiter">
                { children }
            </Box>
        </Container>
    );
}

export default AuthLayout;