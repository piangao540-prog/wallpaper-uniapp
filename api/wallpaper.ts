import {request} from './request'

export interface Wallpaper {
    id: number
    title: string
    url: string
    category: string
    author: string
    likes: number
}

export const getWallpaper = () => {
    request<Wallpaper[]>('/wallpapers')
}

export const getByCategory = (cat:string) => {
    request<Wallpaper[]>(`/wallpapers/${cat}`)
}