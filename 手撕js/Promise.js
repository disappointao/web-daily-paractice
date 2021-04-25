//手撕Promise

const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
const PENDING = 'pending'

class myPromise{
    constructor(executor) {
        try{
            executor(this.resolve,this.reject)
        }catch (e){
            this.reject(e)
        }
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
        while (this.successCb.length) this.successCb.shift()()
    }
    reject = reason => {
        //如果状态不是等待中，则阻止程序继续执行
        if(this.status !== PENDING) return
        this.status = REJECTED
        this.reason = reason
        //判断回调是否存在，存在调用
        while (this.failCb.length) this.failCb.shift()()
    }
    then = (successCb, failCb) => {
        //对then中为传递参数进行传递处理
        successCb = successCb ? successCb : value => value
        failCb = failCb ? failCb : reason => { throw reason}
        let newPromise = new myPromise((resolve,reject)=>{
            if(this.status === FULFILLED){
                try{
                    //使用异步为了获取newPromise
                    setTimeout(()=>{
                        //x 为成功时的返回对象
                        let x = successCb(this.value)
                        resolvePromise(newPromise ,x ,resolve,reject)
                    },0)
                }catch (e) {
                    reject(e)
                }
            }else if(this.status === REJECTED){
                try{
                    //使用异步为了获取newPromise
                    setTimeout(()=>{
                        //x 为成功时的返回对象
                        let x = failCb(this.reason)
                        resolvePromise(newPromise ,x ,resolve,reject)
                    },0)
                }catch (e) {
                    reject(e)
                }
            }else{
                this.successCb.push(()=>{
                    try {
                        let x = successCb(this.value)
                        resolvePromise(newPromise ,x ,resolve,reject)
                    }catch (e){
                        reject(e)
                    }
                })
                this.failCb.push(()=>{
                    try{
                        //使用异步为了获取newPromise
                        setTimeout(()=>{
                            //x 为成功时的返回对象
                            let x = failCb(this.reason)
                            resolvePromise(newPromise ,x ,resolve,reject)
                        },0)
                    }catch (e) {
                        reject(e)
                    }
                })
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
