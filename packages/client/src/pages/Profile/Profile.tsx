import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChangePasswordData, userAPI, type User } from '../../api/userAPI'
import Avatar from './components/Avatar'
import ProfileDetails from './components/ProfileDetails'
import ChangeAvatar from './components/ChangeAvatar'
import ChangePassword from './components/ChangePassword'

const mockUserAchievements = {
  gamesPlayed: 43,
  gamesWon: 25,
  bestTime: '1.25',
}

export default function Profile() {
  const [user, setUser] = useState<Partial<User>>({})
  const [searchParams, setSearchParams] = useSearchParams()

  const editParam = searchParams.get('edit')
  const isEditPassword = editParam === 'password'
  const isEditAvatar = editParam === 'avatar'

  const handleAvatarChange = async (file: File) => {
    const formData = new FormData()
    formData.set('avatar', file)
    const user = await userAPI.changeAvatar(formData)
    setUser(user)
  }

  const handlePasswordChange = async (data: ChangePasswordData) => {
    await userAPI.changePassword(data)
  }

  let content = (
    <ProfileDetails
      username={user.login ?? ''}
      userAchievements={mockUserAchievements}
    />
  )

  if (isEditPassword) {
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
          <Avatar avatar={user.avatar ?? null} />
        </div>
        <div className="mt-6 w-full">{content}</div>
      </div>
      
      <div className="mt-8 flex flex-col justify-center items-center gap-4 max-w-md mx-auto">
        {[
          {
            text: '[edit avatar]',
            onClick: () => setSearchParams({ edit: 'avatar' }),
          },
          {
            text: '[change password]',
            onClick: () => setSearchParams({ edit: 'password' }),
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
      {isEditAvatar && (
        <ChangeAvatar
          onChange={handleAvatarChange}
          onClose={() => setSearchParams()}
        />
      )}
    </main>
  )
}
