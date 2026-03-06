const d_t = new Date();

class Limiter {
  constructor(tokens=1000000) {
    this.tokens = tokens;
    this.queue = [];
    this.intervalId = null;
  }

  now(){
    return d_t.getHours()+":"+d_t.getMinutes()+":"+d_t.getSeconds();
  }

  process(tcInfo) {
    if (this.tokens > 0) {
      this.tokens--;
      console.log(`${this.now()} ==> discharge task ${tcInfo.tcFile}`);
      return Promise.resolve(tcInfo);
    } else {
      return new Promise((resolve) => {
        this.queue.push({ tcInfo, resolve });
      });
    }
  }

  done(){
    this.tokens++;
    this.notify();
  }
 
 async notify() {
        if(this.queue.length>0){
          this.tokens--;
          const { tcInfo, resolve } = this.queue.shift();     
          resolve(tcInfo);
          console.log(`${this.now()} ==>  discharge task ${tcInfo.tcFile}`);
        }
  }
}

module.exports={Limiter}

// example
// const funnel = new FunnelLimiter();
// funnel.start();

// setInterval(() => {
//   funnel.process('A new request').then(() => console.log('Request processed.'));
// }, 500); 