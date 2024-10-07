import { FC, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { Box, Container, Typography ,TextField, Button} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PasswordRounded } from '@mui/icons-material';
import NavigateBack from '../../components/navigate-back';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

type UserFormType = {
    userFname: string,
    userLname: string,
    userRole: string,
    userEmail: string
}

const EditAdminPage : FC = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData]  = useState<UserFormType>({
        userFname: '',
        userLname: '',
        userRole: '',
        userEmail: '',
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

        if (!id) {
            console.error("ID is undefined");
            return; // หยุดการทำงานถ้าไม่มี id
        }

        try {
            const docRef = doc(db, "users", id);

            await updateDoc(docRef, {
                ...formData,
            });

            navigate('/admin');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                console.error("ID is undefined");
                return; // หยุดการทำงานถ้าไม่มี id
            }
        
            const docRef = doc(db, 'users', id);
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData({
                    userEmail: data?.userEmail || '',
                    userFname: data?.userFname || '',
                    userRole: data?.userRole || '',
                    userLname: data?.userLname || '',
                });
            }
        }
    
        fetchData();
    }, []);

    return (
        <Container sx={{ mt: 15 }}>
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
                                disabled
                                value={formData?.userEmail}
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
    )
}

export default EditAdminPage