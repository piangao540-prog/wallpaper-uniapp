const BASE_URL = 'http://localhost:3000/api'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestOptions{
    method?: RequestMethod
    body?: string
}

export function request<T>(url:string,options:RequestOptions = {}):Promise<T> {
    return fetch(`${BASE_URL}${url}`,{
        headers: {'Content-Type':'application/json'},
        ...options
    }).then(res => {
        res.json
    })
}