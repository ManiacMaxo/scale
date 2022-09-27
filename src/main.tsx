import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Loader } from './components'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const Scale = React.lazy(() => import('./pages/scale'))
const Gallery = React.lazy(() => import('./pages/gallery'))

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Scale />,
        },
        {
            path: '/gallery',
            element: <Gallery />,
        },
    ],
    { basename: import.meta.env.BASE_URL }
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
        </Suspense>
    </React.StrictMode>
)

registerServiceWorker()
