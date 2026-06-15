import http from './request'

export interface Wallpaper {
    id: number
    title: string
    url: string
    category: string
    author: string
    likes: number
}

export const getWallpapers = () =>
    http.get<Wallpaper[]>('/wallpapers').then(res => res.data)

export const getByCategory = (cat: string) =>
    http.get<Wallpaper[]>(`/wallpapers/${cat}`).then(res => res.data)
