import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User } from '../../../../api/userAPI'

const formSchema = z.object({
  email: z.string().email('Некорректный email'),
  login: z.string().min(3, 'Логин должен быть не короче 3 символов'),
  first_name: z.string().min(1, 'Введите имя'),
  second_name: z.string().min(1, 'Введите фамилию'),
  display_name: z.string().min(3, 'Отображаемое имя слишком короткое'),
  phone: z.string().regex(/^\+?\d{10,15}$/, 'Некорректный номер телефона'),
})

type FormData = z.infer<typeof formSchema>

type ChangeDataProps = {
  user: Partial<User>
  onDataChange: (data: Partial<User>) => Promise<void>
}

export default function ChangeData({
  user,
  onDataChange,
}: ChangeDataProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      email: user.email || '',
      login: user.login || '',
      first_name: user.first_name || '',
      second_name: user.second_name || '',
      display_name: user.display_name || '',
      phone: user.phone || '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await onDataChange(data)
    } catch (error) {
      setError('root', { message: 'Ошибка при обновлении данных' })
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded-lg"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Логин</label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg"
          {...register('login')}
        />
        {errors.login && (
          <p className="text-red-500 text-sm">{errors.login.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Имя</label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg"
          {...register('first_name')}
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm">{errors.first_name.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Фамилия</label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg"
          {...register('second_name')}
        />
        {errors.second_name && (
          <p className="text-red-500 text-sm">{errors.second_name.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Имя в игре</label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg"
          {...register('display_name')}
        />
        {errors.display_name && (
          <p className="text-red-500 text-sm">{errors.display_name.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Телефон</label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg"
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        disabled={isSubmitting}>
        Обновить данные
      </button>

      {errors.root && (
        <p className="text-red-500 text-center text-sm">
          {errors.root.message}
        </p>
      )}
    </form>
  )
}
