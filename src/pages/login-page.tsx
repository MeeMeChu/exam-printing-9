import { FC } from "react"
import { Box, Container, Tooltip, Typography,IconButton ,TextField,Button} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Checkbox from '@mui/material/Checkbox';

const LoginPage : FC = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
       <Container>
            <Box sx={{p: 5,boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',mx:30}}>
                <Grid container spacing={3} sx={{display: 'flex', justifyContent: 'center' ,alignItems:'center'}}>
                    {/* หัวข้อ */}
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:20 , px:1,my:2,fontWeight:'bold'}}>Login</Typography>
                    </Grid>
                    {/* บรรทัดที่1 */}
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Email</Typography>
                    </Grid>
                    {/* บรรทัดที่2 */}
                    <Grid size={12}>
                        <TextField required id="outlined-required"placeholder="Enter teacher Name" fullWidth type="email" size="small"/>
                    </Grid>
                    {/* บรรทัดที่3 */}
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Password</Typography>
                    </Grid>
                    {/* บรรทัดที่4 */}
                    <Grid size={12}>
                        <TextField required id="outlined-required"placeholder="Enter password" fullWidth type="password" size="small"/>
                    </Grid>
                    {/* บรรทัดที่5 */}
                    <Grid size={0.6}>
                        <Checkbox {...label} defaultChecked />

                    </Grid>
                    <Grid size={11.4}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Remember Password</Typography>
                    </Grid>
                    
                    {/* บรรทัดที่6 */}
                    <Grid size={6} >
                        <Typography variant="h5" sx={{fontSize:16 , px:1 , textDecoration:'underline' , color:'#0000CC	'}}>Forgot Password</Typography>
                    </Grid>
                    <Grid size={1}>

                    </Grid>
                    <Grid size={1}>

                    </Grid>
                    <Grid size={4} sx={{justifyContent:'flex-end'}}>
                        <Button variant="contained" fullWidth sx={{backgroundColor:'#000099'}}>Login</Button>
                    </Grid>
                    {/* บรรทัดที่7 */}
                    <Grid container spacing={3}sx={{justifyContent:'center'}}>
                        <Grid size={12} >

                        </Grid>
                        <Grid size={12} >
                            <Typography variant="h5" sx={{fontSize:16 , px:1,color:'#0000CC	'}}>Need an account? Sign up!</Typography>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Box>
       </Container>
    )
}

export default LoginPage