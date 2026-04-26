import { FC, createContext, useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { AuthPage } from '../modules/auth/AuthPage'
import { App } from '../App'

const { PUBLIC_URL } = process.env

export const AppsContext = createContext({})

const AppRoutes: FC = () => {
  const [apps, setApps] = useState({
    username: "",
    role: "",
    handphone: "",
    message: ""
  })
  const access = localStorage.getItem('token')
  return (
    <AppsContext.Provider value={{ apps, setApps }}>
      <BrowserRouter basename={PUBLIC_URL}>
        <Routes>
          <Route element={<App />}>
            <Route path='error/*' element={<ErrorsPage />} />
            {access ? (
              <>
                <Route path='/*' element={<PrivateRoutes />} />
                <Route index element={<Navigate to='/profile' />} />
              </>
            ) : (
              <>
                <Route path='auth/*' element={<AuthPage />} />
                <Route path='*' element={<Navigate to='/auth' />} />
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </AppsContext.Provider>
  )
}

export { AppRoutes }
