import axios from "axios"

const instance = axios.create({
    baseURL : "https://refer.skyclound.com/"
})

instance.interceptors.request.use(
    (config : any) => {
        return config
    },
    (err : any) => {
        return err
    }
)
instance.interceptors.response.use(
    (res : any) => {
        return res
    },
    (err : any) => {
        return err
    }
)
export {
    instance 
}