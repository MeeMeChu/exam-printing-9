import { Outlet, useRoutes } from 'react-router-dom'
import NotFoundPage from '../pages/not-found-page';
import SubjectPage from '../pages/subject/subject-page';
import AdminPage from '../pages/admin/admin-page';
import CreateSubjectPage from '../pages/subject/create-subject-page';
import EditSubjectPage from '../pages/subject/edit-subject-page';
import CreateBackupPage from '../pages/backup/create-backup-page';
import BackupPage from '../pages/backup/backup-page';
import ProfilePage from '../pages/profile-page';
import ExamPage from '../pages/exam/exam-page';
import CraeteExamPage from '../pages/exam/create-exam-page';
import EditExamPage from '../pages/exam/edit-exam.page';
import LoginPage from '../pages/login-page';
import CreateAdminPage from '../pages/admin/create-admin-page';
import PrintingPage from '../pages/printing/printing-page';
const Routes : React.FC = () => {
    const element = useRoutes([
        { path: '/', element: <LoginPage />},
        { path: 'login', element: <LoginPage />},
        {
            path: 'admin', 
            element: <Outlet/>, 
            children: [
                {
                    path: '',
                    element: <AdminPage/>
                },
                {
                    path: 'create',
                    element: <CreateAdminPage/>
                },
            ]
        },
        {
            path: 'subject', element: <Outlet/>,
            children: [
                {
                    path: '',
                    element: <SubjectPage/>
                },
                {
                    path: 'create',
                    element: <CreateSubjectPage/>
                },
                {
                    path: 'edit/:id',
                    element: <EditSubjectPage/>
                }
            ]
        },
        {
            path: 'exam',
            element: <Outlet/>,
            children: [
                {
                    path: '',
                    element: <ExamPage />
                },
                {
                    path: 'create',
                    element: <CraeteExamPage />
                },
                {
                    path: 'edit/:id',
                    element: <EditExamPage/>
                }
            ]
        },
        {
            path:'backup' ,
            element:<Outlet/>,
            children: [
                {
                    path: '',
                    element: <BackupPage/>
                },
                {
                    path: 'create',
                    element: <CreateBackupPage/>
                },
            ]
        },
        {
            path:'profile' ,
            element: <Outlet/>,
            children: [
                {
                    path: '',
                    element: <ProfilePage/>
                },
            ]
        },
        {
            path:'printing' ,
            element: <Outlet/>,
            children: [
                {
                    path: '',
                    element: <PrintingPage />
                },
            ]
        },
        {
            path: '*',
            element: <NotFoundPage/>
        }
    ]);

    return element;
}

export default Routes