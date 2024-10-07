import { FC , useEffect, useState } from "react"
import { Box, Container, Typography,TextField, IconButton} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { Subjects } from "../../types/subjects";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import PrintIcon from '@mui/icons-material/Print';

const PrintingPage :FC = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>('');
    const [subjectList, setSubjectsList] = useState<Subjects[]>([]);
    const [allSubjects, setAllSubjects] = useState<Subjects[]>([]);

    const [selectTerm, setSelectTerm] = useState('Midterm');

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchText(searchTerm);
        
        if (searchTerm === '') {
            setSubjectsList(allSubjects);
            return;
        }

        const filtered = subjectList.filter((row) =>
            row.subID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.subName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setSubjectsList(filtered);
    };

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'subjects'));
            const docsData = querySnapshot.docs.map(doc => ({ 
                id: doc.id,
                ...doc.data(),
                subMiddate: (doc.data().subMiddate.toDate ? doc.data().subMiddate.toDate() : doc.data().subMiddate),
                subFinaldate: (doc.data().subFinaldate.toDate ? doc.data().subFinaldate.toDate() : doc.data().subFinaldate) 
            })) as Subjects[];
            setSubjectsList(docsData);
            setAllSubjects(docsData);
        };

        fetchData();
    }, [])

    const columns: GridColDef[] = [
        { 
            field: 'subID', 
            headerName: 'รหัสวิชา', 
            width: 250 
        },
        {   field: 'subName', 
            headerName: 'ชื่อวิชา', 
            width: 300 
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
        },
        {
            field: 'Action',
            headerName: 'Action',
            sortable: false,
            type:'actions',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        { selectTerm === 'Midterm' ? (
                            <Button
                                color="primary"
                                disabled={params.row.subStatus === 'ยังไม่ส่งข้อสอบ' || params.row.subStatus === 'จัดพิมพ์เสร็จสิ้น' || params.row.subStatus === 'รอแก้ไข'}
                            >
                                <a href={params?.row?.examFileMidURL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none'}}>Print Midterm</a>
                            </Button>
                        ) : (
                            <Button
                                color="primary"
                                disabled={params.row.subStatus === 'ยังไม่ส่งข้อสอบ' || params.row.subStatus === 'จัดพิมพ์เสร็จสิ้น' || params.row.subStatus === 'รอแก้ไข'}
                            >
                                <a href={params?.row?.examFileFinalURL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none'}}>Print Final</a>
                            </Button>
                        )}
                    </>
                );
            }
        },
        {
            field: 'print',
            headerName: 'จ่าหน้าซอง',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <IconButton
                        onClick={() => navigate(`form/${params?.row?.id}`)}
                        disabled={params.row.subStatus === 'ยังไม่ส่งข้อสอบ' || params.row.subStatus === 'จัดพิมพ์เสร็จสิ้น' || params.row.subStatus === 'รอแก้ไข'}
                    >
                        <PrintIcon color="primary"/>
                    </IconButton>
                )
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
                <Grid container spacing={1} sx={{display: 'flex', flexDirection:'row',my:2.5}}>
                    {/* ค้นหา */}
                    <Grid size={5}>
                        <TextField 
                            label="Search Exam" 
                            variant="outlined" 
                            fullWidth 
                            size="small" 
                            value={searchText}
                            onChange={handleSearch}
                        />                
                    </Grid>
                    <Grid size={3}>

                    </Grid>
                    <Grid size={2}>
                        <Button
                            variant={selectTerm === "Midterm" ? "contained" : "outlined"}
                            onClick={() => setSelectTerm("Midterm")}
                            fullWidth
                        >
                            Midterm
                        </Button>
                    </Grid>
                    <Grid size={2}>
                        <Button
                            variant={selectTerm === "Final" ? "contained" : "outlined"}
                            onClick={() => setSelectTerm("Final")}
                            fullWidth
                        >
                            Final
                        </Button>
                    </Grid>
                </Grid>
                <Box sx={{ height: 500, width : '100%',mt:2}}>
                    <DataGrid 
                        rows={subjectList.map((item) => ({ id: item.id, ...item })) || []} 
                        columns={columns} 
                        pageSizeOptions={[10]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                    />
                </Box>
            </Box>
        </Container>
    );
}


export default PrintingPage