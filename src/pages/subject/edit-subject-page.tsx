import { Box, Button, Container, MenuItem, TextField, Typography } from '@mui/material'
import { FC , useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

type Subjects = {
    subID: string,
    subName: string,
    subFaculty: string,
    subMajor: string,
    subSectionID: string,
    subMiddate?: Date,
    subFinaldate?: Date,
    subTerm: string,
    subStatus: string
}
const EditSubjeactPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<Subjects>({
        subID: '',
        subName: '',
        subFaculty: '',
        subMajor: '',
        subSectionID: '',
        subMiddate: new Date(''),
        subFinaldate: new Date(''),
        subTerm: '',
        subStatus: 'ยังไม่ส่งข้อสอบ'
    });
    const navigate = useNavigate();

    console.log(formData);

    useEffect(() => {
        const fetchSubjectData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/subjects/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch subjects data')
                }
                const result = await response.json();

                setFormData(result);
            } catch (error) {
                console.error("Error : ", error);
            }
        }

        fetchSubjectData();
    },[]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
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
                        <Grid size={2}>
                            <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>รหัสวิชา</Typography>
                            <TextField 
                                required 
                                id="outlined-required" 
                                placeholder="Enter subject Name" 
                                fullWidth 
                                disabled
                                name="subID"
                                value={formData?.subID}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={5}>
                            <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>ชื่อวิชา</Typography>
                            <TextField 
                                required 
                                id="outlined-required" 
                                placeholder="Enter subject Name" 
                                fullWidth 
                                name="subName"
                                value={formData?.subName}
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid size={5}>
                            <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>ชื่ออาจารย์</Typography>
                            <TextField  
                            id="outlined-required"
                            placeholder="Enter teacher Name" 
                            fullWidth 
                            />
                        </Grid>
                        {/* บรรทัดที่2 */}
                        <Grid size={6}>
                            <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>คณะ</Typography>
                            <TextField 
                            required 
                            id="outlined-required" 
                            placeholder="Enter faculty Name" 
                            fullWidth 
                            name="subFaculty"
                            value={formData?.subFaculty}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>สาขา</Typography>
                            <TextField 
                            required 
                            id="outlined-required" 
                            placeholder="Enter department" 
                            fullWidth 
                            name="subMajor"
                            value={formData?.subMajor}
                            onChange={handleChange}
                            />
                        </Grid>
                        {/* บรรทัดที่3 */}
                        <Grid size={2}>
                            <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>ตอน</Typography>
                            <TextField 
                            required 
                            id="outlined-required" 
                            placeholder="Enter section number" 
                            fullWidth 
                            name="subSectionID"
                            value={formData?.subSectionID}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={2}>
                            <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>เทอม</Typography>
                            <TextField
                                required id="outlined-required"
                                select
                                placeholder="Enter subject Name"
                                defaultValue='1'
                                fullWidth
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
                            <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>วันที่สอบกลางภาค</Typography>
                            <TextField
                                required
                                fullWidth
                                type="date"
                                id="outlined-required"
                                placeholder="Enter subject Name"
                                name="subMiddate"
                                value={dayjs(formData?.subMiddate).format('YYYY-MM-DD')}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={4}>
                            <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>วันที่สอบปลายภาค</Typography>
                            <TextField
                                fullWidth
                                required
                                type="date"
                                id="outlined-required"
                                placeholder="Enter subject Name"
                                name="subFinaldate"
                                value={dayjs(formData?.subFinaldate).format('YYYY-MM-DD')}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    {/* ปุ่มกดนะจ้ะ */}
                    <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', my: 6 }}>
                        {/* ปุ่มกด1 */}
                        <Grid size={2}>
                            <Button variant="contained" fullWidth color="error" onClick={()=> navigate('/subject')}>ยกเลิก</Button>
                        </Grid>
                        {/* ปุ่มกด2 */}
                        <Grid size={2}>
                            <Button variant="contained" fullWidth type='submit'>ยืนยัน</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    )
}

export default EditSubjeactPage