import { FC  } from "react"
import { Box, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

const CreateSubjectPage : FC = () => {
    return (
        <Container>
          <Box 
            sx={{ my: 1 ,mt:8}}
          >
            <Typography variant="h5" fontWeight='bold'>Create subject</Typography>
          </Box>
          <Box
            sx={{
              p: 5,
              boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
            }}
          >
            <Grid container spacing={3}>
                {/* บรรทัดที่1 */}
                <Grid size={2}>
                  <Typography variant="h5" sx={{fontSize:16 , px:1}}>รหัสวิชา</Typography>
                  <TextField required id="outlined-required"placeholder="Enter subject Name"  fullWidth />
                </Grid>
                <Grid size={5}>
                  <Typography variant="h5" sx={{fontSize:16, px:1}}>ชื่อวิชา</Typography>
                  <TextField required id="outlined-required"placeholder="Enter subject Name" fullWidth/>
                </Grid>
                <Grid size={5}>
                  <Typography variant="h5" sx={{fontSize:16, px:1}}>ชื่ออาจารย์</Typography>
                  <TextField required id="outlined-required"placeholder="Enter teacher Name" fullWidth/>
                </Grid>
                {/* บรรทัดที่2 */}
                <Grid size={6}>
                  <Typography variant="h5" sx={{fontSize:16, px:1}}>คณะ</Typography>
                  <TextField required id="outlined-required"placeholder="Enter faculty Name" fullWidth/>
                </Grid>
                <Grid size={6}>
                  <Typography variant="h5" sx={{fontSize:16, px:1}}>สาขา</Typography>
                  <TextField required id="outlined-required"placeholder="Enter department" fullWidth/>
                </Grid>
                {/* บรรทัดที่3 */}
                <Grid size={2}>
                  <Typography variant="h5" sx={{fontSize:16, px:1}}>ตอน</Typography>
                  <TextField required id="outlined-required"placeholder="Enter section number" fullWidth/>
                </Grid>
                <Grid size={2}>
                  <Typography variant="h5" sx={{fontSize:16, px:1}}>เทอม</Typography>
                  <TextField 
                    required id="outlined-required"
                    select
                    placeholder="Enter subject Name" 
                    defaultValue='1'
                    fullWidth
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
                  />
                </Grid>
            </Grid>

             {/* ปุ่มกดนะจ้ะ */}
            <Grid container spacing={3} sx={{display: 'flex', flexDirection:'row',justifyContent:'flex-end',my:6}}>
             {/* ปุ่มกด1 */}
              <Grid size={2}>
                <Button variant="contained" fullWidth>ยกเลิก</Button>
              </Grid>
             {/* ปุ่มกด2 */}
              <Grid size={2}>
                <Button variant="contained" fullWidth sx={{backgroundColor:'#000099'}}>ยืนยัน</Button>
              </Grid>
            </Grid>
          </Box>    
        </Container>
        
    )
}

  
export default CreateSubjectPage