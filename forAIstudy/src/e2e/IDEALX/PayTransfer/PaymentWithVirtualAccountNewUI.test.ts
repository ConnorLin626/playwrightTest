/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ReportsPages,AlertsPages} from "../../../pages/IDEALX";
import { ensure, generatedID, SIT,handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser,  } from "protractor";

let templateName = '';
let ttReference = "";
let fastReference = "";
let reference = "";
let reportName = "";
let _PaymentsPages = new PaymentsPages();
let _AccountReportsListPage = new ReportsPages();
let _alertPagesListPage = new AlertsPages();
let _createAlertPage = _alertPagesListPage.createManageAlertPage;
let testData = _PaymentsPages.fetchTestData('SG_testData_04.json');

describe('SG Payment with Virtual Account', async function () { 
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskinForVA.SIT.loginCompanyId : testData.singlePaymentReskinForVA.UAT.loginCompanyId, SIT ? testData.singlePaymentReskinForVA.SIT.loginUserId : testData.singlePaymentReskinForVA.UAT.loginUserId, testData.singlePaymentReskinForVA.UAT.pinId1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create SG TT with from accout is VA account(New UI)', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.virtualAccounts.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskinForVA.SIT.fromVirtualAccount : testData.singlePaymentReskinForVA.UAT.fromVirtualAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskinForVA.ttExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();    
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskinForVA.amount);
        await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.chargeAccounts.click();
        await _PaymentsPages.singlePaymentPage.chargeAcctInput.input(SIT ? testData.singlePaymentReskinForVA.SIT.fromAccount : testData.singlePaymentReskinForVA.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.singlePaymentReskinForVA.messageToOrderingBank);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskinForVA.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.singlePaymentReskinForVA.val);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskinForVA.paymentDetails);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();    
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskinForVA.SIT.fromVirtualAccount : testData.singlePaymentReskinForVA.UAT.fromVirtualAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskinForVA.ttExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskinForVA.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]);        
    });

    it('Edit SG Fast Payment with from accout is VA account(New UI)', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.virtualAccounts.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskinForVA.SIT.fromVirtualAccount : testData.singlePaymentReskinForVA.UAT.fromVirtualAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.singlePaymentReskinForVA.sgdCcy);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskinForVA.fastExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();    
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskinForVA.amount);
        await _PaymentsPages.FastPaymentPage.purposeCodeReskin.click();
        await _PaymentsPages.FastPaymentPage.filterRppc.input(testData.singlePaymentReskinForVA.purposeCode);
        await _PaymentsPages.FastPaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskinForVA.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.singlePaymentReskinForVA.val);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskinForVA.paymentDetails);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();    
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            fastReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fastReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage(); 
        await _PaymentsPages.singlePaymentPage.editBtn.click();  
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.loadConditionForDomesticSectionPage();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskinForVA.editAmount);
        await _PaymentsPages.singlePaymentPage.loadConditionForFX();
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();    
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            fastReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fastReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage(); 
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskinForVA.SIT.fromVirtualAccount : testData.singlePaymentReskinForVA.UAT.fromVirtualAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskinForVA.fastExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskinForVA.editAmount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]); 
    });

    it('Approval SG Fast Payment with from accout is VA account(New UI)', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== fastReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fastReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - FAST Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        // await _PaymentsPages.singlePaymentPage.getChallengeBtn.jsClickIfExist();
        // await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        // await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        await browser.sleep(5000);
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fastReference);
        await Promise.all([
           await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Completed)
        ]);         
    });

    it('Create SG RTGS Payment template with from accout is VA account', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await browser.sleep(5000); //wait for load UAT Template list page
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateButton.click()
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName = 'RTGSName' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.singlePaymentReskinForVA.SIT.fromVirtualAccount : testData.singlePaymentReskinForVA.UAT.fromVirtualAccount);
        await _PaymentsPages.PaymentTemplatesPage.currencySelect.select(testData.singlePaymentReskinForVA.sgdCcy);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.singlePaymentReskinForVA.amount);
        await _PaymentsPages.PaymentTemplatesPage.payeeSelect.select(testData.singlePaymentReskinForVA.rtgsExistingPayee);
        await _PaymentsPages.PaymentTemplatesPage.bankCharges.jsClickIfExist();
        await _PaymentsPages.PaymentTemplatesPage.chargeAccounts.select(SIT ? testData.singlePaymentReskinForVA.SIT.fromAccount : testData.singlePaymentReskinForVA.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForReviewPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccount).textContains(SIT ? testData.singlePaymentReskinForVA.SIT.fromVirtualAccount : testData.singlePaymentReskinForVA.UAT.fromVirtualAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.beneficiary).textContains(testData.singlePaymentReskinForVA.rtgsExistingPayee),
            await ensure(_PaymentsPages.PaymentTemplatesPage.amount).textContains(testData.singlePaymentReskinForVA.amount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateStatus).textContainsLessOne(testData.status.Approved,testData.status.PendingApproval)
        ]);  
    });
});

