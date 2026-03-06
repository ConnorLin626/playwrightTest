/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, SwitchToSubsiPages, FilesPages, PaymentsPages,ApprovalsPages} from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE,generatedID } from '../../../lib';
import { browser } from 'protractor';

let _switchToSubsiPages = new SwitchToSubsiPages();
let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _switchToSubsiPages.fetchTestData('SG_testData_01.json');
//for create payroll template
let TemplateName1 = "";
//for create payroll DBS template
let TemplateName2 = "";
let reference = '';
let reference2 = '';
let referenceApprove = "";
let referenceApprove2 = "";

describe('Switch To Subsi via Old Approval', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.swicthToSubsi.SIT.loginCompanyId : testData.swicthToSubsi.UAT.loginCompanyId, SIT ? testData.swicthToSubsi.SIT.loginUserId : testData.swicthToSubsi.UAT.loginUserId, "123133"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    //add for AB-14723
    it('Create a TT that from USD to MYR', async function () {
        
        await _FilesPages.uploadFilePage.companyMenu.click();
        await _FilesPages.uploadFilePage.selectCompany.click();
        await _FilesPages.uploadFilePage.searchCompany.input(SIT ? "NCS_KORS9" : "NCS_KORS9");
        await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
        await _switchToSubsiPages.viewSubsiPage.loadCondition();
        //  create a TT
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _switchToSubsiPages.accountTransferPage.loadCondition();
        await _switchToSubsiPages.accountTransferPage.fromAccount.select(SIT ? testData.swicthToSubsi.SIT.fromAccount : testData.swicthToSubsi.UAT.fromAccount);
        await _switchToSubsiPages.TelegraphicTransferPage.currency.select(testData.swicthToSubsi.myrPaymentCcy);
        await _switchToSubsiPages.TelegraphicTransferPage.amount.input(testData.swicthToSubsi.amount);
        //await _switchToSubsiPages.TelegraphicTransferPage.loadCondition();
        await _switchToSubsiPages.TelegraphicTransferPage.existingPayee.select(testData.swicthToSubsi.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
        await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.swicthToSubsi.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.selectFirstResult.click();
        await _switchToSubsiPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _switchToSubsiPages.TelegraphicTransferPage.paymentDetail.input(testData.swicthToSubsi.paymentDetail);
        await _switchToSubsiPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _switchToSubsiPages.TelegraphicTransferPage.emailIdO.input(testData.swicthToSubsi.emailIdO);
        await _switchToSubsiPages.TelegraphicTransferPage.emailId1.input(testData.swicthToSubsi.emailId1);
        await _switchToSubsiPages.TelegraphicTransferPage.message.input(testData.swicthToSubsi.message);
        await _switchToSubsiPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _switchToSubsiPages.TelegraphicTransferPage.transactionNote.input(testData.swicthToSubsi.transactionNote);
        await _switchToSubsiPages.TelegraphicTransferPage.nextButton.click();
        await _switchToSubsiPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _switchToSubsiPages.TelegraphicTransferPage.submitButton.click();
        await _switchToSubsiPages.TelegraphicTransferPage.continueBtn.click();
        await _switchToSubsiPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _switchToSubsiPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _switchToSubsiPages.TelegraphicTransferPage.finishedButton.click();
        //go to transfer center
        await _switchToSubsiPages.accountTransferPage.paymentMenu.click();
        await _switchToSubsiPages.transferCentersPage.transferCenterFilter.input(reference);
        //await _switchToSubsiPages.transferCentersPage.showAdditionFilter.jsClick();
        //await _switchToSubsiPages.accountTransferPage.scrollTo(0, 500);
        //await _switchToSubsiPages.transferCentersPage.organisationList.select("");
        //await _switchToSubsiPages.transferCentersPage.paymentTypeList.select("SG - Account Transfer");
        //await _switchToSubsiPages.transferCentersPage.searchButton.jsClick();
        await _switchToSubsiPages.transferCentersPage.refLink.jsClick();
        await _switchToSubsiPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_switchToSubsiPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.swicthToSubsi.SIT.fromAccount : testData.swicthToSubsi.UAT.fromAccount),
            await ensure(_switchToSubsiPages.TelegraphicTransferPage.amountValue).textContains(testData.swicthToSubsi.amount),
            await ensure(_switchToSubsiPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.swicthToSubsi.existingPayee),
            await ensure(_switchToSubsiPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        ]);
    });
    //add for AB-14723
    it('Approve TT Payment via My Approval', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            referenceApprove = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.swicthToSubsi.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.swicthToSubsi.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _switchToSubsiPages.TelegraphicTransferPage.continueBtn.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(referenceApprove);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
            ]);
        });
    // add for AB-14713
    it('Create a Payroll template', async function () {
        //from account support Payroll and Payroll DBS but payee only suppport Non_DBS Giro payment
               
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createBulkTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        TemplateName1 = "SubsiPayroll" + generatedID();
        await console.log(TemplateName1);
        await _switchToSubsiPages.PaymentTemplatesPage.templateName.input(TemplateName1);
        await _switchToSubsiPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.swicthToSubsi.SIT.fromAccount2 : testData.swicthToSubsi.UAT.fromAccount2);
        await _switchToSubsiPages.PaymentTemplatesPage.maxAmount.input(testData.swicthToSubsi.amountVIX);
        await addExistingPayee(testData.swicthToSubsi.PayrollExistingPayee, testData.swicthToSubsi.amount);
        await _switchToSubsiPages.PaymentTemplatesPage.nextButton.click();
        await _switchToSubsiPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _switchToSubsiPages.PaymentTemplatesPage.submitButton.click();
        await _switchToSubsiPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _switchToSubsiPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _switchToSubsiPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName1);
        await _switchToSubsiPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_switchToSubsiPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.swicthToSubsi.amount),
            await ensure(_switchToSubsiPages.PaymentTemplatesPage.ViewPaymentType).textContains(testData.swicthToSubsi.PaymentType1),
                ]);
    });
    // add for AB-14713
    it('Create a Payroll DBS template', async function () {
        //from account support "Payroll and Payroll DBS" both payment type and payee suppport DBS Giro payment
        
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createBulkTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        TemplateName2 = "SubsiPayrollDBS" + generatedID();
        await console.log(TemplateName2);
        await _switchToSubsiPages.PaymentTemplatesPage.templateName.input(TemplateName2);
        await _switchToSubsiPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.swicthToSubsi.SIT.fromAccount2 : testData.swicthToSubsi.UAT.fromAccount2);
        await _switchToSubsiPages.PaymentTemplatesPage.maxAmount.input(testData.swicthToSubsi.amountVIX);
        await addExistingPayee(testData.swicthToSubsi.PayrollDBSExistingPayee, testData.swicthToSubsi.amount);
        await _switchToSubsiPages.PaymentTemplatesPage.nextButton.click();
        await _switchToSubsiPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _switchToSubsiPages.PaymentTemplatesPage.submitButton.click();
        await _switchToSubsiPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _switchToSubsiPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _switchToSubsiPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName2);
        await _switchToSubsiPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_switchToSubsiPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.swicthToSubsi.amount),
            await ensure(_switchToSubsiPages.PaymentTemplatesPage.ViewPaymentType).textContains(testData.swicthToSubsi.PaymentType2),
                ]);
    });

});

