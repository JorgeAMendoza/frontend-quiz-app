import { createBrowserRouter } from 'react-router-dom'
import { rootLoader } from '../root/loader'
import { Root } from '../root/Root'
import { Test } from '../Test/Test'
import { testLoader } from '../Test/loader'
import { TestQuestion } from '../TestQuestion/TestQuestion'
import { Results } from '../result/Results'
import { TestError } from '../Test/components/Error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    errorElement: <div>error element</div>,
    children: [
      {
        path: '/:test',
        errorElement: <TestError />,
        loader: testLoader,
        element: <Test />,
        children: [
          {
            path: 'question/:questionNumber',
            element: <TestQuestion />,
          },
          {
            path: 'result',
            element: <Results />,
          },
        ],
      },
    ],
  },
])
