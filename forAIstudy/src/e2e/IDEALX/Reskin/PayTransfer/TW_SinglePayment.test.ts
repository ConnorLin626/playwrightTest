/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from "../../../../pages/IDEALX";
import {ensure, SIT, handlerCase, generatedID,PROJECT_TYPE} from "../../../../lib";
import { browser } from "protractor";
import moment = require("moment");

let ttReference = "";
let actReference = "";
let fiscReference = "";
let eachReference = "";
let TemplateName = '';
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');

describe('TW_single payment_reskin', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId : testData.singlePaymentReskin.UAT.loginUserId, SIT ? 123123 : testData.singlePaymentReskin.UAT.Password); });    
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this,PROJECT_TYPE.IDEALX); });
    it('Create TT with new payee', async function () {
        await createTT(true,true);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.otherDetail.click();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.verifyAmountValue),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingVerification),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.SIT.fromAccount01 : testData.singlePaymentReskin.UAT.fromAccount01),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.payeeName),
            await ensure(_PaymentsPages.singlePaymentPage.payeeAccountValue).textContains(testData.singlePaymentReskin.accountNumber),
            await ensure(_PaymentsPages.singlePaymentPage.bankLocationValue).textContains(testData.singlePaymentReskin.payeeLocation),
            await ensure(_PaymentsPages.singlePaymentPage.routingCodeValue).textContains(testData.singlePaymentReskin.routingCode),
            await ensure(_PaymentsPages.singlePaymentPage.chargeValue).textContains(testData.singlePaymentReskin.charge),
            await ensure(_PaymentsPages.singlePaymentPage.purposeCodeValue).textContains(testData.singlePaymentReskin.purposeCode),
            //Add for IDXP-2256
            await ensure(_PaymentsPages.singlePaymentPage.bankNameView).textContains(testData.singlePaymentReskin.MaxbankName),
            await ensure(_PaymentsPages.singlePaymentPage.bankAddress1).textContains(testData.singlePaymentReskin.bankAdd1),
            await ensure(_PaymentsPages.singlePaymentPage.bankAddress2).textContains(testData.singlePaymentReskin.bankAdd2),
        ]);
    });

    it('View TT screen do Verify', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.verifyUserId : testData.singlePaymentReskin.UAT.verifyUserId, SIT ? 123123 : testData.singlePaymentReskin.UAT.Password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.verifyReleaseBtn.click();
        await _PaymentsPages.singlePaymentPage.verifyReleaseDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval)
        ]);   
    });

    it('View TT screen do Approve', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId : testData.singlePaymentReskin.UAT.loginUserId, SIT ? 123123 : testData.singlePaymentReskin.UAT.Password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        if (0 !== ttReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await browser.sleep(8000);
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('View TT screen do Release', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        if (0 !== ttReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Telegraphic Transfer", testData.status.PendingRelease);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.verifyReleaseBtn.click();
        await _PaymentsPages.singlePaymentPage.verifyReleaseDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            ttReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
        
    });

    it('Create ACT with approval now', async function () {
        await createACT(true);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Completed),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.SIT.fromAccount02 : testData.singlePaymentReskin.UAT.fromAccount03),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.actExistingPayee)
        ]);
    });

    it('Create FISC payment', async function () {
        await createFISC();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fiscReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.SIT.fromAccount02 : testData.singlePaymentReskin.UAT.fromAccount02),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.sendAmount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.fiscExistingPayee)
        ]);
    });

    it('Submit FISC Payment screen do Edit', async function(){
        await createFISC();
        await _PaymentsPages.singlePaymentPage.editBtn.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.loadConditionEachFISCSection();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.editAmount);
        //wait amount input
        await browser.sleep(2000);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            fiscReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fiscReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.editAmount),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.SIT.fromAccount02 : testData.singlePaymentReskin.UAT.fromAccount02),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.fiscExistingPayee)
        ]);
    });

    it('Create eACH with save as template', async function () {
        await createEACH(true);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(eachReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.SIT.fromAccount03 : testData.singlePaymentReskin.UAT.fromAccount03),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.sendAmount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.eachExistingPayee)
        ]);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForViewEachTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.templateNameValueOfEach).textIs(TemplateName),
            await ensure(_PaymentsPages.singlePaymentPage.acctNmValueOfEach).textContains(SIT ? testData.singlePaymentReskin.SIT.fromAccount03 : testData.singlePaymentReskin.UAT.fromAccount03),
            await ensure(_PaymentsPages.singlePaymentPage.amountValueofEach).textContains(testData.singlePaymentReskin.sendAmount)
        ]);
    });

    it('View eACH screen do Offline approve', async function () {
        // TWAUTO01S02 does not have push approval entitlement, can do offline approval
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.verifyUserId : testData.singlePaymentReskin.UAT.verifyUserId,  SIT ? 123123 : testData.singlePaymentReskin.UAT.Password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== eachReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(eachReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - eACH Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        // await _PaymentsPages.singlePaymentPage.getChallengeBtn.click();
        await _PaymentsPages.singlePaymentPage.approverOption.select(SIT ? testData.singlePaymentReskin.SIT.approverOption : testData.singlePaymentReskin.UAT.approverOption);
        await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            eachReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(eachReference);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Submit ACT screen do Copy', async function () {
        await createACT(false);
        await _PaymentsPages.singlePaymentPage.copyBtn.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.loadConditionForTTACTSectionPage();
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            actReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.sendAmount),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.SIT.fromAccount02 : testData.singlePaymentReskin.UAT.fromAccount03),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.actExistingPayee)
        ]);
    });

    it('View ACT screen do Reject', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== actReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
            await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.rejectBtn.click();
        await _PaymentsPages.singlePaymentPage.rejectReason.input("reasonForRejection");
        await _PaymentsPages.singlePaymentPage.rejectDialogButton.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            actReference = text;
        });
        await ensure(_PaymentsPages.singlePaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Create any single payment and save as draft', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.SIT.fromAccount02 : testData.singlePaymentReskin.UAT.fromAccount03);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.actExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.sendAmount);
        //wait input and loding complete
        await browser.sleep(2000);
        await _PaymentsPages.singlePaymentPage.saveAsDraftBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            actReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.Saved),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.sendAmount),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.SIT.fromAccount02 : testData.singlePaymentReskin.UAT.fromAccount03),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.actExistingPayee)
        ]);
    });

    it('Create ACT with new payee address details format', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.SIT.fromAccount02 : testData.singlePaymentReskin.UAT.fromAccount03);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        
        //add new payee
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.addNewPayee.click();
        await _PaymentsPages.singlePaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.selectedCountry.select(testData.singlePaymentReskin.Country);
        await _PaymentsPages.singlePaymentPage.DBSBank.jsClick();
        await _PaymentsPages.singlePaymentPage.acctNumber.input(testData.singlePaymentReskin.newPayeeAcctNumber);

        let newPayeeName = 'ACTNewPayeeName' + generatedID();
        await _PaymentsPages.singlePaymentPage.payeeName.input(newPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeNickname.input(newPayeeName);
        await _PaymentsPages.singlePaymentPage.addAddress.click();
        await addAddressAllFieldNewUI("details");
        await _PaymentsPages.singlePaymentPage.payeeReviewBtn.click();
        await _PaymentsPages.singlePaymentPage.saveTolist.jsClick();
        await _PaymentsPages.singlePaymentPage.usePayeewBtn.click();

        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.sendAmount);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.singlePaymentReskin.val);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            actReference = text.trim();
        });
        console.log(actReference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.sendAmount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.SIT.fromAccount02 : testData.singlePaymentReskin.UAT.fromAccount03),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.payeeAcctNumberView).textContains(testData.singlePaymentReskin.newPayeeAcctNumber),
        ]);
    });

    it('View TT screen do Delete', async function () {
        await createTT(false,false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        if (0 !== ttReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.deleteBtn.click();
        await _PaymentsPages.singlePaymentPage.deleteDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            ttReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(ttReference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
})

export async function createTT(addNewPayee: boolean, isToVerify: boolean) {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.SIT.fromAccount01 : testData.singlePaymentReskin.UAT.fromAccount01);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    if(addNewPayee){
        await _PaymentsPages.singlePaymentPage.addNewPayee.click();
        await ensure(_PaymentsPages.singlePaymentPage.haveYouCheckDialog).isElementPresent(); // add for IDXP-1492
        await _PaymentsPages.singlePaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.payeeLocationInput.click();
        await _PaymentsPages.singlePaymentPage.payeeLocationInput.input(testData.singlePaymentReskin.payeeLocation);
        await _PaymentsPages.singlePaymentPage.payeeLocationSelected.click();
        // update for IDXP-2256
        await _PaymentsPages.singlePaymentPage.enterManully.click();
        await _PaymentsPages.singlePaymentPage.newPayeeBankName.input(testData.singlePaymentReskin.MaxbankName);
        await _PaymentsPages.singlePaymentPage.newPayeeBankAdd1.input(testData.singlePaymentReskin.bankAdd1);
        await _PaymentsPages.singlePaymentPage.newPayeeBankAdd2.input(testData.singlePaymentReskin.bankAdd2);
        //await _PaymentsPages.singlePaymentPage.payeeBankInput.click();
        //await _PaymentsPages.singlePaymentPage.payeeBankIdInput.input(testData.singlePaymentReskin.bankIdInput);
        //await _PaymentsPages.singlePaymentPage.loadConditionForBankSearch();
        //await _PaymentsPages.singlePaymentPage.payeeBankSelected.click();
        await _PaymentsPages.singlePaymentPage.routingCode.input(testData.singlePaymentReskin.routingCode);
        await _PaymentsPages.singlePaymentPage.accountNumber.input(testData.singlePaymentReskin.accountNumber);
        await _PaymentsPages.singlePaymentPage.payeeName.input(testData.singlePaymentReskin.payeeName);
        await _PaymentsPages.singlePaymentPage.payeeNickname.input(testData.singlePaymentReskin.payeeName);
        await _PaymentsPages.singlePaymentPage.newPayeeReviewBtn.click();
        await _PaymentsPages.singlePaymentPage.savePayee.click();
        await _PaymentsPages.singlePaymentPage.usePayee.click();
    }else{
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.ttExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        //wait gst Section load
        await _PaymentsPages.singlePaymentPage.loadConditionForGstSection();
    }
    if(isToVerify){
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.verifyAmount);
    }else{
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.sendAmount);
    }
    await _PaymentsPages.singlePaymentPage.scrollTo(0,800);
    await _PaymentsPages.singlePaymentPage.twttPayment.jsClick();
    await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClick();
    await _PaymentsPages.singlePaymentPage.purposeCode.select(testData.singlePaymentReskin.purposeCode);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    await _PaymentsPages.singlePaymentPage.email.input(testData.singlePaymentReskin.val);
    //wait val input complete
    await browser.sleep(100);    
    await _PaymentsPages.singlePaymentPage.isMessageToOrderingBank.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.singlePaymentReskin.messageToOrderingBank);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    await _PaymentsPages.singlePaymentPage.submitBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
        ttReference = text.trim();
    });    
}

