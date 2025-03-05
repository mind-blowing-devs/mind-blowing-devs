import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { type ChangePasswordData } from '../../../../api/userAPI'

const passwordSchema = z
  .string()
  .nonempty({ message: 'this field is required' })
  .regex(
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    '8-40 chars, a number and one capital letter'
  )

const formSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "passwords don't match",
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
    reValidateMode: 'onBlur',
  })

  const onSubmit = async (data: ChangePasswordData) => {
    try {
      await onPasswordChange(data)
    } catch (error) {
      setError('root', { message: 'Error' })
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {[
        { name: 'oldPassword', label: 'old password' },
        { name: 'newPassword', label: 'new password' },
        { name: 'confirmPassword', label: 'confirm password' },
      ].map(field => {
        return (
          <div className="flex flex-col">
            <div className="flex justify-between">
              <label htmlFor={field.name} className='text-xs sm:text-sm'>{field.label}</label>
              <input
                {...register(field.name as keyof FormData)}
                className="w-[60%] border-b-2 border-gray-400 outline-none focus:border-black bg-[#D9D9D9]"
                type="password"
                name={field.name}
              />
            </div>

            {errors[field.name as keyof FormData] && (
              <small className="text-red-500 text-[10px] mt-1">{`${
                errors[field.name as keyof FormData]?.message
              }`}</small>
            )}
          </div>
        )
      })}

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-black text-white text-xs sm:text-sm px-4 py-1 mt-10"
          disabled={isSubmitting}>
          update password
        </button>
      </div>
    </form>
  )
}
