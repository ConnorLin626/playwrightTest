const fse = require('fs-extra');
const path = require("path");
const fs = require("fs");
const TCInfo = require("./tcInfo");
const {jsFilePath,protractorConf,idealxReportJsonFile} = require("../project");

const unique=items=>items.reduce((accumulator,cur)=>{
    if(!accumulator.find(ele=>ele==cur)){
        accumulator.push(cur);
    }
    return accumulator;
},[]);

const sumaryTimeCost=tcFile=>tcFile.tests.reduce((accumulator,test) => accumulator + test.duration,0);

/**
 * this function recursion find out *.js of dist/e2e folder(include sub folder).
 * parse jsFile and encapsulate as tcInfo.
 * 
 * this method diff to parseResultIdealxJson is parseResultIdealxJson is use for simulate running 
 * @returns array<tcInfo>
 */
async function pasrseAllJSTestFile(){
   return recursion(jsFilePath).map(tcFile => {
        let tcConfigFiles = getTestCaseConfigTestDataFiles(tcFile);
        let tcusers = getTestCaseUsers(tcFile,tcConfigFiles);
        return new TCInfo(tcFile,null,tcConfigFiles,tcusers);
   });
}

const testSuite=protractorConf.config.suites.test;

//to filter only js file config in protractor.config.idealx
function filter(jsTestFile){
    //nodejs version<12 don't hava function replaceAll
    //let file=jsTestFile.replaceAll("\\","/");
    let file=jsTestFile.replace(/\\/gi,"/");
    let projectRelativePath=file.substr(file.indexOf("dist"));
    file="../"+projectRelativePath;
    for (const suiteFileName of testSuite) {
        if(suiteFileName==file)
            return projectRelativePath;
    }
    return null;
}

function recursion(jsPath) {
    let files=fs.readdirSync(jsPath);
    let list=[];
    files.forEach(file=>{       
        if(file.indexOf('.js')>0){          
            let jsTestFile=path.join(jsPath,file)
            let newjsTestFile=filter(jsTestFile)
            if(newjsTestFile)
                list.push(newjsTestFile);
        }else if (fs.statSync(path.join(jsPath,file)).isDirectory()){
            let subFolderList=recursion(path.join(jsPath,file));
            list.push(...subFolderList);    
        }
    });
    return list;
}

/**
 * this function read Result-idealx.json in order to get testcase timecost,and put in tcInfo.timecost
 * @returns array<tcInfo>
 */
async function parseResultIdealxJson() {
    let jsonFile = project.idealxReportJsonFile;
    if (!fs.existsSync(jsonFile)) {
        console.error("Result-idealx.json dose not exists in the report path, please execute this  after auto test run done")
    }
    return fse.readJson(jsonFile).then(report => {
        let allsuites = report.suites.suites;

        let tcInfos=[];
        let alltcFiles = allsuites.reduce((accumulator, cur)=>{
            for(let item of accumulator){
                if(item.file==cur.file){
                    item.duration+=sumaryTimeCost(cur);
                    return accumulator;
                }
            }
            accumulator.push({"file":cur.file,"duration":sumaryTimeCost(cur)});   
            return accumulator;
        },[]);

        alltcFiles.forEach(tcFile => {
            let tcConfigFiles = getTestCaseConfigTestDataFiles(tcFile.file);
            let tcusers = getTestCaseUsers(tcFile.file,tcConfigFiles);
            tcInfos.push(new TCInfo(tcFile.file,`${(tcFile.duration/60000).toFixed(2)}`,tcConfigFiles,tcusers));
        });

        return  tcInfos;
    })
}

function getTestCaseUsers(tcFileName,tcConfigFiles){
    let users=new Set();
    let p=path.join(__dirname,`../../../${tcFileName}`);
    if (!fs.existsSync(p)) {
        console.error(`${p} not exist`)
        return [...users];
    }
    let data = fs.readFileSync(path.join(__dirname,`../../../${tcFileName}`),'utf-8');  
    //json文件里的loginuserid节点
    let loginUserJsonNodePaths = parseAndgetTestCaseUserPath(data);
    // 根据usernode节点获取testcaseConfigFileNmae里的
    for(let tcConfigFile of tcConfigFiles){
        let tcConfigdata = fs.readFileSync(path.join(__dirname,`../../../data/${tcConfigFile}`),'utf-8');  
        let tcConfigJsonObj = JSON.parse(tcConfigdata);
        for(let p of loginUserJsonNodePaths){
            let user=getValueFromJson(tcConfigJsonObj,p);
            if(user)
             users.add(user);
        }
    }
    return [...users];
}

function getValueFromJson(jsonObj,path){
    let value=jsonObj;

    let paths=path.split("\.").slice(1);

    for(p of paths){
        value = value[p];
        if(!value)
            return null;
    }

    return value;
}

