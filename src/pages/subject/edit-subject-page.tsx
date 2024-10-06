import { Box, Button, Container, MenuItem, TextField, Typography } from '@mui/material'
import { FC , useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

type Teachers = {
    userID: number,
    userFname: string,
    userLname: string
}

type Subjects = {
    subID: string,
    teacherID: number,
    subName: string,
    subFaculty: string,
    subMajor: string,
    subSectionID: string,
    subMiddate?: Date,
    subFinaldate?: Date,
    subTerm: string,
    subStatus: string
}

type Exams = {
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
        teacherID: 0,
        subName: '',
        subFaculty: '',
        subMajor: '',
        subSectionID: '',
        subMiddate: new Date(''),
        subFinaldate: new Date(''),
        subTerm: '',
        subStatus: 'ยังไม่ส่งข้อสอบ'
    });
    const [formExamData, setFormExamData] = useState<Exams>({
        examStdCount: 0,
        examStartDate: '',
        examEndDate: '',
        examRoom: '',
    })
    const navigate = useNavigate();

    console.log(formData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name] : value
        })
    }
    
    const handleExamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormExamData({
            ...formExamData,
            [name] : value
        })
    }

    const handbleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/subjects/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    ...formData,
                    subMiddate: dayjs(formData?.subMiddate).toDate(),
                    subFinaldate: dayjs(formData?.subFinaldate).toDate()
                }),
            });
    
            if (response.ok) {
                console.log('Data edit successfully!');
            } else {
                console.error('Failed to edit data.');
            }

            navigate('/subject');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/users/teachers')
                if (!response.ok) {
                    throw new Error('Failed to fetch subjects data')
                }
                const result = await response.json();
                console.log(result);
                setTeacher(result);
            } catch (error) {
                console.error("Error : ", error);
            }
        }
        const fetchSubjectData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/subjects/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch subjects data')
                }
                const result = await response.json();
                console.log(result);
                setFormData(result);
            } catch (error) {
                console.error("Error : ", error);
            }
        }

        fetchTeachers();
        fetchSubjectData();
    },[]);

    return (
        <Container sx={{mt:15}}>
            <Box
                sx={{ my: 1, mt: 8 }}
            >
                <Typography variant="h5" fontWeight='bold'>Edit subject {id}</Typography>
            </Box>
            <Box
                sx={{
                    p: 5,
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
                }}
            > 
                <form onSubmit={handbleSubmit}>
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
                                name="teacherID"
                                value={formData?.teacherID}
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
                        <Grid size={2}>
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
                        <Grid size={2}>
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
                        {/* <Grid size={3}>
                            <Typography variant="h5" sx={{ fontSize:16, px:1}}>จำนวนนักศึกษาที่เข้าสอบ</Typography>
                            <TextField 
                                fullWidth
                                required 
                                type="number"
                                placeholder="Enter subject Name" 
                                size="small"
                                name="examStdCount"
                                value={formExamData?.examStdCount}
                                onChange={handleExamChange}
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
                                value={formExamData?.examRoom}
                                onChange={handleExamChange}
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
                                value={formExamData?.examStartDate}
                                onChange={handleExamChange}
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
                                value={formExamData?.examEndDate}
                                onChange={handleExamChange}
                            />
                        </Grid> */}
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