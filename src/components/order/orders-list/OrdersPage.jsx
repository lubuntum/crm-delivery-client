import "../css/order_list_style.css"

import { use, useCallback, useEffect, useMemo, useState } from "react"
import { getOrganizationOrders, removeOrderRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { formatDateLocalDate } from "../../../services/date/dateFormattes"

import { OrderItem } from "./OrderItem"

import { ReactComponent as CrmFilterIcon } from "../../../res/icons/crm_filter_icon.svg"

import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { Loader } from "../../loader/Loader"
import { getAccountDataRequest } from "../../../services/api/authApi"
import { ROLES } from "../../../roles"
import { useNetworkStatus } from "../../../hooks/useNetworkStatus"
import { toast, Toaster } from "react-hot-toast"
import { useAccountSettings } from "../../../services/account-settings/useAccountSettings"
import { useOfflineData } from "../../../services/indexed-db/useOfflineData"

const ordersStatusForSorting = [
    ORDER_STATUSES.CREATED,
    ORDER_STATUSES.PICKED,
    ORDER_STATUSES.TAKEN,
    ORDER_STATUSES.INSPECTION,
    ORDER_STATUSES.READY,
    ORDER_STATUSES.COMING,
    ORDER_STATUSES.COMPLETED
]

export const OrdersPage = () => {
    const { getToken } = useAuth()
    const [accountData, setAccountData] = useState(null)

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(STATUSES.IDLE)
    const [filter, setFilter] = useState("")
    //offline test
    const {checkOnline} = useNetworkStatus()
    const {settings} = useAccountSettings()
    const {getOrdersOffline, isReady, loadRemoteOrdersData} = useOfflineData()
    //save data after orders was loaded
    
    const saveLocalOrders = async (formattedOrders) => {
        if (settings.offlineMode && formattedOrders && formattedOrders.length > 0) {
            await loadRemoteOrdersData(formattedOrders, getToken())
            /* console.log("🔄 Saving orders to offline storage:", formattedOrders.length)
            saveOrdersOffline(formattedOrders).then(success => {
                if (success) {
                    console.log("Orders saved offline successfully")
                } else {
                    console.error("Failed to save orders offline")
                }
            }).catch(error => {
                console.error("Error saving offline:", error)
            }) */
        }
    }
    const loadLocalOrders = async () => {
        
        console.log("⚙️ Offline mode setting:", settings.offlineMode)

        //onst offlineOrders = await getOrdersOffline()
        //toast(JSON.stringify(offlineOrders))
        //setOrders(offlineOrders.sort((a,b) => {return ordersStatusForSorting.indexOf(a.status) - ordersStatusForSorting.indexOf(b.status)}))
        if (settings.offlineMode){
            toast("Нет соединения с сервером", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
            const offlineOrders = await getOrdersOffline()
            setOrders(offlineOrders.sort((a,b) => {return ordersStatusForSorting.indexOf(a.status) - ordersStatusForSorting.indexOf(b.status)}))
            toast.success("Использованы локальные данные")
            if (loading) setLoading(false)
        }
    }
    //Get account data for showing orders depends on role
    useEffect(()=> {
        const fetchAccountData = async () => {
            const isOnline = await checkOnline()
            console.log(`online = ${isOnline}`)
            if (!isOnline) {
                await loadLocalOrders()
                return
            }
            try {
                const response = await getAccountDataRequest(getToken())
                console.log(response.data)
                setAccountData(response.data)
            } catch(err) {
                console.error(err)
            }
        }
        fetchAccountData()
    }, [])

    const fetchOrders = async () => {
        console.log("test")
        setLoading(true)
        try {
            const response = await getOrganizationOrders(getToken())
            const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            const formattedOrders = sortedOrders.map(order => ({
                ...order,
                clientFullName: `${order.clientSecondName} ${order.clientName} ${order.clientPatronymic}`,
                createdAt: formatDateLocalDate(order.createdAt)
            })).filter((order) => {
                if (accountData?.role === ROLES.SPECIALIST && order.status === ORDER_STATUSES.INSPECTION) return order
                else if (accountData?.role === ROLES.COURIER && 
                    ( order.status === ORDER_STATUSES.CREATED || order.status === ORDER_STATUSES.PICKED || 
                        order.status === ORDER_STATUSES.TAKEN || order.status === ORDER_STATUSES.READY ||
                        order.status === ORDER_STATUSES.COMING)) return order
                else if (accountData?.role !== ROLES.SPECIALIST && accountData?.role !== ROLES.COURIER) return order
            })
            //const nonCompletedOrders = formattedOrders.filter(order => order.status !== ORDER_STATUSES.COMPLETED)
            //const completedOrders = formattedOrders.filter(order => order.status === ORDER_STATUSES.COMPLETED)
            //console.log(formattedOrders)
            if (settings.offlineMode) {
                console.log("trying to hash orders")
                saveLocalOrders(formattedOrders)
            }
            setOrders(formattedOrders.sort((a,b) => {return ordersStatusForSorting.indexOf(a.status) - ordersStatusForSorting.indexOf(b.status)}))
        } catch (err) { 

            setStatus(STATUSES.ERROR)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (accountData)
            fetchOrders()
    }, [accountData])
    
    const handleFilterChange = useCallback((e) => {
        setFilter(e.target.value)
    }, [])

    const filteredOrders = useMemo(() => {
        const searchTerm = filter.toLowerCase()
        return orders.filter(order => (
            order.serialNumber?.toLowerCase().includes(searchTerm) ||
            order.clientFullName?.toLowerCase().includes(searchTerm) ||
            order.createdAt?.toLowerCase().includes(searchTerm) ||
            order.address?.toLowerCase().includes(searchTerm) ||
            order.status?.toLowerCase().includes(searchTerm)
        ))
    }, [orders, filter])

    const removeOrder = async (order) => {
        if (order.status !== ORDER_STATUSES.CREATED) return
        try {
            const response = await removeOrderRequest({id: order.id}, getToken())
            setOrders(prev => prev.filter(item => item.id !== order.id))
        } catch (err) {
            setStatus(STATUSES.ERROR)
            console.error(err)
        }
    }

    return (
        <div className="contentWrapper">
            <div className="ordersListWrapper">
                <div className="pageTitle">
                    <p>Список заказов</p>
                </div>
                
                <div className="ordersFilterContainer">
                    <div className="cutomInputContainer">
                        <input className="customInput"
                               type="text"
                               placeholder="Поиск..."
                               required
                               onChange={handleFilterChange}/>
                        <CrmFilterIcon className="svgIcon"/>
                    </div>
                </div>

                <div className="ordersListContainer">
                    {loading ? (
                        <div className="ordersLoadingContainer">
                            <Loader/>
                        </div>
                    ) : (
                    filteredOrders.map((order, index) => (
                        <OrderItem key={`orderItem${index}`} data={order} removeOrder={removeOrder} accountData = {accountData}/>
                    )))}
                </div>
            </div>
            <Toaster position="bottom-center" reverseOrder={false}/>
        </div> 
    )
}