export const SERVER_URL = "http://192.168.167.166:8080"
export const REGISTER = "/api/auth/register"
export const LOGIN = "/api/auth/login"
export const ACCOUNT_DATA = "/api/auth/account-data"

export const CREATE_ORDER = "/api/orders/create-order"
export const CHANGE_ORDER_STATUS = "/api/orders/change-order-status"
export const GET_ORDER_BY_ID = "/api/orders/order"
export const CREATE_ITEM_FOR_ORDER = "/api/orders/items/create-item"
export const GET_ITEMS_BY_ORDER_ID = "/api/orders/items/by-order-id"
export const CHANGE_ITEM_READY_STATE = "/api/orders/items/item/change-ready-state"

export const CREATE_ORDER_PICKUP = "/api/orders-pickup/create"
export const GET_ORDER_PICKUP_BY_ID = "/api/orders-pickup/order-pickup"
export const GET_ORDER_PICKUP_BY_ORDER_ID = "/api/orders-pickup/order-pickup/by-order-id"

export const CREATE_ORDER_INSPECTION = "/api/orders-inspection/create"
export const GET_ORDER_INSPECTION_BY_ORDER_ID = "/api/orders-inspection/order-inspection/by-order-id"

export const CREATE_ORDER_FINISH = "/api/orders-finish/create"
export const GET_ORDER_FINISH_BY_ORDER_ID = "/api/orders-finish/order-finish/by-order-id"

export const GET_EMPLOYEE_WORKFLOW_BY_DATE = "/api/employees/employee/workflow-by-date"

export const ORGANIZATION_ORDERS = "/api/organization/orders"
export const ORGANIZATION_MATERIALS = "/api/organization/materials"
export const BARREL_COMPONENTS = "/api/barrel/components"