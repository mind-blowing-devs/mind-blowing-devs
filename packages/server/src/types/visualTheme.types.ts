import type { Request } from 'express'
import type { AnyObject } from './utils.types'
import { z } from 'zod'
import {
  createVisualThemeSchema,
  getVisualThemesSchema,
  visualThemeIdSchema,
  setUserVisualThemeSchema,
  getUserVisualThemeSchema,
} from '../schemas'

export type CreateVisualThemeData = z.infer<typeof createVisualThemeSchema>
export type CreateVisualThemeRequest = Request<
  AnyObject,
  AnyObject,
  CreateVisualThemeData
>

export type GetVisualThemeData = z.infer<typeof getVisualThemesSchema>
export type GetVisualThemeRequest = Request<
  AnyObject,
  AnyObject,
  AnyObject,
  GetVisualThemeData
>

export type DeleteVisualThemeData = z.infer<typeof visualThemeIdSchema>
export type DeleteVisualThemeRequest = Request<
  DeleteVisualThemeData,
  AnyObject,
  AnyObject
>

export type SetUserVisualThemeData = z.infer<typeof setUserVisualThemeSchema>
export type SetUserVisualThemeRequest = Request<
  AnyObject,
  AnyObject,
  SetUserVisualThemeData
>

export type GetUserVisualThemeData = z.infer<typeof getUserVisualThemeSchema>
export type GetUserVisualThemeRequest = Request<
  GetUserVisualThemeData,
  AnyObject,
  AnyObject
>
