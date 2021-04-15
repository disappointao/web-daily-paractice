 function myInstanceof(target,source){
    const proto = target.__proto__
    if(!proto){
        return false
    }else{
        if(proto === source.prototype){
            return true
        }
        return myInstanceof(proto,source)
    }
 }
 let a = {}
 console.log(myInstanceof(a,Object))
 function Person(){

 }
 let p = new Person()
 console.log(myInstanceof(p,Person))