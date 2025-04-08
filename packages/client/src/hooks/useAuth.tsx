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
import { useAppDispatch } from '../store/store'
import { setUser } from '../store/userSlice'

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
  const dispatch = useAppDispatch()

  const getUser = async () => {
    const user = await authAPI.checkIfAuthed()
    dispatch(setUser(user))
  }

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await getUser()
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
    try {
      await authAPI.signIn(data)
      await getUser()
      setIsLogged(true)
      navigate(origin || '/', { replace: true })
    } catch (error) {
      console.log(`login error: ${error}`)
    }
  }

  const signUp = async (data: UserSignUpData) => {
    try {
      await authAPI.signUp(data)
      await getUser()
      setIsLogged(true)
      navigate('/', { replace: true })
    } catch (error) {
      console.log(`sign up error: ${error}`)
    }
  }

  const logout = async () => {
    try {
      await authAPI.logOut()
      dispatch(setUser(null))
      setIsLogged(false)
      navigate('/', { replace: true })
    } catch (error) {
      console.log(`logout error: ${error}`)
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
