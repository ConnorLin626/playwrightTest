/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { FilesPages, NavigatePages, PaymentsPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser, ExpectedConditions } from "protractor";

let reference = "";
let templateName = "FASTBulkT" + generatedID();
let fileName = "";
let verifyFileName = "";

const _PaymentsPages = new PaymentsPages();
const _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
const testData = _PaymentsPages.fetchTestData('SG_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/SG_uploadTestData.json');

export async function commonPre() {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
    await _PaymentsPages.BulkPaymentPage.loadCondition();
    await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.FastBulkPayment.SIT.fromAccount02 : testData.FastBulkPayment.UAT.fromAccount02);
}

export async function commonAfter() {
    await _PaymentsPages.BulkPaymentPage.nextButton.click();
    await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentPage.submitButton.click();
    await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
        reference = text;
    });
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
}

export async function addExistingPayee(name: string, amount: string, payeeRef: string) {
    await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(name);
    await _PaymentsPages.BulkPaymentPage.addButton.click();
    await _PaymentsPages.BulkPaymentPage.amount.input(amount);
    await _PaymentsPages.BulkPaymentPage.payeeRef.input(payeeRef);
}

export async function addNewPayNow() {
    await _PaymentsPages.BulkPaymentPage.newPayNow.click();
    await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.BulkPaymentPage.proxyTypeMobNum.input(testData.FastBulkPayment.proxyTypeMobNum);
    await _PaymentsPages.BulkPaymentPage.newPaynowNickname.input(testData.FastBulkPayment.newPayeeNickname);
    await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(_PaymentsPages.BulkPaymentPage.amount.element), _PaymentsPages.BulkPaymentPage.amount.getTimeOut());
    await _PaymentsPages.BulkPaymentPage.amount.input(testData.FastBulkPayment.amountA1);
    await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.FastBulkPayment.payeeRef);
}

export async function addNewPayee() {
    await _PaymentsPages.BulkPaymentPage.newPayee.click();
    await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.FastBulkPayment.payeeName);
    await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.FastBulkPayment.newPayeeNickname);
    await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT ? testData.FastBulkPayment.SIT.payeeBankID : testData.FastBulkPayment.UAT.payeeBankID);
    await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
    await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.FastBulkPayment.accountNumber);
    await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
    await _PaymentsPages.BulkPaymentPage.amount.input(testData.FastBulkPayment.amountA1);
    await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.FastBulkPayment.payeeRef);
    await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
    await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.FastBulkPayment.paymentDetails);
    await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.FastBulkPayment.emailIdO);
    await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.FastBulkPayment.emailId1);
    await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.FastBulkPayment.emailId2);
    await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.FastBulkPayment.emailId3);
    await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.FastBulkPayment.emailId4);
    await _PaymentsPages.BulkPaymentPage.message.input(testData.FastBulkPayment.message);
}

