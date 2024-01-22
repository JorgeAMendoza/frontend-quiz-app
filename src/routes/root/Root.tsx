import { useEffect, useState } from 'react'
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom'
import { LoaderReturn } from './loader'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'

export const Root = () => {
  const { quizNames } = useLoaderData() as LoaderReturn
  const [testName, setTestName] = useState('')
  const { pathname } = useLocation()
  const ref = useKeyboardNav('#testList a')

  useEffect(() => {
    if (pathname === '/') {
      setTestName('')
      localStorage.removeItem('answerSheet')
      localStorage.removeItem('testName')
      localStorage.removeItem('currentQuestion')
    } else if (pathname !== '/' && !testName) {
      setTestName(localStorage.getItem('testName') || '')
    }
  }, [pathname, testName])

  return (
    <>
      <header>
        <p>{testName}</p>
        <div>theme toggle here</div>
      </header>
      <main>
        {pathname === '/' ? (
          <>
            <div>
              <h1>
                Welcome to the <strong>Frontend Quiz!</strong>
              </h1>
              <p>Pick a subjcet to get started</p>
            </div>
            <div
              role="region"
              aria-label="select a quiz to get started"
              ref={ref}
            >
              <ul id="testList">
                {quizNames.map((quizName) => (
                  <li key={quizName}>
                    <Link
                      to={`/${quizName}/question/1`}
                      onClick={() => setTestName(quizName)}
                    >
                      {quizName}
                    </Link>
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
