import './App.css';
import './styles/ui_elements/buttons.css'
import './styles/ui_elements/inputs.css'
import './styles/ui_elements/loading_bar.css'
import {Route, Routes, Navigate, BrowserRouter} from 'react-router-dom'
import { ROUTES } from './routes';
import { AuthPage } from './components/auth/AuthPage';
import { HomePage } from './components/HomePage';
import { ProtectedRoute } from './services/auth/ProtectedRoute';
import { AuthProvider } from './services/auth/AuthProvider';
import { AuthProtectedRoute } from './services/auth/AuthProtectedRoute';
import { AboutPage } from './components/about/AboutPage';
import { AccountPage } from './components/account/AccountPage';
import { CreateOrderPage } from './components/order/create-order/CreateOrderPage';
import { OrdersPage } from './components/order/orders-list/OrdersPage';
import { OrderStepsPage } from './components/order/order-steps/OrderStepsPage';
import { OrderPickupPage } from './components/order/pickup-order/OrderPickupPage';
import { OrderInspectionPage } from './components/order/inspection/OrderInspectionPage';
import { FinishOrderPage } from './components/order/finish-order/FinishOrderPage';
import { OrderImagesViewer } from './components/order/OrderImagesViewer';
import { EmployeesPage } from './components/employees/EmployeesPage';

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
        <Route path={ROUTES.ACCOUNT}      element = {<ProtectedRoute element={<AccountPage/>} />}/>
        <Route path={ROUTES.CREATE_ORDER} element = {<ProtectedRoute element={<CreateOrderPage />}/>}/>
        <Route path={ROUTES.PICKUP_ORDER} element = {<ProtectedRoute element={<OrderPickupPage/>} />} />
        <Route path={ROUTES.ORDERS}       element = {<ProtectedRoute element={<OrdersPage />} />} />
        <Route path={ROUTES.ORDER_STEPS}  element = {<ProtectedRoute element={<OrderStepsPage />} />} />
        <Route path={ROUTES.ORDER_INSPECTION} element = {<ProtectedRoute element={<OrderInspectionPage/>} />} />
        <Route path={ROUTES.FINISH_ORDER} element = {<ProtectedRoute element={<FinishOrderPage />} />} />
        <Route path={ROUTES.ORDER_IMAGES} element = {<ProtectedRoute element={<OrderImagesViewer />} />} />
        <Route path={ROUTES.EMPLOYEES_LIST} element = {<ProtectedRoute element={<EmployeesPage/>}/>} />
      </Routes>
    </div>
  )
}

export default App;