export async function createACT(approveNow: boolean) {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.SIT.fromAccount02 : testData.singlePaymentReskin.UAT.fromAccount03);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.actExistingPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.sendAmount);
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    await _PaymentsPages.singlePaymentPage.val.input(testData.singlePaymentReskin.val);
    //wait val input complete
    await browser.sleep(1000);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    if(approveNow == true){
        await _PaymentsPages.singlePaymentPage.approveAndSubmitBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await browser.sleep(8000);
    }else{
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
    }
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
        actReference = text.trim();
    });
}

export async function createFISC() {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.SIT.fromAccount02 : testData.singlePaymentReskin.UAT.fromAccount02);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.fiscExistingPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.sendAmount);
    await _PaymentsPages.singlePaymentPage.bankChargeThey.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    await _PaymentsPages.singlePaymentPage.val.input(testData.singlePaymentReskin.val);
    //wait val input complete
    await browser.sleep(100);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    await _PaymentsPages.singlePaymentPage.submitBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
        fiscReference = text.trim();
    });
}

export async function createEACH(isSaveAsTemplate: boolean) {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.SIT.fromAccount03 : testData.singlePaymentReskin.UAT.fromAccount03);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.eachExistingPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.sendAmount);
    await _PaymentsPages.singlePaymentPage.billerServiceID.select(testData.singlePaymentReskin.billerServiceID);
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    await _PaymentsPages.singlePaymentPage.val.input(testData.singlePaymentReskin.val);
    await browser.sleep(100);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    if (isSaveAsTemplate) {
        await _PaymentsPages.singlePaymentPage.saveAsTemplateBtn.jsClick();
        TemplateName = 'EachName' + generatedID();
        await _PaymentsPages.singlePaymentPage.templateName.input(TemplateName);
    }
    await _PaymentsPages.singlePaymentPage.submitBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
        eachReference = text.trim();
    });

}

