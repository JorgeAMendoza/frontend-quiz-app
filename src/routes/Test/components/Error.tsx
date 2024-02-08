import { Link, useRouteError } from 'react-router-dom'
import style from './error.module.css'

export const TestError = () => {
  const routerError = useRouteError() as Error
  return (
    <div className={style.error}>
      <h1>Something went wrong!</h1>
      <p>{routerError.message}</p>

      <Link to="/" data-cy="homeLink">
        Go Home
      </Link>
    </div>
  )
}
