import {setTabValue,setHeader} from "./mutationsType"
export default {
    [setTabValue] (state: any, data: any) {
        state.selectTabValue = data
        
    }, 
    [setHeader] (state: any,data: any) { 
        state.selectHeader = data
    },
}