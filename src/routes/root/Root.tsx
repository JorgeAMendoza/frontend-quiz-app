import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom'
import { LoaderReturn } from './loader'

export const Root = () => {
  const { quizNames } = useLoaderData() as LoaderReturn
  const location = useLocation()

  if (location.pathname === '/') {
    localStorage.removeItem('answerSheet')
  }

  return (
    <>
      <header>
        <div>theme toggle here</div>
      </header>
      <main>
        {location.pathname === '/' ? (
          <>
            <div>
              <h1>
                Welcome to the <strong>Frontend Quiz!</strong>
              </h1>
              <p>Pick a subjcet to get started</p>
            </div>
            <div role="region" aria-label="select a quiz to get started">
              <ul>
                {quizNames.map((quizName) => (
                  <li key={quizName}>
                    <Link to={`/${quizName}/question/1`}>{quizName}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  )
}
