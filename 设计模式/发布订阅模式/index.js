class PubSub{
  contructor(){
    this.listeners ={}
  }

  /**
   * 订阅事件
   * @param type
   * @param cb
   */
  subscribe(type, cb){
    if(!this.listeners[type]){
      this.listeners[type] = []
    }
    this.listeners[type].push(cb)
  }

  /**
   *
   * @param type
   * @param args
   */
  publish(type, ...args){
    if(!this.listeners[type]){
      return false
    }
    this.listeners.forEach( cb => {
      cb(...args)
    } )
  }

  /**
   * 移出某个事件的某个监听者
   * @param type
   * @param cb
   */
  off(type, cb){
    const targetIndex = this.listeners[type].findIndex(item => item === cb)
    if (targetIndex !== -1) {
      this.listeners[type].splice(targetIndex, 1)
    }
    if (this.listeners[type].length === 0) {
      delete this.listeners[type]
    }
  }

  /**
   * 移出某个事件的所有监听者
   * @param type
   */
  offAll(type){
    if(this.listeners[type]){
      delete this.listeners[type]
    }
  }
}
