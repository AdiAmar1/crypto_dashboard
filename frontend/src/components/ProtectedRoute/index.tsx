import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

const ProtectedRoute = () => {
  const { user, isLoading, isError } = useUser()
  const location = useLocation()

  if (isLoading) {
    return (
      <main className="dashboard">
        <div className="dashboard-loading" role="status" aria-live="polite">
          <div className="loading-spinner" aria-hidden="true" />
          <p className="loading-text">Loading your dashboard…</p>
        </div>
      </main>
    )
  }

  if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
