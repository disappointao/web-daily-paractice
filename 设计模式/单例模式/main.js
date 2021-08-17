import Single from  './single.js'
const a = Single.getInstance()
const b = Single.getInstance()
// console.log(a === b)
a.name = '张三'
b.age = 14
console.log(a)
