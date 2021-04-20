function myNew(target,...args){
    let obj = Object.create(null)
    obj.__proto__ = target.prototype
    const res = target.call(obj,...args)
    return res instanceof Object ? res : obj
}
