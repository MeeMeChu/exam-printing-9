import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { FC } from "react";

const AppHeader : FC = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Exam Printing
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppHeader