import { AppBar, Avatar, Box, IconButton, Link, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { FC, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { Logout, Person } from "@mui/icons-material";

const AppHeader : FC = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile= () => {
        navigate('/profile');
    };

    const handleLogout = async () => {
        try {
            await auth?.logout();
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Link href='/' underline="none" color="white" sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div">
                            Exam Printing
                        </Typography>
                    </Link>
                    {auth?.userLoggedIn && (
                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Typography variant="body1">{auth?.userProfile?.userFname} {auth?.userProfile?.userLname} | {auth?.userProfile?.userRole}</Typography>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle sx={{ fontSize : 32}}/>
                                </IconButton>
                            </Box>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >   
                                <MenuItem onClick={handleProfile}>
                                    <ListItemIcon>
                                        <Person fontSize="small" />
                                    </ListItemIcon>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppHeader