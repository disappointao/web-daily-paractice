const _ = require('lodash')

function sum(a,b){
    console.log('接收参数',a,b)
    return a + b
}
// const onceSum = _.once(sum)
// onceSum(3,4)
// onceSum(3,4)

function myOnce(fn){
    let done
    let result
    return function (){
        if(!done){
            done = true
            result = fn.apply(this,arguments)
        }
        return result
    }
}

const onceSum = myOnce(sum)
onceSum(3,4)
console.log(onceSum(3, 4));