//add for AB-14723 HC company - my approval = new ui
describe('Switch To Subsi via New Approval', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.swicthToSubsiNewApproval.SIT.loginCompanyId : testData.swicthToSubsiNewApproval.UAT.loginCompanyId, SIT ? testData.swicthToSubsiNewApproval.SIT.loginUserId : testData.swicthToSubsiNewApproval.UAT.loginUserId, "123133"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a TT that from USD to MYR', async function () {
        
        await _FilesPages.uploadFilePage.companyMenu.click();
        await _FilesPages.uploadFilePage.selectCompany.click();
        await _FilesPages.uploadFilePage.searchCompany.input(SIT ? "202509051100Name" : "202509051100Name");
        await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
        await _switchToSubsiPages.viewSubsiPage.loadCondition();
        //  create a TT
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _switchToSubsiPages.accountTransferPage.loadCondition();
        await _switchToSubsiPages.accountTransferPage.fromAccount.select(SIT ? testData.swicthToSubsiNewApproval.SIT.fromAccount : testData.swicthToSubsiNewApproval.UAT.fromAccount);
        await _switchToSubsiPages.TelegraphicTransferPage.currency.select(testData.swicthToSubsiNewApproval.myrPaymentCcy);
        await _switchToSubsiPages.TelegraphicTransferPage.amount.input(testData.swicthToSubsiNewApproval.amount);
        await _switchToSubsiPages.TelegraphicTransferPage.loadCondition();
        await _switchToSubsiPages.TelegraphicTransferPage.existingPayee.select(testData.swicthToSubsiNewApproval.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
        await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.swicthToSubsiNewApproval.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.selectFirstResult.click();
        await _switchToSubsiPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _switchToSubsiPages.TelegraphicTransferPage.paymentDetail.input(testData.swicthToSubsiNewApproval.paymentDetail);
        await _switchToSubsiPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _switchToSubsiPages.TelegraphicTransferPage.emailIdO.input(testData.swicthToSubsiNewApproval.emailIdO);
        await _switchToSubsiPages.TelegraphicTransferPage.emailId1.input(testData.swicthToSubsiNewApproval.emailId1);
        await _switchToSubsiPages.TelegraphicTransferPage.message.input(testData.swicthToSubsiNewApproval.message);
        await _switchToSubsiPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _switchToSubsiPages.TelegraphicTransferPage.transactionNote.input(testData.swicthToSubsiNewApproval.transactionNote);
        await _switchToSubsiPages.TelegraphicTransferPage.nextButton.click();
        await _switchToSubsiPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _switchToSubsiPages.TelegraphicTransferPage.submitButton.click();
        await _switchToSubsiPages.TelegraphicTransferPage.continueBtn.click();
        await _switchToSubsiPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _switchToSubsiPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _switchToSubsiPages.TelegraphicTransferPage.finishedButton.click();
        //go to transfer center
        await _switchToSubsiPages.accountTransferPage.paymentMenu.click();
        await _switchToSubsiPages.transferCentersPage.transferCenterFilter.input(reference2);
        await _switchToSubsiPages.transferCentersPage.refLink.jsClick();
        await _switchToSubsiPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_switchToSubsiPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.swicthToSubsiNewApproval.SIT.fromAccount : testData.swicthToSubsiNewApproval.UAT.fromAccount),
            await ensure(_switchToSubsiPages.TelegraphicTransferPage.amountValue).textContains(testData.swicthToSubsiNewApproval.amount),
            await ensure(_switchToSubsiPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.swicthToSubsiNewApproval.existingPayee),
            await ensure(_switchToSubsiPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        ]);
    });
    
    it('Approve TT Payment via My Approval', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForNewByTx();
        await _ApprovalsPages.ApprovalPage.byFileFilter.clean();
        await _ApprovalsPages.ApprovalPage.byFileFilter.input(reference2);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            referenceApprove2 = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.ReviewApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.ReviewPageApproveBtn.jsClick();
        await _switchToSubsiPages.TelegraphicTransferPage.continueBtn.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(referenceApprove2);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
            ]);
        });
   

});




export async function addExistingPayee(name: string, amount: string) {
    await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(name);
    await _PaymentsPages.BulkPaymentPage.addButton.jsClick();
    await _PaymentsPages.BulkPaymentPage.amount.input(amount);
}


