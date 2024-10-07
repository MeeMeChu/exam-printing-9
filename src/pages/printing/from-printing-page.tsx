import { Box, Container, Typography } from '@mui/material'
//import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
//import { db } from '../../config/firebase-config';
//import { Subjects } from '../../types/subjects';
import { DataGrid, GridRowsProp, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Button , TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';

const FormPrintingPage : FC = () => {

    // const { id } = useParams<{ id : string }>();
    // const [subject, setSubject] = useState<Subjects>({
    //     subID: '',
    //     subTeacherID: '',
    //     subName: '',
    //     subFaculty: '',
    //     subMajor: '',
    //     subSectionID: '',
    //     subMiddate: new Date(''),
    //     subFinaldate: new Date(''),
    //     subTerm: '',
    //     subStatus: '',
    //     examStdCount: 0,
    //     examStartDate: '',
    //     examEndDate : '',
    //     examRoom: '',
    //     examFileMidURL: '',
    //     examFileFinalURL: '',
    //     examDetail: '',
    //     createAt: new Date(''),
    //     updateAt: new Date('')
    // });

    // console.log(subject)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (!id) {
    //             console.error("ID is undefined");
    //             return; // หยุดการทำงานถ้าไม่มี id
    //         }
        
    //         const docRef = doc(db, 'subjects', id);
    //         const docSnap = await getDoc(docRef);
        
    //         if (docSnap.exists()) {
    //             const data = docSnap.data();
    //             setSubject({
    //                 subID: data.subID || '',
    //                 subTeacherID: data.subTeacherID || '',
    //                 subName: data.subName || '',
    //                 subFaculty: data.subFaculty || '',
    //                 subMajor: data.subMajor || '',
    //                 subSectionID: data.subSectionID || '',
    //                 subMiddate: data.subMiddate?.toDate ? data.subMiddate.toDate() : new Date(data.subMiddate) || new Date(),
    //                 subFinaldate: data.subFinaldate?.toDate ? data.subFinaldate.toDate() : new Date(data.subFinaldate) || new Date(),
    //                 subTerm: data.subTerm || '',
    //                 subStatus: data.subStatus || '',
    //                 examStdCount: data.examStdCount || 0,
    //                 examStartDate: data.examStartDate || '',
    //                 examEndDate: data.examEndDate || '',
    //                 examRoom: data.examRoom || '',
    //                 examFileMidURL: data.examFileMidURL || '',
    //                 examFileFinalURL: data.examFileFinalURL || '',
    //                 examDetail: data.examDetail || '',
    //                 createAt: data.createAt?.toDate ? data.createAt.toDate() : new Date(data.createAt) || new Date(),
    //                 updateAt: data.updateAt?.toDate ? data.updateAt.toDate() : new Date(data.updateAt) || new Date()
    //             });
    //         }
    //     }

    //     fetchData();
    //     // window.print();
    // }, [])
    return (
        <Container sx={{ mt : 15 }}>
               <Box 
            sx={{ my: 1 ,mt:8,}}
          >
            <Typography variant="h5" fontWeight='bold'>คณะวิทยาศาสตร์ </Typography>
            <Typography variant="h5" fontWeight='bold'>มหาวิทยาลัยสงขลานครินท์</Typography>
          </Box>
            <Grid container spacing={1}>
                <Grid size={10}>
                    การสอบวิชา</Grid>
                <Grid size={2}>รหัสวิชา</Grid>
                {/* บรรทัดที่2*/}
                <Grid size={9}>สอบวันที่</Grid>
                <Grid size={3}>เวลา</Grid>
                {/* บรรทัดที่3*/}
                <Grid size={4}>ห้องสอบ</Grid>
                <Grid size={4}>เลขประจำซอง</Grid>
                <Grid size={4}></Grid>
                {/* บรรทัดที่4*/}
                <Grid size={4}>จำนวนนักศึกษา</Grid>
                <Grid size={4}>คน</Grid>
                <Grid size={4}></Grid>
                {/* บรรทัดที่5*/}
                <Grid size={4}>ซองนี้มีจำนวนข้อสอบ</Grid>
                <Grid size={4}>ชุด</Grid>
                <Grid size={4}></Grid>
                {/* บรรทัดที่6*/}
                <Grid size={4}>ข้อสอบสำรอง</Grid>
                <Grid size={4}>ชุด</Grid>
                <Grid size={4}></Grid>
                 {/* บรรทัดที่7*/}
                 <Grid size={4}></Grid>
                 <Grid size={4}>อุปกรณ์ที่ใช้หรือคำแนะนำผู้คุมสอบเพิ่มเติม</Grid>
                 <Grid size={4}></Grid>
                 <Grid size={12}></Grid>
                 <Grid size={12}></Grid>
            </Grid>
        </Container>
    )
    
}

export default FormPrintingPage