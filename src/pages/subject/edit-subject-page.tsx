import { Box, Button, Container, MenuItem, TextField, Typography } from '@mui/material'
import { FC , useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { collection, doc, getDoc, getDocs, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

type Teachers = {
    userID: string,
    userFname: string,
    userLname: string
}

type Subjects = {
    subID: string,
    subTeacherID: ''
    subName: string,
    subFaculty: string,
    subMajor: string,
    subSectionID: string,
    subMiddate?: Date,
    subFinaldate?: Date,
    subTerm: string,
    subStatus: string,
    examStdCount: number,
    examStartDate: string,
    examEndDate: string,
    examRoom: string,
}

const EditSubjeactPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [teacher, setTeacher] = useState<Teachers[]>([]);
    const [formData, setFormData] = useState<Subjects>({
        subID: '',
        subName: '',
        subTeacherID: '',
        subFaculty: '',
        subMajor: '',
        subSectionID: '',
        subMiddate: new Date(''),
        subFinaldate: new Date(''),
        subTerm: '',
        subStatus: 'ยังไม่ส่งข้อสอบ',
        examStdCount: 0,
        examStartDate: '',
        examEndDate: '',
        examRoom: '',
    });
    const navigate = useNavigate();

    console.log(formData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name] : value
        })
    }
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!id) {
            console.error("ID is undefined");
            return; // หยุดการทำงานถ้าไม่มี id
        }

        try {
            const docRef = doc(db, "subjects", id);

            await updateDoc(docRef, {
                ...formData,
                subMiddate : Timestamp.fromDate(dayjs(formData?.subMiddate).toDate()),
                subFinaldate : Timestamp.fromDate(dayjs(formData?.subFinaldate).toDate()),
                updateAt : Timestamp.now(),
            });

            navigate('/subject');
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
        
            const docRef = doc(db, 'subjects', id);
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData({
                    subID: data?.subID || '',
                    subTeacherID: data?.subTeacherID || '',
                    subName: data?.subName || '',
                    subFaculty: data?.subFaculty || '',
                    subMajor: data?.subMajor || '',
                    subSectionID : data?.subSectionID || '',
                    subTerm: data?.subTerm || '',
                    subMiddate: new Date(data?.subMiddate?.seconds * 1000) ||  new Date(''),
                    subFinaldate: new Date(data?.subFinaldate?.seconds * 1000) || new Date(''),
                    subStatus: data?.subStatus || 'ยังไม่ส่งข้อสอบ',
                    examStdCount: data?.examStdCount || 0,
                    examStartDate: data?.examStartDate || '',
                    examEndDate: data?.examEndDate || '',
                    examRoom: data?.examRoom || '',
                });
            }
        }
        const fetchTeachers = async () => {
            try {
                // สร้าง query เพื่อกรองเฉพาะผู้ใช้ที่มี role เป็น TEACHER
                const q = query(
                collection(db, "users"),
                where("userRole", "==", "TEACHER")
                );
            
                // ดึงข้อมูลจาก Firestore
                const querySnapshot = await getDocs(q);
            
                // เก็บข้อมูลที่ดึงมาในรูปแบบ array
                const teachers = querySnapshot.docs.map((doc) => ({
                    userID: doc.id,
                    userFname: doc.data().userFname,
                    userLname: doc.data().userLname
                }));
            
                // แสดงผลข้อมูลที่ดึงมา
                console.log(teachers);
                setTeacher(teachers);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };
        
        fetchTeachers();
        fetchData();
    }, []);

    return (
        <Container sx={{mt:15}}>
            <Box
                sx={{ my: 1, mt: 8 }}
            >
                <Typography variant="h5" fontWeight='bold'>Edit subject {formData.subID}</Typography>
            </Box>
            <Box
                sx={{
                    p: 5,
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
                }}
            > 
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* บรรทัดที่1 */}
                        <Grid size={{ xs: 12, md: 4}}>
                            <Typography variant="h5" sx={{fontSize:16 , px:1}}>รหัสวิชา</Typography>
                            <TextField 
                                required 
                                placeholder="000-000"  
                                fullWidth 
                                size="small"
                                name="subID"
                                value={formData?.subID}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={4}>
                            <Typography variant="h5" sx={{fontSize:16, px:1}}>ชื่อวิชา</Typography>
                            <TextField 
                            
                                placeholder="Enter subject Name" 
                                fullWidth 
                                size="small"
                                name="subName"
                                value={formData?.subName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={4}>
                            <Typography variant="h5" sx={{fontSize:16, px:1}}>ชื่ออาจารย์</Typography>
                            <TextField
                                fullWidth 
                                size="small"
                                select
                                name="subTeacherID"
                                value={formData?.subTeacherID}
                                onChange={handleChange}
                            > 
                                {teacher.map((item) => {
                                    return (
                                        <MenuItem key={item.userID} value={item.userID}>
                                            {item.userFname} {item.userLname}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </Grid>
                        {/* บรรทัดที่2 */}
                        <Grid size={6}>
                            <Typography variant="h5" sx={{fontSize:16, px:1}}>คณะ</Typography>
                            <TextField 
                                required 
                                placeholder="Enter faculty Name" 
                                fullWidth 
                                size="small"
                                name="subFaculty"
                                value={formData?.subFaculty}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h5" sx={{fontSize:16, px:1}}>สาขา</Typography>
                            <TextField 
                                required 
                                placeholder="Enter department" 
                                fullWidth size="small"
                                name="subMajor"
                                value={formData?.subMajor}
                                onChange={handleChange}

                            />
                        </Grid>
                        {/* บรรทัดที่3 */}
                        <Grid size={1}>
                            <Typography variant="h5" sx={{fontSize:16, px:1}}>ตอน</Typography>
                            <TextField 
                            required
                            placeholder="0" 
                            fullWidth 
                            size="small"
                            name="subSectionID"
                            value={formData?.subSectionID}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={1}>
                            <Typography variant="h5" sx={{fontSize:16, px:1}}>เทอม</Typography>
                            <TextField 
                            
                                select
                                placeholder="Enter subject Name" 
                                defaultValue='1'
                                fullWidth
                                size="small"
                                name="subTerm"
                                value={formData?.subTerm}
                                onChange={handleChange}
                            >
                                <MenuItem value='1'>1</MenuItem>
                                <MenuItem value='2'>2</MenuItem>
                                <MenuItem value='3'>3</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={2}>
                            <Typography variant="h5" sx={{fontSize:16, px:1}}>สถานะข้อสอบ</Typography>
                            <TextField 
                                select
                                defaultValue='ยังไม่ส่งข้อสอบ'
                                fullWidth
                                size="small"
                                name="subStatus"
                                value={formData?.subStatus}
                                onChange={handleChange}
                            >
                                <MenuItem value='ยังไม่ส่งข้อสอบ'>ยังไม่ส่งข้อสอบ</MenuItem>
                                <MenuItem value='รอแก้ไข'>รอแก้ไข</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={4}>
                            <Typography variant="h5" sx={{fontSize:16, px:1}}>วันที่สอบกลางภาค</Typography>
                            <TextField 
                                required 
                                fullWidth
                                type="date"
                                placeholder="Enter subject Name" 
                                size="small"
                                name="subMiddate"
                                value={dayjs(formData?.subMiddate).format("YYYY-MM-DD")}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={4}>
                            <Typography variant="h5" sx={{ fontSize:16, px:1}}>วันที่สอบปลายภาค</Typography>
                            <TextField 
                                fullWidth
                                required 
                                type="date"
                                placeholder="Enter subject Name" 
                                size="small"
                                name="subFinaldate"
                                value={dayjs(formData?.subFinaldate).format("YYYY-MM-DD")}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="h5" sx={{ fontSize:16, px:1}}>จำนวนนักศึกษาที่เข้าสอบ</Typography>
                            <TextField 
                                fullWidth
                                required 
                                type="number"
                                placeholder="Enter subject Name" 
                                size="small"
                                name="examStdCount"
                                value={formData?.examStdCount}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="h5" sx={{ fontSize:16, px:1}}>เลขห้องสอบ</Typography>
                            <TextField 
                                fullWidth
                                required 
                                type="text "
                                placeholder="Enter subject Name" 
                                size="small"
                                name="examRoom"
                                value={formData?.examRoom}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="h5" sx={{ fontSize:16, px:1}}>เวลาที่เริ่มสอบ</Typography>
                            <TextField 
                                fullWidth
                                required 
                                type="time"
                                size="small"
                                name="examStartDate"
                                value={formData?.examStartDate}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="h5" sx={{ fontSize:16, px:1}}>เวลาที่สิ้นสุดการสอบ </Typography>
                            <TextField 
                                fullWidth
                                required
                                type="time"
                                size="small"
                                name="examEndDate"
                                value={formData?.examEndDate}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{display: 'flex', flexDirection:'row',justifyContent:'flex-end',my:6}}>
                        <Grid size={2}>
                            <Button variant="contained" fullWidth color="error" onClick={()=> navigate('/subject')}>ยกเลิก</Button>
                        </Grid>
                        <Grid size={2}>
                            <Button type="submit" variant="contained" fullWidth >ยืนยัน</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    )
}

export default EditSubjeactPage