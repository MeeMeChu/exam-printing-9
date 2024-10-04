import { FC } from 'react'
import Grid from '@mui/material/Grid2';
import { Box, Container, Tooltip, Typography,IconButton ,TextField,Button} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const CreateAdminPage : FC= () => {

  return (
    <Container>
    <Box sx={{p: 5,boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',mx:20,my:4,mt:10}}>
        <Grid container spacing={1.5}>
        
            {/* บรรทัดที่1 */}
            <Grid size={12}>
                <Typography variant="h5" sx={{fontSize:20 , px:1,my:2,fontWeight:'bold'}}>Add User</Typography>
            </Grid>
            {/* บรรทัดที่2 */}
            <Grid size={12}>
                <Typography variant="h5" sx={{fontSize:16 , px:1}}>Username</Typography>
            </Grid>
            {/* บรรทัดที่3 */}
            <Grid size={12}>
                <TextField required id="outlined-required"placeholder="Enter username" fullWidth size="small"/>
            </Grid>
            {/* บรรทัดที่4 */}
            <Grid size={12}>
                <Typography variant="h5" sx={{fontSize:16 , px:1}}>Password</Typography>
            </Grid>
            
            {/* บรรทัดที่5 */}
            <Grid size={12}>
                <TextField required id="outlined-required"placeholder="Enter password" fullWidth size="small" type='password'/>
            </Grid>
            
            {/* บรรทัดที่6 */}
            <Grid size={12}>
                <Typography variant="h5" sx={{fontSize:16 , px:1}}>Email</Typography>
            </Grid>
            
            {/* บรรทัดที่7 */}
            <Grid size={12}>
                <TextField required id="outlined-required"placeholder="Enter email address" fullWidth size="small" type='email'/>
            </Grid>
            {/* บรรทัดที่8 */}
            <Grid size={12}>
                <Typography variant="h5" sx={{fontSize:16 , px:1}}>Role</Typography>
            </Grid>
            
            {/* บรรทัดที่9 */}
            <Grid size={12}>
                <TextField 
                        required id="outlined-required"
                        select
                        placeholder="Please select a role" 
                        defaultValue='1'
                        fullWidth
                        size="small"
                    >
                        <MenuItem value='1'>เจ้าหน้าที่ดำเนินการสอบ</MenuItem>
                        <MenuItem value='2'>อาจารย์</MenuItem>
                        <MenuItem value='3'>ฝ่ายเทคโนโลยีสารสนเทศ</MenuItem>
                </TextField>
            </Grid>
    

        </Grid>
        {/* ปุ่มกดนะจ้ะ */}
        <Grid container spacing={3} sx={{display: 'flex', flexDirection:'row',justifyContent:'flex-end',my:6}}>
             {/* ปุ่มกด1 */}
            <Grid size={2}>
                <Button variant="contained" fullWidth color="error">ยกเลิก</Button>
            </Grid>
             {/* ปุ่มกด2 */}
            <Grid size={2}>
                <Button variant="contained" fullWidth sx={{backgroundColor:'#000099'}}>ยืนยัน</Button>
            </Grid>
            </Grid>
    </Box>
</Container>  
);
}

export default CreateAdminPage