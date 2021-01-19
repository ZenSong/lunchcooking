 
 import {instance} from "./request"
 //分类接口
 class getFoodtypeList {
    get () {
        let that = this;
        // return new Promise ((reslove,reject) =>{
          return  instance.get(`/phone/typeList?tableName=refer_food`)
            // .then((res : any) => {
            //     reslove(res)
            // })
            // .catch((err:any) => {
            //     reject(err)
            // })
        // })
    }
}
export {
    getFoodtypeList 
}