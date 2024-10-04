import { FC } from "react"
import { Box, Container, styled, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CraeteExamPage : FC = () => {

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
            <Typography variant="h5" fontWeight='bold'>Create exam</Typography>
          </Box>
          <Box
            sx={{
              p: 5,
              boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
            }}
          >
            <Grid container spacing={3}>
                {/* บรรทัดที่1 */}
                <Grid size={3}>
                  <Typography variant="h5" sx={{fontSize:16 , px:1}}>รหัสวิชา</Typography>
                  <TextField required id="outlined-required"placeholder="Enter subject ID"  fullWidth size="small"/>
                </Grid>
                <Grid size={9}>
                  <Typography variant="h5" sx={{fontSize:16, px:1}}>ชื่อวิชา</Typography>
                  <TextField required id="outlined-required"placeholder="Enter subject Name" fullWidth size="small"/>
                </Grid>
                {/* บรรทัดที่2 */}
                <Grid size={4}>
                  <Typography variant="h5" sx={{fontSize:16, px:1}}>ตอน</Typography>
                  <TextField required id="outlined-required"placeholder="0" fullWidth size="small"/>
                </Grid>
                <Grid size={4}>
                  <Typography variant="h5" sx={{fontSize:16, px:1}}>จำนวนนักศึกษาที่เข้าสอบ</Typography>
                  <TextField required id="outlined-required"placeholder="0" fullWidth size="small"/>
                </Grid>
                <Grid size={4}>
                  <Typography variant="h5" sx={{fontSize:16, px:1}}>ห้องสอบ</Typography>
                  <TextField required id="outlined-required"placeholder="room" fullWidth size="small"/>
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
                <Button variant="contained" fullWidth>ยืนยัน</Button>
              </Grid>
            </Grid>
          </Box>    
        </Container>
    )
}

export default CraeteExamPage