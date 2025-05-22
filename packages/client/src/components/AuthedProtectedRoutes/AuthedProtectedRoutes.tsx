import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks'
import { AppSpinner } from '..'
import { Helmet } from 'react-helmet'

export default () => {
  const { isLogged, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Helmet>
          <title>Loading</title>
        </Helmet>
        <AppSpinner color={'#000'} size={20} />
      </div>
    )
  }
  if (isLogged) {
    return <Navigate to="/" />
  }
  return <Outlet />
}
