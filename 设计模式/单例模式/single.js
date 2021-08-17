const single = (function () {
    let newInstance
    //构造函数
    function Constructor(){

    }

    //返回获取实例函数
    return {
        getInstance: function (){
            if(!newInstance){
               newInstance = new Constructor()
            }
            return newInstance
        }
    }
})()

export default single
