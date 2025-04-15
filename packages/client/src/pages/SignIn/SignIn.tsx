import { useForm } from 'react-hook-form'
import { AppInput, AppSpinner, Button, YandexIcon } from '../../components'
import { Link, useLocation } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getValidationRules } from '../../utils'
import { useAuth, usePage } from '../../hooks'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Helmet } from 'react-helmet'

type PageInput = {
  name: 'login' | 'password'
  label: string
  type?: string
  error?: string
}

const pageInputs: PageInput[] = [
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

const keyValuePairs = pageInputs.map(({ name }) => {
  const [regex, message] = getValidationRules(name)
  return [name, z.string().regex(regex, message)] as const
})

const signInSchema = z.object(
  keyValuePairs.reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {} as Record<(typeof pageInputs)[number]['name'], z.ZodString>)
)

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    trigger,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })
  const { login, signInWithYandex } = useAuth()
  usePage({})

  const location = useLocation()
  const [errorHint, setErrorHint] = useState('')

  type TSignInSchema = z.infer<typeof signInSchema>

  const onSubmit = async (data: TSignInSchema) => {
    const isValid = await trigger() // Проверяем инпуты при submit
    if (!isValid) {
      return
    }

    try {
      await login(data, location.state?.from?.pathname)
    } catch (error: unknown) {
      const reason = (
        (error as AxiosError)?.response?.data as { reason: string }
      )?.reason
      setErrorHint(reason || 'Oops. Something went wrong. Try again later.')
    }
  }

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center gap-10">
      <Helmet>
        <title>Sign in / Minesweeper Adventure game</title>
        <meta
          name="description"
          content="Let's begin Minesweeper Adventure! Sign in or create an account to start sweeping mines!"
        />
      </Helmet>
      <h1 className="text-font-color mb-4 max-w-[30rem] text-center">
        Log in to start your minefield adventure!
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 bg-[#D9D9D9] p-12 border-4 border-gray-500 shadow-md max-w-[50rem]">
        <div className="flex  flex-col gap-10">
          {pageInputs.map(inputItem => (
            <AppInput
              key={inputItem.name}
              register={register}
              label={inputItem.label}
              name={inputItem.name}
              type={inputItem.type}
              error={errors[inputItem.name as keyof TSignInSchema]}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          {!isSubmitting ? (
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className="w-[240px]">
              start game
            </Button>
          ) : (
            <div className="h-[52px] flex items-center">
              <AppSpinner color={'#000'} />
            </div>
          )}

          <Button
            type="button"
            onClick={signInWithYandex}
            variant="yandex"
            className="w-[240px]"
            icon={<YandexIcon width={32} height={32} />}>
            sign in
          </Button>
        </div>

        {errorHint && (
          <p className="text-center text-[12px] text-red-500 mt-4">
            {errorHint}
          </p>
        )}
      </form>

      <div className="text-font-color mt-4 flex flex-col gap-2">
        <div className="flex text-[13px] gap-2">
          <p>New Player?</p>
          <Link to="/signUp" className="text-black hover:opacity-50">
            [Sign Up]
          </Link>
        </div>
      </div>
    </main>
  )
}

export default SignIn
