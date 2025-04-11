import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  authAPI,
  UserSignInData,
  UserSignUpData,
  OAuthYandexData,
} from '../api/authAPI'
import { useAppDispatch } from '../store/store'
import { setUser } from '../store/userSlice'

type AuthContextType = {
  isLogged: boolean
  loading: boolean
  login: (data: UserSignInData, origin: string) => Promise<void>
  logout: () => Promise<void>
  signUp: (data: UserSignUpData) => Promise<void | unknown>
  signInWithYandex: () => Promise<void>
  handleYandexCallback: (code: string) => Promise<void>
}

const REDIRECT_URI = 'http://localhost:3000'

const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  loading: true,
  login: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
  signUp: async () => Promise.resolve(),
  signInWithYandex: async () => Promise.resolve(),
  handleYandexCallback: async () => Promise.resolve(),
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

  // Проверка URL на наличие кода авторизации при загрузке
  useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')

    if (code) {
      handleYandexCallback(code)
        .then(() => {
          // Удаляем code из URL после обработки
          url.searchParams.delete('code')
          window.history.replaceState({}, document.title, url.toString())
        })
        .catch(error => {
          console.error('OAuth error:', error)
        })
    }
  }, [])

  const login = async (data: UserSignInData, origin: string) => {
    await authAPI.signIn(data)
    await getUser()
    setIsLogged(true)
    navigate(origin || '/', { replace: true })
  }

  const signUp = async (data: UserSignUpData) => {
    await authAPI.signUp(data)
    await getUser()
    setIsLogged(true)
    navigate('/', { replace: true })
  }

  const logout = async () => {
    try {
      await authAPI.logOut()
      dispatch(setUser(null))
      setIsLogged(false)
      navigate('/', { replace: true })
    } catch (error) {
      console.log('logout error ', error)
    }
  }

  const signInWithYandex = async () => {
    try {
      const serviceId = await authAPI.getYandexServiceId(REDIRECT_URI)
      const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URI}`
      window.location.href = authUrl
    } catch (error) {
      console.error('Failed to get Yandex service ID:', error)
    }
  }

  const handleYandexCallback = async (code: string) => {
    try {
      const oauthData: OAuthYandexData = {
        code,
        redirect_uri: REDIRECT_URI,
      }
      await authAPI.signInWithYandex(oauthData)
      await getUser()
      setIsLogged(true)
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Failed to sign in with Yandex:', error)
    }
  }

  const value = useMemo(
    () => ({
      loading,
      isLogged,
      signUp,
      login,
      logout,
      signInWithYandex,
      handleYandexCallback,
    }),
    [isLogged, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
