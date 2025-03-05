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
    .instanceof(File, { message: 'Choose a file' })
    .refine(file => file.size <= MAX_FILE_SIZE, { message: 'Too big file' }),
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
      console.error('Error durring file upload', error)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="border-4 border-[#818181] bg-[#D9D9D9] p-10 max-w-md w-full relative mx-2">
        <h1 className="text-lg sm:text-xl text-center mb-8">
          Change avatar
        </h1>

        <form
          className="space-y-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="file"
            className="flex flex-col text-center text-xs sm:text-sm cursor-pointer border border-[#818181] py-2 px-4 transition">
            <div>Choose a file</div>
            <div>(up to 1 MB)</div>
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
            <p className="text-sm text-center truncate">
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
              className="max-w-xs text-xs sm:text-sm px-4 bg-black hover:opacity-80 text-white disabled:cursor-wait disabled:bg-gray-400"
              disabled={isSubmitting}>
              upload
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-red-600 hover:opacity-80 text-xs sm:text-sm">
              [cancel]
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
