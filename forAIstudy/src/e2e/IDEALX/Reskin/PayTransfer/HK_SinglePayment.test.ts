/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages,ApprovalsPages } from "../../../../pages/IDEALX";
import {ensure, SIT, handlerCase, generatedID,PROJECT_TYPE, devWatch} from "../../../../lib";
import { browser } from "protractor";
import moment = require("moment");


let ttReference = "";
let actReference = "";
let fpsReference = "";
let chatsReference = "";
let fpsViaBatchReference = "";
let newPayeeName = "";
let TemplateName = '';
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData_01.json');


let newPayee = async function (format: string,all: boolean) {
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.addNewPayee.click();
    await _PaymentsPages.singlePaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.selectedCountry.select(testData.TelegraphicTransfer.payeeLocation);
    await _PaymentsPages.singlePaymentPage.payeeBankSearch.click();
    await browser.sleep(2000);
    await _PaymentsPages.singlePaymentPage.payeeBankIdInput.click();
    await _PaymentsPages.singlePaymentPage.payeeBankIdInput.input(testData.TelegraphicTransfer.payeeBankId);
    await browser.sleep(2000);
    await _PaymentsPages.singlePaymentPage.bankIdValueSelect.click();
    await _PaymentsPages.singlePaymentPage.RoutingCode.click();
    await _PaymentsPages.singlePaymentPage.RoutingCode.input(testData.TelegraphicTransfer.routingCodeValue);
    await _PaymentsPages.singlePaymentPage.acctNumber.input(testData.TelegraphicTransfer.acctNumberValue);
    newPayeeName = 'TTnewPayeeName' + generatedID();
    await _PaymentsPages.singlePaymentPage.payeeName.input(newPayeeName);
    await _PaymentsPages.singlePaymentPage.payeeNickname.input(newPayeeName);
    if(all){
        await addAddressAllFieldNewUI(format);
    }else{
        await _PaymentsPages.singlePaymentPage.switchFormatButton.click();
        await _PaymentsPages.singlePaymentPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.singlePaymentPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.singlePaymentPage.streetName.input(testData.Beneficiary.streetName);
    }
    await _PaymentsPages.singlePaymentPage.payeeReviewBtn.click();
    await _PaymentsPages.singlePaymentPage.saveTolist.jsClick();
    await _PaymentsPages.singlePaymentPage.usePayeewBtn.click();
};

let createACT = async function () {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.AccountTransfer.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.AccountTransfer.actExistingPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.AccountTransfer.amount);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.AccountTransfer.adviceContent);
    await _PaymentsPages.singlePaymentPage.val.input(testData.AccountTransfer.email);
};


