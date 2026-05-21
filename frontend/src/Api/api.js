// import { post } from "../../../backend/routes/UserRoute"

const baseurl = "http://localhost:3000"


//get all transactions
// export const getdata = async () => {
//     const res = await fetch(`${baseurl}/transaction/getTransactions`)
//     return res.json()
// }

// //login
// export const LoginUser = async(postdata) => {
//     const res = await fetch(`${baseurl}/user/loginuser`,{
//         method:"POST",
//         headers:{
//             "Content-Type" : "application/json"
//         },
//         body:JSON.stringify(postdata)
//     })
//     return res.json()
// }

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