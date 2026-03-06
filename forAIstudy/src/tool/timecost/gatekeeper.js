
var events = require('events');

class PermitWaiter extends events.EventEmitter{
    constructor(userId,resolve,reject,gateKeeper){
        super();
        this.userId=userId;
        this.resolveFn=resolve;
        this.rejectFn=reject;
        this.gateKeepeer=gateKeeper;
    }

    tryGetPermit(){
        if(this.gateKeepeer.register(this.userId)){
            this.gateKeepeer.removeWaiter(this);
            this.resolveFn();
        }
    }
}

/**
 * GateKeeper: record all userid in users, for multiple tasks with same userid, only allow one task executed.
 * after running task completed.will pick up another task to run
 */
class GateKeeper{
     users=[];
     persmitWaits=[];
     taskExecutedNumber=0;
     constructor(){}

     givePermit(userIds){
        return new Promise((resolve,reject)=>{
            if(this.register(userIds)){
                resolve();
                return;
            }
            //这里不使用死循环，而是才用EventEmitter
            //没有登记成功，则放入到persmitWaits
            let waiter = new PermitWaiter(userIds,resolve,reject,this);
            waiter.on('tryGetPermit',function () {
                waiter.tryGetPermit();
            });
            this.persmitWaits.push(waiter);
        });
    }
    
    /**
     * check if all userid reigisted
     */
    isUsersRegisted(userIds){
        let countUserNotRegisted=userIds.reduce((accumaltor,toRegisteUserId)=>{
            if(!this.users.find(u=>u==toRegisteUserId))
            accumaltor++;
            return accumaltor;
        },0)
        if(countUserNotRegisted==userIds.length){
            return false;
        }
        return true;
    }

    /**
     * registe all userIds
     * @param {Array} userIds 
     * @returns only all userIds registed return true else false
     */
    register(userIds){
        if(!this.isUsersRegisted(userIds)){
            this.users.push(...userIds);  
            return true;
        }
        return false;
     }

    takebackPermit(userIds){
        this.taskExecutedNumber++;
        const userExistInUserArr=(userId,userIdArr)=>userIdArr.find(item=>item==userId)!=null;
        //delete userid in users
        this.users=this.users.filter(user=>!userExistInUserArr(user,userIds));

        //check wait task can be executed
        for (let waiter of this.persmitWaits){
                let intersection = (arr1,arr2) =>{
                    let a1 = new Set(arr1)
                    let a2 = new Set(arr2)
                    return [...a1].filter(item => a2.has(item))
                }
                //求出waiter.userIds和this.users的交集
                //如果交集为空，则可以通知waiter可以运行了
                if(intersection(waiter.userId,this.users).length==0){
                    waiter.emit('tryGetPermit');
                }
        }
    }

    removeWaiter(permitWaiter){
        this.persmitWaits=this.persmitWaits.filter(item=>item!==permitWaiter);
    }

    monitor(){
        return new Promise((resolve,reject)=>{
            let monitorInterval=setInterval(()=>{
                //all tasks done
                if(this.persmitWaits.length==0&&this.users.length==0){
                    clearInterval(monitorInterval);
                    resolve();
                    return
                }    
            },50);
        });
    }

    setTotalTaskNum(totalTaskNumber){
        this.totalTaskNumber=totalTaskNumber;
    }

    /**
     * monitor2 call before setTotalTaskNum
     */
    monitor2(){
        return new Promise((resolve,reject)=>{
            let monitorInterval=setInterval(()=>{
                //all tasks done
                if(this.taskExecutedNumber==this.totalTaskNumber){
                    clearInterval(monitorInterval);
                    resolve();
                    return
                }    
            },50);
        });
    }
   
}
exports.GateKeeper = GateKeeper
