import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import RootLayout from './layouts/RootLayout'
import OnBoarding from './pages/OnBoarding'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/onboarding" element={<OnBoarding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
)
