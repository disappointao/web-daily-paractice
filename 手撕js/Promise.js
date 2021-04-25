//手撕Promise

const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
const PENDING = 'pending'

class myPromise{
    constructor(executor) {
        executor(this.resolve,this.reject)
    }
    status = PENDING
    //成功值
    value = undefined
    //失败原因
    reason = undefined
    //如果执行器中存在异步代码则将成功和失败回调存储起来
    successCb = []
    failCb = []
    resolve = value => {
        //如果状态不是等待中，则阻止程序继续执行
        if(this.status !== PENDING) return
        this.status = FULFILLED
        this.value = value
        //判断回调是否存在，存在调用
        while (this.successCb.length) this.successCb.shift()(value)
    }
    reject = reason => {
        //如果状态不是等待中，则阻止程序继续执行
        if(this.status !== PENDING) return
        this.status = REJECTED
        this.reason = reason
        //判断回调是否存在，存在调用
        while (this.failCb.length) this.failCb.shift()(reason)
    }
    then = (successCb, failCb) => {
        let newPromise = new myPromise((resovle,reject)=>{
            if(this.status === FULFILLED){
                //使用异步为了获取newPromise
                setTimeout(()=>{
                    //x 为成功时的返回对象
                    let x = successCb(this.value)
                    resolvePromise(newPromise ,x ,resovle,reject)
                })
            }else if(this.status === REJECTED){
                failCb(this.reason)
            }else{
                this.successCb.push(successCb)
                this.failCb.push(failCb)
            }
        })
        return newPromise
    }
}
//判断上一次then 返回值得类型，普通值还是promise对象
function resolvePromise(promise,value,resolve,reject){
    if(promise === value){
        console.log('执行了')
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(value instanceof myPromise){
        value.then(resolve,reject)
    }else{
        resolve(value)
    }
}

let p = new  myPromise((resolve,reject)=>{
    resolve('123')
})
 var p1 = p.then(value=>{
    console.log(value)
    return p1
},reason => {
    console.log(reason)
})
p1.then(()=>{},reason => console.log(reason.message))