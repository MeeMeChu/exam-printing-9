import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UnauthorizedPage : React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth?.logout();
            navigate('/'); // นำทางไปยังหน้า login หลังจาก logout สำเร็จ
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <Container 
            maxWidth="xl"
            sx={{ 
                minHeight : '90vh',
                display: 'flex', 
                justifyContent : 'center',
                alignItems: 'center', 
                flexDirection: 'column'
            }}
        >   
            <Button size={'large'} sx={{color: 'red'}} onClick={handleLogout}>Log out</Button>
            <Box 
                sx={{
                    width : { xs : 200, md : 300 },
                    height : { xs : 200, md : 300 },
                    my: 3
                }}
                component="img" 
                src="/svgs/no-access.svg" 
            />
            <Typography sx={{ fontSize: { xs: 22, md : 32}}}>คุณไม่ได้รับสิทธิ์ในการเข้าถึงเว็บไซต์นี้</Typography>
        </Container>
    )
}

export default UnauthorizedPage