/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from "../../../../pages/IDEALX";
import { ensure,randomNumbers, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../../lib";
import { browser } from "protractor";
import moment = require("moment");

let verifyReference = ""
let approveReference = ""
let releaseReference = ""
let saveReference = ""
let reference = ""
let gstReference1 = ''
let gstReference2 = ''
let TemplateName = ""
let newPayeeName = ""
let newJPYPayeeName = ""
let txnReference = ""
let recallReference = ""
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData_04.json');


let newPayee = async function () {
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.ccyNew);
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.addNewPayee.click();
    await _PaymentsPages.singlePaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.selectedCountry.select(testData.GlobesendPayment.payeeLocation);
    await _PaymentsPages.singlePaymentPage.payeeBankSearch.click();
    //await _PaymentsPages.singlePaymentPage.newPayeeBankIdInput.click();
    await _PaymentsPages.singlePaymentPage.newPayeeBankIdInput.input(SIT ? testData.GlobesendPayment.bankID: testData.GlobesendPayment.UAT.bankID);
    await _PaymentsPages.singlePaymentPage.bankIdValueSelect.click();
    await _PaymentsPages.singlePaymentPage.RoutingCode.click();
    await _PaymentsPages.singlePaymentPage.RoutingCode.input(testData.GlobesendPayment.routingCodeValue);
    await _PaymentsPages.singlePaymentPage.acctNumber.input(testData.GlobesendPayment.acctNumberValue);
    newPayeeName = 'newPayeeName' + generatedID();
    await _PaymentsPages.singlePaymentPage.payeeName.input(newPayeeName);
    await _PaymentsPages.singlePaymentPage.payeeNickname.input(newPayeeName);
    await _PaymentsPages.singlePaymentPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
    await _PaymentsPages.singlePaymentPage.townCity.input(testData.Beneficiary.townCity);
    await _PaymentsPages.singlePaymentPage.add1.input(testData.GlobesendPayment.add1Value);
    await _PaymentsPages.singlePaymentPage.add2.input(testData.GlobesendPayment.add2Value);
    await _PaymentsPages.singlePaymentPage.postalCode.input(testData.Beneficiary.postalCode);
    await _PaymentsPages.singlePaymentPage.payeeReviewBtn.click();
    await _PaymentsPages.singlePaymentPage.usePayeewBtn.click();
};

let existingPayee = async function () {
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.globesendExistingPayeeValue);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
};

