const fs = require("fs");
const path = require("path");
const {config_file,config_tmp_file,jsFilePath,protractorConf}=require("./project");
const testSuite=protractorConf.config.suites.test;

//to filter only js file config in protractor.config.idealx
//node config.suites.test
function filter(jsTestFile){
    //nodejs version<12 don't hava function replaceAll
    //let file=jsTestFile.replaceAll("\\","/");
    let file=jsTestFile.replace(/\\/gi,"/");
    file="../"+file.substr(file.indexOf("dist"));
    if(file.indexOf("SamUpgrade")>0)
        return file;
    for (const suiteFileName of testSuite) {
        if(suiteFileName==file)
            return file;
    }
    return null;
}
function recursion(jsPath,json_files) {
    let files=fs.readdirSync(jsPath);
    files.forEach(file=>{       
        if(file.indexOf('.js')>0){          
            let data = fs.readFileSync(path.join(jsPath,file));         
            let allJsonFiles = getAllFetchJsonFiles(data) 
            if(allJsonFiles.length>0) {
                if(!isCaseNeedSamUser(allJsonFiles)) {             
                    let list = json_files[allJsonFiles[0]];
                    if(!list){
                        list = [];
                        json_files[allJsonFiles[0]]=(list);
                    }
                    let jsTestFile=path.join(jsPath,file)
                    let newjsTestFile=filter(jsTestFile)
                    if(newjsTestFile)
                        list.push(newjsTestFile);
                }else{
                    //e.g TW_ICT.test.ts need sam user login, such test case will put to specail test suite
                    let list = json_files["testcase-samuser-involved"];
                    if(!list){
                        list = [];
                        json_files["testcase-samuser-involved"]=(list);
                    }
                    let jsTestFile=path.join(jsPath,file)
                    let newjsTestFile=filter(jsTestFile)
                    if(newjsTestFile)
                        list.push(newjsTestFile);
                }
            }else{
                console.info(file)
            }
        }else{
            //check is directory
            if(fs.statSync(path.join(jsPath,file)).isDirectory()){
                recursion(path.join(jsPath,file),json_files);
            }
        }
    });
}

function isCaseNeedSamUser(allJsonFiles){
    if(allJsonFiles.length>1 && allJsonFiles.includes("SAM_testData.json")){
      return true;
    }
    return false;
}

function getAllFetchJsonFiles(data){
    let reg = /fetchTestData\(['|"](.*)['|"]\)/g;
    let jsonFiles=[];
    while( match = reg.exec(data)) {
        jsonFiles.push(match[1]);
    }
    return jsonFiles;
}

function generate_config(){
    let json_files = {};
    recursion(jsFilePath, json_files);

    protractorConf.config.suites={}
    for (const key in json_files) {
        //console.log(key, json_files[key]);
        protractorConf.config.suites[key] = json_files[key];
    }


    let data = fs.readFileSync(config_tmp_file, { encoding: 'utf8', flag: 'r' });
    //protractorConf.config.suites={};
    let reg = /protractorConf.config.suites = \{\}/g;
    data=data.replace(reg,"protractorConf.config.suites ="+JSON.stringify(protractorConf.config.suites));

    fs.writeFile(config_file,
        data,{
            encoding:"utf8",
            flag:"w",
            mode:0o666
        },(err) => {
            if (err)
                console.log(err);
            else {
                console.log("protractor config file generate successfully");
            }
        });

    // fs.writeFile(config_file,
    //     "exports.config="+JSON.stringify(protractorConf.config),{
    //         encoding:"utf8",
    //         flag:"w",
    //         mode:0o666
    //     },(err) => {
    //     if (err)
    //         console.log(err);
    //     else {
    //         console.log("protractor config file generate successfully");
    //     }
    //  });
    return protractorConf;
}

exports.generate_config = generate_config
exports.config_file=config_file