describe('SG_FAST_Bulk Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FastBulkPayment.SIT.loginCompanyId02 : testData.FastBulkPayment.UAT.loginCompanyId02, SIT ? testData.FastBulkPayment.SIT.loginUserId02 : testData.FastBulkPayment.UAT.loginUserId02, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create FAST Bulk Payment with New Payee', async function () {
        await commonPre();
        await addNewPayee();
        await _PaymentsPages.BulkPaymentPage.todayDayButton.jsClick();
        await commonAfter();
        await checkViewFastBulkPageAllField(false);//Add for IDXP-812
    });

    it('Approve FAST Bulk Payment with New Payee', async function () {
        await _PaymentsPages.BulkPaymentPage.approveButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved),
        ]);
    });

    it('Create FAST Bulk Payment with Existing Normal Payee(multi) and ticked Save as Template', async function () {
        await commonPre();
        await addExistingPayee(SIT ? testData.FastBulkPayment.SIT.existingPayeeA2 : testData.FastBulkPayment.UAT.existingPayeeA2, testData.FastBulkPayment.amountA2, testData.FastBulkPayment.payeeRef);
        await addExistingPayee(SIT ? testData.FastBulkPayment.SIT.existingPayeeA1 : testData.FastBulkPayment.UAT.existingPayeeA1, testData.FastBulkPayment.amountA1, testData.FastBulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.todayDayButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.saveAsTemplateCheckbox.jsClick();
        await _PaymentsPages.BulkPaymentPage.templateName.input(templateName);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        // template
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateName).textIs(templateName),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateFromAccount).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount02 : testData.FastBulkPayment.UAT.fromAccount02)
        ]);

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount02 : testData.FastBulkPayment.UAT.fromAccount02),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.FastBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(testData.FastBulkPayment.amountA2),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(SIT ? testData.FastBulkPayment.SIT.existingPayeeA1 : testData.FastBulkPayment.UAT.existingPayeeA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(SIT ? testData.FastBulkPayment.SIT.existingPayeeA2 : testData.FastBulkPayment.UAT.existingPayeeA2),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Edit FAST Bulk Payment with Existing Normal Payee', async function () {
        await _PaymentsPages.BulkPaymentPage.editButton.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.FastBulkPayment.editAmountA2);
        await commonAfter();
        await checkViewFastBulkPageAllField(true);//Add for IDXP-812
    });

    it('Create FAST Bulk Payment from Template and ticked Approve Now', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClick();
        await ensure(_PaymentsPages.BulkPaymentPage.getChallengeSMS).isVisible();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.FastBulkPayment.EnterResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved)
        ]);
    });

    it('Create FAST Bulk Payment with New PayNow(Mobile Number)', async function () {
        await commonPre();
        await addNewPayNow();
        await _PaymentsPages.BulkPaymentPage.todayDayButton.jsClick();
        await commonAfter();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount02 : testData.FastBulkPayment.UAT.fromAccount02),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.FastBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payNowMobNum).textContains(testData.FastBulkPayment.proxyTypeMobNum),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Copy FAST Bulk Payment with New PayNow(Mobile Number) and Save as Draft', async function () {
        await _PaymentsPages.BulkPaymentPage.copyButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.saveAsDraft.jsClick();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.jsClick();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount02 : testData.FastBulkPayment.UAT.fromAccount02),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.FastBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payNowMobNum).textContains(testData.FastBulkPayment.proxyTypeMobNum),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });

    it('Create FAST Bulk Payment with existing PayNow Payee(Company identifier)', async function () {
        await commonPre();
        await addExistingPayee(SIT ? testData.FastBulkPayment.SIT.existingPayNowA1 : testData.FastBulkPayment.UAT.existingPayNowA1, testData.FastBulkPayment.amountA1, testData.FastBulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.todayDayButton.jsClick();
        await commonAfter();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount02 : testData.FastBulkPayment.UAT.fromAccount02),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.FastBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Reject FAST Bulk Payment with existing PayNow Payee(Company identifier)', async function () {
        await _PaymentsPages.BulkPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.reasonForRejection.input(testData.FastBulkPayment.reasonForRejection);
        await _PaymentsPages.BulkPaymentPage.rejectDialogButton.jsClick();
        await browser.sleep(5000);
        await _PaymentsPages.BulkPaymentPage.dismissButton.jsClick();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await browser.sleep(500);
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Rejected)
        ]);
    });

    it('File Upload FAST Bulk Payment with normal payee - By File', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.FastBulkPayment.SIT.loginCompanyId : testData.FastBulkPayment.UAT.loginCompanyId, SIT ? testData.FastBulkPayment.SIT.loginUserId : testData.FastBulkPayment.UAT.loginUserId, "P@ssword123");
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.FastBulkPayment.SIT.fileNameForBPP : testData.FastBulkPayment.UAT.fileNameForBPP, testData.FastBulkPayment.approvalCurrency).then(async data => {
            fileName = data;
        });

        await _FilesPages.uploadFilePage.loadCondition();
        await _FilesPages.uploadFilePage.ShowAdditionalFilters.click();
        await _FilesPages.uploadFilePage.scrollTo(0, 500);
        await _FilesPages.uploadFilePage.searchButton.click();
        await _FilesPages.uploadFilePage.fileNameFilter.input(fileName);
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewBPPage();

        await checkViewPageAllField(); //IDXP-812
    });


    it('Delete FAST Bulk Payment with normal payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _FilesPages.TransferCentersPage.loadCondition();
        await _FilesPages.TransferCentersPage.transferCenterFilter.input(fileName);
        await _FilesPages.TransferCentersPage.transferCenterSelectButton.jsClick();
        await _FilesPages.TransferCentersPage.transactionDeleteButton.jsClick();
        await _FilesPages.TransferCentersPage.dialogDeleteButton.jsClick();
        await ensure(_FilesPages.TransferCentersPage).isUXRejectDialogSuccess();
        await _FilesPages.TransferCentersPage.dismissButton.click();
    });

    it('Can not create Fast Bulk Payment with item amount greater than 200000 SGD', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.FastBulkPayment.payeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.BulkPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.FastBulkPayment.newPayeeNickname);
        };
        await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT ? testData.FastBulkPayment.SIT.payeeBankID : testData.FastBulkPayment.UAT.payeeBankID);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.FastBulkPayment.accountNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.FastBulkPayment.greaterMaxAmountIX);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.FastBulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.FastBulkPayment.paymentDetails);
        await ensure(_PaymentsPages.BulkPaymentPage.fastTypeButton).hasClassName("disabled");
    });

    it('Create Fast Bulk Payment with item amount enqual to 200000 SGD', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.FastBulkPayment.SIT.loginCompanyId02 : testData.FastBulkPayment.UAT.loginCompanyId02, SIT ? testData.FastBulkPayment.SIT.loginUserId02 : testData.FastBulkPayment.UAT.loginUserId02, "P@ssword123");
        await commonPre();
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.FastBulkPayment.payeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.BulkPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.FastBulkPayment.newPayeeNickname);
        };
        await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT ? testData.FastBulkPayment.SIT.payeeBankID : testData.FastBulkPayment.UAT.payeeBankID);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.FastBulkPayment.accountNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.FastBulkPayment.maxAmountIX);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.FastBulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.FastBulkPayment.paymentDetails);
        await commonAfter();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount02 : testData.FastBulkPayment.UAT.fromAccount02),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.FastBulkPayment.maxAmount),
        ]);
    });

    it('Create Fast Bulk Payment with Total amount greater than 200000 SGD', async function () {
        await commonPre();
        await addExistingPayee(SIT ? testData.FastBulkPayment.SIT.existingPayeeA2 : testData.FastBulkPayment.UAT.existingPayeeA2, testData.FastBulkPayment.maxAmountIX, testData.FastBulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.FastBulkPayment.payeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.BulkPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.FastBulkPayment.newPayeeNickname);
        };
        await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT ? testData.FastBulkPayment.SIT.payeeBankID : testData.FastBulkPayment.UAT.payeeBankID);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.FastBulkPayment.accountNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.FastBulkPayment.maxAmountIX);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.FastBulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.FastBulkPayment.paymentDetails);
        await commonAfter();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount02 : testData.FastBulkPayment.UAT.fromAccount02),
        ]);
    });

    it('File Upload FAST Bulk Payment with paynow payee - By Transaction', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.FastBulkPayment.SIT.loginCompanyId : testData.FastBulkPayment.UAT.loginCompanyId, SIT ? testData.FastBulkPayment.SIT.loginUserId : testData.FastBulkPayment.UAT.loginUserId, "P@ssword123");
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.FastBulkPayment.SIT.fileNameForBPF : testData.FastBulkPayment.UAT.fileNameForBPF, "By transaction amount").then(async data => {
            verifyFileName = data;
        });
        await _FilesPages.uploadFilePage.loadCondition();
        await _FilesPages.uploadFilePage.ShowAdditionalFilters.click();
        await _FilesPages.uploadFilePage.scrollTo(0, 500);
        await _FilesPages.uploadFilePage.searchButton.click();
        await _FilesPages.uploadFilePage.fileNameFilter.input(verifyFileName);
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewBPPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForBP).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValueForBP).isNotEmpty(),
        ]);
    });

});

