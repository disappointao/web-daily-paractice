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
    return function (){
        if(!done){
            done = true
            return fn.apply(this,arguments)
        }
    }
}

const onceSum = myOnce(sum)
onceSum(3,4)
onceSum(3,4)