let createGlobesend = async function (isSaveAsDraft = false, isSaveAsTemplate = false, createWithVerify = false) {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.GlobesendPayment.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.ccy);
    await existingPayee();
    await _PaymentsPages.singlePaymentPage.amount.input(createWithVerify ? testData.GlobesendPayment.verifyAmount : testData.GlobesendPayment.amount);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
    await _PaymentsPages.singlePaymentPage.gstPurposeOfPayment.click();
    await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.GlobesendPayment.purposeCodeValue2);
    await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
    // await _PaymentsPages.singlePaymentPage.information1.input(testData.GlobesendPayment.addInfor1);
    // await _PaymentsPages.singlePaymentPage.information2.input(testData.GlobesendPayment.addInfor2);
    // await _PaymentsPages.singlePaymentPage.information3.input(testData.GlobesendPayment.addInfor3);
    // await _PaymentsPages.singlePaymentPage.information4.input(testData.GlobesendPayment.addInfor4);
    if (isSaveAsDraft) {
        await _PaymentsPages.singlePaymentPage.saveAsDraftBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            saveReference = text;
            console.log("globesend saveref:"+saveReference);
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
    } else {
        if (isSaveAsTemplate) {
            await _PaymentsPages.singlePaymentPage.reviewBtn.click();
            await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
            await _PaymentsPages.singlePaymentPage.saveAsTemplateBtn.jsClick();
            TemplateName = 'Globesend' + generatedID();
            await _PaymentsPages.singlePaymentPage.templateName.input(TemplateName);
            await _PaymentsPages.singlePaymentPage.submitBtn.click();
            // await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
            await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
            await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
                reference = text.trim();
                console.log("globesend tempref:"+reference);
            });
        } else {
            await _PaymentsPages.singlePaymentPage.reviewBtn.click();
            await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
            await _PaymentsPages.singlePaymentPage.submitBtn.click();
            // await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
            await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
            await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
                reference = text.trim();
                console.log("globesend ref:"+reference);
            });
        }
    }
};
let createJPYNewPayee = async function (isCheckRoutingCoe : boolean) {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.createNewPayee.jsClick();
    await _PaymentsPages.BeneficiaryPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.BeneficiaryPage.loadConditionForCreateBenePage();
    await _PaymentsPages.BeneficiaryPage.selectedCountry.select(testData.GlobesendPayment.Country);
    await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.GlobesendPayment.newPayeeBankId);
    await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(isCheckRoutingCoe ? testData.GlobesendPayment.newPayeeAcctNumber:testData.GlobesendPayment.newPayeeAcctNumber1);
    newJPYPayeeName = 'JPYnewPayee' + generatedID();
    await _PaymentsPages.BeneficiaryPage.newPayeeName.input(newJPYPayeeName);
    await _PaymentsPages.BeneficiaryPage.newPayeeNickName.input(newJPYPayeeName);
    await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
    await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
    await _PaymentsPages.BeneficiaryPage.newPayeeAdd1.input(testData.GlobesendPayment.newPayeeAdd1);
    await _PaymentsPages.BeneficiaryPage.newPayeeAdd2.input(testData.GlobesendPayment.newPayeeAdd2);
    await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
    await _PaymentsPages.BeneficiaryPage.next.click();
    await _PaymentsPages.BeneficiaryPage.dismiss.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.input(newJPYPayeeName);
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    if(isCheckRoutingCoe){
        await Promise.all([
            await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeName).textIs(newJPYPayeeName),
            await ensure(_PaymentsPages.BeneficiaryPage.routingCodeValue).textIs("-")
            ]);
    }else{
        await Promise.all([
            await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeName).textIs(newJPYPayeeName),
            await ensure(_PaymentsPages.BeneficiaryPage.accountNumValue).textIs(testData.GlobesendPayment.newPayeeAcctNumber1)  
        ]);
    }    
}


