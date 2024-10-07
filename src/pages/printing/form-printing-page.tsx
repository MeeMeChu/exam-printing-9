import { Box, Container, Typography } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebase-config';
import { Subjects } from '../../types/subjects';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';

const FormPrintingPage : FC = () => {

    const { id } = useParams<{ id : string }>();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [subject, setSubject] = useState<Subjects>({
        subID: '',
        subTeacherID: '',
        subName: '',
        subFaculty: '',
        subMajor: '',
        subSectionID: '',
        subMiddate: new Date(''),
        subFinaldate: new Date(''),
        subTerm: '',
        subStatus: '',
        examStdCount: 0,
        examStartDate: '',
        examEndDate : '',
        examRoom: '',
        examFileMidURL: '',
        examFileFinalURL: '',
        examDetail: '',
        createAt: new Date(''),
        updateAt: new Date('')
    });

    console.log(subject)

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                console.error("ID is undefined");
                return; // หยุดการทำงานถ้าไม่มี id
            }
        
            const docRef = doc(db, 'subjects', id);
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
                const data = docSnap.data();
                setSubject(prev  => ({
                    ...prev,
                    subID: data.subID || '',
                    subTeacherID: data.subTeacherID || '',
                    subName: data.subName || '',
                    subFaculty: data.subFaculty || '',
                    subMajor: data.subMajor || '',
                    subSectionID: data.subSectionID || '',
                    subMiddate: data.subMiddate?.toDate ? data.subMiddate.toDate() : new Date(data.subMiddate) || new Date(),
                    subFinaldate: data.subFinaldate?.toDate ? data.subFinaldate.toDate() : new Date(data.subFinaldate) || new Date(),
                    subTerm: data.subTerm || '',
                    subStatus: data.subStatus || '',
                    examStdCount: data.examStdCount || 0,
                    examStartDate: data.examStartDate || '',
                    examEndDate: data.examEndDate || '',
                    examRoom: data.examRoom || '',
                    examFileMidURL: data.examFileMidURL || '',
                    examFileFinalURL: data.examFileFinalURL || '',
                    examDetail: data.examDetail || '',
                    createAt: data.createAt?.toDate ? data.createAt.toDate() : new Date(data.createAt) || new Date(),
                    updateAt: data.updateAt?.toDate ? data.updateAt.toDate() : new Date(data.updateAt) || new Date()
                }));

                setDataLoaded(true);
            } else {
                console.error("Document does not exist");
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (dataLoaded) {
            window.print(); // เรียกใช้ print เมื่อข้อมูลถูกโหลดเสร็จ
        }
    }, [dataLoaded]);

    return (
        <Container maxWidth="md" sx={{ mt : 15 }}>
            <Box 
                sx={{ my: 1 ,mt:8, textAlign: 'center'}}
            >
                <Typography variant="h5" fontWeight='bold'>คณะวิทยาศาสตร์ </Typography>
                <Typography variant="h5" fontWeight='bold'>มหาวิทยาลัยสงขลานครินท์</Typography>
            </Box>
            <Grid container spacing={1.5} sx={{mt : 2}}>
                <Grid size={9}>
                    <Typography variant='body1'>การสอบวิชา {subject.subName}</Typography> 
                </Grid>
                <Grid size={3}>
                    <Typography variant='body1'>รหัสวิชา {subject.subID}</Typography>
                </Grid>
                <Grid size={9}>
                    <Typography variant='body1'>สอบวันที่ {dayjs(subject.subMiddate).format("DD/MM/YYYY")}</Typography>
                </Grid>
                <Grid size={3}>
                    เวลา {subject.examStartDate} - {subject.examEndDate}
                </Grid>
                <Grid size={12}>
                    ห้องสอบ {subject.examRoom}
                </Grid>
                <Grid size={12}>
                    จำนวนนักศึกษา {subject.examStdCount} คน
                </Grid>
                <Grid size={12}>
                    ซองนี้มีจำนวนข้อสอบ {Number(subject.examStdCount) + 2} ชุด
                </Grid>
                <Grid size={12}>
                    <Typography variant='h6'>อุปกรณ์ที่ใช้หรือคำแนะนำผู้คุมสอบเพิ่มเติม </Typography>
                    <Typography variant='body1'> {subject.examDetail} </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default FormPrintingPage