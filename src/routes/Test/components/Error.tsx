import { Link, useRouteError } from 'react-router-dom'

export const TestError = () => {
  const routerError = useRouteError() as Error
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{routerError.message}</p>

      <Link to="/">Go Home</Link>
    </div>
  )
}