describe('SG_FAST_Bulk Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FastBulkPayment.SIT.loginCompanyId : testData.FastBulkPayment.UAT.loginCompanyId, SIT ? testData.FastBulkPayment.SIT.verifyUserId : testData.FastBulkPayment.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify FAST Bulk Payment with normal payee via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerify();
        await _ApprovalsPages.MyVerificationAndReleasePage.byTxnFilter.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.byTxnFilter.input(verifyFileName);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyReleasePreBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _FilesPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyFileName);
        await _FilesPages.uploadFilePage.loadConditionForViewBPPage();


        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve FAST Bulk Payment with normal payee via My Approvals', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _FilesPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyFileName);
        await _FilesPages.uploadFilePage.loadConditionForViewBPPage();
        await _FilesPages.AccountTransferPage.approveButton.jsClick();
        await _FilesPages.AccountTransferPage.getChallengeSMS.clickIfExist();
        await _FilesPages.AccountTransferPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
        await _FilesPages.AccountTransferPage.approveButton.jsClick();
        await _FilesPages.AccountTransferPage.dismissButton.click();
        await _FilesPages.AccountTransferPage.paymentMenu.click();
        await _FilesPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyFileName);
        await _FilesPages.uploadFilePage.loadConditionForViewBPPage();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release FAST Bulk Payment with normal payee via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForMyRelease();
        await _ApprovalsPages.MyVerificationAndReleasePage.byTxnFilter.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.byTxnFilter.input(verifyFileName);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.MyVerificationAndReleasePage.txnReleaseBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyReleasePreBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.finishButton.click();
        await _FilesPages.AccountTransferPage.paymentMenu.click();
        await _FilesPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyFileName);
        await _FilesPages.uploadFilePage.loadConditionForViewBPPage();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(uploadTestData.fastBulkPayment.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.fastBulkPayment.paymentTypeView),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.fastBulkPayment.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),

        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.fastBulkPayment.payeeName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(uploadTestData.fastBulkPayment.payeeBankName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.fastBulkPayment.payeeBankId1),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.fastBulkPayment.accountNumber1),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.fastBulkPayment.amount1),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue).textContains(uploadTestData.fastBulkPayment.purposeCode1),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.fastBulkPayment.refForPayee1),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.fastBulkPayment.paymentDetails1),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.fastBulkPayment.msgToPayee1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.fastBulkPayment.emailId10),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.fastBulkPayment.emailId11),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.fastBulkPayment.emailId12),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.fastBulkPayment.emailId13),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.fastBulkPayment.emailId14),

       //Payee 2
       await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(uploadTestData.fastBulkPayment.payeeName2),
       await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName2).textContains(uploadTestData.fastBulkPayment.payeeBankName2),
       await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic2).textContains(uploadTestData.fastBulkPayment.payeeBankId2),
       await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(uploadTestData.fastBulkPayment.accountNumber2),
       await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(uploadTestData.fastBulkPayment.amount2),
       await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue2).textContains(uploadTestData.fastBulkPayment.purposeCode2),
       await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(uploadTestData.fastBulkPayment.refForPayee2),
       await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
       await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue2).textContains(uploadTestData.fastBulkPayment.paymentDetails2),
       await ensure(_PaymentsPages.BulkPaymentPage.messageValue2).textContains(uploadTestData.fastBulkPayment.msgToPayee2),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.fastBulkPayment.emailId20),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.fastBulkPayment.emailId21),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.fastBulkPayment.emailId22),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.fastBulkPayment.emailId23),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.fastBulkPayment.emailId24)
    ]);
}

