/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { findAll, find, getBasePath } from '../../../../lib/utils'
import { OptionSelect } from '../../../../lib';
import * as moment from "moment";

const fs = require('fs');
const crypto = require('crypto');
const switch_flag = '\r\n';

export class LoadPpcCriteria {
    public purposeCode: OptionSelect;
    public subPurposeCode: OptionSelect;
    public ppcXpathHead: string = '//multi-level-dropdown[@formcontrolname="purposeCode"]/div/div[2]';
    public subPpcXpathHead: string = '//multi-level-dropdown[@formcontrolname="subPurposeCode"]/div/div[2]';
    public outPutFilePath: string;
    public targetPpcFilePath: string;
}

export async function load1stPPC(criteria: LoadPpcCriteria) {
    //click purpose code select box
    await criteria.purposeCode.click();
    //find all ppc in 1st level
    let first = findAll(criteria.ppcXpathHead + '/div');
    let firstSize = 0;
    await first.count().then(async (listSize) => {
        firstSize = listSize;
    });

    for (let i = 1; i <= firstSize; i++) {
        let _element = find(criteria.ppcXpathHead + '/div[' + i + ']');
        await _element.getText().then(async (text) => {
            log(criteria.outPutFilePath, text + switch_flag);
        });
        //click ppc in 1st level,show 2nd level
        await _element.click();
        //load 2nd level
        await load2ndPPC(criteria, i);
    }
}

export async function load2ndPPC(criteria: LoadPpcCriteria, firstLevel: number) {
    //find all ppc in 2nd level
    let second = findAll(criteria.ppcXpathHead + '/div[position()>1]');
    let secondSize = 0;
    await second.count().then(async (listSize) => {
        secondSize = listSize;
    });
    for (let i = 1; i <= secondSize;) {
        let _element = find(criteria.ppcXpathHead + '/div[' + ++i + ']/span');
        await _element.getText().then(async (text) => {
            log(criteria.outPutFilePath, '\t' + text + switch_flag);
        });
        //click ppc in 2nd level,show 3rd level
        await _element.click();
        await loadSubPPC(criteria);
        //click purpose code
        await criteria.purposeCode.click();
        ////click first Level purpose code to show second level ppc
        let firstLevelElement = find(criteria.ppcXpathHead + '/div[' + firstLevel + ']');
        await firstLevelElement.click();
    }
    //click purpose code select box
    await criteria.purposeCode.click();
}

export async function loadSubPPC(criteria: LoadPpcCriteria) {
    //click sub ppc select box
    let isSubPpcDisplayed = false;
    await criteria.subPurposeCode.isDisplayed().then(async (isDisplayed) => {
        isSubPpcDisplayed = isDisplayed;
    });
    if (isSubPpcDisplayed) {
        await criteria.subPurposeCode.click();
        //find all ppc in third level
        let third = findAll(criteria.subPpcXpathHead + '/div');
        let thirdLength = 0;
        await third.count().then(async (listSize) => {
            thirdLength = listSize;
        });
        for (let i = 1; i <= thirdLength; i++) {
            let _element = find(criteria.subPpcXpathHead + '/div[' + i + ']');
            await _element.getText().then(async (text) => {
                log(criteria.outPutFilePath, '\t\t' + text + switch_flag);
            });
            //click a ppc in third level
            await _element.click();
            //find all ppc in fourth level
            let fourth = findAll(criteria.subPpcXpathHead + '/div[position()>1]/span');
            let fourthLength = 0;
            await fourth.count().then(async (listSize) => {
                fourthLength = listSize;
            });
            //load all ppc in fourth level
            await findAll(criteria.subPpcXpathHead + '/div[position()>1]/span').each(async (_element2) => {
                await _element2.getText().then(async (text) => {
                    log(criteria.outPutFilePath, '\t\t\t' + text + switch_flag);
                });
            });
            if (fourthLength == 0) {
                //if has not fourth level, click sub ppc select box
                await criteria.subPurposeCode.click();
            } else {
                //if has fourth level, click back
                await find(criteria.subPpcXpathHead + '/div[1]/a').click();
            }
        }
    }
}

export function log(logFile: string, msg: String) {
    // let fs = require('fs');
    fs.appendFileSync(logFile, msg, function (err, fd) {
        if (err) {
            return console.error(err);
        }
    });
}

export function deleteFile(filePath: string) {
    // let fs = require('fs');
    // fs.existsSync(fileName, function(exists){
    //     if(exists) {
    //         fs.unlinkSync(fileName);
    //         console.error('delete file:' + fileName);
    //     }
    // });
    if (fs.existsSync(filePath)) {
        console.error('Delete File:' + filePath);
        fs.unlinkSync(filePath);
    }
}

export function getOutPutFolder(folderName: string) {
    let folderPath = getBasePath() + '/src/e2e/CB/Payments/cbcfx/' + folderName + '/';
    if (!fs.existsSync(folderPath)) {
        console.error('Create Folder:' + folderPath);
        fs.mkdirSync(folderPath);
    }
    return folderPath;
}

export function getOutPutFile(folderName: string, fileName: string) {
    return getOutPutFolder(folderName) + fileName + '.lst';
}

export function hasSameContent(targetFile: string, generatedFile: string): boolean {
    const targetMD5 = getMD5(targetFile);
    const generatedMD5 = getMD5(generatedFile);
    console.error(targetFile + ' MD5:' + targetMD5);
    console.error(generatedFile + ' MD5:' + generatedMD5);
    if (targetMD5 === generatedMD5) {
        return true;
    } else {
        return false;
    }
}

export function getMD5(file: string): string {
    const fsHash = crypto.createHash('md5');
    const data = fs.readFileSync(file, 'utf-8');
    return fsHash.update(data).digest('hex');
}

export function DuringOfficeHour(beginTime: string, endTime: string) {
    const curTime = new Date();
    const beginTimes = beginTime.split(':');
    const endTimes = endTime.split(':');
    let cutoffTimeBegin = new Date();
    let cutoffTimeEnd = new Date();
    cutoffTimeBegin.setHours(parseInt(beginTimes[0]));
    cutoffTimeBegin.setMinutes(parseInt(beginTimes[1]));
    cutoffTimeEnd.setHours(parseInt(endTimes[0]));
    cutoffTimeEnd.setMinutes(parseInt(endTimes[1]));
    if (curTime.getTime() > cutoffTimeBegin.getTime() && curTime.getTime() < cutoffTimeEnd.getTime()) {
        return true;
    } else {
        return false;
    }
}