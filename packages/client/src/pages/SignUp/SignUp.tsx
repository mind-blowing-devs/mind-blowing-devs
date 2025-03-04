import { FieldValues, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { AppInput, AppSpinner } from '../../components'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getValidationRules } from '../../utlis/getValidationRules'

const pageInputs: {
  label: string
  name: string
  type?: string
  error?: string
}[] = [
  {
    label: 'first name',
    name: 'first_name',
  },
  {
    label: 'second name',
    name: 'second_name',
  },
  {
    label: 'login',
    name: 'login',
  },
  {
    label: 'email',
    type: 'email',
    name: 'email',
  },
  {
    label: 'password',
    type: 'password',
    name: 'password',
  },
  {
    label: 'password again',
    type: 'password',
    name: 'password_again',
  },
  {
    label: 'phone',
    type: 'tel',
    name: 'phone',
  },
]

const signUpSchema = z
  .object(
    Object.fromEntries(
      pageInputs.map(({ name }) => {
        if (name === 'password_again') {
          return [
            name,
            z
              .string()
              .min(
                1,
                'Для регистрации необходимо обязательно подтвердить пароль'
              ),
          ]
        }

        const [regex, message] = getValidationRules(name)
        return [name, z.string().regex(regex, message)]
      })
    )
  )
  .refine(data => data.password === data.password_again, {
    message: 'Для регистрации необходимо ввести совпадающие пароли',
    path: ['password_again'],
  })

function SignUp() {
  type TSignUpSchema = z.infer<typeof signUpSchema>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) })

  const onSubmit = async (data: FieldValues) => {
    console.log(data)

    await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация запроса

    reset() // Очистка инпутов
  }

  return (
    <main className="font-press w-screen h-screen flex flex-col items-center justify-center bg-[#BFBFBF] gap-10 ">
      <div className="text-gray-600 mb-4 max-w-[30rem] text-center">
        Create your account to start sweeping mines!
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  gap-10 bg-[#D9D9D9] p-12 border-4 border-gray-500 shadow-md  relative">
        <div className="flex  flex-col gap-10">
          {pageInputs.map(inputItem => (
            <AppInput
              register={register}
              label={inputItem.label}
              name={inputItem.name}
              type={inputItem.type}
              error={errors[inputItem.name as keyof TSignUpSchema]}
            />
          ))}
        </div>

        {!isSubmitting ? (
          <div className="flex justify-center">
            <button
              disabled={isSubmitting}
              className="bg-black text-white w-fit px-2 text-[20px]">
              start game
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <AppSpinner color={'#000'} />
          </div>
        )}
      </form>

      <div className="mt-4 flex flex-col gap-2 text-gray-600">
        <div className="flex text-[13px] gap-2">
          <p>Have an account?</p>
          <Link to="/signIn" className="text-black hover:text-gray-500">
            [Sign In]
          </Link>
        </div>

        <button className="text-[12px] hover:text-gray-500">
          Forgot your password?
        </button>
      </div>
    </main>
  )
}

export default SignUp