export async function checkViewFastBulkPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount02 : testData.FastBulkPayment.UAT.fromAccount02),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(isEdit ? testData.FastBulkPayment.editAmountA2 : testData.FastBulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(isEdit ? testData.FastBulkPayment.accountNumberEdit1 : testData.FastBulkPayment.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),   
        //Add all field
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        // await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(testData.FastBulkPayment.paymentType),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(isEdit ? testData.FastBulkPayment.deductAmount : testData.FastBulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentSummaryValue).textContains(isEdit ? testData.FastBulkPayment.deductAmount : testData.FastBulkPayment.amountA1),
        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(isEdit ? testData.FastBulkPayment.payeeNameEdit1 : testData.FastBulkPayment.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(isEdit ? testData.FastBulkPayment.payeeNameEdit1 : testData.FastBulkPayment.newPayeeNickname),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(isEdit ? testData.FastBulkPayment.payeeBankNameEdit : testData.FastBulkPayment.payeeBankName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(isEdit ? testData.FastBulkPayment.payeeBankSwiftBic : testData.FastBulkPayment.SIT.payeeBankID),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue).textContains(testData.FastBulkPayment.purposeCode),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(testData.FastBulkPayment.payeeRef),
    ]);
    if(!isEdit){
        await Promise.all([
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(testData.FastBulkPayment.paymentDetails),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(testData.FastBulkPayment.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.FastBulkPayment.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.FastBulkPayment.emailId1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.FastBulkPayment.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.FastBulkPayment.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.FastBulkPayment.emailId4)
    ]);
    }   
    if(isEdit){
        await Promise.all([
         await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(SIT ? testData.FastBulkPayment.SIT.existingPayeeA2 : testData.FastBulkPayment.UAT.existingPayeeA2),
         await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue2).textContains(SIT ? testData.FastBulkPayment.SIT.existingPayeeA2 : testData.FastBulkPayment.UAT.existingPayeeA2),
         await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName2).textContains(testData.FastBulkPayment.payeeBankNameEdit),
         await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(testData.FastBulkPayment.payeeBankSwiftBic),
         await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains( testData.FastBulkPayment.accountNumberEdit2),
         await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue2).textContains(testData.status.PendingApproval), 
         await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(testData.FastBulkPayment.amountA2),  
         await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue2).textContains(testData.FastBulkPayment.purposeCode),
         await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(testData.FastBulkPayment.payeeRef),
         
         await ensure(_PaymentsPages.BulkPaymentPage.nextApprover).isNotEmpty(),
         await ensure(_PaymentsPages.BulkPaymentPage.activityLog).isNotEmpty()
        ]);
    }
}