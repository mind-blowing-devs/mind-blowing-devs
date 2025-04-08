import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AppSpinner } from '..'

export default () => {
  const { isLogged, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AppSpinner color={'#000'} size={20} />
      </div>
    )
  }
  if (!isLogged) {
    return <Navigate to="/signIn" replace state={{ from: location }} />
  }
  return <Outlet />
}
