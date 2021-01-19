import {instance} from "./request"

//  分类列表数据
class getFoodselfListByPage {
    i : number;
    n : number;
    id? : number;
    constructor (a:number,b:number,c?:number) {
        this.i = a;
        this.n = b;
        this.id = c;
    }
    get () {
        let that = this; 
        // return new Promise( function (reslove : any,reject : any) {
        return instance.get(`/phone/byType?page=${that.i}&row=${that.n}&typeId=${that.id}&tableName=refer_food`)
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
    getFoodselfListByPage
}