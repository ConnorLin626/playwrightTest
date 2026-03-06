const { spawn } = require('cross-spawn');
const path = require("path");
const { config_file,protractorcmd } = require('./project');
const { generate_config } = require('./generate_config.js');
const { generateReport } = require('./generate_report.js');
let runCaseNumber=0;
let allCaseDone=false;
function runBySuite(suitename){
    let suite_name=suitename
    console.log(`${protractorcmd} ${config_file} --suite=${suite_name}`);

    const options = {
        stdio: 'inherit', // or ['pipe', 'pipe', 'pipe']
       // detached: true,
        shell: true
    };

    runCaseNumber++;

    let protractorProcess = spawn(protractorcmd , [config_file,
            `--suite=${suite_name}`,
            `--mochaOpts.reporterOptions.reportFilename=Result-IDEALX-${suite_name}`],options);

    protractorProcess.on('close', (code,signal) => {
        runCaseNumber--;
        if(suite_name=="testcase-samuser-involved"){
            allCaseDone=true;
        }
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
        if (runCaseNumber == 0) {
            console.log("All test cases except testcase-samuser-involved are done, now turn to testcase-samuser-involved");
            clearInterval(intervalId);
            runBySuite("testcase-samuser-involved");          
        }
    }, 3000); 
}

function rungenerateReport(){   
    const rptGenerateIntervalId = setInterval(function() {    
        if (allCaseDone) {
            console.log("All test cases done, now turn to generate report");
            clearInterval(rptGenerateIntervalId);
            generateReport()     
        }
    }, 3000); 
}


//generate protractor config dynamically , category base json test file
let protractorConfig=generate_config()
for(let suite in protractorConfig.config.suites){
    if(suite!="testcase-samuser-involved")
        runBySuite(suite);   
}

runSamuserInvolvedSuite();
rungenerateReport();




