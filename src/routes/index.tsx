import { Outlet, useRoutes } from 'react-router-dom'
import NotFoundPage from '../pages/not-found-page';
import SubjectPage from '../pages/subject/subject-page';
import AdminPage from '../pages/admin/admin-page';
import CreateSubjectPage from '../pages/subject/create-subject-page';
import EditSubjectPage from '../pages/subject/edit-subject-page';
import BackupPage from '../pages/backup/backup-page';
import ProfilePage from '../pages/profile-page';
import ExamPage from '../pages/exam/exam-page';
import EditExamPage from '../pages/exam/edit-exam.page';
import LoginPage from '../pages/login-page';
import CreateAdminPage from '../pages/admin/create-admin-page';
import PrintingPage from '../pages/printing/printing-page';
import RoleRoutes from './role-routes';
import ProtectedRoute from '../components/protected-route';
import UnauthorizedPage from '../pages/unauthorized-page';
import EditAdminPage from '../pages/admin/edit-admin-page';
import FormPrintingPage from '../pages/printing/form-printing-page';
import ViewBackupPage from '../pages/backup/view-backup-page';

const Routes : React.FC = () => {
    const element = useRoutes([
        { path: '/', element: <RoleRoutes />},
        { path: 'login', element: <LoginPage />},
        {
            path: 'admin', 
            element: (
                <ProtectedRoute requiredRole="ADMIN">
                    <Outlet/>   
                </ProtectedRoute>
            ), 
            children: [
                {
                    path: '',
                    element: <AdminPage/>
                },
                {
                    path: 'create',
                    element: <CreateAdminPage/>
                },
                {
                    path: 'edit/:id',
                    element: <EditAdminPage />
                }
            ]
        },
        {
            path: 'subject', 
            element: (
                <ProtectedRoute requiredRole="TECHNICAL">
                    <Outlet/>   
                </ProtectedRoute>
            ), 
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
            element: (
                <ProtectedRoute requiredRole="TEACHER">
                    <Outlet/>   
                </ProtectedRoute>
            ), 
            children: [
                {
                    path: '',
                    element: <ExamPage />
                },
                {
                    path: 'upload/:id',
                    element: <EditExamPage/>
                }
            ]
        },
        {
            path:'backup' ,
            element: (
                <ProtectedRoute requiredRole="TECHNICAL">
                    <Outlet/>   
                </ProtectedRoute>
            ), 
            children: [
                {
                    path: '',
                    element: <BackupPage/>
                },
                {
                    path: 'view/:id',
                    element: <ViewBackupPage/>
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
            element: (
                <ProtectedRoute requiredRole="TECHNICAL">
                    <Outlet/>   
                </ProtectedRoute>
            ), 
            children: [
                {
                    path: '',
                    element: <PrintingPage />
                },
                {
                    path: 'form/:id',
                    element: <FormPrintingPage />
                },
            ]
        },
        {
            path: 'unauthorized',
            element: <UnauthorizedPage/>
        },
        {
            path: '*',
            element: <NotFoundPage/>
        }
    ]);

    return element;
}

export default Routes