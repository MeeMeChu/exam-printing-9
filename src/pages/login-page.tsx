import { FC } from "react"
import { Box, Container, Typography ,TextField,Button, Divider} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Checkbox from '@mui/material/Checkbox';

const LoginPage : FC = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Container 
            maxWidth="sm"
            sx={{ 
                minHeight : '90vh', 
                display: 'flex', 
                justifyContent : 'center',
                alignItems: 'center', 
            }}
        >
            <Box sx={{p: 5,boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)' }}>
                <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center' ,alignItems:'center'}}>
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:24 , my: 1,fontWeight:'bold', textAlign: 'center'}}>Login</Typography>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16, my: 1  }}>Email</Typography>
                        <TextField required id="outlined-required"placeholder="Enter teacher Name" fullWidth type="email" size="small"/>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16, my: 1 }}>Password</Typography>
                        <TextField required id="outlined-required"placeholder="Enter password" fullWidth type="password" size="small"/>
                    </Grid>
                    
                    <Grid size={12} sx={{justifyContent:'flex-end'}}>
                        <Button variant="contained" fullWidth sx={{backgroundColor:'#000099'}}>Login</Button>
                    </Grid>

                    <Grid size={12} >
                        <Divider sx={{ my: 3}}/>
                        <Typography variant="h5" sx={{fontSize:16 ,color:'#0000CC	'}}>Need an account? Sign up!</Typography>
                    </Grid>
                    
                </Grid>
            </Box>
        </Container>
    )
}

export default LoginPage