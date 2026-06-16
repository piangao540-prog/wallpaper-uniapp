import { request } from './request'

export interface Wallpaper {
    id: number
    title: string
    url: string
    category: string
    author: string
    likes: number
}

export const getWallpapers = () => request<Wallpaper[]>('/wallpapers')

export const getByCategory = (cat: string) => request<Wallpaper[]>(`/wallpapers/${cat}`)

export const getLatest = () => request<Wallpaper[]>('/wallpapers/latest')
