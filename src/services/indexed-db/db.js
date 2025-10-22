
class OfflineDB {
    static ORDERS_STORE = "orders"
    static ORDERS_PICKUP_STORE = "ordersPickup"
    static ORDERS_FINISH_STORE = "ordersFinish"
    static CURRENT_VERSION = 3
    constructor() {
        this.dbName = "offlineData"
        this.storeName = OfflineDB.ORDERS_STORE
        this.db = null
    }
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, OfflineDB.CURRENT_VERSION)

            request.onerror = () => reject(request.error)
            request.onsuccess = () => {
                this.db = request.result
                resolve()
            }
            request.onupgradeneeded = (event) => {
                const db = event.target.result
                const oldVersion = event.oldVersion
                const newVersion = event.newVersion
                if (!db.objectStoreNames.contains(OfflineDB.ORDERS_STORE)) {
                    const store = db.createObjectStore(OfflineDB.ORDERS_STORE, {keyPath: 'id'})
                    store.createIndex('id', 'id', {unique: true})
                }
                if (!db.objectStoreNames.contains(OfflineDB.ORDERS_PICKUP_STORE)){
                    const store = db.createObjectStore(OfflineDB.ORDERS_PICKUP_STORE, {keyPath: 'id'})
                    store.createIndex('id', 'id', {unique: true})
                    store.createIndex('orderId', 'orderId', {unique: true})
                }
                if (!db.objectStoreNames.contains(OfflineDB.ORDERS_FINISH_STORE)) {
                    const store = db.createObjectStore(OfflineDB.ORDERS_FINISH_STORE, {keyPath: 'id'})
                    store.createIndex('id', 'id', {unique: true})
                    store.createIndex('orderId', 'orderId', {unique: true})
                }
            }
        })
    }
    //generic methods for any store
    //make add list of data
    async add(storeName, data) {
        if (!this.db) throw new Error("Database not initialized")
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite')
            const store = transaction.objectStore(storeName)
            const request = store.add(data)
            request.onsuccess = () => resolve()
            request.onerror = () => reject(request.error)
        })
    }
    async saveDataList(storeName, data) {
        if (!this.db) throw new Error("Database not initialized")
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite')
            const store = transaction.objectStore(storeName)
            transaction.oncomplete = () => {
                console.log(`Orders saved offline, count ${data.length}`)
                resolve()
            }
            transaction.onerror = () => {
                console.error("Transaction error: ", transaction.error)
                reject(transaction.error)
            }
            data.forEach(order => {
                const request = store.put(order)
                request.onsuccess = () => {
                    console.log("Order saved offline: ", order.id)
                }
                request.onerror = () => {
                    console.error("Error saving order: ", order.id)
                }
            })
        })
    }
    async put(storeName, data) {
        if (!this.db) throw new Error("Database not initialized")
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite')
            const store = transaction.objectStore(storeName)
            const request = store.put(data)
            request.onsuccess = () => resolve()
            request.onerror = () => reject(request.error)
        })
    }
    async get(storeName, key) {
        if (!this.db) throw new Error("Database not initialized")
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly')
            const store = transaction.objectStore(storeName)
            const request = store.get(key)
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }
    async getByOrderId (storeName, orderId) {
        if (!this.db) throw new Error("Database not initialized")
        if (storeName !== OfflineDB.ORDERS_PICKUP_STORE && storeName !== OfflineDB.ORDERS_FINISH_STORE)
            throw new Error("Invalid store name")
        const transaction = this.db.transaction([storeName], 'readonly')
        const store = transaction.objectStore(storeName)
        const index = store.index("orderId")
        return new Promise((resolve, reject) => {
            const request = index.get(orderId)
            request.onsuccess = () => {
                console.log("OrdersRelatedData retrieved offline: ", request.result)
                resolve(request.result)
            }
            request.onerror = () => {
                reject(request.error)
            }
        })
    }
    async delete(storeName, key) {
        if (!this.db) throw new Error("Database not initialized")
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite')
            const store = transaction.objectStore(storeName)
            const request = store.delete(key)
            request.onsuccess = () => resolve()
            request.onerror = () => reject(request.error)
        })
    }
    //orders specifi methods (still in use but can be replaces oldVersion=1)
    async saveOrders(orders) {
        if (!this.db) throw new Error("Database not initialized")
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite')
            const store = transaction.objectStore(this.storeName)
            transaction.oncomplete = () => {
                console.log(`Orders saved offline, count ${orders.length}`)
                resolve()
            }
            transaction.onerror = () => {
                console.error("Transaction error: ", transaction.error)
                reject(transaction.error)
            }
            orders.forEach(order => {
                const request = store.put(order)
                request.onsuccess = () => {
                    console.log("Order saved offline: ", order.id)
                }
                request.onerror = () => {
                    console.error("Error saving order: ", order.id)
                }
            })
        })
    }
    async getOrders() {
        if (!this.db) return []
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly')
            const store = transaction.objectStore(this.storeName)
            const request = store.getAll()
            
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }
    async getOrder(id) {
        const transaction = this.db.transaction([this.storeName], 'readonly')
        const store = transaction.objectStore(this.storeName)
        return new Promise((resolve) => {
            const request = store.get(id)
            request.onsuccess = () => {
                console.log("Order retrieved offline: ", request.result)
                resolve(request.result)
            }
            request.onerror = () => resolve(null)
        })

    }
    async verifyOrdersSaved(expectedCount) {
        const savedOrders = await this.getOrders()
        return savedOrders.length >= expectedCount
    }
}
export const offlineDB = new OfflineDB()