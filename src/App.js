import './App.css';

import { useState } from 'react';
import { Route, Routes, Navigate, BrowserRouter, useNavigate, useLocation } from 'react-router-dom'
import { ProtectedRoute } from './services/auth/ProtectedRoute';
import { AuthProvider, useAuth } from './services/auth/AuthProvider';
import { AuthProtectedRoute } from './services/auth/AuthProtectedRoute';
import { ROUTES } from './routes';

import { AuthPage } from './components/auth/AuthPage';
import { HomePage } from './components/home/HomePage';
import { AccountPage } from './components/account/AccountPage';
import { CreateOrderPage } from './components/order/create-order/CreateOrderPage';
import { OrdersPage } from './components/order/orders-list/OrdersPage';
import { OrderStepsPage } from './components/order/order-steps/OrderStepsPage';
import { OrderPickupPage } from './components/order/pickup-order/OrderPickupPage';
import { OrderInspectionPage } from './components/order/inspection/OrderInspectionPage';
import { FinishOrderPage } from './components/order/finish-order/FinishOrderPage';
import { Sidebar } from './components/sidebar/Sidebar';

import { ReactComponent as CrmLoginIcon } from "./res/icons/crm_login_icon.svg"
import { ReactComponent as CrmMenuIcon } from "./res/icons/crm_menu_icon.svg"
import { ReactComponent as CrmBackIcon } from "./res/icons/crm_back_icon.svg"
import { OrderImagesPopup } from './components/order/pickup-order/OrderImagesPopup';
import { EmployeesPage } from './components/employees/EmployeesPage';
import { RoleProtectedRouter } from './services/auth/RoleProtectedRouter';
import { InfoPage } from './components/info/InfoPage';
import { MaterialsPage } from './components/materials/MaterialsPage';
import { ManagementPage } from './components/organization_management/ManagementPage';

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
	const location = useLocation()
	const navigate = useNavigate()

	const { checkAuth } = useAuth()

	const [isSidebarActive, setIsSidebarActive] = useState(false)

	const toggleSidebar = () => {
		setIsSidebarActive(!isSidebarActive)
	}

	const closeSidebar = () => {
		setIsSidebarActive(false)
	}

	return (
		<div className='dashboardWrapper'>
			{checkAuth() ? 
			<button className={`homeButton toogleSidebarButton ${isSidebarActive ? "active" : ""}`} onClick={toggleSidebar}>
				<CrmMenuIcon className='svgIcon'/>
			</button> : 

			location.pathname !== ROUTES.AUTH ?
			<button className="homeButton loginButton" onClick={() => navigate(ROUTES.AUTH)}>
				<CrmLoginIcon className='svgIcon'/>	
			</button> :

			<button className="homeButton loginButton" onClick={() => navigate(ROUTES.HOME)}>
				<CrmBackIcon className='svgIcon'/>	
			</button>}
			
			{checkAuth() &&
			<Sidebar isActive={isSidebarActive} onClose={closeSidebar}/>}

			<div className={`dashboardContent ${isSidebarActive ? "active" : ""}`}>
				<Routes>
					<Route path='/*' 						element={<p>404 NOT FOUND</p>} />
					<Route path='/' 						element={<Navigate to={ROUTES.HOME} replace />} />
					<Route path={ROUTES.HOME} 				element={<HomePage />} />
					<Route path={ROUTES.AUTH} 				element={<AuthProtectedRoute element={<AuthPage />} />} />
					<Route path={ROUTES.SERVICE_INFO}       element={<InfoPage/>} />
					<Route path={ROUTES.ACCOUNT} 			element={<ProtectedRoute element={<AccountPage />} />} />
					<Route path={ROUTES.CREATE_ORDER} 		element={<ProtectedRoute element={<CreateOrderPage />} />} />
					<Route path={ROUTES.PICKUP_ORDER} 		element={<ProtectedRoute element={<OrderPickupPage />} />} />
					<Route path={ROUTES.ORDERS} 			element={<ProtectedRoute element={<OrdersPage />} />} />
					<Route path={ROUTES.ORDER_STEPS} 		element={<ProtectedRoute element={<OrderStepsPage />} />} />
					<Route path={ROUTES.ORDER_INSPECTION} 	element={<ProtectedRoute element={<OrderInspectionPage />} />} />
					<Route path={ROUTES.FINISH_ORDER} 		element={<ProtectedRoute element={<FinishOrderPage />} />} />
					<Route path={ROUTES.ORDER_IMAGES} 		element={<ProtectedRoute element={<OrderImagesPopup />} />} />
					<Route path={ROUTES.EMPLOYEES_LIST} 	element={<RoleProtectedRouter element={<EmployeesPage/>} roles={["DIRECTOR"]}/>} />
					<Route path={ROUTES.MATERIAL_LIST}		element={<RoleProtectedRouter element={<MaterialsPage/>} roles={["DIRECTOR", "SPECIALIST"]} />} />
					<Route path={ROUTES.ORGANIZATION_MANAGEMENT} element={<RoleProtectedRouter element={<ManagementPage/>} roles={["DIRECTOR"]} />} />
				</Routes>
			</div>
		</div>
	)
}

export default App;
