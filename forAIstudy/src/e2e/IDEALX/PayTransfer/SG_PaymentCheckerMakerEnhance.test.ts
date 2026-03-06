/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages, SwitchToSubsiPages ,ApprovalsPages} from "../../../pages/IDEALX";
import { ensure,  SIT, handlerCase, PROJECT_TYPE, devWatch } from '../../../lib';
import { browser } from 'protractor';
import moment = require('moment');

let reference = "";
let reference1 = "";
let approvalReference = "";

let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let _switchToSubsiPages = new SwitchToSubsiPages();
let testData = _PaymentsPages.fetchTestData('SG_testData_05.json');

describe('SG_Telegraphic Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Standalone Company Create a TT Payment with Maker - create', async function () {
        this.timeout(420000);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.paymentCcy);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.TelegraphicTransfer.country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.TelegraphicTransfer.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testData.TelegraphicTransfer.newPayeeRoutingCode);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TelegraphicTransfer.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TelegraphicTransfer.postalCode);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankIsIntermediary.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankCountry.select(testData.TelegraphicTransfer.intermediaryBankCountry);
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankID.select(testData.TelegraphicTransfer.intermediaryBankID);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await browser.sleep(1000),
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
    });

    it('Standalone Company Create a TT Payment with Maker - check all field', async function () {
        console.log(reference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await checkViewTTPageAllField() 
    });
  
    it('Standalone Company Approve a TT Payment with Checker', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.verifyUserId : testData.TelegraphicTransfer.UAT.verifyUserId, "P@ssword123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await _PaymentsPages.TelegraphicTransferPage.copyButton.isDisabled(),
        ]);
        await _PaymentsPages.TelegraphicTransferPage.approveButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input('123123123');
       //await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.TelegraphicTransferPage.approveButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});
    
