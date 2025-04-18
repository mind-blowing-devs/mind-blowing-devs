import { z } from 'zod'
import xss from 'xss'

export const safeString = () => z.string().transform(val => xss(val.trim()))
