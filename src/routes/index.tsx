import { Outlet, useRoutes } from 'react-router-dom'
import HomePage from '../pages/home-page';
import NotFoundPage from '../pages/not-found-page';
import ExamSubjectPage from '../pages/create-exam-page';
import ExamPage from '../pages/exam-page';
import EditExamPage from '../pages/edit-exam.page';

const Routes : React.FC = () => {
    const element = useRoutes([
        { path: '/', element: <HomePage/> },
        {
            path: 'exam', 
            element: <Outlet/>,
            children: [
                {
                    path: '',
                    element: <ExamPage/>
                },
                {
                    path: 'create',
                    element: <ExamSubjectPage />
                },
                {
                    path: 'edit/:id',
                    element: <EditExamPage />
                }
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