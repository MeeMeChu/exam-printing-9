import { FC, useEffect, useState } from "react"
import Grid from '@mui/material/Grid2';
import { Box, Container, Typography ,TextField, Button} from '@mui/material';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigateBack from "../components/navigate-back";

type User = {
    userFname : string,
    userLname : string,
    userPhone? : string,
}

const ProfilePage : FC = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        userFname: '',
        userLname: '',
        userPhone: '',
    });

    console.log(user)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (!auth?.currentUser?.uid) {
                console.error("ยังไม่ได้ login");
                return;
            }

            // บันทึกข้อมูลลงใน Firestore โดยใช้ uid ของผู้ใช้ที่ล็อกอินอยู่
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
                userFname: user.userFname,
                userLname: user.userLname,
                userPhone: user.userPhone
            })

            navigate('/');
            console.log("User data saved successfully");
        } catch (error) {
            console.error("Error saving user data: ", error);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!auth?.currentUser?.uid) {
                console.error('ผู้ใช้ยังไม่ได้ล็อกอิน');
                return; // หยุดการทำงานถ้าผู้ใช้ยังไม่ได้ล็อกอิน
            }
        
            try {
                const docRef = doc(db, 'users', auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
            
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUser({
                        userFname: data?.userFname || '',
                        userLname: data?.userLname || '',
                        userPhone: data?.userPhone || ''
                    });
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchData();
    }, [])

    return (
        <Container maxWidth="md" sx={{ mt: 15}}>

            <NavigateBack path='/' title="กลับ"/>
            <Box sx={{p: 5,boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',mt: 2}}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <Typography variant="h5" sx={{fontSize:20 , px:1,my:2,fontWeight:'bold'}}>Account Details</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6}}>
                            <Typography variant="h5" sx={{fontSize:16 , px:1}}>First name</Typography>
                            <TextField 
                                required 
                                id="outlined-required"
                                placeholder="First name" 
                                fullWidth 
                                size="small"
                                name='userFname'
                                value={user?.userFname}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6}}>
                            <Typography variant="h5" sx={{fontSize:16 , px:1}}>Last name</Typography>
                            <TextField 
                                required 
                                id="outlined-required"
                                placeholder="Last name" 
                                fullWidth 
                                size="small"
                                name='userLname'
                                value={user?.userLname}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="h5" sx={{fontSize:16 , px:1}}>Phone number</Typography>
                            <TextField 
                                required id="outlined-required"
                                placeholder="xxx-xxx-xxxx" 
                                fullWidth size="small" 
                                type="tel"
                                name='userPhone'
                                value={user?.userPhone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Button variant="contained" fullWidth type='submit'>
                                Save changes
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}



export default ProfilePage