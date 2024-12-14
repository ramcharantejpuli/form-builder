import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import FormBuilder from './pages/FormBuilder'
import FormView from './pages/FormView'
import FormSubmissionView from './components/FormSubmission/FormSubmissionView'
import { useAuth } from './hooks/useAuth'
import './App.css'

const queryClient = new QueryClient()

function Navigation() {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">FormBuilder</span>
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <Link
                  to="/forms/new"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Create Form
                </Link>
                <button
                  onClick={() => logout()}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              location.pathname !== '/login' && location.pathname !== '/register' && (
                <>
                  <Link
                    to="/login"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Register
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="py-4">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/forms/new"
                  element={
                    <ProtectedRoute>
                      <FormBuilder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/forms/:id/edit"
                  element={
                    <ProtectedRoute>
                      <FormBuilder />
                    </ProtectedRoute>
                  }
                />
                <Route path="/forms/:id" element={<FormView />} />
                <Route
                  path="/forms/:formId/submissions"
                  element={
                    <ProtectedRoute>
                      <FormSubmissionView />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}
