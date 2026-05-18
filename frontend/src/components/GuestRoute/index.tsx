import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

const GuestRoute = () => {
  const { user, isLoading } = useUser()

  if (!isLoading && user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default GuestRoute
