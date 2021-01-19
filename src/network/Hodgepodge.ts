
import {instance} from "./request"
// 详情数据
class getDetails {
    id : number;
    constructor (id : any) {
        this.id = id;
    }
    get() {
        // return new Promise ((reslove,reject) => {
        let that = this; 
        return instance.get(`/phone/detailA?id=${that.id}&tableName=refer_food`)
        //     .then((res : any) => {
        //         reslove(res)
        //     })
        //     .catch((err:any) => {
        //         reject(err)
        //     })
        // })
    } 
}
// 详情轮播
class getRota {
    id : number;
    constructor (id : any) {
        this.id = id;
    }
    get() {
        // return new Promise ((reslove,reject) => {
            let that = this; 
        return    instance.get(`/phone/foodRota?rid=${that.id}&tableName=refer_food`)
        //     .then((res : any) => {
        //         reslove(res)
        //     })
        //     .catch((err:any) => {
        //         reject(err)
        //     })
        // })
    } 
} 
export {
    getDetails,
    getRota
}