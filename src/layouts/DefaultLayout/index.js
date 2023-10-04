import { Box, Container } from '@mui/material';
import './styles.scss';

function DefaultLayout({children}) {
    return (
        <Container
            maxWidth="xl"
            disableGutters
            className="container"
        >
            <Box className="app">
                { children }
            </Box>
        </Container>
    );
}

export default DefaultLayout;