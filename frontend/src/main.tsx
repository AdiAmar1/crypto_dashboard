import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './contexts/UserContext'
import RootLayout from './layouts/RootLayout'
import OnBoarding from './pages/OnBoarding'
import Login from './pages/Login'
import Signup from './pages/Signup'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/onboarding" element={<OnBoarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>,
)
