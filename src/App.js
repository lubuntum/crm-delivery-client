import './App.css';
import {Route, Routes, Navigate, BrowserRouter} from 'react-router-dom'
import { ROUTES } from './routes';
import { AuthPage } from './components/auth/AuthPage';
import { HomePage } from './components/HomePage';
import { ProtectedRoute } from './services/auth/ProtectedRoute';
import { AuthProvider } from './services/auth/AuthProvider';
import { AuthProtectedRoute } from './services/auth/AuthProtectedRoute';
import { AboutPage } from './components/about/AboutPage';
import { OrderInfoPage } from './components/order/OrderInfoPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainPage />
      </AuthProvider>
    </BrowserRouter>
  );
}
const MainPage = () => {
  return (
    <div className='pageWrapper'>
      <Routes>
        <Route path='/*'                  element = {<p>404 NOT FOUND</p>}/>
        <Route path='/'                   element = {<Navigate to={ROUTES.HOME} replace/>}/>
        <Route path={ROUTES.HOME}         element = {<HomePage/>}/>
        <Route path={ROUTES.ABOUT}        element = {<AboutPage/>}/>
        <Route path={ROUTES.AUTH}         element = {<AuthProtectedRoute element={<AuthPage/>}/>}/>
        <Route path={ROUTES.ACCOUNT}      element = {<ProtectedRoute element={<OrderInfoPage/>}/>}/>
      </Routes>
    </div>
  )
}

export default App;
