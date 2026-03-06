const defaultOption = {
    stdout: null,
    filter: null,
  }
  
  const getterCaches = new Map()
  const setterCaches = new Map()
  
  const trackGetter = options => {
    return (target, prop, receiver) => {
      
      let output = ''
      const contextName = target.constructor.name === 'Object' ? '未知类' : `${target.constructor.name}.`
      
      // 初始化cache内容
      let cache = getterCaches.get(target)
      if (!cache) {
        cache = {}
      }
      
      // 记录调用次数调用次数
      const countKey = `${prop}-get-count`
      cache[countKey] = Number(cache[countKey] || 0) + 1
      getterCaches.set(target, cache)
      output += `${countKey}: ${cache[countKey]} `
      
      // 记录调用时间
      const timeKey = `${prop}-get-time`
      cache[timeKey] = Date()
      getterCaches.set(target, cache)
      output += `${timeKey}: ${cache[timeKey]} `
      
      console.log(output)
      
      // 返回
      return Reflect.get(target, prop, receiver)
    }
  }
  
  const trackSetter = options => {
    return (target, prop, value, receiver) => {
      let output = ''
      const contextName = target.constructor.name === 'Object' ? '未知类' : `${target.constructor.name}.`
      
      // 初始化cache内容
      let cache = setterCaches.get(target)
      if (!cache) {
        cache = {}
      }
      
      // 记录调用次数调用次数
      const countKey = `${prop}-set-count`
      cache[countKey] = Number(cache[countKey] || 0) + 1
      setterCaches.set(target, cache)
      output += `${countKey}: ${cache[countKey]} `
      
      // 记录调用时间
      const timeKey = `${prop}-set-time`
      cache[timeKey] = Date()
      setterCaches.set(target, cache)
      output += `${timeKey}: ${cache[timeKey]} `
      
      console.log(output)
      
      // 返回
      return Reflect.get(target, prop, value, receiver)
    }
  }
  
  const trackClass = (cls, options) => {
    cls.prototype.constructor = cls
    return new Proxy(cls, {
      construct(cls, thisBinding, args) {
        const instance = Reflect.construct(cls, thisBinding, args)
        return new Proxy(instance, {
          get: trackGetter(options),
          set: trackSetter(options),
        })
      }
    })
  }
  
  const trackDecorator = (options = defaultOption) => {
    return target => {
      if (typeof target !== 'function') {
        console.log('用错地方了')
      }
      return trackClass(target, options)
    }
  }
  
  class Foo {
    constructor() {
      this.num = 123
    }
    
    getNum() {
      return this.num
    }
    
    setNum(value) {
      this.num = value
    }
  }
  
  const TrackedFoo = trackDecorator()(Foo)
  
  const fooInstance = new TrackedFoo()
  console.log(fooInstance.num)
  console.log(fooInstance.getNum())
  fooInstance.setNum(456)
  console.log(fooInstance.getNum())
  console.log(fooInstance.num)
  fooInstance.num = 789
  console.log(fooInstance.getNum())
  console.log(fooInstance.num)