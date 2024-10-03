import { FC } from "react"
import Container from '@mui/material/Container';
import { Box,Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

const ExamSubjectPage : FC = () => {
    return (
        <Container maxWidth="lg">
            <Grid>
                <Grid size={{ xs: 12 , sm: 6 , md: 4 , lg: 3}}>
                    <Box sx={{ backgroundColor : '#fff' }}>
                        <Typography variant="h5">เพิ่มข้อสอบ</Typography>
                    </Box>
                    <Box sx={{ backgroundColor : '#fff' }}>
                        
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
export default ExamSubjectPage
