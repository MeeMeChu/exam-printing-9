import { FC  } from "react"
import { Box, Container, Typography ,TextField ,Button} from '@mui/material';
import Grid from '@mui/material/Grid2';

const CreateBackupPage : FC = () => {
    return (
        <Container>
             <Box sx={{ my: 1, mt: 8 }}>
                <Typography variant="h5" fontWeight='bold'>Backup</Typography>
            </Box>
            <Box sx={{
                    p: 5,
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
                }}>
                
            
        <Grid container spacing={3}>
                {/* บรรทัดที่1 */}
                <Grid size={6}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>รหัสวิชา</Typography>
                        <TextField required id="outlined-required" placeholder="Enter subject ID" fullWidth />
                </Grid>
                <Grid size={6}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>ชื่อวิชา</Typography>
                        <TextField required id="outlined-required" placeholder="Enter subject Name" fullWidth />
                </Grid>
                {/* บรรทัดที่2 */}
                <Grid size={6}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>คณะ</Typography>
                        <TextField required id="outlined-required" placeholder="Enter faculty" fullWidth />
                </Grid>
                <Grid size={6}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>สาขา</Typography>
                        <TextField required id="outlined-required" placeholder="Enter department" fullWidth />
                </Grid>
                {/* บรรทัดที่3 */}
                <Grid size={1}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>ตอน</Typography>
                        <TextField required id="outlined-required" placeholder=" 00" fullWidth />
                </Grid>
                <Grid size={2}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>จำนวนนักศึกษา</Typography>
                        <TextField required id="outlined-required" placeholder="0" fullWidth />
                </Grid>
                <Grid size={1}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>เทอม</Typography>
                        <TextField required id="outlined-required" placeholder="0" fullWidth />
                </Grid>
                <Grid size={3}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>วันที่สอบกลางภาค</Typography>
                        <TextField 
                        required id="outlined-required" 
                        placeholder="Enter subject Name" 
                        type="date"
                        fullWidth />
                </Grid>
                <Grid size={2.5}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>เวลาที่สอบ</Typography>
                        <TextField 
                        required id="outlined-required" 
                        placeholder="Enter subject Name" 
                        type="time"
                        fullWidth />
                </Grid>
                <Grid size={2.5}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>ห้องสอบ</Typography>
                        <TextField required id="outlined-required" placeholder="Enter room" fullWidth />
                </Grid>
                 {/* บรรทัดที่4 */}
                 <Grid size={3}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>วันที่สอบปลายภาค</Typography>
                        <TextField 
                        required id="outlined-required" 
                        placeholder="Enter subject Name" 
                        type="date"
                        fullWidth />
                </Grid>
                <Grid size={2.5}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>เวลาที่สอบ</Typography>
                        <TextField 
                        required id="outlined-required" 
                        placeholder="Enter subject Name" 
                        type="time"
                        fullWidth />
                </Grid>
                
            </Grid>
            <Grid container spacing={3} sx={{mt:3}}>
                 {/* บรรทัดที่5 */}
                 <Grid size={12}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>รายละเอียดจ่าหน้าซอง</Typography>
                        <TextField required id="outlined-required" placeholder="Enter detail" fullWidth  sx={{height: '100px'}} />
                </Grid>
                {/* บรรทัดที่6 */}
                <Grid container spacing={3} size={12}  sx={{display: 'flex', justifyContent: 'center'}}>
                    <Grid size={6}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>ไฟลล์ข้อสอบกลางภาค</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h5" sx={{ fontSize: 16, px: 1 }}>ไฟลล์ข้อสอบปลายภาค</Typography>
                    </Grid>
                </Grid>
                
            </Grid>
            <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', my: 6 }}>
                    {/* ปุ่มกด1 */}
                    <Grid size={2}>
                        <Button variant="contained" fullWidth>ยกเลิก</Button>
                    </Grid>
                    
                </Grid>
            </Box>
        </Container>
    )
}
    export default CreateBackupPage