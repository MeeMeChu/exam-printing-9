import { FC, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { Box, Container, Tooltip, Typography,IconButton ,TextField,Button} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PasswordRounded } from '@mui/icons-material';
import NavigateBack from '../../components/navigate-back';

type UserFormType = {
    userFname: string,
    userLname: string,
    userEmail: string,
    password: string,
    userRole: string,
}

const CreateAdminPage : FC= () => {

    const navigate = useNavigate();
    const auth = useAuth();
    const [formData, setFormData]  = useState<UserFormType>({
        userFname: '',
        userLname: '',
        userEmail: '',
        password: '',
        userRole: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name] : value
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await auth?.signUpWithEmail(formData.userEmail, formData.password, formData.userFname, formData.userLname, formData.userRole);

            navigate('/admin');
        } catch (error) {
            console.error("Error : ", error);
        }
    }

    return (
        <Container sx={{ mt: 10 }}>
            <NavigateBack path="/admin" title="กลับ"/>
            <Box sx={{p: 5,boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)', mt : 2, mx: 10}}>
                <form onSubmit={handleSubmit}>
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
                                name="userFname"
                                value={formData?.userFname}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="h5" sx={{fontSize:16 , px:1}}>Lastname</Typography>
                            <TextField 
                                required 
                                placeholder="Enter lastname" 
                                fullWidth 
                                size="small"
                                name="userLname"
                                value={formData?.userLname}
                                onChange={handleChange}
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
                                name='userEmail'
                                value={formData?.userEmail}
                                onChange={handleChange}
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
                                name="password"
                                value={formData?.password}
                                onChange={handleChange}
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
                                name="userRole"
                                value={formData?.userRole}
                                onChange={handleChange}
                            >
                                <MenuItem value='STAFF' selected>เจ้าหน้าที่ดำเนินการสอบ</MenuItem>
                                <MenuItem value='TEACHER'>อาจารย์</MenuItem>
                                <MenuItem value='TECHNICAL'>ฝ่ายเทคโนโลยีสารสนเทศ</MenuItem>
                                <MenuItem value='ADMIN'>ผู้ดูแลระบบ</MenuItem>
                            </TextField>
                        </Grid>
                

                    </Grid>
                    <Grid container spacing={3} sx={{display: 'flex', flexDirection:'row',justifyContent:'flex-end',my:6}}>
                        <Grid size={2}>
                            <Button variant="contained" fullWidth type='submit'>ยืนยัน</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>  
    );
}

export default CreateAdminPage