import { FieldValues, useForm } from 'react-hook-form'

function SignUp() {
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input
          {...register('first_name')}
          name="first_name"
          placeholder="Имя"
          className="border border-black min-w-[25rem] text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <p className="text-red-500">{errors?.first_name?.message as string}</p>

        <input
          {...register('second_name')}
          name="second_name"
          placeholder="Фамилия"
          className="border border-black text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <p className="text-red-500">{errors?.second_name?.message as string}</p>

        <input
          {...register('login')}
          name="login"
          placeholder="Логин"
          className="border border-black text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <p className="text-red-500">{errors?.login?.message as string}</p>

        <input
          {...register('email')}
          name="email"
          type="email"
          placeholder="Email"
          className="border border-black text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <p className="text-red-500">{errors?.email?.message as string}</p>

        <input
          {...register('password')}
          name="password"
          type="password"
          placeholder="Пароль"
          className="border border-black text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <p className="text-red-500">{errors?.password?.message as string}</p>

        <input
          {...register('phone')}
          name="phone"
          type="tel"
          placeholder="Телефон"
          className="border border-black text-black text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <p className="text-red-500">{errors?.phone?.message as string}</p>

        <button
          disabled={isSubmitting}
          className="mt-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-500">
          Зарегистрироваться
        </button>
      </form>

      <a href="/login" className="mt-4 text-blue-600 hover:underline">
        Есть аккаунт?
      </a>
    </main>
  )
}

export default SignUp
