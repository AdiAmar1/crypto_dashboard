import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './contexts/UserContext'
import RootLayout from './layouts/RootLayout'
import OnBoarding from './pages/OnBoarding'
import GuestRoute from './components/GuestRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<App />} />
              <Route path="/onboarding" element={<OnBoarding />} />
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>,
)
