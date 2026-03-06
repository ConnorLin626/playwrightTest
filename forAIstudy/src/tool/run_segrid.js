const { spawn } = require('cross-spawn');
const process = require("child_process");
const path = require("path");
const { generate_config,config_file} = require('./generate_config.js');
const { portmapping } = require('./portmap.js');
const protractor_data_dir=path.join(__dirname, '../../data/tmp');
let runCase = 0;

function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
}

async function runBySuite(suite_name){

    let p1=portmapping[suite_name].se_port
    let p2=portmapping[suite_name].vnc_viewer_port
    //let p1=randomPort()
    //let p2=randomPort()
    let container_name=suite_name
    await remove_docker(container_name)
    await sleep(3000)
    await create_chrome_docker(p1,p2,container_name) 
    await sleep(3000)
    let protractorcmd= path.join(__dirname,"../../node_modules/.bin/protractor");
    console.log(protractorcmd+" "+config_file+" --suite="+suite_name+" --seleniumAddress="+"http://localhost:"+p1+"/wd/hub")
    runCase++;
    let protractorProcess = spawn(protractorcmd , [config_file,
               `--suite=${suite_name}`,
               `--seleniumAddress=http://localhost:${p1}/wd/hub`,
               `--mochaOpts.reporterOptions.reportFilename=Result-IDEALX-${suite_name}`],{
        stdio:'inherit'
    });

    protractorProcess.on('close', (code,signal) => {
        runCase--;
        if (code === 0) {
            console.log('Protractor tests have completed successfully.');
        } else {
            console.error(`Protractor tests exited with code ${code} and signal ${signal}.`);
        }
    });
    // Handle the "error" event to prevent unhandled error exceptions
    protractorProcess.on('error', (err) => {
        console.error('Protractor process encountered an error:', err);
    });
}

function runSamuserInvolvedSuite(){
    const intervalId = setInterval(function() {    
        if (runCase == 0) {
            console.log("All test cases are done, now turn to testcase-samuser-involved");
            clearInterval(intervalId);
            runBySuite("testcase-samuser-involved");          
        }
    }, 3000); 
}

async function remove_docker(name){
    let close_docker_chrome=spawn("docker",["rm","-f",name])
    await close_docker_chrome.stdout.on('data', (data) => {       
        console.info(`close_docker_chrome close : ${data}`)
    });
}

function create_chrome_docker(p1,p2,name){
    let docker_chrome=spawn("docker",["run","-d",
                            "-p",`${p1}:4444`,
                            "-p",`${p2}:5900`,                            
                            "--name",name,
                            "selenium/standalone-chrome-debug"])
 
    docker_chrome.stdout.on('data', (data) => {       
        console.info(`docker_chrome cid=${data}`)
    });

    docker_chrome.on('close', (code,signal) => {
        if (code === 0) {
            console.log('docker_chrome start successfully.');
        } else {
            console.error(`docker_chrome exited with code ${code} and signal ${signal}.`);
        }
    });

    docker_chrome.on('error', (err) => {
        console.error('docker_chrome encountered an error:', err);
    });   
     
}

//generate protractor config dynamically , category base json test file
let protractorConfig=generate_config()

for(let suite in protractorConfig.config.suites){    
    if(portmapping[suite] && suite!="testcase-samuser-involved"){        
        runBySuite(suite);   
    }else{
        console.log(`No mapping suite=${suite} config in portmap.js,please config!`)
    }
}

runSamuserInvolvedSuite();