//Below Add for R8.17 IDXP-1089 Segregation is enalbed
describe('Company enable Segregation check Virtual Account', async function () { 
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskinForVA.SIT.loginCompanyId : testData.singlePaymentReskinForVA.UAT.loginCompanyId, SIT ? testData.singlePaymentReskinForVA.SIT.loginUserNonVA : testData.singlePaymentReskinForVA.UAT.loginUserNonVA, testData.singlePaymentReskinForVA.UAT.pinId1);  });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    // User has Account statement - view but does not have Virtual Account statement - view access
    it('User without VA access check can Create Payment with CASA account', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.virtualAccounts).isNotElementPresent()//check will not display VA account tab
        ]); 
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskinForVA.SIT.fromAccount : testData.singlePaymentReskinForVA.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.actExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.singlePaymentReskin.val);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
              reference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskinForVA.SIT.fromAccount : testData.singlePaymentReskinForVA.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.actExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]);
        
    });

    // User has not Account statement - view but has Virtual Account statement - view access
    it('Create report with VA account', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskinForVA.SIT.loginCompanyId : testData.singlePaymentReskinForVA.UAT.loginCompanyId, SIT ? testData.singlePaymentReskinForVA.SIT.loginUserVA : testData.singlePaymentReskinForVA.UAT.loginUserVA, testData.singlePaymentReskinForVA.UAT.pinId1);
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.tranSumDetCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName='TranSumDetReportName'+generatedID();
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.singlePaymentReskinForVA.SIT.fromVirtualAccount : testData.singlePaymentReskinForVA.UAT.fromVirtualAccount1);
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.relativeDates.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.singlePaymentReskinForVA.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.tranSumDetViewDetailsButton.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.tranSumDetViewReportName).textContains(reportName),
            await ensure(_AccountReportsListPage.acctReportListPage.tranSumDetViewAcct).isNotEmpty(),
            await ensure(_AccountReportsListPage.acctReportListPage.tranSumDetViewDateRange).textContains("Start of current month to End of current month")
            ]);
        });
    });

//Below Add for R8.17 IDXP-1089 Segregation is disabled
describe('Company disable Segregation check Virtual Account', async function () { 
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskinForVA.SIT.loginCompanyId1 : testData.singlePaymentReskinForVA.UAT.loginCompanyId1, SIT ? testData.singlePaymentReskinForVA.SIT.loginUserVA1 : testData.singlePaymentReskinForVA.UAT.loginUserVA1,  testData.singlePaymentReskinForVA.UAT.pinId1);  });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    // User has Account statement - view but does not have Virtual Account statement - view access
    it('Create Payment with VA account', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.virtualAccounts.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskinForVA.SIT.fromVirtualAccount1 : testData.singlePaymentReskinForVA.UAT.fromVirtualAccount2);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskinForVA.ttExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();    
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskinForVA.amount);
        await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.chargeAccounts.click();
        await _PaymentsPages.singlePaymentPage.chargeAcctInput.input(SIT ? testData.singlePaymentReskinForVA.SIT.fromAccount2 :testData.singlePaymentReskinForVA.UAT.fromAccount2);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskinForVA.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.singlePaymentReskinForVA.val);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskinForVA.paymentDetails);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();    
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskinForVA.SIT.fromVirtualAccount1 : testData.singlePaymentReskinForVA.UAT.fromVirtualAccount2),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskinForVA.ttExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskinForVA.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]);        
    });

    it('Create report with VA account', async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.transferDetCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName='TranDetReportName'+generatedID();
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
        await _AccountReportsListPage.createAccountReportsPage.VAaccountType.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.singlePaymentReskinForVA.SIT.fromVirtualAccount1 : testData.singlePaymentReskinForVA.UAT.fromVirtualAccount2);
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.relativeDates.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.singlePaymentReskinForVA.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.transferDetViewDetailsButton.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.transferDetViewReportName).textContains(reportName),
            await ensure(_AccountReportsListPage.acctReportListPage.transferDetViewAcct).isNotEmpty(),
            await ensure(_AccountReportsListPage.acctReportListPage.transferDetViewDateRange).textContains("Start of current month to End of current month")
            ]);
        });
    //Due to IDXP-1282 comment out first
    // it("Create MT103 Advice Alert with VA account", async function () {
    //     await _createAlertPage.profileMenu.click();
    //     await _createAlertPage.alertMenu.click();
    //     await _createAlertPage.loadCondition();
    //     let nums = '';
    //     await _createAlertPage.remittanceMT103AlertNums.getText().then(val => {
    //         let _val = val.trim();
    //         nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
    //     });
    //     await _createAlertPage.createRemittanceMT103AlertButton.jsClick();
    //     await _createAlertPage.loadConditionCreatePage();
    //     await _createAlertPage.selectVAButton.jsClick();
    //     await _createAlertPage.alertAccountMultiSelection.jsClick();
    //     await _createAlertPage.search.input(testData.singlePaymentReskinForVA.fromVirtualAccount1);
    //     await _createAlertPage.accountOption1.jsClick();
    //     await _createAlertPage.alertPassword.jsClick();
    //     await _createAlertPage.alertPassword.input(testData.singlePaymentReskinForVA.passWord);
    //     await _createAlertPage.alertConfirmPassword.jsClick();
    //     await _createAlertPage.alertConfirmPassword.input(testData.singlePaymentReskinForVA.passWord);
    //     await _createAlertPage.submitButton.jsClick();
    //     await _createAlertPage.loadDialog();
    //     await _createAlertPage.dismissButton.jsClick();
    //     await _createAlertPage.loadCondition();
    
    //     await Promise.all([
    //         await ensure(_createAlertPage.remittanceMT103AlertNums).textContains(nums),
    //     ]);
    //     await _createAlertPage.showRemittanceMT103AlertButton.jsClick();
    //     await _createAlertPage.deleteremittanceMT103Alert.click();
    //     await _createAlertPage.deleteDialogButton.jsClick();
    //     await _createAlertPage.dismissButton.click();
    
    //     });
    });