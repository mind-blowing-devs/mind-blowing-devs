import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { type ChangePasswordData, type User, userAPI } from '../../api/userAPI'
import {
  Avatar,
  ProfileActions,
  ProfileDetails,
  ChangeAvatar,
  ChangePassword,
} from './components'

const mockUserAchievements = {
  gamesPlayed: 43,
  gamesWon: 25,
  bestTime: '1.25',
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const editParam = searchParams.get('edit')
  const isEditPassword = editParam === 'password'
  const isEditAvatar = editParam === 'avatar'

  const handleAvatarChange = async (data: FormData) => {
    const user = await userAPI.changeAvatar(data)
    setUser(user)
  }

  const handlePasswordChange = async (data: ChangePasswordData) => {
    await userAPI.changePassword(data)
  }

  let content = (
    <ProfileDetails
      username={user?.login ?? ''}
      userAchievements={mockUserAchievements}
    />
  )

  let heading = 'Profile'

  if (isEditPassword) {
    content = <ChangePassword onPasswordChange={handlePasswordChange} />
    heading = 'Change Password'
  } else if (isEditAvatar) {
    content = <ChangeAvatar onAvatarChange={handleAvatarChange} />
    heading = 'Change Avatar'
  }

  // ============
  // Temp, will be remove after creating auth API and redux store
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
  // ============

  return (
    <main className="font-press bg-[#BFBFBF] flex flex-col items-center min-h-screen p-4 sm:p-6">
      <h1 className="mt-2 sm:text-xl text-center text-[#585656]">{heading}</h1>
      <div className="border-4 border-[#818181] bg-[#D9D9D9] p-6 mt-8 min-h-[50vh] w-full max-w-xl text-xs sm:text-sm md:text-base">
        <Avatar avatar={user?.avatar ?? null} />
        <section className="mt-10 w-full">{content}</section>
      </div>

      <ProfileActions
        isEdit={isEditPassword || isEditAvatar}
        setSearchParams={setSearchParams}
      />
    </main>
  )
}
