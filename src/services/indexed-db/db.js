
class OfflineDB {
    static ORDERS_STORE = "orders"
    static ORDERS_PICKUP_STORE = "ordersPickup"
    static ORDERS_PICKUP_IMAGES_STORE = "images"
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
                    store.createIndex("syncStatus", "syncStatus", {unique: false})
                }
                if (!db.objectStoreNames.contains(OfflineDB.ORDERS_PICKUP_STORE)){
                    const store = db.createObjectStore(OfflineDB.ORDERS_PICKUP_STORE, {keyPath: 'id'})
                    store.createIndex('id', 'id', {unique: true})
                    store.createIndex('orderId', 'orderId', {unique: true})
                    store.createIndex("syncStatus", "syncStatus", {unique: false})
                }
                if (!db.objectStoreNames.contains(OfflineDB.ORDERS_FINISH_STORE)) {
                    const store = db.createObjectStore(OfflineDB.ORDERS_FINISH_STORE, {keyPath: 'id'})
                    store.createIndex('id', 'id', {unique: true})
                    store.createIndex('orderId', 'orderId', {unique: true})
                    store.createIndex("syncStatus", "syncStatus", {unique: false})
                }
                if (!db.objectStoreNames.contains(OfflineDB.ORDERS_PICKUP_IMAGES_STORE)) {
                    const store = db.createObjectStore(OfflineDB.ORDERS_PICKUP_IMAGES_STORE, {keyPath: 'id'})
                    store.createIndex('id', 'id', {unique: true})
                    store.createIndex('orderId', 'orderId', {unique: false})
                    store.createIndex("syncStatus", "syncStatus", {unique: false})
                }
            }
        })
    }
    async getDataBySyncStatus(storeName, syncStatus) {
        if (!this.db) throw new Error("Database not initialized")
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], "readonly")
            const store = transaction.objectStore(storeName)
            const index = store.index("syncStatus")
            const request = index.getAll(syncStatus)
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)

        })
    }
    async saveOrderImages(orderId, imageFiles) {
        if (!this.db) throw new Error("Database not initialized")
        const imageRecords = await Promise.all(imageFiles.map(async (file, index) => {
            const base64 = await this.fileToBase64(file)
            return {
                id: -Date.now() - index,
                orderId: orderId,
                data: base64, 
                name: file.name,
                type: file.type,
                size: file.size,
                imageIndex: index,
                createdAt: new Date().toISOString()
            }
        }))
        console.log(imageRecords)
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([OfflineDB.ORDERS_PICKUP_IMAGES_STORE], 'readwrite')
            const store = transaction.objectStore(OfflineDB.ORDERS_PICKUP_IMAGES_STORE)
            const imageIds = []
            let completed = 0
            transaction.oncomplete = () => {
                console.log("Transaction completed", imageIds.length)
                resolve(imageIds)
            }
            transaction.onerror = () => reject(transaction.error)
            imageRecords.forEach(record => {
                const request = store.put(record)
                request.onsuccess = () => {
                    imageIds.push(record.id)
                    completed++
                    console.log(`Saved image ${completed}/${imageRecords.length}`)
                }
                request.onerror = () => {
                    console.error("Failed to save image: ", record.id)
                }
            })
        })
    }
    async getOrderImages(orderId) {
        if (!this.db) throw new Error("Database not initialized")
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([OfflineDB.ORDERS_PICKUP_IMAGES_STORE], 'readonly')
            const store = transaction.objectStore(OfflineDB.ORDERS_PICKUP_IMAGES_STORE)
            const index = store.index('orderId')
            const request = index.getAll(orderId)
            request.onsuccess = () => {
                const images = request.result
                    .sort((a, b) => a.imageIndex - b.imageIndex)
                    .map(image => ({
                        id: image.id,
                        data: image.data,
                        name: image.name,
                        type: image.type,
                        size: image.size,
                        createdAt: image.createdAt
                    }))
                resolve(images)
            }
            request.onerror = () => reject(request.error)
        })
    }
    async getOrderImageForServer(orderId) {
        if (!this.db) throw new Error("Database not initialized") 
        const images = await this.getOrderImages(orderId)
        return new Promise((resolve, reject) => {
            const imagesFiles = images.map(image => this.base64ToFile(image.data, image.name, image.type)) 
            resolve(imagesFiles)
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
    // Utility methods
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }
    base64ToFile(base64Data, filename, fileType) {
        const arr = base64Data.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type: fileType || mime})
    }
}
export const offlineDB = new OfflineDB()