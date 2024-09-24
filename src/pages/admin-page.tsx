import { FC } from 'react'
import { Box, Container, Tooltip } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const rows: GridRowsProp = [
    { id: 1, col1: 'MeeMeChu', col2: 'Thanakrit', col3: "Yodmunee", col4: "6510210114@email.psu.ac.th", col5: "test" },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome', col3: "test", col4: "test", col5: "test"  },
    { id: 3, col1: 'MUI', col2: 'is Amazing', col3: "test", col4: "test", col5: "test"  },
];

const columns: GridColDef[] = [
    { 
        field: 'col1', 
        headerName: 'Username', 
        width: 150 
    },
    {   field: 'col2', 
        headerName: 'Firstname', 
        width: 150 
    },
    {   field: 'col3', 
        headerName: 'Lastname', 
        width: 150 
    },
    {   field: 'col4', 
        headerName: 'Email', 
        width: 270
    },
    {   field: 'col5', 
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
    return (
        <Container>
            <Box sx={{ height: 350, width : '100%'}}>
                <DataGrid rows={rows} columns={columns} />
            </Box>
        </Container>
    );
}

export default AdminPage;