import { FC , useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, styled, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import { Subjects } from '../../types/subjects';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const EditExamPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Subjects>({
    subID: '',
    subTeacherID: '',
    subName: '',
    subFaculty: '',
    subMajor: '',
    subSectionID: '',
    subMiddate: new Date(''),
    subFinaldate: new Date(''),
    subTerm: '',
    subStatus: '',
    examStdCount: 0,
    examStartDate: '',
    examEndDate : '',
    examRoom: '',
    examFileMidURL: '',
    examFileFinalURL: '',
    examDetail: '',
    createAt: new Date(''),
    updateAt: new Date('')
  });

  const [fileUpload, setfileUpload] = useState<File | null>();
  const [examType, setExamType] = useState<string>("Midterm");
  
  const navigate = useNavigate();

  console.log(formData);
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
              subStatus: data?.subStatus || '',
              examStdCount: data?.examStdCount || 0,
              examStartDate: data?.examStartDate || '',
              examEndDate: data?.examEndDate || '',
              examRoom: data?.examRoom || '',
              examFileMidURL: data?.examFileMidURL || '',
              examFileFinalURL: data?.examFileFinalURL || '',
              examDetail: data?.examDetail || '',
          });
      }
  }
    
  fetchData();
  },[]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({
          ...formData,
          [name] : value
      })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setfileUpload(selectedFile);
  };

  const handdleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let url;

      if (!id) {
        console.error("ID is undefined");
        return; // หยุดการทำงานถ้าไม่มี id
      }

      let midtermUrl = formData.examFileMidURL;  // ค่าเริ่มต้นเป็น URL เดิม
      let finalUrl = formData.examFileFinalURL;

      const today = new Date();
      const year = String(today.getFullYear());
      const month = String(today.getMonth() + 1).padStart(2, '0');

      // ตรวจสอบการอัปโหลดไฟล์กลางภาค (Midterm)
      if (fileUpload && examType === "Midterm") {
        const fileRef = ref(storage, `${year}/${month}/midterm/${uuidv4()}/${fileUpload.name}`);
        try {
          await uploadBytes(fileRef, fileUpload);
          midtermUrl = await getDownloadURL(fileRef);
        } catch (e) {
          console.error("Error Uploading Midterm File:", e);
        }
      }

      // ตรวจสอบการอัปโหลดไฟล์ปลายภาค (Final)
      if (fileUpload && examType === "Final") {
        const fileRef = ref(storage, `${year}/${month}/final/${uuidv4()}/${fileUpload.name}`);
        try {
          await uploadBytes(fileRef, fileUpload);
          finalUrl = await getDownloadURL(fileRef);
        } catch (e) {
          console.error("Error Uploading Final File:", e);
        }
      }


      try {
        const docRef = doc(db, 'subjects', id);
        
        await updateDoc(docRef, {
          ...formData,
          subStatus: 'ส่งข้อสอบแล้ว',
          update_at: Timestamp.now(),
          examFileMidURL: midtermUrl,
          examFileFinalURL: finalUrl
        });

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
            <Typography variant="h5" fontWeight='bold'>Upload File Exam</Typography>
          </Box>
          <Box
            sx={{
              p: 5,
              boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
              mt: 4,
              mx: 4
            }}
          >
            <form onSubmit={handdleSubmit}>
              <Grid container spacing={3}>
                  {/* บรรทัดที่1 */}
                  <Grid size={3}>
                    <Typography variant="h5" sx={{ fontSize:16 }}>รหัสวิชา</Typography>
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
                    <Typography variant="h5" sx={{ fontSize:16 }}>ชื่อวิชา</Typography>
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
                    <Typography variant="h5" sx={{ fontSize:16 }}>ตอน</Typography>
                    <TextField 
                      required 
                      id="outlined-required"
                      placeholder="0" 
                      fullWidth 
                      size="small"
                      name="subSectionID"
                      value={formData?.subSectionID}
                      onChange={handleChange}
                      disabled
                    />
                  </Grid>

                  {/* บรรทัดที่2 */}
                  <Grid size={2.5}>
                    <Typography variant="h5" sx={{ fontSize:16 }}>จำนวนนักศึกษาที่เข้าสอบ</Typography>
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
                    <Typography variant="h5" sx={{ fontSize:16 }}>ห้องสอบ</Typography>
                    <TextField 
                      required 
                      id="outlined-required"
                      placeholder="room" 
                      fullWidth size="small"
                      name="examRoom"
                      value={formData?.examRoom}
                      onChange={handleChange}
                      disabled
                    />
                  </Grid>
                  <Grid size={3.5}>
                    <Typography variant="h5" sx={{ fontSize:16 }}>เวลาที่เริ่มสอบ</Typography>
                    <TextField 
                      required 
                      placeholder="room" 
                      fullWidth size="small" 
                      type='time'
                      name="examStartDate"
                      value={formData?.examStartDate}
                      onChange={handleChange}
                      disabled
                    />
                  </Grid>
                  <Grid size={3.5}>
                    <Typography variant="h5" sx={{ fontSize:16 }}>เวลาที่สิ้นสุด</Typography>
                    <TextField 
                      required 
                      id="outlined-required"
                      placeholder="room" 
                      fullWidth 
                      size="small" 
                      type='time'
                      name="examEndDate"
                      value={formData?.examEndDate}
                      onChange={handleChange}
                      disabled
                    />
                  </Grid>
                  {/* บรรทัดที่3 */}
                  <Grid size={12}>
                    <Typography variant="h5" sx={{ fontSize:16 }}>รายละเอียดจ่าหน้าซอง</Typography>
                    <TextField 
                      required 
                      fullWidth 
                      value={formData?.examDetail}
                      name="examDetail"
                      onChange={handleChange}
                      multiline
                    />
                  </Grid>
                  <Grid size={3}>
                    <Button
                      variant={examType === "Midterm" ? "contained" : "outlined"}
                      onClick={() => setExamType("Midterm")}
                      fullWidth
                    >
                      Upload Midterm
                    </Button>
                  </Grid>
                  <Grid size={3}>
                    <Button
                      variant={examType === "Final" ? "contained" : "outlined"}
                      onClick={() => setExamType("Final")}
                      fullWidth
                    >
                      Upload Final
                    </Button>
                  </Grid>
                  <Grid size={6}> </Grid>
                  <Grid size={6}>
                    <Typography variant="h5" sx={{ fontSize:16 }}>อัพโหลดไฟลล์ข้อสอบกลางภาค</Typography>
                    { fileUpload && (
                      <Typography>
                        {fileUpload.name}
                      </Typography>
                    )}
                    <Button
                      sx={{ mt : 1.1}}
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                      disabled={fileUpload != null}
                    >
                      Upload files
                    <VisuallyHiddenInput
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        hidden
                        multiple
                    />
                    </Button>
                    {formData.examFileMidURL && (
                      <p>
                        ดาวน์โหลดไฟล์ข้อสอบกลางภาค <a href={formData?.examFileMidURL} target="_blank" rel="noopener noreferrer">Download PDF</a>
                      </p>
                    )}
                    {formData.examFileFinalURL && (
                      <p>
                        ดาวน์โหลดไฟล์ข้อสอบปลายภาค <a href={formData?.examFileFinalURL} target="_blank" rel="noopener noreferrer">Download PDF</a>
                      </p>
                    )}
                  </Grid>
              </Grid>

             {/* ปุ่มกดนะจ้ะ */}
            <Grid container spacing={3} sx={{display: 'flex', flexDirection:'row',justifyContent:'flex-end',my:6}}>
                {/* ปุ่มกด1 */}
                <Grid size={2}>
                  <Button variant="contained" fullWidth color="error" onClick={() => {
                    navigate('/exam')
                  }}>ยกเลิก</Button>
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