import { FC,useCallback, useEffect, useState } from "react"
import Container from '@mui/material/Container';
import { Box,Typography , IconButton,Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetter ,GridActionsCellItem} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

type Exams = {
    examID : string,
    subID:string,
    examFileURL: string,
    examDetail: string,
    examRoom : string,
    examStdCount: string,
    examStartDate: string,
    examEndDate : string,
    examCreateAt : string,
    examUpdateAt: string,
    subName?: string,
    subStatus?: string
}

const ExamPage : FC = () => {
    const navigate = useNavigate();
    const [examData, setExamData] = useState<Exams[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    
    console.log(examData);


    
    useEffect(() => {
        const fetchExamsData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/exams');
                if (!response.ok) {
                    throw new Error('Failed to fetch exams data')
                }
                const result = await response.json();

                const exam = result.map((value: any) => ({
                    ...value,
                    subName: value.subjects.subName,
                    subStatus: value.subjects.subStatus
                }));
    
                setExamData(exam);
            } catch (error) {
                console.error("Error : ", error);
            }
        }
    
        fetchExamsData();
    },[refresh]);

    const columns: GridColDef[] = [
        { 
            field: 'subName', 
            headerName: 'ชื่อวิชา', 
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'subID',
            headerName: 'รหัสวิชา',
            type:'string',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'examCreateAt',
            headerName: 'วันที่เพิ่มข้อสอบ',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell(param) {
                return (
                    <>{`${param?.row?.examCreateAt ? dayjs(param?.row?.examCreateAt).format('DD/MM/YYYY') : null}`}</>
                );
            }
        },
        {
            field: 'examUpdateAt',
            headerName: 'วันที่แก้ไขข้อสอบ',
            width: 150,
            editable: true,
            headerAlign: 'center',
            align: 'center',
            renderCell(param) {
                return (
                    <>{`${param?.row?.examUpdateAt ? dayjs(param?.row?.examUpdateAt).format('DD/MM/YYYY') : null}`}</>
                );
            }
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
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                if (params.row.status === 'ยังไม่ส่งข้อสอบ' || params.row.status === 'จัดพิมพ์เสร็จสิ้น'){
                    return null;
                }
                return (
                    <>
                    <Tooltip key={1} title="แก้ไขข้อมูล">
                        <GridActionsCellItem
                            icon={<EditIcon color='primary'/>}
                            label="Edit"
                            onClick={() => navigate('edit/' + params?.row?.examID)}
                        />  
                    </Tooltip>
                    </>
                );
            }
        },
    ];
    
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
                            rows={examData.map((item) => ({ id: item.examID, ...item })) || []}
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