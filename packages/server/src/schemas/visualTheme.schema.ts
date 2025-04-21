import { z } from 'zod'
import xss from 'xss'

export const createVisualThemeSchema = z
  .object({
    name: z
      .string({
        required_error: 'name for theme is required',
      })
      .min(5, { message: 'name must be at least 5 characters' })
      .max(200, { message: 'name must be at most 200 characters' })
      .transform(val => xss(val.trim())),

    settings: z
      .string()
      .optional()
      .transform(val => (val ? xss(val.trim()) : ''))
      .refine(
        val => {
          if (!val) return true // Allow undefined (optional field)
          try {
            JSON.parse(val) // Check if it's valid JSON
            return true
          } catch {
            return false
          }
        },
        { message: 'settings must be a valid JSON string' }
      ),
  })
  .strict()

export const getVisualThemesSchema = z
  .object({
    offset: z.coerce.number().min(0).default(0),
    limit: z.coerce.number().min(1).default(10),
  })
  .strict()

export const visualThemeIdSchema = z
  .object({
    visualThemeId: z.string().uuid({ message: 'invalid visualThemeId format' }),
  })
  .strict()

export const setUserVisualThemeSchema = z
  .object({
    userId: z
      .string({
        required_error: 'userId is required',
      })
      .uuid({ message: 'invalid userId format' }),

    visualThemeId: z
      .string({
        required_error: 'visualThemeId is required',
      })
      .uuid({ message: 'invalid visualThemeId format' }),
  })
  .strict()

export const getUserVisualThemeSchema = z
  .object({
    userId: z.string().uuid({ message: 'invalid userId format' }),
  })
  .strict()
