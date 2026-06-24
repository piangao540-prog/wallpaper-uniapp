const BASE_URL = 'http://localhost:3000/api'

export function request<T>(url: string, options?: any): Promise<T> {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			header: {"Content-Type": "application/json"},
			...options,
			success: res => {
				if (res.statusCode >= 400) {
					reject(res)
				} else {
					resolve(res.data as T)
				}
			},
			fail: reject
		})
	})
}
