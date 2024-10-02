import { FC } from "react"
import { Box, Container, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';


const rows: GridRowsProp = [
    { id: 1, col1: '344-101', col2: 'แคลคูลัส1', col3: "วิทยาศาสตร์", col4: "วิทยาการคอมพิวเตอร์", col5: "01", col6:"1" ,col7:"01/02/2024"},
    { id: 2, col1: '344-102', col2: 'แคลคูลัส2', col3: "วิทยาศาสตร์", col4: "วิทยาการคอมพิวเตอร์", col5: "01", col6:"2"   },
    { id: 3, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาศาสตร์", col4: "วิทยาการคอมพิวเตอร์", col5: "02" , col6:"1"  },
    { id: 3, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาศาสตร์", col4: "วิทยาการคอมพิวเตอร์", col5: "02" , col6:"1"  },
    { id: 3, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาศาสตร์", col4: "วิทยาการคอมพิวเตอร์", col5: "02" , col6:"1"  },
    { id: 3, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาศาสตร์", col4: "วิทยาการคอมพิวเตอร์", col5: "02" , col6:"1"  },
    { id: 3, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาศาสตร์", col4: "วิทยาการคอมพิวเตอร์", col5: "02" , col6:"1"  },
    { id: 3, col1: '344-103', col2: 'แคลคูลัส3', col3: "วิทยาศาสตร์", col4: "วิทยาการคอมพิวเตอร์", col5: "02" , col6:"1"  },
];

const columns: GridColDef[] = [
    { 
        field: 'col1', 
        headerName: 'รหัสวิชา', 
        width: 80 
    },
    {   field: 'col2', 
        headerName: 'ชื่อวิชา', 
        width: 150 
    },
    {   field: 'col3', 
        headerName: 'คณะ', 
        width: 140 
    },
    {   field: 'col4', 
        headerName: 'สาขา', 
        width: 180
    },
    {   field: 'col5', 
        headerName: 'ตอน', 
        width: 50 
    },
    {   field: 'col6', 
        headerName: 'เทอม', 
        width: 50 
    },
    {   field: 'col7', 
        headerName: 'วันที่สอบกลางภาค', 
        width: 120 
    },
    {   field: 'col8', 
        headerName: 'วันที่สอบปลายภาค', 
        width: 120 
    },
    {   field: 'col9', 
        headerName: 'สถานะข้อสอบ', 
        width: 120 
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 140,
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

const SubjectPage : FC = () => {
    return (
        <Container >
            <Box sx={{
                display: 'flex',
                justifyContent:'space-between'
            }}>
                <Typography variant="h5">Subject Management</Typography>

                <Button variant="contained" size="large" sx={{ 
                p: 1,
                width:100
                
               }}
>New</Button>
            </Box>
               
            <Box sx={{ height: 600, width : '100%',mt:2}}>
                <DataGrid rows={rows} columns={columns} />
            </Box>
        </Container>
    );
}



export default SubjectPage