import { FC, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { Box, Container, Tooltip, Typography,IconButton ,TextField,Button} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

type UserFormType = {
    Username: string,
    Password: string,
    userFname: string,
    userLname: string,
    userEmail: string,
    userRole: string,
}

const CreateAdminPage : FC= () => {

    const [formData, setFormData]  = useState<UserFormType>({
        Username: '',
        Password: '',
        userFname: '',
        userLname: '',
        userEmail: '',
        userRole: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name] : value
        }))
    }

    return (
        <Container sx={{ mt: 15 }}>
            <Box sx={{p: 5,boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',mx:20,my:4,mt:10}}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:20 , px:1,my:2,fontWeight:'bold'}}>Add User</Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Firstname</Typography>
                        <TextField 
                            required 
                            placeholder="Enter firstname" 
                            fullWidth 
                            size="small"
                        />
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Lastname</Typography>
                        <TextField 
                            required 
                            placeholder="Enter lastname" 
                            fullWidth 
                            size="small"
                        />
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Username</Typography>
                        <TextField 
                            required 
                            placeholder="Enter username" 
                            fullWidth 
                            size="small"
                        />
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Password</Typography>
                        <TextField 
                            required 
                            placeholder="Enter password" 
                            fullWidth 
                            size="small" 
                            type='password'
                        />
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Email</Typography>
                        <TextField 
                            required 
                            placeholder="Enter email address" 
                            fullWidth 
                            size="small" 
                            type='email'
                        />
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="h5" sx={{fontSize:16 , px:1}}>Role</Typography>
                        <TextField 
                            select
                            placeholder="Please select a role" 
                            defaultValue='STAFF'
                            fullWidth
                            size="small"
                        >
                            <MenuItem value='STAFF' selected>เจ้าหน้าที่ดำเนินการสอบ</MenuItem>
                            <MenuItem value='TEACHER'>อาจารย์</MenuItem>
                            <MenuItem value='TECHNICAL'>ฝ่ายเทคโนโลยีสารสนเทศ</MenuItem>
                            <MenuItem value='ADMIN'>ผู้ดูแลระบบ</MenuItem>
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