describe('SG_RTGS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MEPSPayment.SIT.loginCompanyId : testData.MEPSPayment.UAT.loginCompanyId, SIT ? testData.MEPSPayment.SIT.loginUserId : testData.MEPSPayment.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it('Switch to Subsi Create RTGS Payment with Maker', async function () {
        this.timeout(420000);
        await _FilesPages.uploadFilePage.companyMenu.click();
        await _FilesPages.uploadFilePage.selectCompany.click();
        await _FilesPages.uploadFilePage.searchCompany.input(SIT? "AUTOSG08 Name":"Bank3872");
        await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
        await _switchToSubsiPages.viewSubsiPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
        await _PaymentsPages.MEPSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.MEPSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.MEPSPaymentPage.Country.select(testData.MEPSPayment.Country);
        await _PaymentsPages.MEPSPaymentPage.payeeBankID.select(testData.MEPSPayment.PayeebankID);
        await _PaymentsPages.MEPSPaymentPage.newPayeeAcctNumber.input(testData.MEPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.MEPSPaymentPage.newPayeeName.input(testData.MEPSPayment.newPayeeName);
        await _PaymentsPages.MEPSPaymentPage.newPayeeNickname.input(testData.MEPSPayment.newPayeeNickname);
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.MEPSPayment.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.MEPSPayment.townCity);
        await _PaymentsPages.MEPSPaymentPage.newPayeeAdd1.input(testData.MEPSPayment.newPayeeAdd1);
        await _PaymentsPages.MEPSPaymentPage.newPayeeAdd2.input(testData.MEPSPayment.newPayeeAdd2);
        await _PaymentsPages.MEPSPaymentPage.payeeBankID.select(testData.MEPSPayment.PayeebankID);
        await _PaymentsPages.MEPSPaymentPage.newPayeeAcctNumber.input(testData.MEPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.MEPSPaymentPage.paymentType.jsClick();
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.MEPSPaymentPage.intermediaryBankIsIntermediary.jsClick();
        await _PaymentsPages.MEPSPaymentPage.intermediaryBankCountry.select(testData.MEPSPayment.payeeBankLocation);
        await _PaymentsPages.MEPSPaymentPage.intermediaryBankID.select(testData.MEPSPayment.intermediarySwiftBic);
        await _PaymentsPages.MEPSPaymentPage.paymentDetail.input(testData.MEPSPayment.paymentDetail);
        await _PaymentsPages.MEPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.MEPSPaymentPage.emailIdO.input(testData.MEPSPayment.emailIdO);
        await _PaymentsPages.MEPSPaymentPage.emailId1.input(testData.MEPSPayment.emailId1);
        await _PaymentsPages.MEPSPaymentPage.emailId2.input(testData.MEPSPayment.emailId2);
        await _PaymentsPages.MEPSPaymentPage.emailId3.input(testData.MEPSPayment.emailId3);
        await _PaymentsPages.MEPSPaymentPage.emailId4.input(testData.MEPSPayment.emailId4);
        await _PaymentsPages.MEPSPaymentPage.message.input(testData.MEPSPayment.message);
        await _PaymentsPages.MEPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.MEPSPaymentPage.transactionNote.input(testData.MEPSPayment.transactionNote);
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.MEPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await checkViewRTGSPageAllField(); 
    });

    it('Switch to Subsi Approve a RTGS Payment with Checker', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.MEPSPayment.SIT.loginCompanyId : testData.MEPSPayment.UAT.loginCompanyId, SIT ? testData.MEPSPayment.SIT.verifyUserId : testData.MEPSPayment.UAT.verifyUserId, "P@ssword123");
        await _FilesPages.uploadFilePage.companyMenu.click();
        await _FilesPages.uploadFilePage.selectCompany.click();
        await _FilesPages.uploadFilePage.searchCompany.input(SIT? "AUTOSG08 Name":"Bank3872");
        await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
        await _switchToSubsiPages.viewSubsiPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await _PaymentsPages.MEPSPaymentPage.approveButton.jsClick();
        await _PaymentsPages.MEPSPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.MEPSPaymentPage.challengeResponse.input('OK');
        await _PaymentsPages.MEPSPaymentPage.approveButton.click();
        await _PaymentsPages.MEPSPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.MEPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Switch to Subsi Go to My Approval Page Approve a RTGS Payment', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.MEPSPayment.SIT.loginCompanyId : testData.MEPSPayment.UAT.loginCompanyId, SIT ? testData.MEPSPayment.SIT.verifyUserId1 : testData.MEPSPayment.UAT.verifyUserId1, "P@ssword123");
        await _FilesPages.uploadFilePage.companyMenu.click();
        await _FilesPages.uploadFilePage.selectCompany.click();
        await _FilesPages.uploadFilePage.searchCompany.input(SIT? "AUTOSG08 Name":"Bank3872");
        await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
        await _switchToSubsiPages.viewSubsiPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        if (0 !== approvalReference.trim().length) {
            await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(approvalReference);
        } else {
            await _ApprovalsPages.ApprovalPage.showAddFilter.click();
            await _ApprovalsPages.ApprovalPage.paymentTypeList.select("SG - RTGS Payment");
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.click();
        }
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input("OK");
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
        ]);
    });
});

