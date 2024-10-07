import { Fragment } from 'react/jsx-runtime'
import { CssBaseline } from '@mui/material'
import { AppProvider } from './context/AppContext'
import AppHeader from './layout/app-header'
import Routes from './routes'
import './App.css'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <Fragment>
      <AuthProvider>
        <AppProvider>
          <CssBaseline />
          <AppHeader />
          <Routes />
        </AppProvider>
      </AuthProvider>
    </Fragment>
  )
}

export default App
