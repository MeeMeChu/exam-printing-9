import { FC } from "react"
import Grid from '@mui/material/Grid2';
import { Box, Container, Tooltip, Typography,IconButton ,TextField,Button} from '@mui/material';


const ProfilePage : FC = () => {
    return (
        <Container>
            <Box sx={{p: 5,boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',mx:20,my:10}}>
                <Grid container spacing={1.5}>
                
                    {/* บรรทัดที่1 */}
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:20 , px:1,my:2,fontWeight:'bold'}}>Account Details</Typography>
                    </Grid>
                    {/* บรรทัดที่2 */}
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Username</Typography>
                    </Grid>
                    {/* บรรทัดที่3 */}
                    <Grid size={12}>
                        <TextField required id="outlined-required"placeholder="Username" fullWidth size="small"/>
                    </Grid>
                    {/* บรรทัดที่4 */}
                    <Grid size={6}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>First name</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Last name</Typography>
                    </Grid>
                    {/* บรรทัดที่5 */}
                    <Grid size={6}>
                        <TextField required id="outlined-required"placeholder="First name" fullWidth size="small"/>
                    </Grid>
                    <Grid size={6}>
                        <TextField required id="outlined-required"placeholder="Last name" fullWidth size="small"/>
                    </Grid>
                    {/* บรรทัดที่6 */}
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Email address</Typography>
                    </Grid>
                    
                    {/* บรรทัดที่7 */}
                    <Grid size={12}>
                        <TextField required id="outlined-required"placeholder="xxxx@psu.ac.th" fullWidth size="small"/>
                    </Grid>
                    {/* บรรทัดที่8 */}
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Phone number</Typography>
                    </Grid>
                    
                    {/* บรรทัดที่9 */}
                    <Grid size={12}>
                        <TextField 
                        required id="outlined-required"
                        placeholder="xxx-xxx-xxxx" 
                        fullWidth size="small" 
                        type="tel"
                        />
                    </Grid>
                    {/* ปุ่มกด1 */}
                    <Grid size={4}>
                        <Button variant="contained" fullWidth >Save changes</Button>
                    </Grid>

                </Grid>
            </Box>
        </Container>
    );
}



export default ProfilePage