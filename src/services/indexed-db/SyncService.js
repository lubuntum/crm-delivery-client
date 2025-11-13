import { changeOrdersStatusesRequest, changeOrderStatusRequest } from "../api/orderApi"
import { createOrdersFinishRequest } from "../api/orderFinishApi"
import { createOrderPickupRequest } from "../api/orderPickupApi"
import { offlineDB } from "./db"

/**TODO
 * 1. orderStatuses send bunch (TESTED Postman)
 * 2. orderPickup send separately
 * 3. orderFinish send bunch
 * 4. Uncommend localSaveData in ordersPage
 * 5. After sync show and load the update data to local storage
 */
class SyncService {
    constructor(offlineDB) {
        this.offlineDB = offlineDB
        this.isSynching = false
    }
    async syncAll(token) {
        /* if (this.isSynching) {
            console.log("Sync is already in progress")
            return
        } */
        await this.offlineDB.init()
        this.isSynching = true
        try {
            const orders = await this.offlineDB.getDataBySyncStatus("orders", "pending")
            if (!orders || orders.length === 0) {
                console.log("No orders to sync")
                return
            }
            const pickupOrderList = await this.offlineDB.getDataBySyncStatus("ordersPickup", "pending")
            const finishOrderList = await this.offlineDB.getDataBySyncStatus("ordersFinish", "pending")
            
            await changeOrdersStatusesRequest(orders.map(order => ({orderId: order.id, status: order.status})), token)
            if (pickupOrderList && pickupOrderList.length > 0) {
                const syncOrderPickups = pickupOrderList.map(async (pickupOrder) => {
                    try {
                        const orderId = pickupOrder.orderId
                        const images = await offlineDB.getOrderImageForServer(Number(orderId))
                        console.log(`images found for ${pickupOrder} = ${orderId}, ${images}`)
                        await createOrderPickupRequest(token, pickupOrder, images)
                        return {success: true, orderId}
                    } catch (err) {
                        console.error(`Failed to synch pickup order ${pickupOrder.orderId}`, err)
                        return {success: false, orderId: pickupOrder.orderId, error: err}
                    }
                })
                const pickupResults = await Promise.all(syncOrderPickups)
                const successful = pickupResults.filter(r => r.success)
                const failed = pickupResults.filter(r => !r.success)
                console.log(`Synced ${successful}, failed ${failed}`)
            }
            if (finishOrderList && finishOrderList.length > 0) 
                await createOrdersFinishRequest(token, finishOrderList)
            
            console.log("All data sync, clear hash ...")
            await offlineDB.clearAllData()

        } catch(err) {
            console.log(err)
            this.isSynching = false
        }
        this.isSynching = false
    }
    
}

export const syncService = new SyncService(offlineDB)