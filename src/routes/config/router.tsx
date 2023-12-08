import { createBrowserRouter } from 'react-router-dom'
import { rootLoader } from '../root/loader'
import { Root } from '../root/Root'
import { Test } from '../Test/Test'
import { testLoader } from '../Test/loader'

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
            path: ':test/question/:questionNumber',
            element: <div>question element</div>,
            errorElement: <div>error to indicate invalid question</div>,
          },
          {
            path: ':test/result',
            element: <div>result element</div>,
            errorElement: <div>error to indicate invalid result</div>,
          },
        ],
      },
    ],
  },
])
