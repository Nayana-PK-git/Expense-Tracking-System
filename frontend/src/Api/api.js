const baseurl = "http://localhost:3000"


const apiFetch = async(endpoint,options = {}) => {
    const res = await fetch(`${baseurl}${endpoint}`, {
        ...options,
        credentials: "include",
        headers:{
            "Content-Type" : "application/json",
            ...options.headers
        }
    });
    if(!res.ok){
        const error = await res.json();
        throw new Error(error.msg || 'Request failed')
    }
    return res.json();
}

export const api = {
    get:(endpoint) => apiFetch(endpoint),
    post:(endpoint,data) => apiFetch(endpoint, {
        method:"POST",
        body: JSON.stringify(data)
    }),
    put:(endpoint,data) => apiFetch(endpoint, {
        method:"PUT",
        body: JSON.stringify(data)
    }),
    delete:(endpoint) => apiFetch(endpoint, {
        method:"DELETE"
    })
};