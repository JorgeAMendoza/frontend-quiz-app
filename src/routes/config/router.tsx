import { createBrowserRouter } from 'react-router-dom'
import { rootLoader } from '../root/loader'
import { Root } from '../root/Root'

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
        children: [
          {
            path: '/:test/question/:questionNumber',
            element: <div>question element</div>,
            errorElement: <div>error to indicate invalid question</div>,
          },
          {
            path: '/:test/result',
            element: <div>result element</div>,
            errorElement: <div>error to indicate invalid result</div>,
          },
        ],
      },
    ],
  },
])
