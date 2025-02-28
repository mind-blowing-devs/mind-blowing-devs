import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { type ChangePasswordData } from '../../../../api/userAPI'

export function isValidPassword(password: string) {
  if (password === '') {
    return { isValid: false, message: 'Это поле обязательно' }
  }
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
  return {
    isValid: regex.test(password),
    message: '8-40 символов, цифра и одна заглавная буква',
  }
}

const formSchema = z
  .object({
    email: z.string().email('Некорректный email'),
    login: z.string().min(3, 'Логин должен быть не короче 3 символов'),
    first_name: z.string().min(1, 'Введите имя'),
    second_name: z.string().min(1, 'Введите фамилию'),
    display_name: z.string().min(3, 'Отображаемое имя слишком короткое'),
    phone: z.string().regex(/^\+?\d{10,15}$/, 'Некорректный номер телефона'),
    oldPassword: z
      .string()
      .refine(password => isValidPassword(password).isValid, {
        message: '8-40 символов, цифра и одна заглавная буква',
      }),
    newPassword: z
      .string()
      .refine(password => isValidPassword(password).isValid, {
        message: '8-40 символов, цифра и одна заглавная буква',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof formSchema>

type ChangePasswordProps = {
  onPasswordChange: (data: ChangePasswordData) => Promise<void>
}

export default function ChangePassword({
  onPasswordChange,
}: ChangePasswordProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: ChangePasswordData) => {
    try {
      await onPasswordChange(data)
    } catch (error) {
      setError('root', { message: 'Ошибка при обновлении пароля' })
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block font-medium text-gray-700">Старый пароль</label>
        <input
          type="password"
          className="w-full border p-2 rounded-lg"
          {...register('oldPassword')}
        />
        {errors.oldPassword && (
          <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Новый пароль</label>
        <input
          type="password"
          className="w-full border p-2 rounded-lg"
          {...register('newPassword')}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">
          Подтвердите пароль
        </label>
        <input
          type="password"
          className="w-full border p-2 rounded-lg"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        disabled={isSubmitting}>
        Обновить пароль
      </button>

      {errors.root && (
        <p className="text-red-500 text-center text-sm">
          {errors.root.message}
        </p>
      )}
    </form>
  )
}
