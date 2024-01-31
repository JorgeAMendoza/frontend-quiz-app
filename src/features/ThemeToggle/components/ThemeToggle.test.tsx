import { screen, render } from '@test/utilities'
import { ThemeToggle } from './ThemeToggle'

it.only('it should render the Theme Component', () => {
  render(<ThemeToggle />)
})

it.only('should by default have the light option toggled', () => {
  render(<ThemeToggle />)

  const lightOptionInput = screen.getByTestId('lightInput')
  const darkOptionInput = screen.getByTestId('darkInput')

  expect(lightOptionInput.getAttribute('checked')).toBe('')
  expect(darkOptionInput.getAttribute('checked')).toBe(null)
})

it.only('should toggle the theme to dark when dark option is clicked', async () => {
  const { user } = render(<ThemeToggle />)
  const darkOptionLabel = screen.getByDisplayValue('dark')
  const lightOptionInput = screen.getByTestId<HTMLInputElement>('lightInput')
  const darkOptionInput = screen.getByTestId<HTMLInputElement>('darkInput')
  await user.click(darkOptionLabel)
  expect(darkOptionInput.checked).toBe(true)
  expect(lightOptionInput.checked).toBe(false)
})