//R8.16 IDXP-881&idxp-883 Globesend
describe('SG Globesend payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, testData.GlobesendPayment.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create SG Globesend with new payee', async function () {
        this.timeout(420000);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
        await newPayee();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount);
        await _PaymentsPages.singlePaymentPage.gstPayment.jsClick();
        await _PaymentsPages.singlePaymentPage.scrollTo(500, 1500)
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClick();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
        await _PaymentsPages.singlePaymentPage.gstPurposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.GlobesendPayment.purposeCodeValue);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.informationline1.click();
        await _PaymentsPages.singlePaymentPage.informationline1Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.informationline2.click();
        await _PaymentsPages.singlePaymentPage.informationline2Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.informationline3.click();
        await _PaymentsPages.singlePaymentPage.informationline3Value.jsClickIfExist();
        //due tu idxp-1384 hide information line2-4
        // await _PaymentsPages.singlePaymentPage.informationline2.input(testData.GlobesendPayment.addInfor2);
        // await _PaymentsPages.singlePaymentPage.informationline3.input(testData.GlobesendPayment.addInfor3);
        // await _PaymentsPages.singlePaymentPage.informationline4.input(testData.GlobesendPayment.addInfor4);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.GlobesendPayment.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.GlobesendPayment.email);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        // await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await checkViewPageAllField();
    });
    //add for IDXP-2049
    it('Create SG Globesend with existing payee', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.ccyNew);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.existingPHPPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount);
        await _PaymentsPages.singlePaymentPage.gstPayment.jsClick();
        await _PaymentsPages.singlePaymentPage.scrollTo(500, 1500)
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClick();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
        await _PaymentsPages.singlePaymentPage.gstPurposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.GlobesendPayment.purposeCodeValue);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.informationline1.click();
        await _PaymentsPages.singlePaymentPage.informationline1Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.informationline2.click();
        await _PaymentsPages.singlePaymentPage.informationline2Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.informationline3.click();
        await _PaymentsPages.singlePaymentPage.informationline3Value.jsClickIfExist();
        //due tu idxp-1384 hide information line2-4
        // await _PaymentsPages.singlePaymentPage.informationline2.input(testData.GlobesendPayment.addInfor2);
        // await _PaymentsPages.singlePaymentPage.informationline3.input(testData.GlobesendPayment.addInfor3);
        // await _PaymentsPages.singlePaymentPage.informationline4.input(testData.GlobesendPayment.addInfor4);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.GlobesendPayment.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.GlobesendPayment.email);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        // await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.otherDetailTitle.click();

        await Promise.all([
        await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.existingPHPPayee),
        await ensure(_PaymentsPages.singlePaymentPage.purposeOfPaymentView).textContains(testData.GlobesendPayment.purposeCodeValue),
        await ensure(_PaymentsPages.singlePaymentPage.ViewBeneType).textContains(testData.GlobesendPayment.addInfor1),
        await ensure(_PaymentsPages.singlePaymentPage.ViewSourceFund).textContains(testData.GlobesendPayment.addInfor2),
        await ensure(_PaymentsPages.singlePaymentPage.ViewRelationshipBene).textContains(testData.GlobesendPayment.addInfor3),
         ]);
    });

    it('Create Payment with save as draft', async function () {
        await createGlobesend(true, false, false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(saveReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.globesendExistingPayeeValue),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.Saved)
        ]);
    });
    //IDXP-2278 NEW UI Globesend
    it('Edit Payment with save as draft which payee be updated', async function () {
          await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.GlobesendPayment.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.ccy);
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.globesendUpdatedPayeeValue);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
    await _PaymentsPages.singlePaymentPage.gstPurposeOfPayment.click();
    await _PaymentsPages.singlePaymentPage.travelCode.click();
    await _PaymentsPages.singlePaymentPage.saveAsDraftBtn.click();
    await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
    saveReference = text;
    console.log("globesend saveref:"+saveReference);
    });
    await _PaymentsPages.singlePaymentPage.okBtn.click();
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        //edit payee
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.GlobesendPayment.globesendUpdatedPayeeValue);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
        await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
        let ramNumbers = randomNumbers();
        await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.existingPayeeAcctNum+ramNumbers);
        await _PaymentsPages.BeneficiaryPage.next.click();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
            
         //edit txn
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(saveReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.editBtn.click();
        //await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("Payee details have been updated."),
            //await ensure(_PaymentsPages.TelegraphicTransferPage.NewUIPayeeDetail).textContains(testData.Beneficiary.existingPayeeAcctNum+ramNumbers),
        ]);
        await browser.sleep(2000);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.globesendUpdatedPayeeValue);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(saveReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.ViewPagePayeedetail).textContains(testData.Beneficiary.existingPayeeAcctNum+ramNumbers),
        ]);
        
    
    });

    it('Edit SG Globesend in the submit page', async function () {
        await createGlobesend(false, false, false);
        await _PaymentsPages.singlePaymentPage.editBtn.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.loadConditionForglobesendSectionPage();
        await _PaymentsPages.singlePaymentPage.amount.input(SIT ? testData.GlobesendPayment.verifyAmount : testData.GlobesendPayment.UAT.verifyAmount);
        await browser.sleep(2000);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        // await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            verifyReference = text.trim();
        });
        console.log("globesend verifyref:"+verifyReference);
        console.log(verifyReference);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        if(!SIT){
            browser.sleep(5000);
        }
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.globesendExistingPayeeValue),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(SIT ? testData.GlobesendPayment.verifyAmount : testData.GlobesendPayment.UAT.verifyAmountValue),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.PendingVerification),
        ]);
    });

    it('Create Payment with save as template', async function () {
        await createGlobesend(false, true, false),testData.GlobesendPayment.globesendExistingPayeeValue;
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        console.log(reference);
        await browser.sleep(5000);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.globesendExistingPayeeValue),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForViewTTTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.singlePaymentPage.acctNmValue).textContains(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.amountValue).textContains(testData.GlobesendPayment.amount)
        ]);
    });
});

