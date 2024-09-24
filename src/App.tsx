import { Fragment } from 'react/jsx-runtime'
import { CssBaseline } from '@mui/material'
import { AppProvider } from './context/AppContext'
import AppHeader from './layout/app-header'
import Routes from './routes'
import './App.css'

function App() {
  return (
    <Fragment>
      <AppProvider>
        <CssBaseline />
        <AppHeader/>
        <Routes />
      </AppProvider>
    </Fragment>
  )
}

export default App
