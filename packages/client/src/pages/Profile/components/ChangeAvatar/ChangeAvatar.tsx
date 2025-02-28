import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type ChangeAvatarProps = {
  onChange: (file: File) => Promise<void>
  onClose: () => void
}

const MAX_FILE_SIZE = 1024 * 1024 // 1 MB

const schema = z.object({
  file: z
    .instanceof(File, { message: 'Нужно выбрать файл' })
    .refine(file => file.size <= MAX_FILE_SIZE, 'Слишком большой файл'),
})

export default function ChangeAvatar({ onChange, onClose }: ChangeAvatarProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<{ file: File }>({
    resolver: zodResolver(schema),
    defaultValues: { file: undefined as unknown as File },
  })

  const selectedFile = watch('file')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setValue('file', file)
      clearErrors()
    }
  }

  const onSubmit = async (data: { file: File }) => {
    try {
      await onChange(data.file)
      onClose()
    } catch (error) {
      console.error('Ошибка загрузки файла', error)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-sm w-full relative">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-8">
          Изменить аватар
        </h1>

        <form
          className="space-y-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="file"
            className="block text-center text-blue-500 hover:text-blue-600 cursor-pointer font-medium border border-blue-500 rounded-lg py-2 px-4 transition">
            Выбрать файл на компьютере (до 1 Мб)
          </label>

          <input
            id="file"
            type="file"
            accept=".jpeg, .jpg, .png, .gif, .webp"
            className="hidden"
            {...register('file')}
            onChange={handleFileChange}
          />

          {selectedFile && (
            <p className="text-sm text-gray-700 text-center truncate">
              {selectedFile.name}
            </p>
          )}

          {errors.file && (
            <p className="text-sm text-red-500 text-center">
              {errors.file.message}
            </p>
          )}

          <div className="flex flex-row-reverse justify-between gap-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:cursor-wait disabled:bg-gray-400"
              disabled={isSubmitting}>
              Загрузить
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-400 transition">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
