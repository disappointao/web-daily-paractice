Function.prototype.myCall = function (thisArg, ...args){
    if(typeof this !== 'function'){
        throw new TypeError(`${this} is not a function`)
    }
    if(!thisArg){
        thisArg = window
    }
    //指定唯一属性，防止 delete 删除错误
    const fn = Symbol()
    thisArg[fn] = this
    const result  = thisArg[fn](...args)
    //删除绑定对象上新增属性
    delete thisArg[fn]
    return result
}
function testCall(age){
    console.log(this.name,age)
}
// testCall.myCall({name:'ao'},18)

// apply 与 call 的区别仅在与传参的方式
Function.prototype.myApply = function (thisArg, args =[]){
    if(typeof this !== 'function'){
        throw new TypeError(`${this} is not a function`)
    }
    if(args instanceof Array){
        throw new TypeError('CreateListFromArrayLike called on non-object')
    }
    if(!thisArg){
        thisArg = window
    }
    const fn = Symbol()
    thisArg[fn] = this
    const result = thisArg[fn](...args) //参数解构
    delete thisArg[fn]
    return result
}
function testApply(age){
    console.log(this.name,age)
}
// testApply.myApply({name:'ao'},[22])
//
// testApply.apply({name:'bo'},1)

Function.prototype.myBind = function (thisArg,...args) {
    if(typeof this !== 'function'){
        throw new TypeError(`${this} is not a function`)
    }
    const self = this
    const fn =  function (){
        //处理new 调用时 this 优先级绑定问题
        const _this = this instanceof self ? this : thisArg;
        return self.apply(_this,[...args,...arguments])
    }
    fn.prototype = this.prototype
    return fn
}
function testBind(num1,num2){
    console.log(this.name,num1,num2)
}
testBind.myBind({name:"ao"},1)(2)
