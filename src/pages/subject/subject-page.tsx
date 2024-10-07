import { FC, useCallback, useEffect, useState } from "react"
import { Box, Container, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import DialogDelete from "../../components/dialog-delete";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";


type Subjects = {
    id? : string,
    subID: string,
    subName: string,
    subFaculty: string,
    subMajor: string,
    subSectionID: string,
    subMiddate?: Date,
    subFinaldate?: Date,
    subTerm: string,
    subStatus: string
}



const SubjectPage : FC = () => {
    const navigate = useNavigate();
    const [subjectData, setSubjectData] = useState<Subjects[]>([]);
    const [selectId, setSelectId] = useState<string>('');
    const [openDialogRemove, setOpenDialogRemove] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);

    console.log(subjectData);

    const handleDeleteSubject = useCallback(async () => {
        try {
            await deleteDoc(doc(db, "subjects", selectId));
            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error: ", error);
        }
    },[selectId]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'subjects'));
            const docsData = querySnapshot.docs.map(doc => ({ 
                id: doc.id,
                ...doc.data(),
                subMiddate: (doc.data().subMiddate.toDate ? doc.data().subMiddate.toDate() : doc.data().subMiddate),
                subFinaldate: (doc.data().subFinaldate.toDate ? doc.data().subFinaldate.toDate() : doc.data().subFinaldate) 
            })) as Subjects[];
            setSubjectData(docsData);
        };

        fetchData();
    }, [refresh]);

    const columns: GridColDef[] = [
        { 
            field: 'subID', 
            headerName: 'รหัสวิชา', 
            width: 90 
        },
        {   field: 'subName', 
            headerName: 'ชื่อวิชา', 
            width: 150 
        },
        {   field: 'subMajor', 
            headerName: 'สาขา', 
            width: 180
        },
        {   field: 'subSectionID', 
            headerName: 'ตอน', 
            width: 50 
        },
        {   field: 'subTerm', 
            headerName: 'เทอม', 
            width: 50 
        },
        {   field: 'subMiddate', 
            headerName: 'วันที่สอบกลางภาค', 
            width: 120,
            renderCell(param) {
                return (
                    <>{`${param?.row?.subMiddate ? dayjs(param?.row?.subMiddate).format('DD/MM/YYYY') : null}`}</>
                );
            }
        },
        {   field: 'subFinaldate', 
            headerName: 'วันที่สอบปลายภาค', 
            width: 120,
            renderCell(param) {
                return (
                    <>{`${param?.row?.subFinaldate ? dayjs(param?.row?.subFinaldate).format('DD/MM/YYYY') : null}`}</>
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
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return [
                    <Tooltip key={1} title="แก้ไขข้อมูล">
                        <GridActionsCellItem
                            icon={<EditIcon color='primary'/>}
                            label="Edit"
                            onClick={() => navigate('edit/' + params?.row?.id)}
                        />  
                    </Tooltip>,
                    <Tooltip key={2} title="ลบข้อมูล">
                        <GridActionsCellItem
                            icon={<DeleteIcon color='error'/>}
                            label="Delete"
                            onClick={() => {
                                setSelectId(`${params?.row?.id}`);
                                setOpenDialogRemove(true);
                            }}
                        />  
                    </Tooltip>
                ]
                // return (
                //     <>
                //         <IconButton
                //             color="primary"
                //             onClick={() => { alert(`Edit ${params.row.subjectName}`); }}
                //         >
                //             <EditIcon />
                //         </IconButton>
                //         <IconButton
                //             color="error"
                //             onClick={() => { alert(`Do you want to delete ${params.row.subjectName} ?`); }}
                //         >
                //             <DeleteIcon />
                //         </IconButton>
                //     </>
                // );
            }
        },
    ];

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
                <Box sx={{ height: 500, width : '100%',mt:2}}>
                    <DataGrid rows={subjectData.map((item, index) => ({ id: index, ...item })) || []} columns={columns} />
                </Box>

                <DialogDelete
                    open={openDialogRemove} 
                    setOpen={setOpenDialogRemove} 
                    removeFunction={handleDeleteSubject} 
                />
            </Box>
        </Container>
    );
}



export default SubjectPage