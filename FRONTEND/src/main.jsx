import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Root from './pages/Root';
import { store } from './store/store';
import { Provider } from "react-redux";
import AuthLayout from './components/AuthLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: '',
        element: <HomePage/>
      },
      {
      path: 'auth',
      element: <AuthPage/>
      },
      {
        path: 'dashboard',
        element: <AuthLayout> 
        <Dashboard/>
        </AuthLayout>
      }
    ]

  }
]);
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<RouterProvider router={router} />

  </Provider>
)
