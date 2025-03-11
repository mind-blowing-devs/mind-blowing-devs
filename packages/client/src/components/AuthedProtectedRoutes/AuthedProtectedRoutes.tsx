import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AppSpinner } from '..'

export default () => {
  const { isLogged, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <AppSpinner color={'#000'} size={20} />
      </div>
    )
  }
  if (isLogged) {
    return <Navigate to="/" />
  }
  return <Outlet />
}
