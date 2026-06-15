import http from './request'

export interface Wallpaper {
    id: number
    title: string
    url: string
    category: string
    author: string
    likes: number
}

//获取所有文章 
export const getWallpapers = () => {
    return http.get<Wallpaper[]>('/wallpapers').then(res => res.data)
}

// 根据种类获取文章
export const getByCategory = (cat: string) => {
    return http.get<Wallpaper[]>(`/wallpapers/${cat}`).then(res => res.data)
}

// 获取最新文章
export const getLatest = () => {
    return http.get<Wallpaper[]>('/wallpapers/latest').then(res => res.data)
}
