import { FC, useEffect, useState } from "react"
import { Box, Container, Typography ,TextField,Button, Divider, InputAdornment, IconButton} from '@mui/material';
import Grid from '@mui/material/Grid2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage : FC = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formValid, setFormValid] = useState<boolean>(false);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    console.log(email, password);
    
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        validateForm(event.target.value, password);
    };
    
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        validateForm(email, event.target.value);
    };

    const handleSignInWithEmail =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await auth?.signInWithEmail(email, password);
        } catch (e) {
            console.error("Error : ", e);
            setOpenSnackbar(true);
        }
    }

    const validateForm = (username: string, password: string) => {
        // Check if both username and password have values
        if (username.trim() !== '' && password.trim() !== '') {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    };

    useEffect(() => {
        if (auth?.currentUser) {
            navigate('/');
        }
    });

    return (
        <Container 
            maxWidth="xs"
            sx={{ 
                minHeight : '90vh', 
                display: 'flex', 
                justifyContent : 'center',
                alignItems: 'center', 
            }}
        >
            <Box 
                sx={{ 
                    p: 4,
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)' 
                }}
            >   
                <form onSubmit={handleSignInWithEmail}>
                    <Grid container spacing={1} sx={{display: 'flex', justifyContent: 'center' ,alignItems:'center'}}>
                        <Grid size={12}>
                            <Typography variant="h5" sx={{fontSize:24 , my: 1,fontWeight:'bold', textAlign: 'center'}}>Login</Typography>
                        </Grid>

                        <Grid size={12}>
                            <Typography variant="h5" sx={{fontSize:16, my: 1  }}>Email</Typography>
                            <TextField
                                sx={{ mb: 3 }}
                                fullWidth
                                size="small"
                                name="email"
                                placeholder="example@gmail.com"
                                onChange={handleEmailChange}
                            />
                        </Grid>

                        <Grid size={12}>
                            <Typography variant="h5" sx={{fontSize:16, my: 1 }}>Password</Typography>
                            <TextField 
                                required 
                                fullWidth
                                size="small"
                                name="password"
                                onChange={handlePasswordChange}
                                type={showPassword ? 'text' : 'password'}
                                slotProps={{
                                    input : {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    { showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/> }
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>
                        
                        <Grid size={12}>
                            <Divider sx={{ my: 2 }}/>
                            <Button 
                                fullWidth
                                sx={{ mt : 1 }}
                                type="submit"
                                variant="contained" 
                                size="large"
                                disabled={!formValid}
                            >
                                Login
                            </Button>
                        </Grid>           
                    </Grid>
                </form>
            </Box>
        </Container>
    )
}

export default LoginPage