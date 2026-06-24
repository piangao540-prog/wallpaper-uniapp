import { request } from './request'

export const login = (data: { username: string, password: string }) => {
    return request<{ token: string, user: any }>('/login', { method: 'POST', data: JSON.stringify(data) })
}

export const register = (data: { username: string, password: string }) => {
    return request('/register', { method: 'POST', data: JSON.stringify(data) })
}