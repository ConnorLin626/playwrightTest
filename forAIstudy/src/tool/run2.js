const { spawn } = require('cross-spawn');
const {pasrseAllJSTestFile} = require("./timecost/anylyst");
const { generateReport } = require('./generate_report');
const { config_tmp_file,protractorcmd } = require('./project');
const { Executor } = require("./timecost/executor");
const process = require('node:process');
const log4js  = require("log4js");
log4js.configure({
    appenders: { autotest: { type: "file", filename: "c:/logs/autotest.log" } },
    categories: { default: { appenders: ["autotest"], level: "info" } },
});
  
const logger = log4js.getLogger();

class ProtracorExecutor extends Executor{
    constructor(){
        super();
        this.protractorProcesses=[];
    }

    async fetchTcData(){
        return  pasrseAllJSTestFile();
    }

    tcRun(tcInfo){
        logger.info(`${tcInfo.tcFile} ${tcInfo.tcUsers} get permit`);
        let reportname=`Result-IDEALX-${tcInfo.tcFile.split("/").slice(-1)}`;
        console.info(`${protractorcmd} ${config_tmp_file} --specs=${tcInfo.tcFile} --mochaOpts.reporterOptions.reportFilename=${reportname}`);
        logger.info(`${protractorcmd} ${config_tmp_file} --specs=${tcInfo.tcFile} --mochaOpts.reporterOptions.reportFilename=${reportname}`);
    
        const options = {
            stdio: 'inherit', // or ['pipe', 'pipe', 'pipe']
            shell: true
        };
    
        let protractorProcess = spawn(protractorcmd , [config_tmp_file,
                `--specs=${tcInfo.tcFile}`,
                `--mochaOpts.reporterOptions.reportFilename=${reportname}`],options);
        
        // according to https://nodejs.cn/api/child_process.html
        // error happen when process spawn fail,  must call gateKeeper.takebackPermit(tcInfo.tcUsers);        
        protractorProcess.on('error', (err) => {
            logger.error('Protractor process encountered an error:', err);
            logger.error(`on error : ${tcInfo.tcFile} release ${tcInfo.tcUsers}`);
            this.limiter.done();
            this.gateKeeper.takebackPermit(tcInfo.tcUsers);
        });
    
        //once spawn success, exit happen when process end by itself,
        //close is called always after exit . After exit event emit , 
        //process will check if child process stdio is close , then close event emit.
        //so call gateKeeper.takebackPermit(tcInfo.tcUsers) put in exit ,but not in close
        protractorProcess.on('exit', (code,signal)=>{
            if (code === 0) {
                logger.info('on exit : Protractor tests have completed successfully.');
            } else {
                logger.error(`on exit : Protractor tests exited with code ${code} and signal ${signal}.`);
            }
            logger.info(`on exit : ${tcInfo.tcFile} release ${tcInfo.tcUsers}`);
            this.limiter.done();
            this.gateKeeper.takebackPermit(tcInfo.tcUsers);
        });
    
        protractorProcess.on('close', (code,signal) => {       
            if (code === 0) {
                logger.info('on close : Protractor tests have completed successfully.');
            } else {
                logger.error(`on close : Protractor tests exited with code ${code} and signal ${signal}.`);
            }
        });
        this.protractorProcesses.push(protractorProcess);
    }

    // Function to calculate task duration in min
    getDuration(tcInfo) {
        return (tcInfo.runEndTime-tcInfo.runStartTime)/60000; 
    }
    // Function to calculate task start time in min
    getTaskStartTime(tcInfo) {
        return (tcInfo.runStartTime-this.startTime)/60000;
    }

    afterAllTcDone() {
        this.tcInfos.forEach(tcInfo=>{
            tcInfo.startTime=this.getTaskStartTime(tcInfo);
            tcInfo.duration=this.getDuration(tcInfo);
        })
        generateReport();
    }

    endAllTask(){
        this.protractorProcesses.forEach(p=>p.emit("close"));
    }
}

let executor = new ProtracorExecutor();

process.on('beforeExit', (code) => {
    console.log('main process beforeExit event with code: ', code);
});
  
process.on('exit', (code) => {
    //code!=0 means exit not nomally,then need endAll childProcess 
    if(code!=0)
         executor.endAllTask();
    console.log('main process exit event with code: ', code);
});
  
//process ctrl+c
process.on('SIGINT', function () {
    console.log('main Exit now!,notify all child process to exit');
    process.exit();
});

let maxProtractorNum=100000;
if(process.argv.length>=3){
    maxProtractorNum=process.argv[2];
}

executor.run(maxProtractorNum);