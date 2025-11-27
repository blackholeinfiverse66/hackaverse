import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ToastProvider } from './components/ui/Toast'
import ErrorBoundary from './components/ErrorBoundary'
import MainPage from './components/MainPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AuthenticatedLayout from './components/layout/AuthenticatedLayout'

// Lazy load components for better initial load time
const AdminHome = lazy(() => import('./components/admin/AdminHome'))
const AdminProjects = lazy(() => import('./components/admin/AdminProjects'))
const AdminParticipants = lazy(() => import('./components/admin/AdminParticipants'))
const AdminSubmissions = lazy(() => import('./components/admin/AdminSubmissions'))
const AdminSettings = lazy(() => import('./components/admin/AdminSettings'))
const ParticipantHome = lazy(() => import('./components/participant/ParticipantHome'))
const ProfilePage = lazy(() => import('./components/participant/ProfilePage'))
const JudgeHome = lazy(() => import('./components/judge/JudgeHome'))
const JudgeQueue = lazy(() => import('./components/judge/JudgeQueue'))
const JudgeScores = lazy(() => import('./components/judge/JudgeScores'))
const Projects = lazy(() => import('./components/pages/Projects'))
const Teams = lazy(() => import('./components/pages/Teams'))
const Submissions = lazy(() => import('./components/pages/Submissions'))
const PublicLeaderboard = lazy(() => import('./components/pages/PublicLeaderboard'))
import Logs from './components/pages/Logs'
import HealthWidget from './components/ui/HealthWidget'
import KeyboardShortcutsModal from './components/ui/KeyboardShortcutsModal'

// Suspense fallback for lazy-loaded routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0D1128] to-[#15193B]">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white/60">Loading page...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
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
                <Suspense fallback={<PageLoader />}>
                  <JudgeScores />
                </Suspense>
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          
          {/* Shared Protected Routes */}
          <Route path="/logs" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Suspense fallback={<PageLoader />}>
                  <Logs />
                </Suspense>
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          </Routes>
          
          
          <HealthWidget />
          <KeyboardShortcutsModal />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App