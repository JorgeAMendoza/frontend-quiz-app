export const ThemeToggle = () => {
  return (
    <div data-cy="themeToggle">
      <label aria-label="click to toggle light theme">
        <input type="radio" name="theme" value="light" />
      </label>

      <label aria-label="click to toggle dark theme">
        <input type="radio" name="theme" value="dark" />
      </label>
    </div>
  )
}
