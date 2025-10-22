import { useEffect, useState } from "react"
import { offlineDB } from "./db"
import { getOrderFinishListByOrdersId, getOrderPickupListByOrdersId } from "../api/offlineApi"
import { useAuth } from "../auth/AuthProvider"
import { data } from "react-router-dom"
import { getOrderFinishByOrderId } from "../api/orderFinishApi"

export const useOfflineData = () => {
    const [isReady, setIsReady] = useState(false)
    useEffect(() => {
        offlineDB.init().then(() => {
            console.log("Offline storage initialized!")
            setIsReady(true)
        })

    }, [])
    //deprecated
    const saveOrdersOffline = async (orders) => {
        if (!isReady) await offlineDB.init()
        try {
            await offlineDB.saveOrders(orders)
            const isSaved = await offlineDB.verifyOrdersSaved(orders.length)
            console.log('Data verification:', isSaved ? 'SUCCESS' : 'FAILED')
            return isSaved
        } catch (err) {
            console.error(err)
            throw err
        }
    }
    //rework
    const getOrderOffline = async (id) => {
        if (!isReady) await offlineDB.init()
        return await offlineDB.getOrder(id)
    }
    const getOrdersOffline = async () => {
        if (!isReady) await offlineDB.init()
        return await offlineDB.getOrders()
    }
    const saveDataList = async (storeName, data) => {
        if (!isReady) await offlineDB.init()
        await offlineDB.saveDataList(storeName, data)
    }
    const putData = async (storeName, data) => {
        if (!isReady) await offlineDB.init()
        await offlineDB.put(storeName, data)
    }
    const getData = async (storeName, key) => {
        if (!isReady) await offlineDB.init()
        return await offlineDB.get(storeName, key)
    }
    const getDataByOrderId = async(storeName, orderId) => {
        if (!isReady) await offlineDB.init()
        return await offlineDB.getByOrderId(storeName, orderId)
    }
    const loadRemoteOrdersData = async (orders, token) => {
        //console.log("START")
        //console.log(orders.map(order => order.id))
        const orderPickupListResponse = await getOrderPickupListByOrdersId(orders.map(order => order.id), token)
        const orderFinishListResponse = await getOrderFinishListByOrdersId(orders.map(order => order.id), token)
        //console.log(orders, orderPickupList, orderFinishList)
        //await saveOrdersOffline(orders)
        await saveDataList("orders", orders)
        await saveDataList("ordersPickup", orderPickupListResponse.data)
        await saveDataList("ordersFinish", orderFinishListResponse.data)
        //awaait 
    }

    return {
        isReady,
        getOrderOffline,
        getOrdersOffline,
        saveDataList,
        putData,
        getData,
        getDataByOrderId,
        loadRemoteOrdersData
    }
}