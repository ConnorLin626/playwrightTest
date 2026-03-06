/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages, FilesPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = '';
// this from createFromTemplate,then copy
let reference2 = '';
let verifyReference = '';
let fileName: string = null;
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _PaymentsPages.fetchTestData('AU_testData.json');
let approvalReference = "";

describe('AU Cross Border ACH', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CrossBorder.SIT.login.loginCompanyId : testData.CrossBorder.UAT.login.loginCompanyId, SIT ? testData.CrossBorder.SIT.login.loginUserId : testData.CrossBorder.UAT.login.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a Cross Border ACH Payment With a new payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
        await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeTab.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameINTL);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeNickname.input(testData.CrossBorder.payeeNameINTL);
        await _PaymentsPages.CrossBoarderACHPage.payeeAddress1.input("address1");
        await _PaymentsPages.CrossBoarderACHPage.scrollTo(0,900);
        await _PaymentsPages.CrossBoarderACHPage.swiftBICSelect.input(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForBank();
        await _PaymentsPages.CrossBoarderACHPage.payeeBankResult.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
        await _PaymentsPages.CrossBoarderACHPage.addPayeeBtn.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountINTL);
        await _PaymentsPages.CrossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
        await _PaymentsPages.CrossBoarderACHPage.hideOptDetail.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
        await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
        await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL),
            await ensure(_PaymentsPages.CrossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameINTL),
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Copy a Cross Border ACH Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_CBA, testData.status.PendingApproval);
        }
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.CrossBoarderACHPage.copyButton.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForPreviewPage();
        await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
        await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL),
            await ensure(_PaymentsPages.CrossBoarderACHPage.paymentDateView).isNotEmpty(),
            await ensure(_PaymentsPages.CrossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameINTL),
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Edit a Cross Border ACH ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_CBA, testData.status.PendingApproval);
        }
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.CrossBoarderACHPage.editButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.deletePayee.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeTab.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameEdit);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeNickname.input(testData.CrossBorder.payeeNameEdit);
        await _PaymentsPages.CrossBoarderACHPage.payeeAddress1.input("address1");
        await _PaymentsPages.CrossBoarderACHPage.scrollTo(0,900);
        await _PaymentsPages.CrossBoarderACHPage.swiftBICSelect.input(SIT ? testData.CrossBorder.SIT.payeeBankIDEdit : testData.CrossBorder.UAT.payeeBankIDEdit);
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForBank();
        await _PaymentsPages.CrossBoarderACHPage.payeeBankResult.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.accountNumberINTL);
        await _PaymentsPages.CrossBoarderACHPage.addPayeeBtn.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountEdit);
        await _PaymentsPages.CrossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
        await _PaymentsPages.CrossBoarderACHPage.hideOptDetail.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
        await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForPreviewPage();
        await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
        await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountEdit),
            await ensure(_PaymentsPages.CrossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameEdit),
        ]);
    });

    it('Reject a Cross Border ACH ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_CBA, testData.status.PendingApproval);
        }
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.CrossBoarderACHPage.rejectButton.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.reasonForRejection.input(testData.CrossBorder.rejectReason);
        await _PaymentsPages.CrossBoarderACHPage.rejectDialogButton.click();
        await _PaymentsPages.CrossBoarderACHPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.transactionStatusReject).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete a Cross Border ACH ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_CBA, testData.status.PendingApproval);
        }
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.CrossBoarderACHPage.deleteButton.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.deleteDialogButton.click();
        await _PaymentsPages.CrossBoarderACHPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textContains(testData.CrossBorder.labelNoInformationDisplay);
    });

    it('Create with Approva Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
        await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeTab.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameINTL);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeNickname.input(testData.CrossBorder.payeeNameINTL);
        await _PaymentsPages.CrossBoarderACHPage.payeeAddress1.input("address1");
        await _PaymentsPages.CrossBoarderACHPage.scrollTo(0,900);
        await _PaymentsPages.CrossBoarderACHPage.swiftBICSelect.input(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForBank();
        await _PaymentsPages.CrossBoarderACHPage.payeeBankResult.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
        await _PaymentsPages.CrossBoarderACHPage.addPayeeBtn.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountINTL);
        await _PaymentsPages.CrossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
        await _PaymentsPages.CrossBoarderACHPage.hideOptDetail.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
        await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.CrossBoarderACHPage.challengeResponse.input("34234");
        await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
        //await _PaymentsPages.CrossBoarderACHPage.dismissButton.click();
        await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL),
            await ensure(_PaymentsPages.CrossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameINTL),
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.Approved)
        ]);
    });

    it('Create with Approva Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
        await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeTab.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameINTL);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeNickname.input(testData.CrossBorder.payeeNameINTL);
        await _PaymentsPages.CrossBoarderACHPage.payeeAddress1.input("address1");
        await _PaymentsPages.CrossBoarderACHPage.scrollTo(0,900);
        await _PaymentsPages.CrossBoarderACHPage.swiftBICSelect.input(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForBank();
        await _PaymentsPages.CrossBoarderACHPage.payeeBankResult.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
        await _PaymentsPages.CrossBoarderACHPage.addPayeeBtn.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountA2IX);
        await _PaymentsPages.CrossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
        await _PaymentsPages.CrossBoarderACHPage.hideOptDetail.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
        await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.CrossBoarderACHPage.challengeResponse.input("34234");
        await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
        await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountA2),
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.Approved)
        ]);
    });

    //Comment this case for AB-7387 CR and CBACH is not support template anymore
    // it('Create with Save as Template', async function () {
    // 	await _PaymentsPages.openMenu(Menu.Payments.CrossBoarderACH);
    // 	await _PaymentsPages.CrossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
    // 	await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
    // 	await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
    // 	await _PaymentsPages.CrossBoarderACHPage.newPayeeTab.click();
    // 	tempNewPayeeName = testData.CrossBorder.payeeNameINTL + generatedID();
    // 	await _PaymentsPages.CrossBoarderACHPage.newPayeeName.input(tempNewPayeeName);
    // 	await _PaymentsPages.CrossBoarderACHPage.swiftBICSelect.select(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
    // 	await _PaymentsPages.CrossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
    // 	await _PaymentsPages.CrossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
    // 	await _PaymentsPages.CrossBoarderACHPage.addPayeeBtn.click();
    // 	await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountINTL);
    // 	await _PaymentsPages.CrossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
    // 	await _PaymentsPages.CrossBoarderACHPage.hideOptDetail.jsClick();
    // 	await _PaymentsPages.CrossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
    // 	await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
    // 	await _PaymentsPages.CrossBoarderACHPage.saveAsTemplateCheckbox.jsClick();
    // 	TemplateName = 'CBA' + generatedID();
    // 	await _PaymentsPages.CrossBoarderACHPage.templateName.input(TemplateName);
    // 	await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
    // 	await _PaymentsPages.CrossBoarderACHPage.loadConditionForSubmittedPage();
    // 	await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
    // 		templateRef = text;
    // 	});
    // 	await _PaymentsPages.CrossBoarderACHPage.finishedButton.click();
    // 	await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(templateRef);
    // 	await _PaymentsPages.CrossBoarderACHPage.loadConditionForViewPaymentPage();

    // 	await Promise.all([
    // 		//Check the Transaction under Transfer Center>View Page
    // 		await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
    // 		await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL)
    // 	]);
    // });

    it('Save Bulk ACH successfully As Draft', async function () {
        let paymentReference02 = '';
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
        await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeTab.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameINTL);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeNickname.input(testData.CrossBorder.payeeNameINTL);
        await _PaymentsPages.CrossBoarderACHPage.payeeAddress1.input("address1");
        await _PaymentsPages.CrossBoarderACHPage.scrollTo(0,900);
        await _PaymentsPages.CrossBoarderACHPage.swiftBICSelect.input(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForBank();
        await _PaymentsPages.CrossBoarderACHPage.payeeBankResult.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
        await _PaymentsPages.CrossBoarderACHPage.addPayeeBtn.click();
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountINTL);
        await _PaymentsPages.CrossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
        await _PaymentsPages.CrossBoarderACHPage.hideOptDetail.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
        await _PaymentsPages.CrossBoarderACHPage.saveAsDraft.click();
        await _PaymentsPages.CrossBoarderACHPage.getDialogReferenceID().then(text => {
            paymentReference02 = text;
            //  console.error(paymentReference02);
        });
        await _PaymentsPages.CrossBoarderACHPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference02);
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL),
            await ensure(_PaymentsPages.CrossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameINTL),
        ]);
    });
    it('Upload a Cross Border ACH Payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.CrossBorder.SIT.fileService.fileName : testData.CrossBorder.UAT.fileService.fileName, testData.BulkPayment.approvalOptionByTxn).then(
            (data) => {
                fileName = data;
            }
        );
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).isNotEmpty(),
        ]);
    });

    it('Create a Cross Border ACH Payment For Verify and Release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
        await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeTab.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameINTL);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeNickname.input(testData.CrossBorder.payeeNameINTL);
        await _PaymentsPages.CrossBoarderACHPage.payeeAddress1.input("address1");
        await _PaymentsPages.CrossBoarderACHPage.scrollTo(0,700);
        await _PaymentsPages.CrossBoarderACHPage.swiftBICSelect.input(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForBank();
        await _PaymentsPages.CrossBoarderACHPage.payeeBankResult.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
        await _PaymentsPages.CrossBoarderACHPage.addPayeeBtn.click();
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(SIT ? testData.CrossBorder.SIT.amountVerifyIX : testData.CrossBorder.UAT.amountVerifyIX);
        await _PaymentsPages.CrossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
        await _PaymentsPages.CrossBoarderACHPage.hideOptDetail.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
        await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });
});
describe('Verify And Release A Cross Border ACH', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.CrossBorder.SIT.login.loginCompanyId : testData.CrossBorder.UAT.login.loginCompanyId, SIT ? testData.CrossBorder.SIT.login.verifyUserId : testData.CrossBorder.UAT.login.verifyUserId, "P@ssword123");
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a Cross Border ACH via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, testData.paymentType.AU_CBA).then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
         await _PaymentsPages.CrossBoarderACHPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Approve a Cross Border ACH via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("Cross Border ACH", testData.status.PendingApproval);
        }
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await _PaymentsPages.CrossBoarderACHPage.approveButton.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.CrossBoarderACHPage.challengeResponse.input(testData.CrossBorder.responseCode);
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.CrossBoarderACHPage.approveButton.click();
        await _PaymentsPages.CrossBoarderACHPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.CrossBoarderACHPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Release a Cross Border ACH via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_CBA).then(reference => {
            approvalReference = reference;
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
});
