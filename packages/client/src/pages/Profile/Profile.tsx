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
      user={user}
      onChangeData={() => updateSearchParams('edit', 'data')}
      onChangePassword={() => updateSearchParams('edit', 'password')}
    />
  )
  let title = user.first_name
  let isEditableAvatar = false
  let onAvatarChange: (() => void) | undefined

  if (isEditData) {
    content = <ChangeData user={user} onDataChange={handleDataChange} />
    title = 'Изменить данные'
    isEditableAvatar = true
    onAvatarChange = () => updateSearchParams('isEditAvatar', 'true')
  } else if (isEditPassword) {
    content = <ChangePassword onPasswordChange={handlePasswordChange} />
    title = 'Изменить пароль'
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
    <main className="flex flex-col items-center max-w-lg mx-auto mt-10">
      <header className="flex flex-col items-center gap-4">
        <Avatar
          avatar={user.avatar}
          name={user.first_name}
          size="xl"
          editable={isEditableAvatar}
          onClick={onAvatarChange}
        />
        <h1 className="text-4xl font-bold">{title}</h1>
      </header>
      <div className="mt-6 w-full">{content}</div>

      {isEditAvatar && (
        <ChangeAvatar
          onChange={handleAvatarChange}
          onClose={() => updateSearchParams('isEditAvatar', null)}
        />
      )}
    </main>
  )
}
