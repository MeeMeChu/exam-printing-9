import { FC } from "react"
import Container from '@mui/material/Container';
import { Box,Typography, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';


const ExamSubjectPage : FC = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ flexGrow : 1 }}>
                <Grid>
                    <TextField>Hello</TextField>
                </Grid>

            </Box>
        </Container>
    )
}
export default ExamSubjectPage