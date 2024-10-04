import { FC } from "react"
import { Box, Container, Tooltip, Typography,IconButton } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const rows: GridRowsProp = [
    { id: 1, col1: '344-101', col2: 'แคลคูลัส1', col3: "วิทยาการคอมพิวเตอร์", col4: "01", col5:"1" ,col6:"01/02/2024",col7:"01/02/2024",col8:"ยังไม่ส่งข้อสอบ"},
    { id: 2, col1: '344-102', col2: 'แคลคูลัส2', col3: "วิทยาการคอมพิวเตอร์", col4: "01", col5:"2"  ,col6:"01/02/2024",col7:"01/02/2024",col8:"รอแก้ไข"},
    { id: 3, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาการคอมพิวเตอร์", col4: "02" , col5:"1",col6:"01/02/2024",col7:"01/02/2024",col8:"ยังไม่ส่งข้อสอบ"},
    { id: 4, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาการคอมพิวเตอร์", col4: "02" , col5:"1",col6:"01/02/2024",col7:"01/02/2024",col8:"ส่งข้อสอบแล้ว"},
    { id: 5, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาการคอมพิวเตอร์", col4: "02" , col5:"1",col6:"01/02/2024",col7:"01/02/2024",col8:"จัดพิมพ์เสร็จสิ้น"},
    { id: 6, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาการคอมพิวเตอร์", col4: "02" , col5:"1",col6:"01/02/2024",col7:"01/02/2024",col8:"จัดพิมพ์เสร็จสิ้น"},
    { id: 7, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาการคอมพิวเตอร์", col4: "02" , col5:"1",col6:"01/02/2024",col7:"01/02/2024",col8:"ส่งข้อสอบแล้ว"},
    { id: 8, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาการคอมพิวเตอร์", col4: "02" , col5:"1",col6:"01/02/2024",col7:"01/02/2024",col8:"ส่งข้อสอบแล้ว"},
];

const columns: GridColDef[] = [
    { 
        field: 'col1', 
        headerName: 'รหัสวิชา', 
        width: 90 
    },
    {   field: 'col2', 
        headerName: 'ชื่อวิชา', 
        width: 150 
    },
    {   field: 'col3', 
        headerName: 'สาขา', 
        width: 180
    },
    {   field: 'col4', 
        headerName: 'ตอน', 
        width: 50 
    },
    {   field: 'col5', 
        headerName: 'เทอม', 
        width: 50 
    },
    {   field: 'col6', 
        headerName: 'วันที่สอบกลางภาค', 
        width: 120 
    },
    {   field: 'col7', 
        headerName: 'วันที่สอบปลายภาค', 
        width: 120 
    },
    {
        field: 'col8',
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

const SubjectPage : FC = () => {
    const navigate = useNavigate();

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
                    <DataGrid rows={rows} columns={columns} />
                </Box>
            </Box>
        </Container>
    );
}



export default SubjectPage