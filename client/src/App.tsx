import { CookiesProvider } from 'react-cookie'
import AuthProvider from './components/auth/AuthProvider'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import { ERole } from './types'
import UserView from './components/auth/UserView'
import AdminView from './components/auth/AdminView'

function App() {
  const { user } = useSelector((root: RootState) => root.user);

  return (
    <div className='flex flex-col min-h-screen items-center'>
      <CookiesProvider>
        <AuthProvider>
          {
            user?.role !== ERole.USER
              ? (
                <UserView />
              )
              : (
                <AdminView />
              )
          }
        </AuthProvider>
      </CookiesProvider>
    </div>

  )
}

export default App
