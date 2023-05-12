


const baseUrl = 'http://localhost:3030/users';


export const login = (data) => {
    return fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        })

}


export const logout = (token) => {
    return fetch(`${baseUrl}/logout`, {
        method: "GET",
        headers: {
            'X-Authorization': token
        }
    })

}

export const register = (data) => {
    return fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        })

}
