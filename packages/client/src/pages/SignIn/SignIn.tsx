import { FieldValues, useForm } from 'react-hook-form'
import AppSpinner from '../../components/AppSpinner/AppSpinner'

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const onSubmit = async (data: FieldValues) => {
    console.log(data)

    await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация запроса

    reset() // Очистка инпутов
  }

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <input
          {...register('SignIn')}
          placeholder="Логин"
          className="border border-black min-w-[25rem] text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <div style={{ visibility: errors.login ? 'visible' : 'hidden' }}>
          <p className="text-red-500">{`${errors?.login?.message}`}</p>
        </div>
        <input
          {...register('password')}
          placeholder="Пароль"
          className="mt-2 border border-black text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <div style={{ visibility: errors.password ? 'visible' : 'hidden' }}>
          <p className="text-red-500">{`${errors?.password?.message}`}</p>
        </div>

        {!isSubmitting ? (
          <button
            disabled={isSubmitting}
            className="mt-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-500">
            Войти
          </button>
        ) : (
          <div className="flex justify-center">
            <AppSpinner />
          </div>
        )}
      </form>
      {/*Переделать на Link*/}
      <button className="mt-4 text-blue-600 hover:underline">
        Нет аккаунта?
      </button>
    </main>
  )
}

export default SignIn
