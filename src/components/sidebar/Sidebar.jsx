import "./css/sidebar_style.css"

import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../services/auth/AuthProvider"
import { getAccountDataRequest } from "../../services/api/authApi"
import { ROUTES } from "../../routes"

import { ReactComponent as CrmCloseIcon} from "../../res/icons/crm_close_icon.svg"
import { ReactComponent as CrmHomeIcon} from "../../res/icons/crm_home_icon.svg"
import { ReactComponent as CrmCreateIcon} from "../../res/icons/crm_create_icon.svg"
import { ReactComponent as CrmListIcon} from "../../res/icons/crm_list_icon.svg"
import { ReactComponent as CrmBadgeIcon} from "../../res/icons/crm_badge_icon.svg"
import { ReactComponent as CrmLogoutIcon} from "../../res/icons/crm_logout_icon.svg"

export const Sidebar = ({ isActive, onClose }) => {
    const navigate = useNavigate()

    const { logout, checkAuth, getToken } = useAuth()

    const [accountData, setAccountData] = useState(null)

    const sidebarRef = useRef(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getAccountDataRequest(getToken())
                setAccountData(response.data)
            } catch (error) {
                logout()
            }
        }
        if (checkAuth()) {
            getData()
        }
    }, [])

    const handleClose = () => {
        onClose()
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)

        return () => { 
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [onClose])

    return ( 
        <div className={`sidebar ${isActive ? "active" : ""}`} ref={sidebarRef}>
            <div className="sidebarBackgroud"></div>
            <div className="logoContainer">
                <div className="logoItem" onClick={handleClose}>
                    <CrmCloseIcon className="svgIcon"/>
                </div>
            </div>

            <div className="optionsContainer">
                <div className="optionsItem" onClick={() => {handleClose(); navigate(ROUTES.HOME)}}>
                    <CrmHomeIcon className="svgIcon"/>
                </div>

                <div className="optionsItem" onClick={() => {handleClose(); navigate(ROUTES.ORDERS)}}>
                    <CrmListIcon className="svgIcon"/>
                </div>

                {(checkAuth() && accountData?.role === "DISPATCHER") &&
                <div className="optionsItem dispathcerItem" onClick={() => {handleClose(); navigate(ROUTES.CREATE_ORDER)}}>
                    <CrmCreateIcon className="svgIcon"/>
                </div>}
            </div>

            <div className="logoutContainer">
                <div className="logoutItem" onClick={() => {handleClose(); navigate(ROUTES.ACCOUNT)}}>
                    <CrmBadgeIcon className="svgIcon"/>
                </div>
                
                <div className="logoutItem" onClick={() => {handleClose(); logout()}}>
                    <CrmLogoutIcon className="svgIcon"/>
                </div>
            </div>
        </div>
    )
}