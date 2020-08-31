// map 与 forEach 不支持异步的问题

let arr = [1,2,3,4,5];
// function num (i){
//   setTimeout(()=>{
//     console.log(i)
//   },1000)
// }
//
// function test(){
//   arr.map((item,index)=>{
//     num(arr[index])
//   })
//   console.log('最后执行');
// }
// test()


function num (i){
  return new Promise(resolve => {
    setTimeout(()=>{
      console.log(i)
      resolve(i);
    },1000)
  })
}

//map不能通过async与await解决

// function test(){
//   arr.map(async (item,index)=>{
//     await num(arr[index])
//   })
//   console.log('最后执行');
// }


//forEach不能通过async与await解决
// function test(){
//   arr.forEach(async (item,index)=>{
//     await num(arr[index])
//   })
//   console.log('最后执行');
// }


// for of可以使用async解决
// async function test(){
//   for(let i in arr){
//     await num(arr[i])
//   }
//   console.log('最后执行');
// }


async function test(){
  Promise.all(arr.map(async (item,index)=>{return await num(index)}))
    .then(res=>{
      console.log('最后执行',res);
    })
}
test()
