/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { ensure, SIT, handlerCase, generatedID } from '../../../lib';
import * as moment from 'moment';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('SG_testData.json');
let testData1 = _FilesPages.fetchTestData('HK_testData.json');
let testData2 = _FilesPages.fetchTestData('IN_testData.json');
let testData3 = _FilesPages.fetchTestData('TW_testData.json');

let currentDate = moment(new Date()).format('DD MMM YYYY');

describe('Create new download file ', async function () {
    this.retries(browser.params.caseRetryTimes);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create new download file with UFF format organisation select subsi', async function () {
        await new NavigatePages().loginCB(SIT ? testData.downloadFile.SIT.loginCompanyId : testData.downloadFile.UAT.loginCompanyId, SIT ? testData.downloadFile.SIT.loginUserId : testData.downloadFile.UAT.loginUserId);
        await _FilesPages.openMenu(Menu.Files.DownloadFileNew);
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.creDownloadFileBtn.click();
        let fileName = 'downloadAll' + generatedID();
        await _FilesPages.downloadFilePage.fileName.input(fileName);
        await _FilesPages.downloadFilePage.orgSelect.select(SIT ? testData.downloadFile.SIT.organisation : testData.downloadFile.UAT.organisation)
        await _FilesPages.downloadFilePage.paymentType.select(testData.downloadFile.paymentType);
        await _FilesPages.downloadFilePage.account.jsClick();
        await _FilesPages.downloadFilePage.searchInput.input(
            SIT ? testData.downloadFile.SIT.fromAccount : testData.downloadFile.UAT.fromAccount
        );
        await _FilesPages.downloadFilePage.selectAll.jsClick();
        await _FilesPages.downloadFilePage.accountItem.jsClick();
        await browser.sleep(4000); // wait page refresh
        await _FilesPages.downloadFilePage.startAbsoluteDate.select(testData.downloadFile.fromDate);
        await _FilesPages.downloadFilePage.endAbsoluteDate.select(currentDate);
        await _FilesPages.downloadFilePage.loadConditionForDownloadFile();
        await _FilesPages.downloadFilePage.nextBtn.click();
        await _FilesPages.downloadFilePage.dismissBtn.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.refershButton.click();
        await Promise.all([
            await ensure(_FilesPages.downloadFilePage.fileLink).textContains(fileName),
        ]);
    });

    it('Create new download file with AutoPay format', async function () {
        await new NavigatePages().loginCB(SIT ? testData1.downloadFile.SIT.loginCompanyId : testData1.downloadFile.UAT.loginCompanyId, SIT ? testData1.downloadFile.SIT.loginUserId : testData1.downloadFile.UAT.loginUserId);
        await _FilesPages.openMenu(Menu.Files.DownloadFileNew);
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.creDownloadFileBtn.click();
        let fileName = 'downloadAutoPay' + generatedID();
        await _FilesPages.downloadFilePage.fileName.input(fileName);
        await _FilesPages.downloadFilePage.paymentType.select(testData1.downloadFile.paymentType);
        await _FilesPages.downloadFilePage.account.jsClick();
        await _FilesPages.downloadFilePage.searchInput.input(
            SIT ? testData.downloadFile.SIT.fromAccount2 : testData.downloadFile.UAT.fromAccount2
        );
        await _FilesPages.downloadFilePage.selectAll.jsClick();
        await _FilesPages.downloadFilePage.accountItem.jsClick();
        await browser.sleep(4000); // wait page refresh
        await _FilesPages.downloadFilePage.startAbsoluteDate.select(testData1.downloadFile.fromDate);
        await _FilesPages.downloadFilePage.endAbsoluteDate.select(currentDate);
        await _FilesPages.downloadFilePage.uploadFileName.input(testData1.downloadFile.uploadFileName)
        await _FilesPages.downloadFilePage.loadConditionForDownloadFile();
        await _FilesPages.downloadFilePage.nextBtn.click();
        await _FilesPages.downloadFilePage.dismissBtn.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.refershButton.click();
        await Promise.all([
            await ensure(_FilesPages.downloadFilePage.fileLink).textContains(fileName),
        ]);
    });

    it('Create new download file with NEFT format', async function () {
        await new NavigatePages().loginCB(SIT ? testData2.downloadFile.SIT.loginCompanyId : testData2.downloadFile.UAT.loginCompanyId, SIT ? testData2.downloadFile.SIT.loginUserId : testData2.downloadFile.UAT.loginUserId);
        await _FilesPages.openMenu(Menu.Files.DownloadFileNew);
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.creDownloadFileBtn.click();
        let fileName = 'downloadNEFT' + generatedID();
        await _FilesPages.downloadFilePage.fileName.input(fileName);
        await _FilesPages.downloadFilePage.paymentType.select(SIT ? testData2.downloadFile.SIT.PaymentType : testData2.downloadFile.UAT.PaymentType);
        await browser.sleep(4000); // wait page refresh
        await _FilesPages.downloadFilePage.startAbsoluteDate.select(testData2.downloadFile.fromDate);
        await _FilesPages.downloadFilePage.endAbsoluteDate.select(currentDate);
        await _FilesPages.downloadFilePage.custRef.input(SIT ? testData2.downloadFile.SIT.custRef : testData2.downloadFile.UAT.custRef)
        await _FilesPages.downloadFilePage.loadConditionForDownloadFile();
        await _FilesPages.downloadFilePage.nextBtn.click();
        await _FilesPages.downloadFilePage.dismissBtn.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.refershButton.click();
        await Promise.all([
            await ensure(_FilesPages.downloadFilePage.fileLink).textContains(fileName),
        ]);
        // await ensure(_FilesPages.downloadFilePage.doneButton).isElementPresent();
    });

    it('Create new download file with FISC format', async function () {
        await new NavigatePages().loginCB(SIT ? testData3.downloadFile.SIT.loginCompanyId : testData3.downloadFile.UAT.loginCompanyId, SIT ? testData3.downloadFile.SIT.loginUserId : testData3.downloadFile.UAT.loginUserId);
        await _FilesPages.openMenu(Menu.Files.DownloadFileNew);
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.creDownloadFileBtn.click();
        let fileName = 'downloadFISC' + generatedID();
        await _FilesPages.downloadFilePage.fileName.input(fileName);
        await _FilesPages.downloadFilePage.paymentType.select(testData3.downloadFile.paymentType);
        await browser.sleep(4000); // wait page refresh
        await _FilesPages.downloadFilePage.startAbsoluteDate.select(testData3.downloadFile.fromDate);
        await _FilesPages.downloadFilePage.endAbsoluteDate.select(currentDate);
        await _FilesPages.downloadFilePage.loadConditionForDownloadFile();
        await _FilesPages.downloadFilePage.nextBtn.click();
        await _FilesPages.downloadFilePage.dismissBtn.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.refershButton.click();
        await Promise.all([
            await ensure(_FilesPages.downloadFilePage.fileLink).textContains(fileName),
        ]);
        // await ensure(_FilesPages.downloadFilePage.doneButton).isElementPresent();
    });
});

