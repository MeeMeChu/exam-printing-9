import { Box, Container } from '@mui/material'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebase-config';
import { Subjects } from '../../types/subjects';

const FormPrintingPage : FC = () => {

    const { id } = useParams<{ id : string }>();
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
                setSubject({
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
                });
            }
        }

        fetchData();
        // window.print();
    }, [])

    return (
        <Container sx={{ mt : 15 }}>
            FormPrintingPage
        </Container>
    )
}

export default FormPrintingPage