describe('HK_single payment_reskin', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    //IDXP-2035
    it('Create HK ACT with existing payee and approve now retrieve name res success', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.AccountTransfer.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.AccountTransfer.actExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await ensure(_PaymentsPages.singlePaymentPage.createPageRetriveNameNewUi).textContains(testData.AccountTransfer.retrieveNameValue),
        await _PaymentsPages.singlePaymentPage.amount.input(testData.AccountTransfer.amount);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.AccountTransfer.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.AccountTransfer.email);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.approveAndSubmitBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            actReference = text.trim();
        });
        console.log(actReference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.AccountTransfer.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Received,testData.status.Completed),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.AccountTransfer.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.AccountTransfer.actExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.AccountTransfer.acctNumberValue),
            await ensure(_PaymentsPages.singlePaymentPage.viewPageRetriveNameNewUi).textContains(testData.AccountTransfer.retrieveNameValue),
        ]);
    });
    //IDXP-2035
    it('Create HK ACT with existing payee and retrieve name res fail', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.AccountTransfer.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.AccountTransfer.existingPayeeRetrFail);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await ensure(_PaymentsPages.singlePaymentPage.createPageRetrieveNameFailMsg).textContains(testData.AccountTransfer.retrieveNameFailMessage);
    });
    //IDXP-2035
    it('Create HK ACT with new payee and retrieve name res success', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, "123123");
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.AccountTransfer.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        
        //add new payee
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.addNewPayee.click();
        await _PaymentsPages.singlePaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.selectedCountry.select(testData.AccountTransfer.payeeLocation);
        await _PaymentsPages.singlePaymentPage.DBSBank.jsClick();
        await _PaymentsPages.singlePaymentPage.acctNumber.input(testData.AccountTransfer.acctNumberValue);
        await _PaymentsPages.singlePaymentPage.retrieveNameButton.click();
        await ensure(_PaymentsPages.singlePaymentPage.addPayeeRetrieveNameValue).textContains(testData.AccountTransfer.retrieveNameValue);
        newPayeeName = 'ACTNewPayeeName' + generatedID();
        await _PaymentsPages.singlePaymentPage.payeeName.input(newPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeNickname.input(newPayeeName);
        await _PaymentsPages.singlePaymentPage.addAddress.click();
        await addAddressAllFieldNewUI("sample");
        await _PaymentsPages.singlePaymentPage.payeeReviewBtn.click();
        await _PaymentsPages.singlePaymentPage.saveTolist.jsClick();
        await _PaymentsPages.singlePaymentPage.usePayeewBtn.click();

        await _PaymentsPages.singlePaymentPage.amount.input(testData.AccountTransfer.amount);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.AccountTransfer.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.AccountTransfer.email);
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
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.AccountTransfer.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.AccountTransfer.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.payeeAcctNumberView).textContains(testData.AccountTransfer.acctNumberValue),
            await ensure(_PaymentsPages.singlePaymentPage.viewPageRetriveNameNewUi).textContains(testData.AccountTransfer.retrieveNameValue),
        ]);
    });

    it('Create FPS payment with new FPS payee', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, "123123");
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.FPSPayment.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        //add new payee
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.addNewPayee.click();
        await _PaymentsPages.singlePaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.selectedCountry.select(testData.FPSPayment.payeeLocation);
        await _PaymentsPages.singlePaymentPage.payeeBankSearch.click();
        await _PaymentsPages.singlePaymentPage.newPayeeBankIdInput.input(testData.FPSPayment.payeeBankId);
        await _PaymentsPages.singlePaymentPage.bankIdValueSelect.click();
        await _PaymentsPages.singlePaymentPage.acctNumber.input(testData.FPSPayment.acctNumberValue);
        newPayeeName = 'FPSNewPayeeName' + generatedID();
        await _PaymentsPages.singlePaymentPage.payeeName.input(newPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeNickname.input(newPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeReviewBtn.click();
        await _PaymentsPages.singlePaymentPage.saveTolist.jsClick();
        await _PaymentsPages.singlePaymentPage.usePayeewBtn.click();

        await _PaymentsPages.singlePaymentPage.amount.input(testData.FPSPayment.amount);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.FPSPayment.paymentDetail);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.FPSPayment.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.FPSPayment.email);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            fpsReference = text.trim();
        });
        console.log(fpsReference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fpsReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.FPSPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.FPSPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.payeeAcctNumberView).textContains(testData.FPSPayment.acctNumberValue)
        ]);
    });


    it('Submit FPS payment(via Batch) with existing payee do edit', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.FPSPayment.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.FPSPayment.fpsExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.FPSPayment.amount);
        await _PaymentsPages.singlePaymentPage.HKFPSviaBatch.jsClick();
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.FPSPayment.paymentDetail);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.FPSPayment.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.FPSPayment.email);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.scrollTo(0,800);
        await _PaymentsPages.singlePaymentPage.editBtn.click();
        await browser.sleep(3000);
        await _PaymentsPages.singlePaymentPage.amount.input(testData.FPSPayment.editAmount);
        await browser.sleep(1000);
        await _PaymentsPages.singlePaymentPage.scrollTo(0,2000);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            fpsReference = text.trim();
        });
        console.log(fpsReference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fpsReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.FPSPayment.editAmount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.FPSPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.FPSPayment.fpsExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.FPSPayment.acctNumberValue),
        ]);
    });

    it('Edit FPS payment with new payee address', async function () {
        await _PaymentsPages.singlePaymentPage.editBtn.click();
        //add new payee
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.addNewPayee.click();
        await _PaymentsPages.singlePaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.payeeBankSearch.click();
        await browser.sleep(2000);
        // await _PaymentsPages.singlePaymentPage.payeeBankIdInput.click();
        await _PaymentsPages.singlePaymentPage.payeeBankIdInput.input(testData.FPSPayment.payeeBankId);
        await browser.sleep(2000);
        await _PaymentsPages.singlePaymentPage.bankIdValueSelect.click();
        await _PaymentsPages.singlePaymentPage.acctNumber.input(testData.FPSPayment.acctNumberValue);
        newPayeeName = 'FPSNewPayeeName' + generatedID();
        await _PaymentsPages.singlePaymentPage.payeeName.input(newPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeNickname.input(newPayeeName);
        await addAddressAllFieldNewUI("details");
        await _PaymentsPages.singlePaymentPage.payeeReviewBtn.click();
        await _PaymentsPages.singlePaymentPage.saveTolist.jsClick();
        await _PaymentsPages.singlePaymentPage.usePayeewBtn.click();

        await _PaymentsPages.singlePaymentPage.amount.input(testData.FPSPayment.editAmount);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            fpsReference = text.trim();
        });
        console.log(fpsReference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fpsReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.FPSPayment.editAmount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.FPSPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.payeeAcctNumberView).textContains(testData.FPSPayment.acctNumberValue)
        ]);
    });

    it('Create CHATS with existing payee with save as template', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, "123123");
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.CHATSPayment.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.CHATSPayment.fpsExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.CHATSPayment.amount);
        await _PaymentsPages.singlePaymentPage.HKChats.jsClick();
        await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClick();
        TemplateName = 'chatsTemp' + generatedID();
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.CHATSPayment.paymentDetail);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.CHATSPayment.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.CHATSPayment.email);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.saveAsTemplateBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            chatsReference = text.trim();
        });
        console.log(chatsReference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(chatsReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.CHATSPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.CHATSPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.CHATSPayment.fpsExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.CHATSPayment.acctNumberValue),
        ]);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForViewEachTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.templateNameValueOfChats).textIs(TemplateName),
            await ensure(_PaymentsPages.singlePaymentPage.acctNmValueOfChats).textContains(testData.CHATSPayment.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.amountValueofChats).textContains(testData.CHATSPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.payeeAcctValue).textContains(testData.CHATSPayment.acctNumberValue),
            await ensure(_PaymentsPages.singlePaymentPage.payeeNameValue).textContains(testData.CHATSPayment.fpsExistingPayee)
        ]);
    });

    it('View CHATS screen do Reject', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(chatsReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.rejectBtn.click();
        await _PaymentsPages.singlePaymentPage.rejectReason.input("reasonForRejection");
        await _PaymentsPages.singlePaymentPage.rejectDialogButton.click();
        await browser.sleep(5000);
        await ensure(_PaymentsPages.singlePaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(chatsReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.Rejected),
            await ensure(_PaymentsPages.singlePaymentPage.reference).textIs(chatsReference)
        ]); 
    });

    it('View CHATS sceen do Delete', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(chatsReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.deleteBtn.click();
        await _PaymentsPages.singlePaymentPage.deleteDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(chatsReference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display")
        ]);
    });

    it('Submit FPS payment(via Batch) screen do Copy', async function () {
        await _PaymentsPages.singlePaymentPage.Dashboard.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.FPSViaBatch.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.FPSViaBatch.fpsExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.FPSViaBatch.amount);
        await _PaymentsPages.singlePaymentPage.HKFPSviaBatch.jsClick();
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.FPSViaBatch.paymentDetail);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.FPSViaBatch.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.FPSViaBatch.email);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.copyBtn.click();
        await browser.sleep(3000);
        await _PaymentsPages.singlePaymentPage.scrollTo(0,2000);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            fpsViaBatchReference = text.trim();
        });
        console.log(fpsViaBatchReference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fpsViaBatchReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.FPSViaBatch.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.FPSViaBatch.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.FPSViaBatch.fpsExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.FPSViaBatch.acctNumberValue),
        ]);
    });

    it('Create HK TT with new payee', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.TelegraphicTransfer.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await newPayee("details",false);
        await _PaymentsPages.singlePaymentPage.amount.input(testData.TelegraphicTransfer.amount);
        await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClick();
        await _PaymentsPages.singlePaymentPage.isIntermediary.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankCountry.select(testData.TelegraphicTransfer.intermediaryBankCountry);
        await _PaymentsPages.singlePaymentPage.intermediaryBankIdInput.click();
        await _PaymentsPages.singlePaymentPage.intermediaryBankIdSearch.input(testData.TelegraphicTransfer.intermediaryBankID);
        await _PaymentsPages.singlePaymentPage.intermediaryBankIdSelect.click();
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.TelegraphicTransfer.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.TelegraphicTransfer.email);
        await _PaymentsPages.singlePaymentPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.digiDocFileUploadButton.select(testData.TelegraphicTransfer.uploadFileName);
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference = text.trim();
        });
        console.log(ttReference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await checkViewPageAllField();
    });

    it('View TT screen do Verify', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.verifyUserId : testData.TelegraphicTransfer.UAT.verifyUserId, "123123");
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
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        if (0 !== ttReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
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
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('View TT screen do Release', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        if (0 !== ttReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK - Telegraphic Transfer", testData.status.PendingRelease);
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

    it('View ACT screen do Offline approve', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.approveUserId : testData.AccountTransfer.UAT.approveUserId, "123123");
        await createACT();
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
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await _PaymentsPages.singlePaymentPage.approverOption.select(testData.AccountTransfer.approverOption);
        await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            actReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.Completed)
        ]);
    });

    it('Create any single payment and save as draft', async function () {
        await createACT();
        await _PaymentsPages.singlePaymentPage.saveAsDraftBtn.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForDismissDialog();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            actReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.AccountTransfer.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.Saved),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.AccountTransfer.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.AccountTransfer.actExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.AccountTransfer.acctNumberValue),
        ]);
    });

    it('Create HK TT with new payee address sample format all field', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.TelegraphicTransfer.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await newPayee("sample",true);
        await _PaymentsPages.singlePaymentPage.amount.input(testData.TelegraphicTransfer.amount);
        await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClick();
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.TelegraphicTransfer.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.TelegraphicTransfer.email);
        await _PaymentsPages.singlePaymentPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.digiDocFileUploadButton.select(testData.TelegraphicTransfer.uploadFileName);
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference = text.trim();
        });
        console.log(ttReference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingVerification),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.TelegraphicTransfer.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.payeeAcctNumberView).textContains(testData.TelegraphicTransfer.acctNumberValue),
        ]);
    });

    it('Create HK TT with new payee address details format all field', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.TelegraphicTransfer.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await newPayee("details",true);
        await _PaymentsPages.singlePaymentPage.amount.input(testData.TelegraphicTransfer.amount);
        await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClick();
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.TelegraphicTransfer.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.TelegraphicTransfer.email);
        await _PaymentsPages.singlePaymentPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.digiDocFileUploadButton.select(testData.TelegraphicTransfer.uploadFileName);
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference = text.trim();
        });
        console.log(ttReference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingVerification),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.TelegraphicTransfer.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.payeeAcctNumberView).textContains(testData.TelegraphicTransfer.acctNumberValue),
        ]);
    });
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.singlePaymentPage.sendCcy).textContains(testData.TelegraphicTransfer.paymentCurrency),
        await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.TelegraphicTransfer.amountValue),
        await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingVerification),
        await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.TelegraphicTransfer.fromAccount),
        await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
        await ensure(_PaymentsPages.singlePaymentPage.payeeAcctNumberView).textContains(testData.TelegraphicTransfer.acctNumberValue),
        await ensure(_PaymentsPages.singlePaymentPage.PaymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.singlePaymentPage.HashView).isNotEmpty(),
        await _PaymentsPages.singlePaymentPage.scrollTo(0, 800),
        await _PaymentsPages.singlePaymentPage.messageToApprover.click(),
        await ensure(_PaymentsPages.singlePaymentPage.digiDocName).textContains(testData.TelegraphicTransfer.uploadFileName),
        await ensure(_PaymentsPages.singlePaymentPage.payeeAcctNumberView).textContains(testData.TelegraphicTransfer.acctNumberValue),
        await _PaymentsPages.singlePaymentPage.otherDetailTitle.click(),
        await _PaymentsPages.singlePaymentPage.scrollTo(0, 1300),
        await ensure(_PaymentsPages.singlePaymentPage.bankNameView).textContains(testData.TelegraphicTransfer.payeeBankName),
        await ensure(_PaymentsPages.singlePaymentPage.bankLocationValue).textContains(testData.TelegraphicTransfer.payeeLocation),
        await ensure(_PaymentsPages.singlePaymentPage.bankSWIFTBICView).textContains(testData.TelegraphicTransfer.payeeBankId),
        await ensure(_PaymentsPages.singlePaymentPage.bankAddress1).textContains(testData.TelegraphicTransfer.bankAddress1),
        await ensure(_PaymentsPages.singlePaymentPage.bankCity).textContains(testData.TelegraphicTransfer.bankCity),
        await ensure(_PaymentsPages.singlePaymentPage.routingCodeView).textContains(testData.TelegraphicTransfer.routingCodeValue),
        await ensure(_PaymentsPages.singlePaymentPage.intermediaryBankNameValue).textContains(testData.TelegraphicTransfer.intermediaryBankName),
        await ensure(_PaymentsPages.singlePaymentPage.intermediaryBankLocationValue).textContains(testData.TelegraphicTransfer.intermediaryBankCountry),
        await ensure(_PaymentsPages.singlePaymentPage.intermediaryBankAddrValue).textContains(testData.TelegraphicTransfer.intermediaryBankAddr),
        await ensure(_PaymentsPages.singlePaymentPage.intermediaryBankSWIFTBICValue).textContains(testData.TelegraphicTransfer.intermediaryBankID),
        await _PaymentsPages.singlePaymentPage.scrollTo(0, 1600),
        await ensure(_PaymentsPages.singlePaymentPage.paidByValue).textContains(testData.TelegraphicTransfer.bankChargeValue),
        await ensure(_PaymentsPages.singlePaymentPage.chargAccoutValue).textContains(testData.TelegraphicTransfer.chargeAcctValue),
        await ensure(_PaymentsPages.singlePaymentPage.detailToPayeeValue).textContains(testData.TelegraphicTransfer.paymentDetail),
        await ensure(_PaymentsPages.singlePaymentPage.emailValue).textContains(testData.TelegraphicTransfer.emailValue),
        await ensure(_PaymentsPages.singlePaymentPage.messageToOrderingBankValue).textContains(testData.TelegraphicTransfer.messageToOrderingBank)
    ]);
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