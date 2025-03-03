import { FieldValues, useForm } from 'react-hook-form'
import { AppInput, AppSpinner } from '../../components'

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm()

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
        className="flex flex-col  gap-10 bg-[#D9D9D9] p-12 border-4 border-gray-500 shadow-md">
        <div className="flex  flex-col gap-10">
          <AppInput register={register} label="username" />

          <AppInput register={register} label="password" type="password" />
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
          <button className="text-black hover:text-gray-500">[Sign Up]</button>
        </div>

        <button className="text-[12px] hover:text-gray-500">
          Forgot your password?
        </button>
      </div>
    </main>
  )
}

export default SignIn
