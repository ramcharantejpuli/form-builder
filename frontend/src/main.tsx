import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css'

import App from './App'
import FormBuilder from './pages/FormBuilder'
import FormList from './pages/FormList'
import FormSubmission from './pages/FormSubmission'
import FormSubmissions from './pages/FormSubmissions'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <FormList />,
      },
      {
        path: 'forms/new',
        element: <FormBuilder />,
      },
      {
        path: 'forms/:formId',
        element: <FormBuilder />,
      },
      {
        path: 'forms/:formId/submissions',
        element: <FormSubmissions />,
      },
      {
        path: 'forms/:formId/submit',
        element: <FormSubmission />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </QueryClientProvider>
  </React.StrictMode>
)
