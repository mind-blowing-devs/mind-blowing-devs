import { User } from "../../../../api/userAPI"

type ProfileDetailsProps = {
  user: Partial<User>
  onChangeData: () => void
  onChangePassword: () => void
}

export default function ProfileDetails({
  user,
  onChangeData,
  onChangePassword,
}: ProfileDetailsProps) {
  return (
    <>
      <section className="w-full max-w-md mx-auto">
        <dl className="space-y-4">
          {[
            { label: 'Почта', value: user.email },
            { label: 'Логин', value: user.login },
            { label: 'Имя', value: user.first_name },
            { label: 'Фамилия', value: user.second_name },
            { label: 'Имя в игре', value: user.display_name },
            { label: 'Телефон', value: user.phone },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between border-b pb-2">
              <dt className="text-gray-500 font-medium">{label}</dt>
              <dd className="text-gray-900 font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8 flex flex-col gap-2 max-w-md mx-auto">
        {[
          { text: 'Изменить данные', onClick: onChangeData },
          { text: 'Изменить пароль', onClick: onChangePassword },
          { text: 'Выйти', onClick: undefined },
        ].map(({ text, onClick }, index) => (
          <button
            key={index}
            type="button"
            onClick={onClick}
            className={`w-auto inline-block text-left transition bg-transparent ${
              text === 'Выйти'
                ? 'text-red-600 hover:text-red-700'
                : 'text-blue-400 hover:text-blue-700'
            }`}>
            {text}
          </button>
        ))}
      </section>
    </>
  )
}
