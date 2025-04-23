import { z } from 'zod'
import xss from 'xss'

const rules: { [key: string]: [RegExp, string] } = {
  first_name: [
    /^[A-Za-zА-Яа-яЁё]{1}[A-Za-zА-Яа-яЁё-]+$/,
    'name must start with a capital letter, without spaces or digits',
  ],
  second_name: [
    /^[A-Za-zА-Яа-яЁё]{1}[A-Za-zА-Яа-яЁё-]+$/,
    'name must start with a capital letter, without spaces or digits',
  ],
  login: [
    /^[A-Za-z][A-Za-z0-9_-]{2,19}$/,
    'username must contain 3-20 chars, only latin letters, digits, hyphens, or underscores',
  ],
  email: [
    /^[A-Za-z0-9_-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    'email must contain "@", and the domain must consist of at least two letters',
  ],
  password: [
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    'password must contain 8-40 chars, one uppercase letter, and a digit',
  ],
  password_again: [
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    'password must contain 8-40 chars, one uppercase letter, and a digit',
  ],
  phone: [
    /^\+?[0-9]{10,15}$/,
    'phone number must contain 10-15 chars, using only digits',
  ],
}

export const createUserSchema = z.object({
  first_name: z
    .string({
      required_error: 'first_name is required',
    })
    .regex(rules.first_name[0], rules.first_name[1])
    .transform(val => xss(val.trim())),

  second_name: z
    .string({
      required_error: 'second_name is required',
    })
    .regex(rules.second_name[0], rules.second_name[1])
    .transform(val => xss(val.trim())),

  login: z
    .string({
      required_error: 'login is required',
    })
    .regex(rules.login[0], rules.login[1])
    .transform(val => xss(val.trim())),

  password: z
    .string({
      required_error: 'password is required',
    })
    .regex(rules.password[0], rules.password[1])
    .transform(val => xss(val.trim())),

  email: z
    .string({
      required_error: 'email is required',
    })
    .regex(rules.email[0], rules.email[1])
    .transform(val => xss(val.trim())),

  phone: z
    .string({
      required_error: 'phone is required',
    })
    .regex(rules.phone[0], rules.phone[1])
    .transform(val => xss(val.trim())),

  display_name: z
    .string()
    .min(1, 'category must be at least 1 character')
    .max(50, 'display_name must be at most 50 characters')
    .optional()
    .transform(val => val && xss(val.trim())),

  avatar: z
    .string()
    .optional()
    .transform(val => val && xss(val.trim())),
})
