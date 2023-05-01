import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { loader as studentDetailsLoader } from './routes/StudentDetails';
import RootLayout from './routes/RootLayout';
import './index.css';
import Students from './routes/Students';
import NewStudent from './routes/NewStudent';
import StudentDetails from './routes/StudentDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Students />,
        children: [
          { path: '/create-student', element: <NewStudent /> },
          { path: '/:roll_number', element: <StudentDetails />, loader: studentDetailsLoader }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
