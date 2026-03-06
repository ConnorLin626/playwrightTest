/**
 * simulate all testcase run
 */
const { Executor } = require("./executor");
const {parseResultIdealxJson} = require("./anylyst")
class Simulator extends Executor{
    constructor(){
        super();
    }

    beforeAllTcsRun(){
        this.tcInfos.forEach(tcInfo=>{
            console.info(`${tcInfo.tcFile} | ${tcInfo.timecost} | ${tcInfo.tcConfigFiles} | ${tcInfo.tcUsers}`);
        })
    }

    async fetchTcData(){
     return  parseResultIdealxJson();
    }

    tcRun(tcInfo){
        setTimeout(() => {
            tcInfo.runEndTime=Date.now();
            this.instanceNum--;
            console.info(`${tcInfo.tcFile} executed in ${tcInfo.timecost} m`);
            //console.info(`${tcInfo.tcFile} release ${tcInfo.tcUsers}`);
            //limiter.done()会通知等待队列里的任务执行
            this.limiter.done();
            this.gateKeeper.takebackPermit(tcInfo.tcUsers);
        }, (tcInfo.timecost*10)) //*10 是为了提高模拟运行的准确度
    }

    // Function to calculate task duration in min
    getDuration(tcInfo) {
        return (tcInfo.runEndTime-tcInfo.runStartTime)/10; 
    }
    // Function to calculate task start time in min
    getTaskStartTime(tcInfo) {
        return (tcInfo.runStartTime-this.startTime)/10;
    }

    afterAllTcDone(){
        //simultor执行的时候,真实testcase的执行时间1min当成10ms
        //所以要模拟执行的时间ms->转回真实时间(min)=模拟执行的时间ms要除10
        let interval=(this.endTime-this.startTime);
        console.info(`total time cost=${interval/10} min`);
        this.tcInfos.forEach(tcInfo=>{
            tcInfo.startTime=this.getTaskStartTime(tcInfo);
            tcInfo.duration=this.getDuration(tcInfo);
        })
    }
}

let maxProtractorNum=100000;
if(process.argv.length>=3)
    maxProtractorNum=process.argv[2];
new Simulator().run(maxProtractorNum);