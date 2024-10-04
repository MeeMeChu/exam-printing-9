import { FC } from "react"
import Container from '@mui/material/Container';
import { Box,Typography , IconButton } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



const columns: GridColDef[] = [
    { 
        field: 'subjectName', 
        headerName: 'ชื่อวิชา', 
        type:'string',
        width: 200,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'subjectId',
        headerName: 'รหัสวิชา',
        type:'string',
        width: 200,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'dateAddSubject',
        headerName: 'วันที่เพิ่มข้อสอบ',
        width: 150,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'dateEditSubject',
        headerName: 'วันที่แก้ไขข้อสอบ',
        width: 150,
        editable: true,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'status',
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
        width: 150,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            if (params.row.status === 'ยังไม่ส่งข้อสอบ' || params.row.status === 'จัดพิมพ์เสร็จสิ้น'){
                return null;
            }
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

const rows = [
    { id: 1, subjectName: 'Internet of thing', subjectId: '344-323', dateAddSubject: '12/10/2567' , dateEditSubject: '12/12/2567' , status: 'จัดพิมพ์เสร็จสิ้น'},
    { id: 2, subjectName: 'DataComputing', subjectId: '344-323', dateAddSubject: '12/10/2567' , dateEditSubject: '12/12/2567' , status: 'ส่งข้อสอบแล้ว'},
    { id: 3, subjectName: 'SoftwareEnginearing', subjectId: '344-341', dateAddSubject: '12/10/2567' , dateEditSubject: '12/12/2567' , status: 'รอแก้ไข'},
    { id: 4, subjectName: 'IDEA TO ENTREPRENEURSHIP', subjectId: '460-001 ', dateAddSubject: '12/10/2567' , dateEditSubject: '12/12/2567' , status: 'ยังไม่ส่งข้อสอบ'},
    { id: 5, subjectName: 'PRINCIPLES OF AI', subjectId: '344-361', dateAddSubject: '12/10/2567' , dateEditSubject: '12/12/2567' , status: 'ส่งข้อสอบแล้ว'},
    { id: 6, subjectName: 'Info', subjectId: '344-211', dateAddSubject: '12/10/2567' , dateEditSubject: '12/12/2567' , status: 'จัดพิมพ์เสร็จสิ้น'},
];

const ExamPage : FC = () => {
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
                <Box sx={{p: 5, boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'}}>
                        <DataGrid
                            sx={{boxShadow: 2}}
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
            
        </Container>
    );
}

export default ExamPage