import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChangePasswordData, userAPI, type User } from '../../api/userAPI'
import Avatar from '../../components/Avatar'
import ProfileDetails from './components/ProfileDetails'
import ChangeAvatar from './components/ChangeAvatar'
import ChangePassword from './components/ChangePassword'
import ChangeData from './components/ChangeData'

const mockUser: User = {
  id: 1,
  avatar: null,
  email: 'vasya@yandex.ru',
  login: 'vasek',
  first_name: 'Вася',
  second_name: 'Иванов',
  display_name: 'bombfinder',
  phone: '+99999999999',
}

export default function Profile() {
  const [user, setUser] = useState<User>(mockUser)
  const [searchParams, setSearchParams] = useSearchParams()

  const editParam = searchParams.get('edit')
  const isEditData = editParam === 'data'
  const isEditPassword = editParam === 'password'
  const isEditAvatar = searchParams.get('isEditAvatar') === 'true'

  const updateSearchParams = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)
  }

  const handleAvatarChange = async (file: File) => {
    const formData = new FormData()
    formData.set('avatar', file)
    const user = await userAPI.changeAvatar(formData)
    setUser(user)
  }

  const handleDataChange = async (data: Partial<User>) => {
    const user = await userAPI.changeData(data)
    setUser(user)
  }

  const handlePasswordChange = async (data: ChangePasswordData) => {
    await userAPI.changePassword(data)
  }

  let content = (
    <ProfileDetails
      username={user.login}
      userAchievements={{ gamesPlayed: 43, gamesWon: 25, bestTime: '1.25' }}
    />
  )
  let isEditableAvatar = false
  let onAvatarChange: (() => void) | undefined

  if (isEditData) {
    content = <ChangeData user={user} onDataChange={handleDataChange} />
    isEditableAvatar = true
    onAvatarChange = () => updateSearchParams('isEditAvatar', 'true')
  } else if (isEditPassword) {
    content = <ChangePassword onPasswordChange={handlePasswordChange} />
  }

  useEffect(() => {
    async function getUser() {
      try {
        const user = await userAPI.getUser()
        setUser(user)
      } catch {
        console.error('Ошибка при запросе пользователя')
      }
    }
    getUser()
  }, [])

  return (
    <main className="font-press bg-[#BFBFBF] flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <h1 className="mt-10 sm:text-xl text-center text-[#585656]">
        Your Minesweeper Profile
      </h1>

      <div className="border-4 border-[#818181] bg-[#D9D9D9] p-6 mt-8 min-h-[50vh] w-full max-w-xl text-xs sm:text-sm md:text-base">
        <div className="flex flex-col items-center">
          <Avatar
            avatar={user.avatar}
            name={user.first_name}
            editable={isEditableAvatar}
            onClick={onAvatarChange}
          />
        </div>

        <div className="mt-6 w-full">{content}</div>

        {isEditAvatar && (
          <ChangeAvatar
            onChange={handleAvatarChange}
            onClose={() => updateSearchParams('isEditAvatar', null)}
          />
        )}
      </div>
      <div className="mt-8 flex flex-col justify-center items-center gap-4 max-w-md mx-auto">
        {[
          {
            text: '[edit profile]',
            onClick: () => updateSearchParams('edit', 'data'),
          },
          {
            text: '[change password]',
            onClick: () => updateSearchParams('edit', 'password'),
          },
          { text: '[log out]', onClick: undefined },
        ].map(({ text, onClick }, index) => (
          <button
            key={index}
            type="button"
            onClick={onClick}
            className={`w-auto inline-block bg-transparent text-xs sm:text-sm ${
              text === '[log out]'
                ? 'text-red-600 hover:text-red-400'
                : 'hover:text-gray-500'
            }`}>
            {text}
          </button>
        ))}
      </div>
    </main>
  )
}
