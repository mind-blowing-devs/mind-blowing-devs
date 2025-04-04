import { useSearchParams } from 'react-router-dom'
import { type ChangePasswordData, userAPI } from '../../api'
import {
  Avatar,
  ProfileActions,
  ProfileDetails,
  ChangeAvatar,
  ChangePassword,
} from './components'
import { useAppSelector, useAppDispatch, changeAvatar } from '../../store'
import { useAuth } from '../../hooks'

export default function Profile() {
  const dispatch = useAppDispatch()
  const { logout } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user, achievements } = useAppSelector(state => state.user)

  const editParam = searchParams.get('edit')
  const isEditPassword = editParam === 'password'
  const isEditAvatar = editParam === 'avatar'

  const handleAvatarChange = async (data: FormData) => {
    await dispatch(changeAvatar(data)).unwrap()
  }

  const handlePasswordChange = async (data: ChangePasswordData) => {
    await userAPI.changePassword(data)
  }

  let content = (
    <ProfileDetails
      username={user?.login ?? ''}
      userAchievements={achievements}
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

  return (
    <main className="flex flex-col items-center min-h-screen p-4 sm:p-6">
      <h1 className="mt-2 sm:text-xl text-font-color">{heading}</h1>
      <div className="border-4 border-[#818181] bg-[#D9D9D9] p-6 mt-8 w-full max-w-xl text-xs sm:text-sm md:text-base">
        <Avatar avatar={user?.avatar ?? null} />
        <section className="mt-10">{content}</section>
      </div>

      <ProfileActions
        isEdit={isEditPassword || isEditAvatar}
        setSearchParams={setSearchParams}
        onLogOut={logout}
      />
    </main>
  )
}
