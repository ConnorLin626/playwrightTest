/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser} from 'protractor';

let reference = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('VN_testData.json');
let _FilesPages = new FilesPages();
let fileName = "";
let paymentType = "";
let approvalOption = "";

describe('VN_Custom Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CustomPayment.SIT.loginCompanyId : testData.CustomPayment.UAT.loginCompanyId, SIT ? testData.CustomPayment.SIT.loginUserId : testData.CustomPayment.UAT.loginUserId, "12323"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Custom Tax Payment with Enter decision ID and year to add tax record and Approve now', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CustomPaymentPage.customMenu.click();
        await _PaymentsPages.CustomPaymentPage.loadCondition();
        await _PaymentsPages.CustomPaymentPage.fromAccount.select(SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount);
        //await _PaymentsPages.CustomPaymentPage.taxCode.select(SIT ? testData.CustomPayment.SIT.taxCode : testData.CustomPayment.UAT.taxCode);
        await _PaymentsPages.CustomPaymentPage.EnterID.input(SIT ? testData.CustomPayment.SIT.EnterID : testData.CustomPayment.UAT.EnterID)
        await _PaymentsPages.CustomPaymentPage.AddNewTaxButn.click();
        await _PaymentsPages.CustomPaymentPage.nextButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.CustomPaymentPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.CustomPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.CustomPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.CustomPaymentPage.challengeResponse.input(testData.CustomPayment.challengeResponse);
        await _PaymentsPages.CustomPaymentPage.submitButton.click();
        await _PaymentsPages.CustomPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CustomPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.CustomPaymentPage.fromAccountView).textContains(SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount),
            // await ensure(_PaymentsPages.CustomPaymentPage.ContractRef).isNotEmpty,
            await ensure(_PaymentsPages.CustomPaymentPage.ViewStatus).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Create eCustom Tax Payment with multi tax', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CustomPaymentPage.customMenu.click();
        await _PaymentsPages.CustomPaymentPage.loadCondition();
        await _PaymentsPages.CustomPaymentPage.fromAccount.select(SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount);
        await _PaymentsPages.CustomPaymentPage.AddCustomTax1.jsClick();
        await _PaymentsPages.CustomPaymentPage.AddCustomTax2.jsClick();
        // add for R8.10 IEBAA-1576 remove limitation of 5 taxes to pay
        await _PaymentsPages.CustomPaymentPage.AddCustomTax3.jsClick();
        await _PaymentsPages.CustomPaymentPage.AddCustomTax4.jsClick();
        await _PaymentsPages.CustomPaymentPage.AddCustomTax5.jsClick();
        await _PaymentsPages.CustomPaymentPage.AddCustomTax6.jsClick();
        await _PaymentsPages.CustomPaymentPage.ContractBtn.jsClick();
        await _PaymentsPages.CustomPaymentPage.nextButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.CustomPaymentPage.submitButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CustomPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.CustomPaymentPage.fromAccountView).textContains(SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount),
            //await ensure(_PaymentsPages.CustomPaymentPage.ContractRef).isNotEmpty,
            await ensure(_PaymentsPages.CustomPaymentPage.ViewStatus).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve Custom Tax Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.VN_Custom, testData.status.PendingApproval);
        }
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.CustomPaymentPage.approveButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.CustomPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.CustomPaymentPage.challengeResponse.input(testData.CustomPayment.challengeResponse);
        await _PaymentsPages.CustomPaymentPage.approveButton.click();
        await _PaymentsPages.CustomPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.CustomPaymentPage.getDialogReferenceID().then((text) => {
            reference = text;
        });
        await _PaymentsPages.CustomPaymentPage.dismissButton.jsClick();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.CustomPaymentPage.ViewStatus).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Reject eCustom Tax Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CustomPaymentPage.customMenu.click();
        await _PaymentsPages.CustomPaymentPage.loadCondition();
        await _PaymentsPages.CustomPaymentPage.fromAccount.select(SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount);
        await _PaymentsPages.CustomPaymentPage.AddCustomTax1.jsClick();
        await _PaymentsPages.CustomPaymentPage.nextButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.CustomPaymentPage.submitButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CustomPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.CustomPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.CustomPaymentPage.reasonForRejection.input(testData.CustomPayment.rejectReason);
        await _PaymentsPages.CustomPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.CustomPaymentPage.dismissButton.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.CustomPaymentPage.ViewStatus).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete eCustom Tax Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.VN_Custom, testData.status.PendingApproval);
        }
        await _PaymentsPages.CustomPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.CustomPaymentPage.deleteButton.click();
        await _PaymentsPages.CustomPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.CustomPaymentPage.getDialogReferenceID().then((text) => {
            reference = text;
        });
        await _PaymentsPages.CustomPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.CustomPayment.labelNoInformationDisplay);
    });

    it('File Services upload eCustom Tax Payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "Customs Payment File";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.CustomPayment.SIT.fileName : testData.files.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.loadCondition();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.CustomPaymentPage.FromAccount).textContains(SIT ? testData.CustomPayment.SIT.fromAccount : testData.CustomPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.CustomPaymentPage.FileViewStatus).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });
});