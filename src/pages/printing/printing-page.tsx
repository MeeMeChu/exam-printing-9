import { FC } from "react"
import { Box, Container, Tooltip, Typography,IconButton } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

const rows: GridRowsProp = [
    { id: 1, col1: '344-101', col2: 'แคลคูลัส1',  col4: "ยังไม่ส่งข้อสอบ"},
    { id: 2, col1: '344-101', col2: 'แคลคูลัส1',  col4: "รอแก้ไข"},
    { id: 3, col1: '344-101', col2: 'แคลคูลัส1',  col4: "จัดพิมพ์เสร็จสิ้น"},
    { id: 4, col1: '344-101', col2: 'แคลคูลัส1',  col4: "ส่งข้อสอบแล้ว"},
    { id: 5, col1: '344-101', col2: 'แคลคูลัส1',  col4: "ส่งข้อสอบแล้ว"},
    { id: 6, col1: '344-101', col2: 'แคลคูลัส1',  col4: "จัดพิมพ์เสร็จสิ้น"},
    { id: 7, col1: '344-101', col2: 'แคลคูลัส1',  col4: "ยังไม่ส่งข้อสอบ"},
    { id: 8, col1: '344-101', col2: 'แคลคูลัส1',  col4: "ยังไม่ส่งข้อสอบ"},
];

const columns: GridColDef[] = [
    { 
        field: 'col1', 
        headerName: 'รหัสวิชา', 
        width: 250 
    },
    {   field: 'col2', 
        headerName: 'ชื่อวิชา', 
        width: 350 
    },
    {
        field: 'col3',
        headerName: 'Action',
        sortable: false,
        type:'actions',
        width: 150,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <>
                    <Button
                        color="primary"
                        onClick={() => { alert(`Print ${params.row.col2}`); }}
                        disabled={params.row.col4 === 'ยังไม่ส่งข้อสอบ' || params.row.col4 === 'จัดพิมพ์เสร็จสิ้น' || params.row.col4 === 'รอแก้ไข'}
                    >
                    Print
                    </Button>
                </>
            );
        }
    },
    {
        field: 'col4',
        headerName: 'สถานะข้อสอบ',
        sortable: false,
        width: 250,
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
    }
    
];
const PrintingPage :FC = () => {
const navigate = useNavigate();

  return (

        <Container sx={{mt:15}}>
            <Box sx={{
                display: 'flex',
                justifyContent:'space-between'
            }}>
                <Typography variant="h5" fontWeight='bold'>Printing exam</Typography>

            </Box>
            <Box
                sx={{
                    p: 5,
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
                }}
            >
                <Box sx={{ height: 600, width : '100%',mt:2}}>
            {/* ปุ่มกดนะจ้ะ */}
            <Grid container spacing={1} sx={{display: 'flex', flexDirection:'row',justifyContent:'flex-end',my:2.5}}>
                {/* ปุ่มกด1 */}
                <Grid size={2}>
                    <Button variant="contained" fullWidth >Midterm</Button>
                </Grid>
                {/* ปุ่มกด2 */}
                <Grid size={2}>
                    <Button variant="contained" fullWidth sx={{backgroundColor:'#000099'}}>Finalterm</Button>
                </Grid>
            </Grid>
                    <DataGrid rows={rows} columns={columns} />
                </Box>
            </Box>
        </Container>
    );
}


export default PrintingPage