import { Link } from 'react-router-dom'

export const RootError = () => {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>Invalid Route</p>

      <Link to="/" data-cy="homeLink">
        Go Home
      </Link>
    </div>
  )
}
