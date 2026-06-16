import { request } from './request'

export interface Wallpaper {
    id: number
    title: string
    url: string
    category: string
    author: string
    likes: number
    tags: string
}

export interface Category {
    category: string
    author: string
    cover: string
    count: number
}

// 获取最新文章
export const getWallpapers = () => request<Wallpaper[]>('/wallpapers')

// 根据种类获取壁纸信息
export const getByCategory = (cat: string) => request<Wallpaper[]>(`/wallpapers/${cat}`)

// 根据id获取壁纸信息
export const getById = (id:number) => request<Wallpaper[]>(`/wallpapers?id=${id}`) 

// 获取最新文章
export const getLatest = () => request<Wallpaper[]>('/wallpapers/latest')

// 获取所有分类和封面图
export const getCategories = () => request<Category[]>('/categories')
