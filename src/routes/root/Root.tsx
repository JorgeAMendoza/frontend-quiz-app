import { useLoaderData } from 'react-router-dom'
import { LoaderReturn } from './loader'

export const Root = () => {
  const { quizNames } = useLoaderData() as LoaderReturn
  return (
    <>
      <header>
        <div>theme toggle here</div>
      </header>
      <main>
        <div>
          <h1>
            Welcome to the <strong>Frontend Quiz!</strong>
          </h1>
          <p>Pick a subjet to get started</p>
        </div>
        <div role="region" aria-label="select a quiz to get started">
          <ul>
            {quizNames.map((quizName) => (
              <li key={quizName}>
                <a href={`/${quizName}`}>{quizName}</a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
