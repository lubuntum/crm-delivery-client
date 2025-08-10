import axios from "axios"
import { ACCOUNT_DATA, ACCOUNTS_BY_ORGANIZATION, CREATE_ACCOUNT, GET_ACCOUNTS_BY_ORGANIZATION_ID, GET_ACCOUNTS_ROLES, RESET_PASSWORD_FOR_ACCOUNT, SERVER_URL, UPDATE_ACCOUNT_DATA, UPDATE_ACCOUNT_STATUS, UPDATE_PASSOWRD } from "./urls"

export const getAccountDataRequest = async (token) => {
    //console.log("passed token => ", token)
    return await axios.get(`${SERVER_URL}${ACCOUNT_DATA}`, {
        headers: {Authorization : token}
    })
}

export const getOrganizationAccountsRequest = async (token) => {
    return await axios.get(`${SERVER_URL}${ACCOUNTS_BY_ORGANIZATION}`, {
        headers: {Authorization: token}
    })
}
export const getOrganizationAccountsByIdRequest = async (token, organizationId) => {
    return await axios.get(`${SERVER_URL}${GET_ACCOUNTS_BY_ORGANIZATION_ID}?organizationId=${organizationId}`, {
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
export const resetPasswordForAccountRequest = async (token, accountResetData) => {
    return axios.post(`${SERVER_URL}${RESET_PASSWORD_FOR_ACCOUNT}`, accountResetData, {
        headers: {Authorization: token}
    })
}
export const updateAccountDataRequest = async (token, accountData) => {
    return await axios.post(`${SERVER_URL}${UPDATE_ACCOUNT_DATA}`, accountData, {
        headers: {Authorization: token}
    })
}