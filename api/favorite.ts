import { request } from './request'

export function toggleFavorite(wallpaperId: number) {
	return request<{ favorited: boolean }>('/favorite', {
		method: 'POST',
		data: JSON.stringify({ wallpaperId })
	})
}
