import { FC, useEffect, useState } from "react"
import Container from '@mui/material/Container';
import { Box,Typography ,Tooltip } from "@mui/material";
import { DataGrid, GridColDef ,GridActionsCellItem} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { useAuth } from "../../context/AuthContext";
import { Subjects } from "../../types/subjects";

const ExamPage : FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [subjectsList, setSubjectsList] = useState<Subjects[]>([]);
    // const [refresh, setRefresh] = useState<boolean>(false);
    
    console.log(subjectsList);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                // สร้าง query เพื่อกรองเฉพาะ subject ที่ teacherID ตรงกับ teacherID ที่ส่งมา
                const q = query(
                    collection(db, "subjects"),
                    where("subTeacherID", "==", auth?.currentUser?.uid)
                );

                // ดึงข้อมูลจาก Firestore
                const querySnapshot = await getDocs(q);

                // เก็บข้อมูลที่ดึงมาในรูปแบบ array
                const subjectsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    subMiddate: (doc.data().subMiddate.toDate ? doc.data().subMiddate.toDate() : doc.data().subMiddate),
                    subFinaldate: (doc.data().subFinaldate.toDate ? doc.data().subFinaldate.toDate() : doc.data().subFinaldate),
                    createAt: (doc.data().createAt.toDate ? doc.data().createAt.toDate() : doc.data().createAt),
                    updateAt: (doc.data().updateAt.toDate ? doc.data().updateAt.toDate() : doc.data().updateAt)
                })) as Subjects[];

                setSubjectsList(subjectsData);
            } catch (error) {
            console.error("Error fetching subjects:", error);
            }
        };

        fetchSubjects();
        }, []);

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
            field: 'createAt',
            headerName: 'วันที่เพิ่มข้อสอบ',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell(param) {
                return (
                    <>{`${param?.row?.createAt ? dayjs(param?.row?.createAt).format('DD/MM/YYYY') : null}`}</>
                );
            }
        },
        {
            field: 'updateAt',
            headerName: 'วันที่แก้ไขข้อสอบ',
            width: 150,
            editable: true,
            headerAlign: 'center',
            align: 'center',
            renderCell(param) {
                return (
                    <>{`${param?.row?.updateAt ? dayjs(param?.row?.updateAt).format('DD/MM/YYYY') : null}`}</>
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
                                onClick={() => navigate('upload/' + params?.row?.id)}
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
            </Box>
            <Box sx={{p: 5, boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)', mt: 2}}>
                <Box sx={{ height: 500, width : '100%', mt:2}}>
                    <DataGrid
                        sx={{boxShadow: 2}}
                        rows={subjectsList.map((item) => ({ id: item.id, ...item })) || []}
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
            </Box>
            
        </Container>
    );
}

export default ExamPage