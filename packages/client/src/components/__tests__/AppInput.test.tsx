import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppInput } from '../AppInput'

describe('AppInput', () => {
  let mockRegister: jest.Mock

  beforeEach(() => {
    mockRegister = jest.fn(name => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <AppInput
        register={mockRegister}
        label="text input"
        name="first_name"
        type="text"
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onBlur when input loses focus', () => {
    const { getByRole } = render(
      <AppInput
        register={mockRegister}
        label="Text input"
        name="first_name"
        type="text"
      />
    )
    const input = getByRole('textbox')
    const { onBlur } = mockRegister.mock.results[0].value

    fireEvent.blur(input)

    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('should display an error message when error prop is provided', () => {
    const errorMessage = 'This field is required'
    render(
      <AppInput
        register={mockRegister}
        label="Text input"
        name="first_name"
        type="text"
        error={{ type: 'required', message: errorMessage }}
      />
    )

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
