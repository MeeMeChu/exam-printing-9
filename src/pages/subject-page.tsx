import { FC } from "react"
import Container from '@mui/material/Container';
import { Box,Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<(typeof rows)[number]>[] = [
    { 
        field: 'วิชา', 
        headerName: 'Subject', 
        width: 90 
    },
    {
        field: '',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const SubjectPage : FC = () => {
    return (
        <Container maxWidth="lg">
            <Grid>
                <Grid size={{ xs: 12 , sm: 6 , md: 4 , lg: 3}}>
                    <Box sx={{ backgroundColor : '#fff' }}>
                        <Typography variant="h5">ตารางรายวิชาสอบ</Typography>
                    </Box>
                    <Box sx={{ backgroundColor: '#FFFFFF' , marginTop: 2}}>
                        <DataGrid
                            sx={{boxShadow: 2, border: 1,}}
                            rows={rows}
                            columns={columns}
                            initialState={{
                            pagination: {
                                paginationModel: {
                                pageSize: 5,
                                },
                            },
                            }}
                            pageSizeOptions={[5]}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SubjectPage