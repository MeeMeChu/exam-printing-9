import { FC } from "react"
import { Box, Container,Button ,Typography} from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';


const rows: GridRowsProp = [
    { id: 1, col1: '000-000', col2: 'name1', col3: "Yodmunee", col4: "test", col5: "test" },
    { id: 2, col1: '111-111', col2: 'name2', col3: "test", col4: "test", col5: "test"  },
    { id: 3, col1: '222-222', col2: 'name3', col3: "test", col4: "test", col5: "test"  },
];
const columns: GridColDef[] = [
    { 
        field: 'col1', 
        headerName: 'รหัสวิชา', 
        width: 150 
    },
    {   field: 'col2', 
        headerName: 'ชื่อวิชา', 
        width: 300 
    },
    {   field: 'col3', 
        headerName: 'ตอน', 
        width: 180 
    },
    {   field: 'col4', 
        headerName: 'ไฟลล์ข้อสอบ', 
        width: 200
    },
    {   field: 'col5', 
        headerName: 'รายละเอียดวิชา', 
        width: 200 
    },

];

const BackupPage : FC = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{mt:15}}>
            <Box sx={{display: 'flex',justifyContent:'space-between'}}>                
                <Typography variant="h5" fontWeight='bold'>Exam Management</Typography>
                <Button
                    variant="contained" 
                    color="primary" 
                    sx={{ fontSize: 16 }} 
                    onClick={()=> navigate('create')}
                >
                    + เพิ่มไฟล์ข้อสอบ
                </Button>
            </Box>
            <Box
                sx={{
                    p: 5,
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
                }}
            >
               
            <Box sx={{ height: 600, width : '100%',mt:2}}>
               
                <DataGrid rows={rows} columns={columns} />
            </Box>
            </Box>
        </Container>
         );
        }
        
    export default BackupPage