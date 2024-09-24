import { FC, useState } from 'react'
import { Box, Button, Container, InputAdornment, Paper, styled, TextField, Tooltip, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridRowsProp, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialRows : GridRowsProp = [
    { id: 1, username: 'MeeMeChu', firstname: 'Thanakrit', lastname: "Yodmunee", email: "6510210114@email.psu.ac.th", role: "test" },
    { id: 2, username: 'DataGridPro', firstname: 'is Awesome', lastname: "test", email: "test", role: "test"  },
    { id: 3, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 4, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 5, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 6, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 7, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 8, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 9, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 10, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 11, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 12, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 13, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 14, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 15, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 16, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 17, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 18, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 19, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
    { id: 20, username: 'MUI', firstname: 'is Amazing', lastname: "test", email: "test", role: "test"  },
];

const columns: GridColDef[] = [
    { 
        field: 'username', 
        headerName: 'Username', 
        width: 150 
    },
    {   field: 'firstname', 
        headerName: 'Firstname', 
        width: 150 
    },
    {   field: 'lastname', 
        headerName: 'Lastname', 
        width: 150 
    },
    {   field: 'email', 
        headerName: 'Email', 
        width: 270
    },
    {   field: 'role', 
        headerName: 'Role', 
        width: 150 
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 150,
        getActions: (param) => {
            return [
            <Tooltip key={1} title="แก้ไขข้อมูล">
                <GridActionsCellItem
                    key={1}
                    icon={<EditIcon color="primary"/>}
                    label="Edit"
                    className="textPrimary"
                    color="inherit"
                />
            </Tooltip>,
            <Tooltip key={2} title="ลบข้อมูล">
                <GridActionsCellItem
                    key={2}
                    icon={<DeleteIcon color="primary"/>}
                    label="Delete"
                    color="inherit"
                />
            </Tooltip>,
            ];
        },
    },
];


const AdminPage : FC = () => {

    const [searchText, setSearchText] = useState<string>('');
    const [filteredData, setFilteredData] = useState(initialRows);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    
    // กรองข้อมูลตามข้อความที่พิมพ์
    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchText(searchTerm);

        const filtered = initialRows.filter((row) =>
            row.firstname.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredData(filtered);
    };

    return (
        <Container maxWidth="lg" >
            <Box sx={{ my : 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant='h5'>User Management</Typography>
                    <Button variant="contained">Add new User</Button>
                </Box>
                <Paper elevation={5} sx={{ mt : 2, p: 2 }}>
                    <TextField 
                        variant="outlined" 
                        placeholder='Search...'
                        size="small"
                        value={searchText}
                        onChange={handleSearch}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>
                            } 
                        }}
                    />
                    <Box sx={{width : '100%', mt: 2}}>
                        <DataGrid 
                            pagination
                            rows={filteredData} 
                            columns={columns} 
                            pageSizeOptions={[10]}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                        />
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default AdminPage;