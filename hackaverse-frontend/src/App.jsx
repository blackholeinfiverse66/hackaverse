import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './components/ui/Toast'
import ErrorBoundary from './components/ErrorBoundary'
import MainPage from './components/MainPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AuthenticatedLayout from './components/layout/AuthenticatedLayout'
import AdminHome from './components/admin/AdminHome'
import AdminProjects from './components/admin/AdminProjects'
import AdminParticipants from './components/admin/AdminParticipants'
import AdminSubmissions from './components/admin/AdminSubmissions'
import AdminSettings from './components/admin/AdminSettings'
import ParticipantHome from './components/participant/ParticipantHome'
import ProfilePage from './components/participant/ProfilePage'
import JudgeHome from './components/judge/JudgeHome'
import JudgeQueue from './components/judge/JudgeQueue'
import JudgeScores from './components/judge/JudgeScores'
import Projects from './components/pages/Projects'
import Teams from './components/pages/Teams'
import Submissions from './components/pages/Submissions'
import PublicLeaderboard from './components/pages/PublicLeaderboard'
import Logs from './components/pages/Logs'
import HealthWidget from './components/ui/HealthWidget'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainPage />} />
          <Route path="/leaderboard" element={<PublicLeaderboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AuthenticatedLayout>
                <AdminHome />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/projects" element={
            <ProtectedRoute requiredRole="admin">
              <AuthenticatedLayout>
                <AdminProjects />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/participants" element={
            <ProtectedRoute requiredRole="admin">
              <AuthenticatedLayout>
                <AdminParticipants />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/submissions" element={
            <ProtectedRoute requiredRole="admin">
              <AuthenticatedLayout>
                <AdminSubmissions />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute requiredRole="admin">
              <AuthenticatedLayout>
                <AdminSettings />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          
          {/* Participant Routes */}
          <Route path="/app" element={
            <ProtectedRoute requiredRole="participant">
              <AuthenticatedLayout>
                <ParticipantHome />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path="/app/projects" element={
            <ProtectedRoute requiredRole="participant">
              <AuthenticatedLayout>
                <Projects />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path="/app/teams" element={
            <ProtectedRoute requiredRole="participant">
              <AuthenticatedLayout>
                <Teams />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path="/app/submissions" element={
            <ProtectedRoute requiredRole="participant">
              <AuthenticatedLayout>
                <Submissions />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path="/app/profile" element={
            <ProtectedRoute requiredRole="participant">
              <AuthenticatedLayout>
                <ProfilePage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          
          {/* Judge Routes */}
          <Route path="/judge" element={
            <ProtectedRoute requiredRole="judge">
              <AuthenticatedLayout>
                <JudgeHome />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path="/judge/queue" element={
            <ProtectedRoute requiredRole="judge">
              <AuthenticatedLayout>
                <JudgeQueue />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path="/judge/scores" element={
            <ProtectedRoute requiredRole="judge">
              <AuthenticatedLayout>
                <JudgeScores />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          
          {/* Shared Protected Routes */}
          <Route path="/logs" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Logs />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          </Routes>
          
          <HealthWidget />
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App