describe('SG_Bulk Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it('Single view to Create Bulk Payment with Maker', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.newPayee.jsClick();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.BulkPayment.payeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.BulkPayment.newPayeeNickname);
        await _PaymentsPages.BulkPaymentPage.payeeBankID.input(testData.BulkPayment.payeeBankID);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.BulkPayment.accountNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.BulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.BulkPayment.paymentDetails);
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.BulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.BulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.BulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.BulkPayment.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.BulkPayment.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.BulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.showAdditionFilter.click();
        await _PaymentsPages.TransferCentersPage.organisationList.select(SIT? "AUTOSG08 Name":"Bank3872");
        await _PaymentsPages.TransferCentersPage.searchButton.jsClick();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewPageAllField();  
    });

    it('Pay & Transfer Filter by SC to Approve Subsi Bulk Payment with Checker', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.verifyUserId : testData.BulkPayment.UAT.verifyUserId, "P@ssword123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.showAdditionFilter.click();
        await _PaymentsPages.TransferCentersPage.organisationList.select(SIT? "AUTOSG08 Name":"Bank3872");
        await _PaymentsPages.TransferCentersPage.searchButton.jsClick();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.showAdditionFilter.click();
        await _PaymentsPages.TransferCentersPage.organisationList.select(SIT? "AUTOSG08 Name":"Bank3872");
        await _PaymentsPages.TransferCentersPage.searchButton.jsClick();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
    it('Go to My Approval Page Filter by All to Approve Payment', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.verifyUserId1 : testData.BulkPayment.UAT.verifyUserId1, "P@ssword123");
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.showAddFilter.click();
        await _ApprovalsPages.ApprovalPage.organisationList.click();
        await _ApprovalsPages.ApprovalPage.organisationAll.jsClick();
        await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.jsClick();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input("OK");
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.showAdditionFilter.click();
        await _PaymentsPages.TransferCentersPage.organisationList.click();
        await _PaymentsPages.TransferCentersPage.organisationListResult.jsClick();
        await _PaymentsPages.TransferCentersPage.searchButton.jsClick();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
        ]);
    });
});

export async function checkViewTTPageAllField() {
    await Promise.all([
        await browser.sleep(1000),
        await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toNewPayeeAcctNumValue).textIs(testData.TelegraphicTransfer.newPayeeAcctNumber),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toNewPayeeNameValue).textIs(testData.TelegraphicTransfer.newPayeeName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd1Value).textIs(testData.TelegraphicTransfer.newPayeeAdd1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd2Value).textIs(testData.TelegraphicTransfer.newPayeeAdd2),
        //await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd3Value).textIs(testData.TelegraphicTransfer.newPayeeAdd3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).textContains(reference),
       // await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(testData.TelegraphicTransfer.paymentType),
        await _PaymentsPages.TelegraphicTransferPage.scrollTo(0,1000),
        await browser.sleep(2000),
        await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).isNotEmpty(),
        await _PaymentsPages.TelegraphicTransferPage.scrollTo(0,1500),
        await browser.sleep(3000),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(SIT? testData.TelegraphicTransfer.SIT.payeeBankName:testData.TelegraphicTransfer.UAT.payeeBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(testData.TelegraphicTransfer.payeeBankCountryName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textIs(testData.TelegraphicTransfer.payeeBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankName).textIs(SIT? testData.TelegraphicTransfer.SIT.intermediaryBankName:testData.TelegraphicTransfer.UAT.intermediaryBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankSWIFTBIC).textIs(testData.TelegraphicTransfer.intermediaryBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankAdress1).textContains(testData.TelegraphicTransfer.intermediaryBankCountry),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(testData.TelegraphicTransfer.paymentDetail),
        await _PaymentsPages.TelegraphicTransferPage.scrollTo(0,2000),
        await browser.sleep(2000),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(testData.TelegraphicTransfer.message),
        await ensure(_PaymentsPages.TelegraphicTransferPage.email0).textContains(testData.TelegraphicTransfer.emailIdO),
        await ensure(_PaymentsPages.TelegraphicTransferPage.email1).textContains(testData.TelegraphicTransfer.emailId1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.email2).textContains(testData.TelegraphicTransfer.emailId2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.email3).textContains(testData.TelegraphicTransfer.emailId3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.email4).textContains(testData.TelegraphicTransfer.emailId4),
        await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
        await _PaymentsPages.TelegraphicTransferPage.scrollTo(0,2500),
        await browser.sleep(2000),
        await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(testData.TelegraphicTransfer.bankChargeUs),
        await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageToApproverValue).textContains(testData.TelegraphicTransfer.transactionNote),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(testData.TelegraphicTransfer.messageToOrderingBank),
        await ensure(_PaymentsPages.TelegraphicTransferPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.activityLog).textContains("Create"),
        await _PaymentsPages.TelegraphicTransferPage.approveButton.isDisabled()
    ]);
}

