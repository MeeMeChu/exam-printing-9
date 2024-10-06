import { FC , useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, styled, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';

type Exams = {
  examID : string,
  subID:string,
  examFileURL: string,
  examDetail: string,
  examRoom : string,
  examStdCount: string,
  examStartDate: string,
  examEndDate : string,
  examCreateAt : string,
  examUpdateAt: string,
  subName?: string,
  subStatus?: string
}

const EditExamPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Exams>({
    examID : '',
    subID:'',
    examFileURL: '',
    examDetail: '',
    examRoom : '',
    examStdCount: '',
    examStartDate: '',
    examEndDate : '',
    examCreateAt : '',
    examUpdateAt: '',
    subName: '',
    subStatus: ''
  });
  const navigate = useNavigate();

  console.log(formData);
  useEffect(() => {
    const fetchExamData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/exams/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch exam data')
            }
            const result = await response.json();
            
            setFormData(result);
        } catch (error) {
            console.error("Error : ", error);
        }
    }

    fetchExamData();
},[]);

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name] : value
    })
}

const handdleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:8000/api/exams/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log('Data edit successfully!');
        } else {
            console.error('Failed to edit data.');
        }

        navigate('/exam');
    } catch (error) {
        console.error('Error:', error);
    }
}
  const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
    return (
        <Container sx={{mt:15}}>
          <Box 
            sx={{ my: 1 ,mt:8}}
          >
            <Typography variant="h5" fontWeight='bold'>ADD exam </Typography>
          </Box>
          <Box
            sx={{
              p: 5,
              boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
            }}
          >
            <form onSubmit={handdleSubmit}>
              <Grid container spacing={3}>
                  {/* บรรทัดที่1 */}
                  <Grid size={3}>
                    <Typography variant="h5" sx={{fontSize:16 , px:1}}>รหัสวิชา</Typography>
                    <TextField 
                    required id="outlined-required"
                    placeholder="Enter subject ID"  
                    fullWidth 
                    size="small"
                    name="subID"
                    value={formData?.subID}
                    onChange={handleChange}
                    disabled
                    />
                  </Grid>
                  <Grid size={7}>
                    <Typography variant="h5" sx={{fontSize:16, px:1}}>ชื่อวิชา</Typography>
                    <TextField 
                    required 
                    id="outlined-required"
                    placeholder="Enter subject Name" 
                    fullWidth 
                    size="small"
                    name="subName"
                    value={formData.subName}
                    onChange={handleChange}
                    disabled

                    /> 
                    </Grid>
                      <Grid size={2}>
                    <Typography variant="h5" sx={{fontSize:16, px:1}}>ตอน</Typography>
                    <TextField 
                    required 
                    id="outlined-required"
                    placeholder="0" 
                    fullWidth 
                    size="small"
                    name="subID"
                    value={formData?.subID}
                    onChange={handleChange}
                    />
                    </Grid>

                  {/* บรรทัดที่2 */}
                  <Grid size={2.5}>
                    <Typography variant="h5" sx={{fontSize:16, px:1}}>จำนวนนักศึกษาที่เข้าสอบ</Typography>
                    <TextField 
                    required 
                    id="outlined-required"
                    placeholder="0" 
                    fullWidth 
                    size="small"
                    name="examStdCount"
                    value={formData?.examStdCount}
                    onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={2.5}>
                    <Typography variant="h5" sx={{fontSize:16, px:1}}>ห้องสอบ</Typography>
                    <TextField 
                    required 
                    id="outlined-required"
                    placeholder="room" 
                    fullWidth size="small"
                    name="examRoom"
                    value={formData?.examRoom}
                    onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={3.5}>
                    <Typography variant="h5" sx={{fontSize:16, px:1}}>เวลาที่เริ่มสอบ</Typography>
                    <TextField 
                    required 
                    id="outlined-required"
                    placeholder="room" 
                    fullWidth size="small" 
                    type='time'
                    name="examStartDate"
                    value={formData?.examStartDate}
                    onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={3.5}>
                    <Typography variant="h5" sx={{fontSize:16, px:1}}>เวลาที่สิ้นสุด</Typography>
                    <TextField required id="outlined-required"placeholder="room" fullWidth size="small" type='time'/>
                  </Grid>
                  {/* บรรทัดที่3 */}
                  <Grid size={12}>
                    <Typography variant="h5" sx={{fontSize:16, px:1}}>รายละเอียดจ่าหน้าซอง</Typography>
                    <TextField required id="outlined-required"placeholder="" fullWidth />
                  </Grid>
                  {/* บรรทัดที่3 */}
                  <Grid size={12}>
                    <Typography variant="h5" sx={{fontSize:16, px:1,mb:2}}>อัพโหลดไฟลล์ข้อสอบ</Typography>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      
                      >
                          Upload files
                      <VisuallyHiddenInput
                          type="file"
                          onChange={(event) => console.log(event.target.files)}
                          multiple
                      />
                      </Button>
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
                  <Button variant="contained" fullWidth type='submit'>ยืนยัน</Button>
                </Grid>
            </Grid>
            </form>
          </Box>    
        </Container>
    )
}

export default EditExamPage