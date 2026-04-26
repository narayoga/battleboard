import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import ProfileWrapper from '../pages/profile-page'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils/DomHelpers'
import { WithChildren } from '../../_metronic/helpers/react18MigrationHelpers'

const PrivateRoutes = () => {
  const Test = lazy(() => import('../modules/tables/tes'))
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/profile' />} />
        {/* Pages */}
        <Route path='*' element={<Navigate to='/error/404' />} />
        {/* <Route
          path='tes'
          element={
            <SuspensedView>
              <Test />
            </SuspensedView>
          }
        /> */}
        <Route
          path='profile'
          element={
            <SuspensedView>
              <ProfileWrapper />
            </SuspensedView>
          }
        />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
