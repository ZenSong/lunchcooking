     // 动态加载谷歌广告 
    function dynamicInsertion(){
        let myVar=setTimeout(() => {
            var oDom=Array.from(document.querySelectorAll(".newGoogleList")) 
            for(let i=0;i<oDom.length;i++ ){ 
                var ss = oDom[i].querySelectorAll(".mygoogleList");
                if(ss.length > 0 && ss[0].innerHTML == '(adsbygoogle = window.adsbygoogle || []).push({});') {
                    
                } 
                else {
                    let script =document.createElement("script"); 
                    script.type='text/javascript';
                    let nHTML='(adsbygoogle = window.adsbygoogle || []).push({});';
                    script.setAttribute('class','mygoogleList');
                    script.innerHTML=nHTML
                    oDom[i].appendChild(script);
                } 
            }
        }, 10);
    }
    function record(item:any) {
        gtag('event', 'click', { 'event_label':item, 'event_callback' : function(){}});  
    }  
    export {   
        dynamicInsertion,
        record,    
    }  