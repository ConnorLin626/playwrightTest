const { spawn } = require('cross-spawn');
const process = require("child_process");
const path = require("path");
const { generate_config,config_file} = require('./generate_config.js');
const protractor_config_dir=path.join(__dirname, '../../config');
const { portmapping } = require('./portmap.js');

function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
}


async function runBySuite(suite_name){

   // let p1=portmapping[suite_name].se_port
    let vnc_port=portmapping[suite_name].vnc_viewer_port
    //let p1=randomPort()
    //let p2=randomPort()
    let container_name=suite_name
    await remove_docker(container_name)
    await sleep(3000)
    await create_chrome_docker(vnc_port,container_name) 
    await sleep(3000)

    cmd = `npm run build && node_modules/.bin/protractor config/protractor.config.new.js --suite=${suite_name} --seleniumAddress=http://localhost:4444/wd/hub`
    console.info(cmd)
    let protractorProcess = spawn("docker",["exec","-it",`${container_name}`,"bash","-c",cmd],{
        stdio:'inherit'
    });

    protractorProcess.on('close', (code,signal) => {
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

function randomPort(){
    let m=30000
    let n=30500
   return  parseInt(Math.random()*(m-n)+n)
}

async function remove_docker(name){
    let close_docker_chrome=spawn("docker",["rm","-f",name])
    await close_docker_chrome.stdout.on('data', (data) => {       
        console.info(`close_docker_chrome : ${data}`)
    });
}

function create_chrome_docker(vnc_port,name){
    let docker_chrome=spawn("docker",["run","-d","-p",`${vnc_port}:5900`,"-v",`${protractor_config_dir}:/usr/src/app/config`,"--name",name,"p:1"])
 
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
let i=1;

for(let suite in protractorConfig.config.suites){
    if(portmapping[suite])
        runBySuite(suite);    

}