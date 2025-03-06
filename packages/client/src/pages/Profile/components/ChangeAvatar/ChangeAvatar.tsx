import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type ChangeAvatarProps = {
  onAvatarChange: (data: FormData) => Promise<void>
}

const MAX_FILE_SIZE = 1024 * 1024 // 1 MB

const schema = z.object({
  file: z
    .instanceof(File, { message: 'Choose a file' })
    .refine(file => file.size <= MAX_FILE_SIZE, { message: 'Too big file' }),
})

export default function ChangeAvatar({ onAvatarChange }: ChangeAvatarProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    reset,
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
      const formData = new FormData()
      formData.set('avatar', data.file)
      await onAvatarChange(formData)
      reset()
    } catch {
      setError('root', { message: 'something went wrong, try again' })
    }
  }

  return (
    <form
      className="space-y-4"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="file"
        className="flex flex-col text-center text-xs sm:text-sm cursor-pointer border border-[#818181] py-2 px-4 transition">
        <span>Choose a file</span>
        <span>(up to 1 MB)</span>
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
        <p className="text-xs sm:text-sm text-center truncate">
          {selectedFile.name}
        </p>
      )}

      {errors.file && (
        <p className="text-xs sm:text-sm text-red-500 text-center">
          {errors.file.message}
        </p>
      )}

      {errors.root && (
        <p className="text-red-500 text-[10px] text-center mt-2">
          {errors.root.message}
        </p>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-black text-white text-xs sm:text-sm px-4 py-1 mt-6 disabled:opacity-50 disabled:cursor-wait"
          disabled={isSubmitting}>
          upload
        </button>
      </div>
    </form>
  )
}
