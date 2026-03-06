
const fs = require("fs");
const path = require("path");
const project = require("./project");
const fse = require('fs-extra')
const glob = require('glob');
const http = require('http');

function recursion(tsPath,testCases) {
    let files=fs.readdirSync(tsPath);
    files.forEach(file=>{       
        if(file.indexOf('.ts')>0){          
            let data = fs.readFileSync(path.join(tsPath,file));         
            let testCases = extractTestCases(data);
            testCases.push(testCases);
        }else{
            //check is directory
            if(fs.statSync(path.join(tsPath,file)).isDirectory()){
                recursion(path.join(tsPath,file),testCases);
            }
        }
    });
}

function extractTestCases(data) {
    const reg = /^(?!\/\/)\s*it\(["|'](.*)["|']/gm;
    const matches = data.matchAll(reg);
    const testCases = [];
  
    for (const match of matches) {
      testCases.push(match[1]);
    }
  
    return testCases;
  }

function parseLogEntry(logEntry) {
    const parts = [];
    let currentPart = '';
    let inQuotes = false;
  
    for (let i = 0; i < logEntry.length; i++) {
      if (logEntry[i] === '"') {
        inQuotes = !inQuotes; 
      } else if (logEntry[i] === ',' && !inQuotes) {
        parts.push(currentPart);
        currentPart = '';
      } else {
        currentPart += logEntry[i];
      }
    }
  
    parts.push(currentPart);
  
    return parts;
  }

/**
 * Read all executed run test cases base on history record csv file,
 * 
 * Now csv file record both jdk8 repo and jdk17 repo run test cases,
 * 
 * Below logic do split and record jdk8 and jdk17 run test cases respectively
 * 
 * @returns jdk8RunTestCases and jdk17RunTestCases
 */
function getExecutedTestCaseFromCsv(date){
    let jdk8RunTestCases = [];
    let jdk17RunTestCases = [];
    project.csvFiles.forEach(csvFile=>{
        let data = fs.readFileSync(csvFile);
  
        let lines = data.toString().split("\n");
        //Find fist line start with yesterday 
        let index = lines.findIndex(line=>line.startsWith(date));
    
        if(index==-1){
            console.error("Can not find test case executed date="+date+" in "+csvFile);
            return [];
        }
    
        //Get first run testcase name
        let line = lines.find(line=>line.startsWith(date));

        let logEntrys=parseLogEntry(line);
        let firstTestCaseName = logEntrys[2];
    
       
        let round="";
        lines.slice(index).forEach(line=>{
            if(line.includes(firstTestCaseName)){
                round=(round=="")?"jdk8":"jdk17"; 
            }
            if(line.startsWith(date)){
                logEntrys=parseLogEntry(line);
                if(round=="jdk8")  {                   
                        jdk8RunTestCases.push(logEntrys[2]);
                 } else {                     
                        jdk17RunTestCases.push(logEntrys[2]);
                 }
            }
        });
    });
  

    return {jdk8RunTestCases,jdk17RunTestCases};
}


/**
 * Find out all test case names from protractorConf in project.js,
 * By default is config/protractor.config.idealx
 * @returns 
 */
function findConfigAllCase(){
    const testSuite=project.protractorConf.config.suites.test;
    const testCaseTypeScriptFiles=testSuite.map(item=>item.replace(/\.js$/, '\.ts').replace(/\.\.\/dist\/e2e/,project.tsFilePath));
    let allTestCases=[];
    testCaseTypeScriptFiles.forEach( file=>{
      //handle testcase config in protroactor.config.idealx.js have wildcard 
      if(file.includes('*')){
        let files = glob.sync(file);
        files.forEach(file=>{
           extractFileTestCases(file, allTestCases);
        });
      }else{
         extractFileTestCases(file, allTestCases);
      }
    });
    return allTestCases;
}

/**
 * 
 * @param {string} file  test case file 
 * @param {string[]} allTestCases 
 */
function extractFileTestCases(file, allTestCases) {
  if (fs.existsSync(file)) {
    let data = fs.readFileSync(file);
    let testCases = extractTestCases(data.toString());
    if (testCases.length > 0) {
      allTestCases.push(...testCases);
    } else {
      console.error(file + " can not find test case");
    }
  }
}

/**
 * 
 * @param {string} reportJsonFile json file from protractor executed 
 * @returns all test case names from report.json
 */
function findReportJsonFileCase(reportJsonFile){
    let testCases=[];
    let report=fse.readJsonSync(reportJsonFile);
    let suites=report.suites.suites
    for(let suite of suites){
        for(let test of suite.tests){
            testCases.push(test.title);
        }
    }
    return testCases;
}

function printArray(arr){
    arr.forEach(item=>{
        console.log(item);
    });
}

function calculateCompareTestCase(arrA,arrAName,arrB,arrBName){
    //交集
    var intersect = arrA.filter(function(v){ return arrB.indexOf(v) > -1 })
    //差集
    var minus = arrA.filter(function(v){ return arrB.indexOf(v) == -1 })
    //补集
    var complement = arrA.filter(function(v){ return !(arrB.indexOf(v) > -1) })
    .concat(arrB.filter(function(v){ return !(arrA.indexOf(v) > -1)}))
    //并集
    var unionSet = arrA.concat(arrB.filter(function(v){ return !(arrA.indexOf(v) > -1)}));
    console.log(`${arrAName}---------------->：`);
    printArray(arrA);
    console.log("----------------------------------------------------------");   
    console.log(`${arrBName}---------------->：`);
    printArray(arrB);
    // console.log("----------------------------------------------------------");  
    // console.log(`数组${arrAName}与数组${arrBName}的交集：`);
    // printArray(intersect);
    // console.log("----------------------------------------------------------");    
    // console.log(`数组${arrAName}与数组${arrBName}的差集：`);
    // printArray(minus);
    // console.log("----------------------------------------------------------");   
    // console.log(`数组${arrAName}与数组${arrBName}的补集：`);
    // printArray(complement);
    console.log("----------------------------------------------------------");   
    console.log(`Exist in both---------------->:`);
    printArray(intersect);
    console.log("----------------------------------------------------------");  
    console.log(`Exist in ${arrBName} not in ${arrAName}---------------->:`);
    let notshowCases = arrB.filter(function(v){ return arrA.indexOf(v) == -1 })
    //let notshowCases = arrB.filter(item=>!arrA.includes(item));
    printArray(notshowCases);
    console.log("----------------------------------------------------------");  
    console.log(`Exist in ${arrAName} not in ${arrBName}---------------->:`);
    notshowCases = arrA.filter(function(v){ return arrB.indexOf(v) == -1 })
    printArray(notshowCases);
}

async function downloadFile(url, outputPath) {
    try {
      const writer = fs.createWriteStream(outputPath);
      const response = await new Promise((resolve, reject) => {
        http.get(url, resolve).on('error', reject);
      });
  
      response.pipe(writer);
  
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
  
      console.log(`successfully downloaded file from ${url} to ${outputPath}`);
    } catch (error) {
      console.error('Error in download file:', error);
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    }
  }

 function checkInsideCompanyEnv(){
    return new Promise((resolve, reject) => {
      http.get("http://192.168.0.248/", (res) => {
        resolve(res.statusCode);
      }).on('error', (e) => {
        reject(e);
      });
    });
}
checkInsideCompanyEnv().then( async (statusCode) => {
    if(statusCode==200){
         console.log("We are  in company Gientech-aci network,download file automatically");
        await downloadFile("http://192.168.0.248/auto/report_jdk/test.results/Result-IDEALX.json",project.idealxReportJsonFile);
        await downloadFile("http://192.168.0.248/auto/report/test.results/Result-IDEALX.json",project.idealx_JDK8ReportJsonFile);
        await downloadFile("http://192.168.0.248/auto/report_jdk/test.history/history.CB.V2.csv",path.join(project.testHistoryPath,"/history.CB.V2.csv"));
        await downloadFile("http://192.168.0.248/auto/report_jdk/test.history/history.IDEALX.V2.csv",path.join(project.testHistoryPath,"/history.IDEALX.V2.csv"));
        await downloadFile("http://192.168.0.248/auto/report_jdk/test.history/history.SU.V2.csv",path.join(project.testHistoryPath,"/history.SU.V2.csv"));
    }else{
        console.log("We are not in company Gientech-aci network,you must download file manually");
    }


    // let today=new Date();
    // let date = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
    // if(process.argv.length>=3){
    //     date=process.argv[2];
    // }
    // let csvTestCases=getExecutedTestCaseFromCsv(date);
    // if (csvTestCases.length==0){
    //     console.log("test case not run on "+date+",skip compare");
    //     return;
    // }
    let configTestCases=findConfigAllCase();
    let jsonReportTestCases=findReportJsonFileCase(project.idealxReportJsonFile);
    
    console.log("============JDK17================");
    console.log("config test cases size:"+configTestCases.length);
   // console.log("csv test cases size:"+csvTestCases.jdk17RunTestCases.length);
    console.log("report test cases size:"+jsonReportTestCases.length);
   // calculateCompareTestCase(csvTestCases.jdk17RunTestCases,"CSV",jsonReportTestCases,"REPORT");
    console.log("in config but not in report---->:");
    let noRunCases=configTestCases.filter(item=>!jsonReportTestCases.includes(item));
    noRunCases.forEach(item=>console.log(item));
    console.log("in report but not in config---->:");
    noRunCases=jsonReportTestCases.filter(item=>!configTestCases.includes(item));
    noRunCases.forEach(item=>console.log(item));
    
    console.log("============JDK8================");
    jsonReportTestCases=findReportJsonFileCase(project.idealx_JDK8ReportJsonFile);
    console.log("config test cases size:"+configTestCases.length);
   // console.log("csv test cases size:"+csvTestCases.jdk17RunTestCases.length);
    console.log("report test cases size:"+jsonReportTestCases.length);
   // calculateCompareTestCase(csvTestCases.jdk17RunTestCases,"CSV",jsonReportTestCases,"REPORT");
    console.log("in config but not in report---->:");
    noRunCases=configTestCases.filter(item=>!jsonReportTestCases.includes(item));
    noRunCases.forEach(item=>console.log(item));
    console.log("in report but not in config---->:");
    noRunCases=jsonReportTestCases.filter(item=>!configTestCases.includes(item));
    noRunCases.forEach(item=>console.log(item));
  }).catch((error) => {
     console.log("Error in checkInsideCompanyEnv:", error);
  }
);





