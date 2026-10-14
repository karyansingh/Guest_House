import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routes/Route'
import store from './store'
import { Provider } from 'react-redux'
import './assets/css/index.css'
import './assets/css/style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
