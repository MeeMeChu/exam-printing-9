import { FC, useEffect, useState } from "react"
import { Box, Container, Tooltip, Typography,IconButton } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


type Subjects = {
    subID: string,
    subName: string,
    subFaculty: string,
    subMajor: string,
    subSectionID: string,
    subMiddate?: Date,
    subFinaldate?: Date,
    subTerm: string,
    subStatus: string
}

const columns: GridColDef[] = [
    { 
        field: 'subID', 
        headerName: 'รหัสวิชา', 
        width: 90 
    },
    {   field: 'subName', 
        headerName: 'ชื่อวิชา', 
        width: 150 
    },
    {   field: 'subMajor', 
        headerName: 'สาขา', 
        width: 180
    },
    {   field: 'subSectionID', 
        headerName: 'ตอน', 
        width: 50 
    },
    {   field: 'subTerm', 
        headerName: 'เทอม', 
        width: 50 
    },
    {   field: 'subMiddate', 
        headerName: 'วันที่สอบกลางภาค', 
        width: 120 
    },
    {   field: 'subFinaldate', 
        headerName: 'วันที่สอบปลายภาค', 
        width: 120 
    },
    {
        field: 'subStatus',
        headerName: 'สถานะข้อสอบ',
        sortable: false,
        width: 200,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            let color = '';
            if (params.value === 'ยังไม่ส่งข้อสอบ') {
                color = 'red';
            } else if (params.value === 'รอแก้ไข') {
                color = '#D5A600';
            } else if (params.value === 'จัดพิมพ์เสร็จสิ้น') {
                color = 'green';
            }
            else if(params.value === 'ส่งข้อสอบแล้ว'){
                color = '#0033CC';
            }
            return (
                <Typography sx={{ color ,
                    textAlign: 'center',
                    my: 1.5,
                }}>
                    {params.value}
                </Typography>
            );
        }
    },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        type:'actions',
        width: 100,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <>
                    <IconButton
                        color="primary"
                        onClick={() => { alert(`Edit ${params.row.subjectName}`); }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => { alert(`Do you want to delete ${params.row.subjectName} ?`); }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            );
        }
    },
];

const SubjectPage : FC = () => {
    const navigate = useNavigate();
    const [subjectData, setSubjectData] = useState<Subjects[]>([]);

    console.log(subjectData);

    useEffect(() => {
        const fetchSubjectsData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/subjects');
                if (!response.ok) {
                    throw new Error('Failed to fetch subjects data')
                }
                const result = await response.json();

                setSubjectData(result);
            } catch (error) {
                console.error("Error : ", error);
            }
        }

        fetchSubjectsData();
    },[]);

    return (
        <Container sx={{mt:15}}>
            <Box sx={{
                display: 'flex',
                justifyContent:'space-between'
            }}>
                <Typography variant="h5">Subject Management</Typography>

                <Button variant="contained" 
                    size="large" 
                    sx={{ 
                        p: 1,
                        width:100,
                    
                    }}
                    onClick={()=> navigate('create')}

                    >+ เพิ่มรายวิชา</Button>
            </Box>
            <Box
                sx={{
                    p: 5,
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
                }}
            >
                <Box sx={{ height: 600, width : '100%',mt:2}}>
                    <DataGrid rows={subjectData.map((item, index) => ({ id: index, ...item })) || []} columns={columns} />
                </Box>
            </Box>
        </Container>
    );
}



export default SubjectPage