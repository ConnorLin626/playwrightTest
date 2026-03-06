/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import * as moment from 'moment';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('SG_testData.json');
let fileName = '';

export async function uploadProfilesForBulk(tempName: string) {
    let currentData = moment(new Date()).format('DD-MMM-YYYY');
    await _FilesPages.openMenu(Menu.Files.UploadProfiles);
    await _FilesPages.uploadProfilePage.loadCondition();
    await _FilesPages.uploadProfilePage.action.select('Execute');
    // await _FilesPages.uploadProfilePage.fileName.select(SIT ? testData.PaymentImport.SIT.fileName : testData.PaymentImport.UAT.fileName);
    await _FilesPages.uploadProfilePage.fileName.select(tempName).then((data) => {
        let pos: number = data.lastIndexOf('/');
        fileName = data.substr(pos + 1);
    });
    await _FilesPages.uploadProfilePage.paymentDate.input(currentData);
    await _FilesPages.uploadProfilePage.uploadFileButton.jsClick();
    await _FilesPages.uploadProfilePage.loadConditionforUploadListPage();
    await _FilesPages.openMenu(Menu.Payments.TransferCenter);
    await _FilesPages.transferCentersPage.loadCondition();
    await _FilesPages.transferCentersPage.showAdditionFilter.jsClick();
    await _FilesPages.transferCentersPage.fileNameFileter.input(fileName);
    await _FilesPages.transferCentersPage.searchButton.jsClick();
    await _FilesPages.transferCentersPage.loadCondition();
    await _FilesPages.transferCentersPage.referenceLink.jsClick();
    await _FilesPages.uploadProfilePage.loadConditionforViewPaymentPage();

    await Promise.all([
        await ensure(_FilesPages.uploadProfilePage.bpyFromAccountValue).isNotEmpty(),
        await ensure(_FilesPages.uploadProfilePage.bpyAmountValue).isNotEmpty(),
    ]);
}

describe('Upload Profile', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.PaymentImport.SIT.loginCompanyId : testData.PaymentImport.UAT.loginCompanyId, SIT ? testData.PaymentImport.SIT.loginUserId : testData.PaymentImport.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Upload transactions via Upload Profile', async function () {
        await uploadProfilesForBulk(SIT ? testData.PaymentImport.SIT.fileName : testData.PaymentImport.UAT.fileName);
    });

    it('Approval transaction created via PaymentImport', async function () {
        await _FilesPages.openMenu(Menu.Payments.TransferCenter);
        await _FilesPages.transferCentersPage.loadCondition();
        await _FilesPages.transferCentersPage.showAdditionFilter.jsClick();
        await _FilesPages.transferCentersPage.fileNameFileter.input(fileName);
        await _FilesPages.transferCentersPage.searchButton.jsClick();
        await _FilesPages.transferCentersPage.loadCondition();
        await _FilesPages.transferCentersPage.referenceLink.jsClick();
        await _FilesPages.uploadProfilePage.loadConditionforViewPaymentPage();
        await _FilesPages.uploadProfilePage.approvalButton.jsClick();
        await _FilesPages.uploadProfilePage.getChallengeSMS.clickIfExist();
        await _FilesPages.transferCentersPage.loadConditionforApprovalSection();
        await _FilesPages.uploadProfilePage.challengeResponse.input('123123123');
        await _FilesPages.uploadProfilePage.approvalButton.jsClick();
        await ensure(_FilesPages.uploadProfilePage).isUXRejectDialogSuccess();
        await _FilesPages.uploadProfilePage.dismissButton.jsClick();
        await _FilesPages.openMenu(Menu.Payments.TransferCenter);
        await _FilesPages.transferCentersPage.loadCondition();
        await _FilesPages.transferCentersPage.showAdditionFilter.jsClick();
        await _FilesPages.transferCentersPage.fileNameFileter.input(fileName);
        await _FilesPages.transferCentersPage.searchButton.jsClick();
        await _FilesPages.transferCentersPage.loadCondition();
        await _FilesPages.transferCentersPage.referenceLink.jsClick();
        await _FilesPages.uploadProfilePage.loadConditionforViewPaymentPage();

        await Promise.all([
            await ensure(_FilesPages.uploadProfilePage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Approved, testData.status.Received),
        ]);
    });

    // it('File Transfer Upload FAST Bulk Payment with normal payee', async function () {
    //     await uploadProfilesForBulk(SIT ? testData.PaymentImport.SIT.fileNameForBPP : testData.PaymentImport.UAT.fileNameForBPP);
    // });

    // it('File Transfer Upload FAST Bulk Payment with PayNow payee', async function () {
    //     await uploadProfilesForBulk(SIT ? testData.PaymentImport.SIT.fileNameForBPF : testData.PaymentImport.UAT.fileNameForBPF);
    // });
});