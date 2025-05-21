import axios from "axios"
import { ACCOUNT_DATA, ACCOUNTS_BY_ORGANIZATION, CREATE_ACCOUNT, GET_ACCOUNTS_ROLES, SERVER_URL, UPDATE_ACCOUNT_STATUS, UPDATE_PASSOWRD } from "./urls"

export const getAccountDataRequest = async (token) => {
    console.log("passed token => ", token)
    return await axios.get(`${SERVER_URL}${ACCOUNT_DATA}`, {
        headers: {Authorization : token}
    })
}

export const getOrganizationAccountsRequest = async (token) => {
    return await axios.get(`${SERVER_URL}${ACCOUNTS_BY_ORGANIZATION}`, {
        headers: {Authorization: token}
    })
}

export const updateAccountStatus = async (token, account) => {
    return await axios.post(`${SERVER_URL}${UPDATE_ACCOUNT_STATUS}`, account, {
        headers: {Authorization: token}
    })
}

export const getRolesRequest = async (token) => {
    return await axios.get(`${SERVER_URL}${GET_ACCOUNTS_ROLES}`, {
        headers: {Authorization: token}
    })
}
export const createAccountRequest = async (token, accountData) => {
    return await axios.post(`${SERVER_URL}${CREATE_ACCOUNT}`, accountData, {
        headers: {Authorization: token}
    })
}
export const updatePasswordRequest = async (token, authCredential) => {
    console.log(authCredential)
    return await axios.post(`${SERVER_URL}${UPDATE_PASSOWRD}`, authCredential, {
        headers:{Authorization: token}
    })
}