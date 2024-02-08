import {  createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home'
import Users from '../pages/users'
import UsersList from '../pages/users/list'
import Appointments from '../pages/appointments'
import Login from '../pages/auth/login'
import Register from '../pages/auth/resgister'
import Error from '../pages/error' 
import ProtectedRoute from './protectedRoute';
import Create from '../pages/users/create'
import ViewUser from '../pages/users/view';

export const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute><Home /></ProtectedRoute>,
      errorElement: <Error />,
      
    },
    {
      path: '/users',
      element: <ProtectedRoute><Users /></ProtectedRoute>,
      errorElement: <Error />,
      children: [
        { path: '/users', element: <ProtectedRoute><UsersList/></ProtectedRoute> },
        { path: ':id', element: <ProtectedRoute><ViewUser/></ProtectedRoute> },
        { path: 'add', element: <ProtectedRoute><Create /> </ProtectedRoute>},
      ],
    },
    {
      path: '/appointments',
      element: <ProtectedRoute><Appointments /></ProtectedRoute>,
      errorElement: <Error />,
    },
    // {
    //     path: '*',
    //     element: <Login />,
    //     errorElement: <Error />,
    //   },
    {
      path: '/login',
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: '/register',
      element: <Register />,
      errorElement: <Error />,
    },
  ]);