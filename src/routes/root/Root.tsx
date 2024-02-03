import { useEffect, useState } from 'react'
import { Outlet, useLoaderData, useLocation } from 'react-router-dom'
import { LoaderReturn } from './loader'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'
import { ThemeToggle } from '@/features/ThemeToggle'
import style from './root.module.css'
import utilStyle from '@/styles/utils/util.module.css'
import { TestChoice } from '@/components'

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
    <div className={utilStyle.container}>
      <header className={style.header}>
        <div className={style.testTitle}>
          {testName ? (
            <span>
              <img src={`/test-icons/${testName}.svg`} alt="" />
            </span>
          ) : null}
          <p>{testName}</p>
        </div>
        <ThemeToggle />
      </header>
      <main className={style.root}>
        {pathname === '/' ? (
          <>
            <div>
              <h1>
                Welcome to the
                <br /> <strong>Frontend Quiz!</strong>
              </h1>
              <p>Pick a subject to get started</p>
            </div>
            <div
              role="region"
              aria-label="select a quiz to get started"
              ref={ref}
            >
              <ul id="testList" data-cy="testList" className={style.testList}>
                {quizNames.map((quizName) => (
                  <TestChoice
                    key={quizName}
                    testName={quizName}
                    setTestName={setTestName}
                    testIcon={`/test-icons/${quizName}.svg`}
                  />
                ))}
              </ul>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}
