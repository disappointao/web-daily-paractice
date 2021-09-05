 // function myInstanceof(target,source){
 //    const proto = target.__proto__
 //    if(!proto){
 //        return false
 //    }else{
 //        if(proto === source.prototype){
 //            return true
 //        }
 //        return myInstanceof(proto,source)
 //    }
 // }
 // let a = {}
 // console.log(myInstanceof(a,Object))
 // function Person(){
 //
 // }
 // let p = new Person()
 // console.log(myInstanceof(p,Person))

 // 递归方式
 // function myInstanceOf(target, constructor) {
 //  let proto = target.__proto__;
 //  if(!proto) {
 //    return false
 //  }
 //  if(proto === constructor.prototype){
 //    return true
 //  }
 //  return myInstanceOf(proto, constructor)
 // }

 //while 循环遍历
 function myInstanceOf(target, constructor) {
  let proto = target.__proto__;
  while (proto){
    if(proto === constructor.prototype){
      return true
    }
    proto = proto.__proto__
  }
  return false
 }
 let a = {}
 console.log(myInstanceOf(a,Array))
 function Person(){

 }
 let p = new Person()
 console.log(myInstanceOf(p,Person))