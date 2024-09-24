import { Outlet, useRoutes } from 'react-router-dom'
import HomePage from '../pages/home-page';
import NotFoundPage from '../pages/not-found-page';
import SubjectPage from '../pages/subject-page';
import AdminPage from '../pages/admin-page';

const Routes : React.FC = () => {
    const element = useRoutes([
        { path: '/', element: <HomePage/> },
        {
            path: 'admin', 
            element: <Outlet/>, 
            children: [
                {
                    path: '',
                    element: <AdminPage/>
                },
            ]
        },
        {
            path: 'subject', element: <SubjectPage/>,
        },
        {
            path: '*',
            element: <NotFoundPage/>
        }
    ]);

    return element;
}

export default Routes