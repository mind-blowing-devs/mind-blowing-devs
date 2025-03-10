import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI, UserSignInData, UserSignUpData } from '../api/authAPI'

type AuthContextType = {
  isLogged: boolean
  loading: boolean
  login: (data: UserSignInData, origin: string) => Promise<void>
  logout: () => Promise<void>
  signUp: (data: UserSignUpData) => Promise<void | unknown>
}

const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  loading: true,
  login: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
  signUp: async () => Promise.resolve(),
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await authAPI.checkIfAuthed()
        setIsLogged(true)
      } catch (error) {
        setIsLogged(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const login = async (data: UserSignInData, origin: string) => {
    await authAPI.signIn(data)
    setIsLogged(true)
    navigate(origin || '/', { replace: true })
  }

  const signUp = async (data: UserSignUpData) => {
    await authAPI.signUp(data)
    setIsLogged(true)
    navigate('/', { replace: true })
  }

  const logout = async () => {
    try {
      await authAPI.logOut()
      setIsLogged(false)
      navigate('/', { replace: true })
    } catch (error) {
      console.log('logout error ', error)
    }
  }

  const value = useMemo(
    () => ({
      loading,
      isLogged,
      signUp,
      login,
      logout,
    }),
    [isLogged, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
