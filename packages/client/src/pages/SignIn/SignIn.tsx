import { FieldValues, useForm } from 'react-hook-form'
import { AppInput, AppSpinner } from '../../components'
import { Link } from 'react-router-dom'
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
    label: 'login',
    name: 'login',
  },
  {
    label: 'password',
    type: 'password',
    name: 'password',
  },
]

const signInSchema = z.object(
  Object.fromEntries(
    pageInputs.map(({ name }) => {
      const [regex, message] = getValidationRules(name)
      return [name, z.string().regex(regex, message)]
    })
  )
)

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  })

  type TSignInSchema = z.infer<typeof signInSchema>

  const onSubmit = async (data: FieldValues) => {
    console.log(data)

    await new Promise(resolve => setTimeout(resolve, 3000)) // Имитация запроса

    reset() // Очистка инпутов
  }

  return (
    <main className="font-press w-screen h-screen flex flex-col items-center justify-center bg-[#BFBFBF] gap-10">
      <div className="text-gray-600 mb-4 max-w-[30rem] text-center">
        Log in to start your minefield adventure!
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  gap-10 bg-[#D9D9D9] p-12 border-4 border-gray-500 shadow-md relative">
        <div className="flex  flex-col gap-10">
          {pageInputs.map(inputItem => (
            <AppInput
              register={register}
              label={inputItem.label}
              name={inputItem.name}
              type={inputItem.type}
              error={errors[inputItem.name as keyof TSignInSchema]}
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
          <p>New Player?</p>
          <Link to="/signUp" className="text-black hover:text-gray-500">
            [Sign Up]
          </Link>
        </div>

        <button className="text-[12px] hover:text-gray-500">
          Forgot your password?
        </button>
      </div>
    </main>
  )
}

export default SignIn
