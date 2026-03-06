/**
 * this file to keep project path for common use
 */
const path = require("path");
const config_file = path.join(__dirname, '../../config/protractor.config.new.js');
const config_tmp_file = path.join(__dirname, '../../config/protractor.config.tmp.js');
const jsFilePath = path.join(__dirname, '../../dist/e2e');
const tsFilePath = path.join(__dirname, '../e2e'); // typescript file path 
const testHistoryPath = path.join(__dirname, '../../test.history');
const csvFiles = [path.join(testHistoryPath, '/history.IDEALX.V2.csv'),
    path.join(testHistoryPath, '/history.SU.V2.csv'),
    path.join(testHistoryPath, '/history.CB.V2.csv')];
const idealxReportJsonFile=path.join(__dirname, '../../test.results/Result-IDEALX.json');
const idealx_JDK8ReportJsonFile=path.join(__dirname, '../../test.results/Result-IDEALX-jdk8.json');
const protractorConf = require("../../config/protractor.config.idealx");
const protractorcmd = path.join(__dirname,"../../node_modules/.bin/protractor");
module.exports={config_file,config_tmp_file,jsFilePath,tsFilePath,csvFiles,
    testHistoryPath,idealxReportJsonFile,idealx_JDK8ReportJsonFile,protractorConf,protractorcmd}
