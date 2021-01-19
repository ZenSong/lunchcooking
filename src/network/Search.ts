import {instance} from "./request"
// 获取搜索数据 
 class getMySearchVal {
    i : number;
    n:number;
    val :any;
    constructor (a:number,b:number,c:any) {
        this.i = a;
        this.n = b;
        this.val = c;
    }
    get () {
        let that = this;
        // return new Promise( function (reslove,reject) {
            return  instance.get(`/phone/searchList?page=${that.i}&row=${that.n}&title=${that.val}&tableName=refer_food`)
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
    getMySearchVal 
}