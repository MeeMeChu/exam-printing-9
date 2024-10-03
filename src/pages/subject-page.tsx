import { FC } from "react"
import Container from '@mui/material/Container';
import { Box,Typography , IconButton } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
            } else if (params.value === 'จัดส่งเสร็จแล้ว') {
                color = '#D5A600';
            } else if (params.value === 'จัดพิมพ์เสร็จสิ้น') {
                color = 'green';
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
        width: 200,
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
                        onClick={() => { alert(`Delete ${params.row.subjectName}`); }}
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
    { id: 2, subjectName: 'DataComputing', subjectId: '344-323', dateAddSubject: '12/10/2567' , dateEditSubject: '12/12/2567' , status: 'จัดส่งเสร็จแล้ว'},
    { id: 3, subjectName: 'SoftwareEnginearing', subjectId: '344-341', dateAddSubject: '12/10/2567' , dateEditSubject: '12/12/2567' , status: 'จัดพิมพ์เสร็จสิ้น'},
    { id: 4, subjectName: 'Snow', subjectId: '334-201', dateAddSubject: '12/10/2567' , dateEditSubject: '12/12/2567' , status: 'ยังไม่ส่งข้อสอบ'},
    { id: 5, subjectName: 'Snow', subjectId: '334-201', dateAddSubject: '12/10/2567' , dateEditSubject: '12/12/2567' , status: 'จัดพิมพ์เสร็จสิ้น'},
    { id: 6, subjectName: 'Snow', subjectId: '334-201', dateAddSubject: '12/10/2567' , dateEditSubject: '12/12/2567' , status: 'จัดพิมพ์เสร็จสิ้น'},
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
                            sx={{boxShadow: 2, border: 1}}
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