export async function checkViewRTGSPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.amountA1),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSnewPayeeAccountNumberValue).textContains(testData.MEPSPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.MEPSPaymentPage.headerRefValue).textContains(reference),
        await ensure(_PaymentsPages.MEPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.newPayeeNameValue).textContains(testData.MEPSPayment.newPayeeName),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress1Value).textContains(testData.MEPSPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress2Value).textContains(testData.MEPSPayment.newPayeeAdd2),
        // await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress3Value).textContains(testData.MEPSPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentTypeValue).textContains(testData.MEPSPayment.paymentType),
        await _PaymentsPages.TelegraphicTransferPage.scrollTo(0,1000),
        await browser.sleep(1000),
        await ensure(_PaymentsPages.MEPSPaymentPage.sendAmountValue).textContains( testData.MEPSPayment.amountA1),
        await _PaymentsPages.TelegraphicTransferPage.scrollTo(0,1500),
        await browser.sleep(1000),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankName).textContains(testData.MEPSPayment.payeeBankName),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankAdress1).textContains(testData.MEPSPayment.payeeBankAdress),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankSwiftBic).textIs(testData.MEPSPayment.PayeebankID),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankCode).textIs(testData.MEPSPayment.payeeBankCode),
        await ensure(_PaymentsPages.MEPSPaymentPage.IntermediaryBankSWIFTBIC).textIs(testData.MEPSPayment.intermediarySwiftBic),
        await ensure(_PaymentsPages.MEPSPaymentPage.IntermediaryBankName).textIs(testData.MEPSPayment.intermediaryBankName),
        await ensure(_PaymentsPages.MEPSPaymentPage.IntermediaryBankAdress).textContains(SIT? testData.MEPSPayment.SIT.intermediaryBankAdress:testData.MEPSPayment.UAT.intermediaryBankAdress),
        await _PaymentsPages.TelegraphicTransferPage.scrollTo(0,1500),
        await browser.sleep(2000),
        await ensure(_PaymentsPages.MEPSPaymentPage.messageValue).textContains(testData.MEPSPayment.message),
        await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(testData.MEPSPayment.emailIdO),
        await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(testData.MEPSPayment.emailId1),
        await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(testData.MEPSPayment.emailId2),
        await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(testData.MEPSPayment.emailId3),
        await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(testData.MEPSPayment.emailId4),
        await ensure(_PaymentsPages.MEPSPaymentPage.totalDeductValue).textContains(testData.MEPSPayment.amountA1),
        await _PaymentsPages.TelegraphicTransferPage.scrollTo(0,2000),
        await ensure(_PaymentsPages.MEPSPaymentPage.referenceValue).textContains( reference),
        await ensure(_PaymentsPages.MEPSPaymentPage.bankChargeValue).textContains(SIT? testData.MEPSPayment.SIT.bankChargeThey:testData.MEPSPayment.UAT.bankChargeThey),
        await ensure(_PaymentsPages.MEPSPaymentPage.messageToApproverValue).textContains(testData.MEPSPayment.transactionNote),
        await ensure(_PaymentsPages.MEPSPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.activityLog).textContains("Create"),
        await _PaymentsPages.TelegraphicTransferPage.approveButton.isDisabled()
    ]);
}

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(testData.BulkPayment.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(testData.BulkPayment.paymentTypeViewValue),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(testData.BulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentSummaryValue).textContains(testData.BulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.BulkPayment.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains( testData.BulkPayment.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(SIT?testData.BulkPayment.SIT.payeeBankName:testData.BulkPayment.UAT.payeeBankName),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(testData.BulkPayment.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(testData.BulkPayment.payeeBankID),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(testData.BulkPayment.payeeRef),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue).textContains(testData.BulkPayment.purposeCode),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(testData.BulkPayment.paymentDetails),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(testData.BulkPayment.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.emailId1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.emailId4),
        await ensure(_PaymentsPages.BulkPaymentPage.activityLog).textContains("Create"),
        await _PaymentsPages.TelegraphicTransferPage.approveButton.isDisabled()
    ]);
}