import { FC, useEffect, useState  } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Typography ,TextField ,Button, Link} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Grid from '@mui/material/Grid2';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { Subjects } from "../../types/subjects";
import dayjs from "dayjs";

const ViewBackupPage : FC = () => {

    const { id } = useParams<{ id : string}>();
    const [backupData, setBackupData] = useState<Subjects>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBackup = async () => {
            try {

                if (!id) {
                    console.error("ID is undefined");
                    return; 
                }

                const docRef = doc(db, 'backup', id);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    setBackupData({
                        ...docSnap.data(),
                        subMiddate: (docSnap.data().subMiddate.toDate ? docSnap.data().subMiddate.toDate() : docSnap.data().subMiddate),
                        subFinaldate: (docSnap.data().subFinaldate.toDate ? docSnap.data().subFinaldate.toDate() : docSnap.data().subFinaldate),
                        createAt: (docSnap.data().createAt.toDate ? docSnap.data().createAt.toDate() : docSnap.data().createAt),
                        updateAt: (docSnap.data().updateAt.toDate ? docSnap.data().updateAt.toDate() : docSnap.data().updateAt)
                    } as Subjects); // เก็บข้อมูลใน state
                } else {
                    console.log('No such document in backup!');
                }
            } catch (error) {
                console.error("Error fetching backup data: ", error);
            }
        }

        fetchBackup();
    },[]);

    return (
        <Container sx={{mt:15}}>
            <Box sx={{ my: 1, mt: 8 }}>
                    <Typography variant="h5" fontWeight='bold'>Backup</Typography>
            </Box>
            <Box 
                sx={{
                    p: 5,
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
                }}>
                    
            
            <Grid container spacing={2.3}>
                    {/* บรรทัดที่1 */}
                    <Grid size={6}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>รหัสวิชา</Typography>
                        <TextField 
                            required 
                            fullWidth 
                            size="small"
                            value={backupData?.subID}
                            disabled
                        />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>ชื่อวิชา</Typography>
                        <TextField 
                            required 
                            fullWidth 
                            size="small"
                            value={backupData?.subName}
                            disabled
                        />
                    </Grid>
                    {/* บรรทัดที่2 */}
                    <Grid size={6}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>คณะ</Typography>
                        <TextField 
                            required 
                            fullWidth 
                            size="small"
                            value={backupData?.subFaculty}
                            disabled
                        />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>สาขา</Typography>
                        <TextField 
                            required 
                            fullWidth 
                            size="small"
                            value={backupData?.subMajor}
                            disabled
                        />
                    </Grid>
                    {/* บรรทัดที่3 */}
                    <Grid size={1}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>ตอน</Typography>
                        <TextField 
                            required 
                            fullWidth 
                            size="small"
                            value={backupData?.subSectionID}
                            disabled
                        />
                    </Grid>
                    <Grid size={2}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>จำนวนนักศึกษา</Typography>
                        <TextField 
                            required 
                            fullWidth 
                            size="small"
                            value={backupData?.examStdCount}
                            disabled
                        />
                    </Grid>
                    <Grid size={1}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>เทอม</Typography>
                        <TextField 
                            required 
                            fullWidth 
                            size="small"
                            value={backupData?.subTerm}
                            disabled
                        />
                    </Grid>
                    <Grid size={3}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>วันที่สอบกลางภาค</Typography>
                        <TextField 
                            required
                            type="date"
                            fullWidth 
                            size="small"
                            value={dayjs(backupData?.subMiddate).format("YYYY-MM-DD")}
                            disabled
                        />
                    </Grid>
                    <Grid size={2.5}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>เวลาที่เริ่มสอบ</Typography>
                        <TextField 
                            required
                            type="time"
                            fullWidth 
                            size="small"
                            value={backupData?.examStartDate}
                            disabled
                        />
                    </Grid>
                    <Grid size={2.5}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>ห้องสอบ</Typography>
                        <TextField 
                            required 
                            id="outlined-required" 
                            placeholder="Enter room" 
                            fullWidth 
                            size="small"
                            value={backupData?.examRoom}
                            disabled
                        />
                    </Grid>
                    {/* บรรทัดที่4 */}
                    <Grid size={4}>
                            
                    </Grid>
                    <Grid size={3}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>วันที่สอบปลายภาค</Typography>
                        <TextField 
                            aria-readonly
                            required
                            type="date"
                            fullWidth 
                            size="small"
                            value={dayjs(backupData?.subFinaldate).format("YYYY-MM-DD")}
                            disabled
                        />
                    </Grid>
                    <Grid size={2.5}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>เวลาที่สิ้นสุดการสอบ</Typography>
                        <TextField 
                            required
                            type="time"
                            fullWidth 
                            size="small"
                            value={backupData?.examEndDate}
                            disabled
                        />
                    </Grid>
                    
            </Grid>
            <Grid container spacing={0.5} sx={{mt:1}}>
                <Grid size={12}>
                    <Typography variant="h5" sx={{ fontSize: 16 }}>รายละเอียดจ่าหน้าซอง</Typography>
                    <TextField 
                        required 
                        fullWidth  
                        multiline
                        value={backupData?.examDetail}
                        disabled
                    />
                </Grid>
                <Grid container spacing={3} size={12} sx={{ alignItems: 'center', mt: 2}}>
                    <Grid size={2}>
                        <Typography variant="h5" sx={{ fontSize: 16 }}>ไฟลล์ข้อสอบกลางภาค</Typography>
                    </Grid>
                    <Grid size={3}>
                        <Button
                            component="label"
                            fullWidth
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudDownloadIcon />}
                        >
                            <Link href={backupData?.examFileMidURL} underline="none" color="white">Download Midterm</Link>
                        </Button>
                    </Grid>
                    

                    <Grid size={2}>
                        <Typography variant="h5" sx={{ fontSize: 16 }}>ไฟลล์ข้อสอบปลายภาค</Typography>
                    </Grid>
                    <Grid size={3}>
                        <Button
                            component="label"
                            fullWidth
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudDownloadIcon />}
                        >
                            <Link href={backupData?.examFileFinalURL} underline="none" color="white">Download Final</Link>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', my: 6 }}>
                    {/* ปุ่มกด1 */}
                    <Grid size={2}>
                        <Button variant="contained" fullWidth color="error" onClick={()=> navigate('/backup')}>ยกเลิก</Button>
                    </Grid>
                    
                    </Grid>
            </Box>
            </Container>
    )
}
export default ViewBackupPage