function parseAndgetTestCaseUserPath(data) {
   
    let tc = [];
    //testData.OfflineApproval.SIT.loginUserIdwithoutConfidential
    let re = /testData\.([^,]*)\.SIT\.loginUserId/g;
    while (match = re.exec(data)) {
        tc.push(`testData.${match[1]}.SIT.loginUserId`);
    }
    re = /testData\.([^,]*)\.SIT\.verifyUserId/g;
    while (match = re.exec(data)) {
        tc.push(`testData.${match[1]}.SIT.verifyUserId`);
    }
    re = /testData\.([^,]*)\.SIT\.login\.loginUserId/g;
    while (match = re.exec(data)) {
        tc.push(`testData.${match[1]}.SIT.login.loginUserId`);
    }
    re = /testData\.([^,]*)\.SIT\.login\.verifyUserId/g;
    while (match = re.exec(data)) {
        tc.push(`testData.${match[1]}.SIT.login.verifyUserId`);
    }
    re = /testDataCB\.([^,]*)\.SIT\.loginUserId/g; 
    while (match = re.exec(data)) {
        tc.push(`testDataCB.${match[1]}.SIT.loginUserId`);
    }
    re =  /testData\.([^,]*)\.SIT\.loginUserId01/g; 
    while (match = re.exec(data)) {
        tc.push(`testData.${match[1]}.SIT.loginUserId01`);
    }
    re =  /testData\.([^,]*)\.SIT\.loginUserId02/g; 
    while (match = re.exec(data)) {
        tc.push(`testData.${match[1]}.SIT.loginUserId02`);
    }
    re = /testData\.([^,]*)\.SIT\.loginUserId03/g; 
    while (match = re.exec(data)) {
        tc.push(`testData.${match[1]}.SIT.loginUserId03`);
    }
    re = /testData\.([^,]*)\.SIT\.loginUserId2/g;
    while(match = re.exec(data)){
        tc.push(`testData.${match[1]}.SIT.loginUserId2`);
    }
    re = /testData\.([^,]*)\.SIT\.loginUserId1/g;
    while(match = re.exec(data)){
        tc.push(`testData.${match[1]}.SIT.loginUserId1`);
    }
    re = /testDataSAM\.loginSAMID\.([^,\)]*)/g;
    while(match = re.exec(data)){
        tc.push(`testDataSAM.loginSAMID.${match[1]}`);
    }
    re =  /testData\.([^,]*)\.SIT\.loginUserNonDol/g; 
    while (match = re.exec(data)) {
        tc.push(`testData.${match[1]}.SIT.loginUserNonDol`);
    }
    re =  /testData\.([^,]*)\.SIT\.loginUserIdWithoutApprovalOwn/g; 
    while (match = re.exec(data)) {
        tc.push(`testData.${match[1]}.SIT.loginUserIdWithoutApprovalOwn`);
    }
    re =  /testData\.([^,]*)\.SIT\.loginUserIdWithoutApproval/g; 
    while (match = re.exec(data)) {
        tc.push(`testData.${match[1]}.SIT.loginUserIdWithoutApproval`);
    }
   
    return tc;
}

function getTestCaseConfigTestDataFiles(testcaseFileName){
    if (!fs.existsSync(path.join(__dirname,`../../../${testcaseFileName}`))) {
        console.error(`${testcaseFileName} not exist`)
        return [];
    }
    let data = fs.readFileSync(path.join(__dirname,`../../../${testcaseFileName}`));         

    let reg = /fetchTestData\(['|"](.*)['|"]\)/g;
    let testDataJsonFiles=[];
    while( match = reg.exec(data)) {
        testDataJsonFiles.push(match[1]);
    }
    return testDataJsonFiles;
}

module.exports={parseResultIdealxJson,pasrseAllJSTestFile,unique}

// function printTestCaseInfo(){
//     parseResultIdealxJson().then(tcInfos=>{
//         tcInfos.forEach(tcInfo=>{
//              console.info(`${tcInfo.tcFile} | ${tcInfo.timecost} | ${tcInfo.tcConfigFiles} | ${unique(tcInfo.tcUsers)}`);
//         })
//     });
// }

// printTestCaseInfo();

//let gateKeeper = new GateKeeper();

// let tasks=[{"userid":["zs"],"taskname":"task1"},{"userid":["zs"],"taskname":"task2"},
//             {"userid":["w5"],"taskname":"task3"},{"userid":["zs"],"taskname":"task4"}];

// for(let i=0;i<tasks.length;i++){
//     let task = tasks[i];
//     gateKeeper.givePermit(task.userid).then(()=>{
//         console.info(`${task.taskname} get permit`);
//         setTimeout(() => {
//             console.info(`${task.taskname} executed`);
//             gateKeeper.takebackPermit(task.userid);
//         }, 1000)
//     },(err)=>{
//         console.info(err);
//         console.info(`${task.taskname} rejected`);
//     })
// }
// gateKeeper.monitor().then(()=>{
//     console.info("all tasks done!");
// });