describe('SG Globesend payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.verifyUserId : testData.GlobesendPayment.UAT.verifyUserId, testData.GlobesendPayment.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Approval SG Globesend in the my approval list page', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        if(!SIT){
            browser.sleep(5000);
        }
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.GlobesendPayment.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.GlobesendPayment.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await browser.sleep(9000);//wait for MQ return
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    //add case for IDXP-1387
    //need completed status transaction,UAT only approved/received
    if(SIT){
    it('Recall GlobeSend in the view page', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Globesend Transfer", testData.status.Completed);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            txnReference = text.trim();
        });
        console.log("GlobesendRef:" + txnReference)
        await _PaymentsPages.singlePaymentPage.recallPaymentBtn.click();
        await _PaymentsPages.singlePaymentPage.confirmBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForRecallPage();
        await _PaymentsPages.singlePaymentPage.stopPaymentReasonSelect.select(testData.GlobesendPayment.recallReason);
        await _PaymentsPages.singlePaymentPage.nextBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewRecallPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmitRecallPage();
        await _PaymentsPages.singlePaymentPage.referenceNum.getText().then(text => {
            recallReference = text.trim();
        });
        console.log("RecallPaymentRef:" + recallReference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(recallReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewRecallPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.status).textContains(testData.GlobesendPayment.statusValue),
            await ensure(_PaymentsPages.singlePaymentPage.transactionType).textContains(testData.GlobesendPayment.transactionTypeValue),
            await ensure(_PaymentsPages.singlePaymentPage.txnReferenceNo).isVisible(),
        ]);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(txnReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Completed),
            await ensure(_PaymentsPages.singlePaymentPage.recallPaymentBtn).isNotElementPresent()
        ]);
    });
    }
    it('View SG Globesend screen do Verify', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        console.log("GlobesendRef:"+verifyReference)
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);

        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Globesend Transfer", testData.status.PendingVerification);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.verifyReleaseBtn.click();
        await _PaymentsPages.singlePaymentPage.verifyReleaseDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            approveReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approveReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval)
        ]);
    });

    it('View SG Globesend screen do Approve', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        if (0 !== approveReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approveReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Globesend Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await _PaymentsPages.singlePaymentPage.getChallengeBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            releaseReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(releaseReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Release SG Globesend in the release list page', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(releaseReference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.txnReleaseBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyReleasePreBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
});

describe('SG Globesend payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.verifyUserId,testData.GlobesendPayment.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
     //Add for R8.17 IDXP-1244
     it('Create SG Globesend with deduct amount check will display error message', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
        await newPayee();
        await _PaymentsPages.singlePaymentPage.deductAmount.input(testData.GlobesendPayment.amount);
        await browser.sleep(3000);
        await _PaymentsPages.singlePaymentPage.gstPayment.jsClick();
        await _PaymentsPages.singlePaymentPage.scrollTo(500, 1500)
        await _PaymentsPages.singlePaymentPage.gstPurposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.GlobesendPayment.purposeCodeValue);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.informationline1.click();
        await _PaymentsPages.singlePaymentPage.informationline1Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.informationline2.click();
        await _PaymentsPages.singlePaymentPage.informationline2Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.informationline3.click();
        await _PaymentsPages.singlePaymentPage.informationline3Value.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.errorMsgTitle).textContains(testData.GlobesendPayment.errorMsgTitle),
            await ensure(_PaymentsPages.singlePaymentPage.errorMsgContent).textContains(testData.GlobesendPayment.errorMsgContent)
        ])
        await _PaymentsPages.singlePaymentPage.backToPaymentBtn.click();
    });

    //Add for R8.19 IDXP-1386
    //check 'Please confirm the following before you proceed' pop up page,
    it('Create SG Globesend with MYR check before you proceed page', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.singlePaymentPage.exitPayment.jsClickIfExist();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.myrCcy);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.existingMYRPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount);
        await _PaymentsPages.singlePaymentPage.scrollTo(0, 1500)
        await _PaymentsPages.singlePaymentPage.gstPurposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.GlobesendPayment.purposeCodeValue3);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();

        await _PaymentsPages.singlePaymentPage.scrollTo(0, 1500)
        await _PaymentsPages.singlePaymentPage.approveAndSubmitBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.approveBtn.jsClick();
        await browser.sleep(5000)
        await ensure(_PaymentsPages.singlePaymentPage.beforeYouProceed).isElementPresent();
        await ensure(_PaymentsPages.singlePaymentPage.beforeYouProceedTitle).textContains(testData.GlobesendPayment.beforeYouProceedTitle);

        await _PaymentsPages.singlePaymentPage.cancelBtn.click();
        await _PaymentsPages.singlePaymentPage.approveAndSubmitBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.continueProceedBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            gstReference1 = text.trim();
        });
        console.log(gstReference1)
    });

    it('Multi approve SG Globesend with one MYR transaction check before you proceed page', async function () {
        // await createGlobesend(false, false, false);
        gstReference2 = reference;
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForNewByTx();
        await _ApprovalsPages.ApprovalPage.byTxnfilter.input(gstReference1);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.byTxnfilter.clean();
        await _ApprovalsPages.ApprovalPage.byTxnfilter.input(gstReference2);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.ReviewApproveBtn.jsClick();
        if(SIT){
            await _ApprovalsPages.ApprovalPage.loadConditionForNewReview();
        }else{
            await browser.sleep(2000);
            await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        }
        await _ApprovalsPages.ApprovalPage.ReviewPageApproveBtn.jsClick();
        await ensure(_PaymentsPages.singlePaymentPage.beforeYouProceed).isElementPresent();
        await ensure(_PaymentsPages.singlePaymentPage.beforeYouProceedTitle).textContains(testData.GlobesendPayment.beforeYouProceedTitle);
        await _PaymentsPages.singlePaymentPage.continueProceedBtn.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(gstReference1);
        console.log("gstReference1:"+gstReference1);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Completed,testData.status.Received),
        ]);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(gstReference2);
        console.log("gstReference2:"+gstReference2);
        if(!SIT){
            await browser.sleep(2000);
        }
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Completed,testData.status.Received),
        ]);
    });

    //Add for R8.20 IDXP-1434
    it('Create SG Globsend with JPY and use existing payee that without routing code', async function () {
        this.timeout(420000);
        await createJPYNewPayee(true);
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserIdPayeeRequireApprove : testData.GlobesendPayment.UAT.loginUserIdPayeeRequireApprove, testData.GlobesendPayment.UAT.password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.jpyCcy);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(newJPYPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount);
        await _PaymentsPages.singlePaymentPage.gstPayment.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.RoutingCode.input(testData.GlobesendPayment.routingCodeValueJPY);
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
        await _PaymentsPages.singlePaymentPage.oldinformationline1.input(testData.GlobesendPayment.oldaddInfor1);
        await _PaymentsPages.singlePaymentPage.oldinformationline2.input(testData.GlobesendPayment.oldaddInfor2);
        await _PaymentsPages.singlePaymentPage.oldinformationline3.input(testData.GlobesendPayment.oldaddInfor3);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        //await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newJPYPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
            await ensure(_PaymentsPages.singlePaymentPage.routingCodeView).textContains(testData.GlobesendPayment.routingCodeValueJPY),
        ]);
        //go to payee list check
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(newJPYPayeeName);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        
        await Promise.all([
            await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeName).textIs(newJPYPayeeName),
            await ensure(_PaymentsPages.BeneficiaryPage.routingCodeValue).textIs("-"),
        ]);
        await deletePayee(newJPYPayeeName);
    });

    it('Create SG Globsend with JPY and use existing payee that account number more than 7 charts', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, testData.GlobesendPayment.UAT.password);
        await createJPYNewPayee(false);
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserIdPayeeRequireApprove : testData.GlobesendPayment.UAT.loginUserIdPayeeRequireApprove, testData.GlobesendPayment.UAT.password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.jpyCcy);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(newJPYPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount);
        await Promise.all([
            await _PaymentsPages.singlePaymentPage.gstPayment.isDisabled(),
            await _PaymentsPages.singlePaymentPage.paymentTypeSection.textContains(testData.GlobesendPayment.gstDisableMsg)
        ]);
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, testData.GlobesendPayment.UAT.password);
        await deletePayee(newJPYPayeeName);
    });

    it('Edit payee not require approval then create SG Globsend with JPY with existing payee that account number more than 7 charts', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, testData.GlobesendPayment.UAT.password);
        await createJPYNewPayee(false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.jpyCcy);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(newJPYPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount);
        await _PaymentsPages.singlePaymentPage.gstPayment.jsClickIfExist(); 
        await _PaymentsPages.singlePaymentPage.confirmDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.acctNum.input(testData.GlobesendPayment.newPayeeAcctNumber);
        await _PaymentsPages.singlePaymentPage.saveAction.click();
        await _PaymentsPages.singlePaymentPage.RoutingCode.input(testData.GlobesendPayment.routingCodeValueJPY);
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.detailsToPayeeValue);
        await _PaymentsPages.singlePaymentPage.oldinformationline1.input(testData.GlobesendPayment.oldaddInfor1);
        await _PaymentsPages.singlePaymentPage.oldinformationline2.input(testData.GlobesendPayment.oldaddInfor2);
        await _PaymentsPages.singlePaymentPage.oldinformationline3.input(testData.GlobesendPayment.oldaddInfor3);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        //await _PaymentsPages.singlePaymentPage.approveLaterBtn.clickIfExist();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newJPYPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
            await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.GlobesendPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.singlePaymentPage.routingCodeView).textContains(testData.GlobesendPayment.routingCodeValueJPY),
        ]);
    });

    it('Edit payee not require approval then create SG Globsend with JPY with existing payee that account number more than 7 charts - go to payee list check', async function () {
        //go to payee list check
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(newJPYPayeeName);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        
        await Promise.all([
            await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeName).textIs(newJPYPayeeName),
            await ensure(_PaymentsPages.BeneficiaryPage.accountNumValue).textIs(testData.GlobesendPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.BeneficiaryPage.viewPageRoutingCode).textContains(testData.GlobesendPayment.routingCodeValueJPY),
        ]);
        console.log("newPayeeName:"+newJPYPayeeName);
        await deletePayee(newJPYPayeeName);
    });

    //add for IDXP-2051 maxLength limit
    it('Create SG Globesend with AMD check at create page', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.singlePaymentPage.exitPayment.jsClickIfExist();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.amdCcy);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.existingAMDPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        if('30'!==(await (_PaymentsPages.singlePaymentPage.oldinformationline1.getAttribute('maxlength')))){throw new Error('TexInput filed 1 length is not correct.'); }
        if('30'!==(await (_PaymentsPages.singlePaymentPage.oldinformationline2.getAttribute('maxlength')))){throw new Error('TexInput filed 2 length is not correct.'); }
        if('30'!==(await (_PaymentsPages.singlePaymentPage.oldinformationline3.getAttribute('maxlength')))){throw new Error('TexInput filed 3 length is not correct.'); }
        if('30'!==(await (_PaymentsPages.singlePaymentPage.oldinformationline4.getAttribute('maxlength')))){throw new Error('TexInput filed 4 length is not correct.'); }
    });





  
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.singlePaymentPage.sendCcy).textContains(testData.GlobesendPayment.ccyNew),
        await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
        await ensure(_PaymentsPages.singlePaymentPage.deductCcy).textContains(testData.GlobesendPayment.deductCcyValue),
        await ensure(_PaymentsPages.singlePaymentPage.deductAmt).textContains(SIT ? testData.GlobesendPayment.deductAmountValue : testData.GlobesendPayment.UAT.deductAmountValue),
        await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
        await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.GlobesendPayment.acctNumberValue),
        await ensure(_PaymentsPages.singlePaymentPage.add1View).textContains(testData.GlobesendPayment.add1Value),
        await ensure(_PaymentsPages.singlePaymentPage.add2View).textContains(testData.GlobesendPayment.add2Value),
        // await ensure(_PaymentsPages.singlePaymentPage.add3View).textContains(testData.GlobesendPayment.add3Value),
        await ensure(_PaymentsPages.singlePaymentPage.PaymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.singlePaymentPage.HashView).isNotEmpty(),
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await _PaymentsPages.singlePaymentPage.scrollTo(500, 1500),
        await ensure(_PaymentsPages.singlePaymentPage.bankNameView).textContains(SIT ? testData.GlobesendPayment.bankNameValue : testData.GlobesendPayment.UAT.bankNameValue),
        await ensure(_PaymentsPages.singlePaymentPage.bankLocationValue).textContains(testData.GlobesendPayment.payeeLocation),
        await ensure(_PaymentsPages.singlePaymentPage.bankSWIFTBICView).textContains(SIT ? testData.GlobesendPayment.bankID: testData.GlobesendPayment.UAT.bankID),
        await ensure(_PaymentsPages.singlePaymentPage.routingCodeView).textContains(testData.GlobesendPayment.routingCodeValue),
        await ensure(_PaymentsPages.singlePaymentPage.purposeOfPaymentView).textContains(testData.GlobesendPayment.purposeCodeValue),
        await ensure(_PaymentsPages.singlePaymentPage.paidByView).textContains(testData.GlobesendPayment.paidByVlue),
        await ensure(_PaymentsPages.singlePaymentPage.chargView).textContains(SIT ? testData.GlobesendPayment.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.singlePaymentPage.inforLine1View).textContains(testData.GlobesendPayment.addInfor1),
        // await ensure(_PaymentsPages.singlePaymentPage.inforLine2View).textContains(testData.GlobesendPayment.addInfor2),
        // await ensure(_PaymentsPages.singlePaymentPage.inforLine3View).textContains(testData.GlobesendPayment.addInfor3),
        // await ensure(_PaymentsPages.singlePaymentPage.inforLine4View).textContains(testData.GlobesendPayment.addInfor4),
        await ensure(_PaymentsPages.singlePaymentPage.gstDetailTopayee).textContains(testData.GlobesendPayment.detailsToPayeeValue),
        await ensure(_PaymentsPages.singlePaymentPage.emailValue).textContains(testData.GlobesendPayment.emailValue),
    ]);
}

export async function deletePayee(payeeName : string) {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(payeeName);
        if(!SIT){
            await browser.sleep(2000);
        }
        await _PaymentsPages.BeneficiaryPage.deletePayeeBtn.click();
        // if(!SIT){
        //     await _PaymentsPages.BeneficiaryPage.loadConditionForConfirmDeleteButton();
        // }
        await _PaymentsPages.BeneficiaryPage.confirmDelete.click();
        // if(!SIT){
        //     await _PaymentsPages.BeneficiaryPage.loadConditionForDismissButton();  
        // }
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
}

