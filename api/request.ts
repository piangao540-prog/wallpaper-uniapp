const BASE_URL = 'http://172.22.37.39:3000/api'

export function request<T>(url: string, options?: UniApp.RequestOptions): Promise<T> {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			...options,
			success: res => resolve(res.data as T),
			fail: reject
		})
	})
}
