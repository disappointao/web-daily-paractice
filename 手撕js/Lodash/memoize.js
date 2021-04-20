const _ = require('lodash')

function sum(a,b){
    console.log('接收参数',a,b)
    return a + b
}

// const memoizeSum = _.memoize(sum)
// console.log(memoizeSum(1, 2));
// console.log(memoizeSum(1, 2));
// console.log(memoizeSum(1, 2));

function myMemoize(fn){
    const cache = {}
    return function (){
        let key = JSON.stringify(arguments)
        cache[key] = cache[key] || fn.apply(this,arguments)
        return cache[key]
    }
}
const memoizeSum = myMemoize(sum)
console.log(memoizeSum(1, 2));
console.log(memoizeSum(1, 2));
console.log(memoizeSum(1, 2));
