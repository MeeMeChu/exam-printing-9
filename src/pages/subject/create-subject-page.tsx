import { FC , useEffect, useState } from "react"
import { Box, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

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

const CreateSubjectPage : FC = () => {

  const navigate = useNavigate();
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

  console.log(formData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name] : value
      }))
  }

  const handbleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/subjects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseUserSubject = await fetch('http://localhost:8000/api/userSubjects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID : formData.teacherID, 
          subID : formData.subID
        })
      })

      if (response.ok && responseUserSubject.ok) {
        console.log('Data saved successfully!');
      } else {
        console.error('Failed to save data.');
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

    fetchTeachers();
  },[]);

  return (

      <Container sx={{mt:15}}>
        <Box sx={{ my: 1 ,mt:8}}>
          <Typography variant="h5" fontWeight='bold'>Create subject</Typography>
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
                  <Typography variant="h5" sx={{fontSize:16 , px:1}}>รหัสวิชา</Typography>
                  <TextField 
                    required 
                    id="outlined-required"
                    placeholder="000-000"  
                    fullWidth 
                    size="small"
                    name="subID"
                    value={formData?.subID}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={5}>
                  <Typography variant="h5" sx={{fontSize:16, px:1}}>ชื่อวิชา</Typography>
                  <TextField 
                    required id="outlined-required"
                    placeholder="Enter subject Name" 
                    fullWidth 
                    size="small"
                    name="subName"
                    value={formData?.subName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={5}>
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
                    id="outlined-required"
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
                    id="outlined-required"
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
                  id="outlined-required"
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
                    required id="outlined-required"
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
                    id="outlined-required"
                    placeholder="Enter subject Name" 
                    size="small"
                    name="subMiddate"
                    value={formData?.subMiddate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={4}>
                  <Typography variant="h5" sx={{ fontSize:16, px:1}}>วันที่สอบปลายภาค</Typography>
                  <TextField 
                    fullWidth
                    required 
                    type="date"
                    id="outlined-required"
                    placeholder="Enter subject Name" 
                    size="small"
                    name="subFinaldate"
                    value={formData?.subFinaldate}
                    onChange={handleChange}
                  />
                </Grid>
            </Grid>

              {/* ปุ่มกดนะจ้ะ */}
            <Grid container spacing={3} sx={{display: 'flex', flexDirection:'row',justifyContent:'flex-end',my:6}}>
              {/* ปุ่มกด1 */}
              <Grid size={2}>
                <Button variant="contained" fullWidth color="error" onClick={()=> navigate('/subject')}>ยกเลิก</Button>
              </Grid>
              {/* ปุ่มกด2 */}
              <Grid size={2}>
                <Button type="submit" variant="contained" fullWidth >ยืนยัน</Button>
              </Grid>
            </Grid>
          </form>
        </Box>    
      </Container>
    )
}

  
export default CreateSubjectPage