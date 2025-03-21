import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppSpinner } from '../AppSpinner'

it('renders correctly', () => {
  const { asFragment } = render(<AppSpinner />)
  expect(asFragment()).toMatchSnapshot()
})
