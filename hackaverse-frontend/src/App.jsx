import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import LandingPageNew from './components/LandingPageNew'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import ForgotPassword from './components/ForgotPassword'
import RegistrationPage from './components/RegistrationPage'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import ResultsPage from './components/ResultsPage'

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<LandingPageNew />} />
        <Route path="/old" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </ToastProvider>
  )
}

export default App