export async function addAddressAllFieldNewUI(format : string) {
    if(format.includes("sample")){
        await _PaymentsPages.singlePaymentPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.singlePaymentPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.singlePaymentPage.payeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _PaymentsPages.singlePaymentPage.payeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _PaymentsPages.singlePaymentPage.postalCode.input(testData.Beneficiary.postalCode);
    }else{
        await _PaymentsPages.singlePaymentPage.switchFormatButton.click();
        await _PaymentsPages.singlePaymentPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.singlePaymentPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.singlePaymentPage.streetName.input(testData.Beneficiary.streetName);
        await _PaymentsPages.singlePaymentPage.buildingNum.input(testData.Beneficiary.buildingNum);
        await _PaymentsPages.singlePaymentPage.buildingName.input(testData.Beneficiary.buildingName);
        await _PaymentsPages.singlePaymentPage.floor.input(testData.Beneficiary.floor);
        await _PaymentsPages.singlePaymentPage.room.input(testData.Beneficiary.room);
        await _PaymentsPages.singlePaymentPage.department.input(testData.Beneficiary.department);
        await _PaymentsPages.singlePaymentPage.subDepartment.input(testData.Beneficiary.subDepartment);
        await _PaymentsPages.singlePaymentPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.singlePaymentPage.countrySubDivsion.input(testData.Beneficiary.countrySubDivsion);
        await _PaymentsPages.singlePaymentPage.townLocationName.input(testData.Beneficiary.townLocationName);
        await _PaymentsPages.singlePaymentPage.districtName.input(testData.Beneficiary.districtName);
    }
}