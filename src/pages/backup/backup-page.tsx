import { FC, useEffect, useState } from "react"
import { Box, Container ,Typography, Tooltip} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Subjects } from "../../types/subjects";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import VisibilityIcon from '@mui/icons-material/Visibility';

const BackupPage : FC = () => {
    const navigate = useNavigate();
    const [data,setData] = useState<Subjects[]>([]);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'backup'));
            const docsData = querySnapshot.docs.map(doc => ({ 
                id: doc.id,
                ...doc.data(),
                subMiddate: (doc.data().subMiddate.toDate ? doc.data().subMiddate.toDate() : doc.data().subMiddate),
                subFinaldate: (doc.data().subFinaldate.toDate ? doc.data().subFinaldate.toDate() : doc.data().subFinaldate),
                createAt: (doc.data().createAt.toDate ? doc.data().createAt.toDate() : doc.data().createAt),
                updateAt: (doc.data().updateAt.toDate ? doc.data().updateAt.toDate() : doc.data().updateAt)
            })) as Subjects[];
            setData(docsData);
        };

        fetchData();
    })

    const columns: GridColDef[] = [
        { 
            field: 'subID', 
            headerName: 'รหัสวิชา', 
            width: 150 
        },
        {   field: 'subName', 
            headerName: 'ชื่อวิชา', 
            width: 300 
        },
        {   field: 'subSectionID', 
            headerName: 'ตอน', 
            width: 50 
        },
        {   field: 'subMajor', 
            headerName: 'สาขา', 
            width: 100
        },
        {   field: 'subTerm', 
            headerName: 'เทอม',
            width: 50 
        }, 
        {   field: 'examRoom', 
            headerName: 'ห้องสอบ', 
            width: 100 
        }, 
        {   field: 'examStdCount', 
            headerName: 'จำนวนนักศึกษา', 
            width: 150 
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
                return [
                    <Tooltip key={1} title="ตรวจสอบข้อมูล">
                        <GridActionsCellItem
                            icon={<VisibilityIcon color='primary'/>}
                            label="Edit"
                            onClick={() => navigate('view/' + params?.row?.id)}
                        />  
                    </Tooltip>,
                ]    
            } 
        }
    ];

    return (
        <Container sx={{mt:15}}>
            <Box sx={{display: 'flex',justifyContent:'space-between'}}>                
                <Typography variant="h5" fontWeight='bold' sx={{ letterSpacing: 2 }}>BACKUP </Typography>
            </Box>
            <Box
                sx={{
                    mt : 2,
                    p: 5,
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
                }}
            >
                <Box sx={{ height: 500, width : '100%',mt:2}}>
                    <DataGrid 
                        rows={data.map((item) => ({ id: item.id, ...item })) || []} 
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

export default BackupPage