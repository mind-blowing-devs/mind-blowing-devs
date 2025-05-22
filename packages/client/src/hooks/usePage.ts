import { useEffect } from 'react'
import { useAppDispatch, useAppSelector, useStore } from '../store'
import {
  setPageHasBeenInitializedOnServer,
  selectPageHasBeenInitializedOnServer,
} from '../store/ssrSlice'

import { PageInitArgs, PageInitContext } from '../routes'

type PageProps = {
  initPage?: (data: PageInitArgs) => Promise<unknown>
}

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const createContext = (): PageInitContext => ({
  clientToken: getCookie('token'),
})

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch()
  const pageHasBeenInitializedOnServer = useAppSelector(
    selectPageHasBeenInitializedOnServer
  )
  const store = useStore()

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }
    if (initPage) {
      initPage({ dispatch, state: store.getState(), ctx: createContext() })
    }
  }, [])
}
