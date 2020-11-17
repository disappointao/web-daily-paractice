//例如：[10,21,0,-7,35,7,9,23,18] 输出5, 7最小
function getIndex(arr) {
    let min=Math.min(...arr.filter(i=>i>0))
        let index=arr.indexOf(min)
        return [index, min].join(', ')
}
let a = [10,21,0,-7,35,7,9,23,18] ;
console.log(getIndex(a))