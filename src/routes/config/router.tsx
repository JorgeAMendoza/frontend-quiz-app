import { createBrowserRouter } from 'react-router-dom'
import { rootLoader } from '../root/loader'
import { Root } from '../root/Root'
import { Test } from '../Test/Test'
import { testLoader } from '../Test/loader'
import { TestQuestion } from '../TestQuestion/TestQuestion'
import { Results } from '../result/Results'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    errorElement: <div>error element</div>,
    children: [
      {
        path: '/:test',
        errorElement: <div>error to indicate invalid url within html</div>,
        loader: testLoader,
        element: <Test />,
        children: [
          {
            path: 'question/:questionNumber',
            element: <TestQuestion />,
            errorElement: <div>error to indicate invalid question</div>,
          },
          {
            path: 'result',
            element: <Results />,
            errorElement: <div>error to indicate invalid result</div>,
          },
        ],
      },
    ],
  },
])
