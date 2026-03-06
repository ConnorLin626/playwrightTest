/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { ensure, SIT, handlerCase, generatedID } from '../../../lib';
import { browser, promise } from 'protractor';
import { getOutPutFile } from './cbcfx/LoadPpcUtils';

const CB_1 = require("../../../pages/CB");
const lib_1 = require("../../../lib");

let reference = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('VN_testData.json');
let _FilesPages = new FilesPages();
let fileName = "";
let paymentType = "";
let approvalOption = "";

describe('VN_Custom Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.CustomPayment.SIT.loginCompanyId : testData.CustomPayment.UAT.loginCompanyId, SIT ? testData.CustomPayment.SIT.loginUserId : testData.CustomPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Custom Tax Payment with Enter decision ID and year to add tax record and Approve now', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.VNCustomPayment);
        await _PaymentsPages.CustomPaymentPage.loadCondition();
        await _PaymentsPages.CustomPaymentPage.fromAccount.select(SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount);
        await _PaymentsPages.CustomPaymentPage.taxCode.select(SIT ? testData.CustomPayment.SIT.taxCode : testData.CustomPayment.UAT.taxCode);
        await _PaymentsPages.CustomPaymentPage.EnterID.input(SIT ? testData.CustomPayment.SIT.EnterID : testData.CustomPayment.UAT.EnterID)
        await _PaymentsPages.CustomPaymentPage.AddNewTaxButn.click();
        await _PaymentsPages.CustomPaymentPage.nextButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.CustomPaymentPage.approveNowCheckBox.jsClickIfExist();
        await _PaymentsPages.CustomPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.CustomPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.CustomPaymentPage.challengeResponse.input(testData.CustomPayment.challengeResponse);
        await _PaymentsPages.CustomPaymentPage.submitButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CustomPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.CustomPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.CustomPaymentPage.fromAccountView).textContains(SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.CustomPaymentPage.ContractRef).isNotEmpty,
            await ensure(_PaymentsPages.CustomPaymentPage.ViewStatus).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Create eCustom Tax Payment with multi tax', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.VNCustomPayment);
        await _PaymentsPages.CustomPaymentPage.loadCondition();
        await _PaymentsPages.CustomPaymentPage.fromAccount.select(SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount);
        await _PaymentsPages.CustomPaymentPage.AddCustomTax1.jsClick();
        await _PaymentsPages.CustomPaymentPage.AddCustomTax2.jsClick();
        await _PaymentsPages.CustomPaymentPage.ContractBtn.jsClick();
        await _PaymentsPages.CustomPaymentPage.nextButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.CustomPaymentPage.submitButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CustomPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.CustomPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.CustomPaymentPage.fromAccountView).textContains(SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.CustomPaymentPage.ContractRef).isNotEmpty,
            await ensure(_PaymentsPages.CustomPaymentPage.ViewStatus).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve Custom Tax Payment', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.VN_Custom, testData.status.PendingApproval);
        }
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.CustomPaymentPage.approveButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.CustomPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.CustomPaymentPage.challengeResponse.input(testData.CustomPayment.challengeResponse);
        await _PaymentsPages.CustomPaymentPage.approveButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.CustomPaymentPage.getDialogReferenceID().then((text) => {
            reference = text;
        });
        await _PaymentsPages.CustomPaymentPage.dismissButton.jsClick();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.CustomPaymentPage.ViewStatus).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Reject eCustom Tax Payment', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.VNCustomPayment);
        await _PaymentsPages.CustomPaymentPage.loadCondition();
        await _PaymentsPages.CustomPaymentPage.fromAccount.select(SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount);
        await _PaymentsPages.CustomPaymentPage.AddCustomTax1.jsClick();
        await _PaymentsPages.CustomPaymentPage.nextButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.CustomPaymentPage.submitButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CustomPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.CustomPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.CustomPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.reasonForRejection.input(testData.CustomPayment.rejectReason);
        await _PaymentsPages.CustomPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.CustomPaymentPage.dismissButton.click();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.CustomPaymentPage.ViewStatus).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete eCustom Tax Payment', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.VN_Custom, testData.status.PendingApproval);
        }
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.CustomPaymentPage.deleteButton.click();
        await _PaymentsPages.CustomPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.CustomPaymentPage.getDialogReferenceID().then((text) => {
            reference = text;
        });
        await _PaymentsPages.CustomPaymentPage.dismissButton.click();
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
        await lib_1.ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs(testData.CustomPayment.labelNoInformationDisplay);
    });

    it('File Services upload eCustom Tax Payment', async function () {
        paymentType = "Customs Payment - Customs Payment File";
        await _FilesPages.filemanagement_UploadFile.fsUpload2(_FilesPages, paymentType, lib_1.SIT ? testData.CustomPayment.SIT.fileName : testData.files.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.ViewFilePage.Filter.input(fileName);
        await _FilesPages.ViewFilePage.ShowAdditionalFilters.jsClick();
        await _FilesPages.ViewFilePage.search.jsClick();
        await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.filemanagement_UploadFile.Showtransactions.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.CustomPaymentPage.FromAccount).textContains(lib_1.SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.CustomPaymentPage.FileViewStatus).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });


});