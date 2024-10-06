import { FC ,useCallback, useEffect, useState } from "react"
import { Box, Container, Tooltip, Typography,IconButton ,TextField} from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

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



const PrintingPage :FC = () => {
    const navigate = useNavigate();
    const [examData, setExamData] = useState<Exams[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState(''); // state สำหรับเก็บคำค้นหา
    const [searchResults, setSearchResults] = useState<Exams[]>([]);

    const handleSearch = async (term: string) => {
        try {
            const response = await fetch(`http://localhost:8000/api/exams?search=${term}`); // ปรับ endpoint ให้ตรงกับ API
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const results = await response.json();
            const exams = results.map((value: any) => ({
                ...value,
                subName: value.subjects?.subName || '', // ดึงข้อมูลที่ต้องการจาก API
                subStatus: value.subjects?.subStatus || '',
            }));
            setExamData(exams); // อัปเดตข้อมูลการค้นหา
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // ทำการค้นหาทันทีเมื่อ searchTerm เปลี่ยนแปลง
    useEffect(() => {
        if (searchTerm) {
            handleSearch(searchTerm);
        } else {
            // ถ้าไม่มี searchTerm ให้ดึงข้อมูลทั้งหมดกลับมาแสดง
            const fetchExamsData = async () => {
                try {
                    const response = await fetch('http://localhost:8000/api/exams');
                    if (!response.ok) {
                        throw new Error('Failed to fetch exams data');
                    }
                    const result = await response.json();
                    const exams = result.map((value: any) => ({
                        ...value,
                        subName: value.subjects?.subName || '',
                        subStatus: value.subjects?.subStatus || '',
                    }));
                    setExamData(exams);
                } catch (error) {
                    console.error("Error : ", error);
                }
            };
            fetchExamsData();
        }
    }, [searchTerm]);
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
            field: 'subID', 
            headerName: 'รหัสวิชา', 
            width: 250 
        },
        {   field: 'subName', 
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
                            disabled={params.row.subStatus === 'ยังไม่ส่งข้อสอบ' || params.row.subStatus === 'จัดพิมพ์เสร็จสิ้น' || params.row.subStatus === 'รอแก้ไข'}
                        >
                        Print
                        </Button>
                    </>
                );
            }
        },
        {
            field: 'subStatus',
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
            <Grid container spacing={1} sx={{display: 'flex', flexDirection:'row',my:2.5}}>
                {/* ค้นหา */}
                <Grid size={5}>
                <TextField 
                    label="Search Exam" 
                    variant="outlined" 
                    fullWidth 
                    size="small" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />                
                </Grid>
                <Grid size={3}>

                </Grid>
                {/* ปุ่มกด1 */}
                <Grid size={2}>
                    <Button variant="contained" fullWidth >Midterm</Button>
                </Grid>
                {/* ปุ่มกด2 */}
                <Grid size={2}>
                    <Button variant="contained" fullWidth sx={{backgroundColor:'#000099'}}>Finalterm</Button>
                </Grid>
            </Grid>
                    <DataGrid rows={examData.map((item) => ({ id: item.examID, ...item })) || []} columns={columns} />
                </Box>
            </Box>
        </Container>
    );
}


export default PrintingPage