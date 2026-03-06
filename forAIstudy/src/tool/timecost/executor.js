const { GateKeeper } = require("./gatekeeper")
const fs = require('fs')
const path = require('path');
const { Limiter } =require('../timecost/limiter');
const TCInfo = require("./tcInfo");
/**
 * Executor is key class which to schedule testcase running.
 * see run(maxProtractorNum)
 */
class Executor{
    /**
     * @param {Array} tcInfos 
     */
    constructor(){
        this.tcInfos;
        this.gateKeeper=new GateKeeper();
        this.maxInstanceNum=0;
        this.instanceNum=0;
        this.limiter;
        this.startTime;
        this.endTime;
    }

    beforeAllTcsRun(){}
    
    /**
     * this method will override in diff executor implemetion
     * @param {TCInfo} tcInfo 
     */
    tcRun(tcInfo){}

    /**
     * this method will override in diff executor implemetion
     */
    afterAllTcDone(){}


    /**
     * fetch tcInfo Data
     */
    async fetchTcData(){}

    /**
     * 
     * @param {number} maxProtractorNum  protractor instances number will limit as maxProtractorNum
     */
    run(maxProtractorNum){
        this.fetchTcData().then(data=>{
            this.tcInfos = data;

            this.beforeAllTcsRun();

            this.limiter= new Limiter(maxProtractorNum);
            this.startTime=Date.now();
            this.gateKeeper.setTotalTaskNum(this.tcInfos.length);
            this.tcInfos.forEach(tcInfo=>{
                this.gateKeeper.givePermit(tcInfo.tcUsers).then(()=>{
                    this.limiter.process(tcInfo).then(tcInfo=>{
                        this.instanceNum++;
                        this.maxInstanceNum=Math.max(this.maxInstanceNum,this.instanceNum);
                        //console.info(`${tcInfo.tcFile} ${tcInfo.tcUsers} get permit`);
                        tcInfo.runStartTime=Date.now();
                        this.tcRun(tcInfo);
                    });
                },(err)=>{
                    console.info(err);
                    console.info(`${tcInfo.tcFile} rejected`);
                });

            });
            
            this.gateKeeper.monitor2().then(()=>{
                 console.info("all tasks done!");
                 this.endTime=Date.now();
                 //console.info(`max protractor instances number=${this.maxInstanceNum}`)
                 //generate data to simulate_result.js for char diagram 

                 this.afterAllTcDone();  
                 
                 let content={
                    "startTime":this.startTime,
                    "maxInstanceNum":this.maxInstanceNum,
                    "tcInfos":this.tcInfos
                 }
                 fs.writeFileSync(path.join(__dirname,"/simulate_result.js"),
                         `let data = ${JSON.stringify(content)} `, { flag: 'w' })
            });
        })
    }
}

module.exports={Executor}