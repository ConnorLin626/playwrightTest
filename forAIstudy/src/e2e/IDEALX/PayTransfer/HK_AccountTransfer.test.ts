/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE, devWatch } from "../../../lib";
import { browser } from "protractor";
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from createFromTemplate,then Approval
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData("HK_testData.json");

describe("HK Account Transfer Payment", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, SIT ? testData.AccountTransfer.SIT.pinId : testData.AccountTransfer.UAT.pinId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    //add for IDXP-2035
    it('Old ui - Create ACT payment with exiting payee when retrieve name resp success', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayeeRetrSuccess);
        await ensure(_PaymentsPages.AccountTransferPage.createPageRetriveName).textContains(SIT ? testData.AccountTransfer.SIT.retrieveNameValue: testData.AccountTransfer.UAT.retrieveNameValue);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();
        let iseffectAvailabelBalanceLabelVisible = await _PaymentsPages.AccountTransferPage.effectAvailabelBalanceLabel.isElementPresent();
        if ( iseffectAvailabelBalanceLabelVisible === true){
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.existingPayeeRetrSuccess),
            await ensure(_PaymentsPages.AccountTransferPage.viewPageRetireveNameUAT).textContains(SIT ? testData.AccountTransfer.SIT.retrieveNameValue: testData.AccountTransfer.UAT.retrieveNameValue),

        ]);
    } else {
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.existingPayeeRetrSuccess),
            await ensure(_PaymentsPages.AccountTransferPage.viewPageRetireveName).textContains(SIT ? testData.AccountTransfer.SIT.retrieveNameValue: testData.AccountTransfer.UAT.retrieveNameValue),

        ]);
    }
    });

    it('Old ui - Create an Account Transfer with new Payee when retrieve name resp success', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.Country.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(SIT ? testData.AccountTransfer.SIT.newPayeeAcctNumber : testData.AccountTransfer.UAT.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.AccountTransferPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.AccountTransfer.newPayeeNickname);
        };
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.AccountTransferPage.retireveNameBtn.click();
        await ensure(_PaymentsPages.AccountTransferPage.createPageRetriveNameNewPayee).textContains(SIT ? testData.AccountTransfer.SIT.retrieveNameValue: testData.AccountTransfer.UAT.retrieveNameValue);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        let iseffectAvailabelBalanceLabelVisible = await _PaymentsPages.AccountTransferPage.effectAvailabelBalanceLabel.isElementPresent();
        if ( iseffectAvailabelBalanceLabelVisible === true){
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.AccountTransfer.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.viewPageRetireveNameUAT).textContains(SIT ? testData.AccountTransfer.SIT.retrieveNameValue: testData.AccountTransfer.UAT.retrieveNameValue),

        ]);
    } else {
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.AccountTransfer.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.viewPageRetireveName).textContains(SIT ? testData.AccountTransfer.SIT.retrieveNameValue: testData.AccountTransfer.UAT.retrieveNameValue),

        ]);
    }
    });

    it('Old ui - Create an Account Transfer with new Payee when retrieve name resp failed', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.Country.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.retrieveFailAcctNum);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);        
        await _PaymentsPages.AccountTransferPage.retireveNameBtn.click();
        await ensure(_PaymentsPages.AccountTransferPage.createPageRetrieveNameFailMsg).textContains(SIT ? testData.AccountTransfer.SIT.retrieveNameFailMessage:testData.AccountTransfer.UAT.retrieveNameFailMessage);
    });

});
