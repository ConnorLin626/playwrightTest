/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages,FilesPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE,generatedID } from '../../../lib';
import { browser, ExpectedConditions } from 'protractor';
import * as moment from 'moment';

let reference = "";
let reference2 = "";
let verifyReference = "";
let Editreference  = "";
let approvalReference  = "";
let CopyReference  = "";
let TemplateName = "";
let TemplateName2 = "";
let newPayeeNickName = "";
let fileName = "";
let paymentType = "";
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let _optPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('VN_testData.json');
let testData2 =  _FilesPages.fetchTestData('VN_testData.json');
let testData3 = _optPages.fetchTestData("VN_testData.json");
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/VN_uploadTestData.json');
let currentDate = moment(new Date()).format('DD MMM YYYY');

describe('VN_NAPASFastFund247', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.NAPASFastFund247.SIT.loginCompanyId : testData.NAPASFastFund247.UAT.loginCompanyId, SIT ? testData.NAPASFastFund247.SIT.loginUserId : testData.NAPASFastFund247.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });


    it('Create NAPASFastFund247 with new NAPAS Payee with Bank Account Number', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.VNLvtPage.loadCondition();
        await _PaymentsPages.VNLvtPage.fromAccount.select(SIT ? testData.NAPASFastFund247.SIT.fromAccount : testData.NAPASFastFund247.UAT.fromAccount);
        await _PaymentsPages.VNLvtPage.amount.input(testData.NAPASFastFund247.maxAmount);
        await _PaymentsPages.VNLvtPage.NEWNAPASPAYEETab.click();
        //DUE TO IDXP-2331,remove payeename filed
        //await _PaymentsPages.VNLvtPage.newPayeeName.input(testData.NAPASFastFund247.newPayeeName);
        await _PaymentsPages.VNLvtPage.payeeBankID.select(SIT ? testData.NAPASFastFund247.SIT.payeeBankID : testData.NAPASFastFund247.UAT.payeeBankID);
        await _PaymentsPages.VNLvtPage.newPayeeAcctNumber.input(testData.NAPASFastFund247.newPayeeAcctNumber);
        await browser.sleep(2000);
        await _PaymentsPages.VNLvtPage.VerifyBtn.click();
        await browser.wait(
            ExpectedConditions.visibilityOf(_PaymentsPages.VNLvtPage.RetrievedPayeeName.element),
        )
        await _PaymentsPages.VNLvtPage.newPayeeNickname.input(testData.NAPASFastFund247.newPayeeNickname);
        await _PaymentsPages.VNLvtPage.savePayee.jsClick();
        await _PaymentsPages.VNLvtPage.paymentDetail.input(testData.NAPASFastFund247.paymentDetails);
        await _PaymentsPages.VNLvtPage.nextButton.click();
        //Add for DASB-74531
        await ensure(_PaymentsPages.VNLvtPage.nicknameMsg).isNotElementPresent();
        await ensure(_PaymentsPages.VNLvtPage.nicknameMsgTop).textContains(testData.NAPASFastFund247.Msg),
        await _PaymentsPages.VNLvtPage.savePayee.click();
        await _PaymentsPages.VNLvtPage.nextButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
        // add for IDXLV-1947
        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(testData.NAPASFastFund247.cutoffTime),
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(currentDate),
        ])
        await _PaymentsPages.VNLvtPage.submitButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
        await _PaymentsPages.VNLvtPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(SIT ? testData.NAPASFastFund247.SIT.fromAccount : testData.NAPASFastFund247.UAT.fromAccount),
            await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.NAPASFastFund247.maxAmountValue),
            //DUE TO IDXP-2331,remove payeename filed
            //await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).textContains(testData.NAPASFastFund247.newPayeeName),
            await ensure(_PaymentsPages.VNLvtPage.acctNum).textContains(testData.NAPASFastFund247.newPayeeAcctNumber),
            // add for IDXLV-1947
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(testData.NAPASFastFund247.cutoffTime),
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(currentDate),
            await ensure(_PaymentsPages.VNLvtPage.bankName).textContains(testData.NAPASFastFund247.bankName),
            await ensure(_PaymentsPages.VNLvtPage.bankCountry).textContains(testData.NAPASFastFund247.bankCountry),
            await ensure(_PaymentsPages.VNLvtPage.bankCode).textContains(SIT ? testData.NAPASFastFund247.SIT.payeeBankID : testData.NAPASFastFund247.UAT.payeeBankID),
            await ensure(_PaymentsPages.VNLvtPage.paymentDetailValue).textContains(testData.NAPASFastFund247.paymentDetails),
        ]);
    });

    it('Edit NAPASFastFund247 via Transaction Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("VN - NAPAS FastFund 24/7", testData.status.PendingApproval);
        }
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.VNLvtPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.VNLvtPage.loadCondition();
        await _PaymentsPages.VNLvtPage.amount.clean();
        await _PaymentsPages.VNLvtPage.amount.input(testData.NAPASFastFund247.editAmount);
        await _PaymentsPages.VNLvtPage.newPayeeAcctNumber.clean();
        await _PaymentsPages.VNLvtPage.newPayeeAcctNumber.input(testData.NAPASFastFund247.editPayeeAcctNumber);
        await browser.sleep(2000);
        await _PaymentsPages.VNLvtPage.VerifyBtn.click();
         await browser.wait(
            ExpectedConditions.visibilityOf(_PaymentsPages.VNLvtPage.RetrievedPayeeName.element),
        )
        
        await _PaymentsPages.VNLvtPage.nextButton.jsClick();
        await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
        // add for IDXLV-1947
        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(testData.NAPASFastFund247.cutoffTime),
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(currentDate),
        ])
        await _PaymentsPages.VNLvtPage.submitButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
        await _PaymentsPages.VNLvtPage.getIdealxInfoReferenceID().then(text => {
            Editreference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(Editreference);
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(SIT ? testData.NAPASFastFund247.SIT.fromAccount : testData.NAPASFastFund247.UAT.fromAccount),
            await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.NAPASFastFund247.editAmountValue),
            
            //await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).textContains(testData.NAPASFastFund247.newPayeeName),
            await ensure(_PaymentsPages.VNLvtPage.acctNum).textContains(testData.NAPASFastFund247.editPayeeAcctNumber),
            // add for IDXLV-1947 issue
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(testData.NAPASFastFund247.cutoffTime),
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(currentDate),
            await ensure(_PaymentsPages.VNLvtPage.bankName).textContains(testData.NAPASFastFund247.bankName),
            await ensure(_PaymentsPages.VNLvtPage.bankCountry).textContains(testData.NAPASFastFund247.bankCountry),
            await ensure(_PaymentsPages.VNLvtPage.bankCode).textContains(SIT ? testData.NAPASFastFund247.SIT.payeeBankID : testData.NAPASFastFund247.UAT.payeeBankID),
            await ensure(_PaymentsPages.VNLvtPage.paymentDetailValue).textContains(testData.NAPASFastFund247.paymentDetails),
        ]);
    });

    it('Approve NAPASFastFund247 with m-challenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== Editreference.trim().length) {
                await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(Editreference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("VN - NAPAS FastFund 24/7", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.scrollToBottom();
        await _PaymentsPages.VNLvtPage.approveButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.NAPASFastFund247.challengeCode);
        await browser.sleep(5000);
        await _PaymentsPages.VNLvtPage.confirmapproveButton.click();
        await _PaymentsPages.VNLvtPage.getDialogReferenceID().then(text => {
                approvalReference = text;
            });
        await _PaymentsPages.VNLvtPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
        
        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.Completed, testData.status.BankRejected, testData.status.PendingRelease,testData.status.Received)
        ]);
    });
    it('Create NAPASFastFund247 with approval now push approval via new NAPAS Payee with Card number', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.VNLvtPage.loadCondition();
        await _PaymentsPages.VNLvtPage.fromAccount.select(SIT ? testData.NAPASFastFund247.SIT.fromAccount : testData.NAPASFastFund247.UAT.fromAccount);
        await _PaymentsPages.VNLvtPage.amount.input(testData.NAPASFastFund247.amount);
        await _PaymentsPages.VNLvtPage.NEWNAPASPAYEETab.click();
        //DUE TO IDXP-2331,remove payeename filed
        //await _PaymentsPages.VNLvtPage.newPayeeName.input(testData.NAPASFastFund247.newPayeeName);
        
        await _PaymentsPages.VNLvtPage.cardNumberBtn.click();
        await _PaymentsPages.VNLvtPage.cardNumber.input(testData.NAPASFastFund247.newCardNumber);
        await browser.sleep(2000);
        await _PaymentsPages.VNLvtPage.VerifyBtn.click();
         await browser.wait(
            ExpectedConditions.visibilityOf(_PaymentsPages.VNLvtPage.RetrievedPayeeName.element),
        )
        await _PaymentsPages.VNLvtPage.newPayeeNickname.input(testData.NAPASFastFund247.newPayeeNickname);
        await _PaymentsPages.VNLvtPage.paymentDetail.input(testData.NAPASFastFund247.paymentDetails);
        await _PaymentsPages.VNLvtPage.nextButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
        // add for IDXLV-1947 issue
        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(testData.NAPASFastFund247.cutoffTime),
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(currentDate),
        ])
        await _PaymentsPages.IntraCompanyTransferPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.AccountTransferPage.pushBtnButton.click();
        //await browser.sleep(3000);
        await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
        await _PaymentsPages.VNLvtPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.Completed, testData.status.BankRejected, testData.status.PendingRelease,testData.status.Received),
            await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(SIT ? testData.NAPASFastFund247.SIT.fromAccount : testData.NAPASFastFund247.UAT.fromAccount),
            await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.NAPASFastFund247.amountValue),
            //DUE TO IDXP-2331,remove payeename filed
            //await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).textContains(testData.NAPASFastFund247.newPayeeName),
            await ensure(_PaymentsPages.VNLvtPage.newCardNumberValue).textContains(testData.NAPASFastFund247.newCardNumberValue),
            await ensure(_PaymentsPages.VNLvtPage.paymentDetailValue).textContains(testData.NAPASFastFund247.paymentDetails),
        ]);
    });       


    it('Create NAPASFastFund247 with card number and save as template and for verify', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.VNLvtPage.loadCondition();
        await _PaymentsPages.VNLvtPage.fromAccount.select(SIT ? testData.NAPASFastFund247.SIT.fromAccount : testData.NAPASFastFund247.UAT.fromAccount);
        await _PaymentsPages.VNLvtPage.amount.input(testData.NAPASFastFund247.amount2);
        await _PaymentsPages.VNLvtPage.existingPayee.select(testData.NAPASFastFund247.existingCardPayee);
        await browser.sleep(1000);
        await _PaymentsPages.VNLvtPage.VerifyBtn.click();
         await browser.wait(
            ExpectedConditions.visibilityOf(_PaymentsPages.VNLvtPage.RetrievedPayeeName.element),
        )
    
        await _PaymentsPages.VNLvtPage.paymentDetail.input(testData.NAPASFastFund247.paymentDetails);
        await _PaymentsPages.VNLvtPage.nextButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
        // add for IDXLV-1947 issue
        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(testData.NAPASFastFund247.cutoffTime),
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(currentDate),
        ])
        await _PaymentsPages.TelegraphicTransferPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'VNNAPASFastFund' + generatedID();
        await _PaymentsPages.TelegraphicTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.VNLvtPage.submitButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
        await _PaymentsPages.VNLvtPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContains(testData.status.PendingVerification),
            await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(SIT ? testData.NAPASFastFund247.SIT.fromAccount : testData.NAPASFastFund247.UAT.fromAccount),
            await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.NAPASFastFund247.amountValue2),
            // add for IDXLV-1947
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(testData.NAPASFastFund247.cutoffTime),
            await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(currentDate),
            await ensure(_PaymentsPages.VNLvtPage.existingPayeeName).textContains(testData.NAPASFastFund247.existingCardPayee),
            await ensure(_PaymentsPages.VNLvtPage.existingCardNumberValue).textContains(testData.NAPASFastFund247.existingCardnumber),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForNAPAStempViewPayge();
                    
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccount).textContains(SIT ? testData.NAPASFastFund247.SIT.fromAccount : testData.NAPASFastFund247.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.amount).textContains(testData.NAPASFastFund247.amountValue2),
            await ensure(_PaymentsPages.PaymentTemplatesPage.beneficiary).textContains(testData.NAPASFastFund247.existingCardPayee),
            await ensure(_PaymentsPages.PaymentTemplatesPage.cardNumValue).textContains(testData.NAPASFastFund247.existingCardnumber),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateDomesticStatus).textIs(testData.status.Approved),
            ]);
        //add for avoid more than 3000 templates in the list so that can not load the newest one
        await deleteTemplate(TemplateName);
    });
    //IDXP-2331
    it('Create NAPASFastFund247 Template with new card number ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        //await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createSingleVNPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        TemplateName2 = 'NAPAS247Template' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(TemplateName2);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.NAPASFastFund247.SIT.fromAccount : testData.NAPASFastFund247.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.NAPASFastFund247.amount2);
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.NAPASFastFund247.maxAmount);
        await _PaymentsPages.PaymentTemplatesPage.newNAPAS246Payee.click();
        await _PaymentsPages.PaymentTemplatesPage.payToCardType.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.NewCardNum.input(testData.NAPASFastFund247.newCardNumber);
        await browser.sleep(1000);
        await _PaymentsPages.PaymentTemplatesPage.VerifyBtn.click();
        await browser.sleep(3000);
        newPayeeNickName = 'VNNAPASnewcardnumberpayee' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.newPayeeNickName.input(newPayeeNickName);
        await _PaymentsPages.PaymentTemplatesPage.paymentDetail.input(testData.NAPASFastFund247.paymentDetails);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName2);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForNAPAStempViewPayge();
                
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccount).textContains(SIT ? testData.NAPASFastFund247.SIT.fromAccount : testData.NAPASFastFund247.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.amount).textContains(testData.NAPASFastFund247.amountValue2),
            await ensure(_PaymentsPages.PaymentTemplatesPage.beneficiary).textContains(testData.NAPASFastFund247.newNAPASPaymentname),
            await ensure(_PaymentsPages.PaymentTemplatesPage.cardNumValue).textContains(testData.NAPASFastFund247.newCardNumberValue),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateDomesticStatus).textIs(testData.status.Approved),
            ]);

        //delete template
        await deleteTemplate(TemplateName2);
        //delete payee 
        await deletePayee(newPayeeNickName);
    });
 });

describe('Verify And Release A NAPASFastFund247', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.NAPASFastFund247.SIT.loginCompanyId : testData.NAPASFastFund247.UAT.loginCompanyId, SIT ? testData.NAPASFastFund247.SIT.verifyUserId : testData.NAPASFastFund247.UAT.verifyUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a NAPASFastFund247 via payment center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
                    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
                } else {
                    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("VN - NAPAS FastFund 24/7", testData.status.PendingVerification);
                }
        await _PaymentsPages.AccountTransferPage.scrollToBottom();
        await _PaymentsPages.VNLvtPage.Verifybutton.click();
        await _PaymentsPages.VNLvtPage.VerifyPaymentbutton.click();
        await _PaymentsPages.VNLvtPage.Dismissbutton.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a NAPASFastFund247 via payment center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("VN - NAPAS FastFund 24/7", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.scrollToBottom();
        await _PaymentsPages.VNLvtPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.NAPASFastFund247.challengeCode);
        await _PaymentsPages.VNLvtPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
              approvalReference = text;
        });
        await _PaymentsPages.VNLvtPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.Completed, testData.status.BankRejected, testData.status.PendingRelease,testData.status.Received)
        ]);
    });
});

describe('File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.NAPASFastFund247.SIT.loginCompanyId : testData.NAPASFastFund247.UAT.loginCompanyId, SIT ? testData.NAPASFastFund247.SIT.loginUserId : testData.NAPASFastFund247.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('FS upload Single NAPAS payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let paymentType = "ALL - Universal File Format";
        let approvalOption = "transaction";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData2.FSuploadFile.SIT.fileName2 : testData2.FSuploadFile.UAT.fileName2, approvalOption).then(async (data) => {
            fileName = data;
                });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
        await checkViewSingleNAPASPageAllField1(); // account number payee
        await _FilesPages.uploadFilePage.filesMenu.click(); 
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink2.jsClick();
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
        await checkViewSingleNAPASPageAllField2(); // card number payee
    });

    it('Copy NAPASFastFund247 that create from File Service', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click(); 
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink2.jsClick();
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.VNLvtPage.loadCondition();
        //await browser.sleep(2000);
        await _PaymentsPages.VNLvtPage.VerifyBtn.click();
        await browser.wait(
            ExpectedConditions.visibilityOf(_PaymentsPages.VNLvtPage.RetrievedPayeeName.element),
        )
        await _PaymentsPages.VNLvtPage.nextButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
        // add for IDXLV-1947 issue :NAPAS payment on weekend is rolled to next working date
        await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(testData.NAPASFastFund247.cutoffTime),
        await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(currentDate),
        await _PaymentsPages.VNLvtPage.submitButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
        await _PaymentsPages.VNLvtPage.getIdealxInfoReferenceID().then(text => {
            CopyReference  = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(CopyReference);
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
        await checkViewSingleNAPASPageAllField3();
    });

    
});
// account number payee
export async function checkViewSingleNAPASPageAllField1() {
    await Promise.all([
        await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.VNLvtPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(uploadTestData.SingleNAPAS.amountValue),
        await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(uploadTestData.SingleNAPAS.fromAccount),
        await ensure(_PaymentsPages.VNLvtPage.acctNum).textContains(uploadTestData.SingleNAPAS.newPayeeAcct),
        await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).textContains(uploadTestData.SingleNAPAS.newPayeeName),
        await ensure(_PaymentsPages.VNLvtPage.bankName).textContains(uploadTestData.SingleNAPAS.payeeBankNameValue),
        await ensure(_PaymentsPages.VNLvtPage.bankCode).textContains(uploadTestData.SingleNAPAS.bankCode),
        await ensure(_PaymentsPages.VNLvtPage.paymentDetailValue).textContains(uploadTestData.SingleNAPAS.paymentDetailsValue),
        await ensure(_PaymentsPages.VNLvtPage.paymentDateValue).isNotEmpty(),
        // add for IDXLV-1947 issue :NAPAS payment on weekend is rolled to next working date
        await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(testData.NAPASFastFund247.cutoffTime),
        await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(currentDate),
        await ensure(_PaymentsPages.VNLvtPage.paymentType).textContains(uploadTestData.SingleNAPAS.paymentTypeValue),
        await ensure(_PaymentsPages.VNLvtPage.sendAmountValue).textContains(uploadTestData.SingleNAPAS.amountValue),
        await ensure(_PaymentsPages.VNLvtPage.messageToPayee).textContains(uploadTestData.SingleNAPAS.msgToPayeeValue),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue1),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue2),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue3),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue4),
        await ensure(_PaymentsPages.VNLvtPage.deductAmountValue).isNotEmpty(),
        
    ]);
}

// card number payee
export async function checkViewSingleNAPASPageAllField2() {
    await Promise.all([
        await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.VNLvtPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(uploadTestData.SingleNAPAS.amountValue),
        await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(uploadTestData.SingleNAPAS.fromAccount),
        await ensure(_PaymentsPages.VNLvtPage.newCardNumberValue).textContains(uploadTestData.SingleNAPAS.newPayeeCardNumber),
        await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).textContains(uploadTestData.SingleNAPAS.newPayeeName),
        await ensure(_PaymentsPages.VNLvtPage.paymentDetailValue).textContains(uploadTestData.SingleNAPAS.paymentDetailsValue),
        await ensure(_PaymentsPages.VNLvtPage.paymentDateValue).isNotEmpty(),
        // add for IDXLV-1947 issue :NAPAS payment on weekend is rolled to next working date
        await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(testData.NAPASFastFund247.cutoffTime),
        await ensure(_PaymentsPages.VNLvtPage.approvalDateValue).textContains(currentDate),
        await ensure(_PaymentsPages.VNLvtPage.paymentType).textContains(uploadTestData.SingleNAPAS.paymentTypeValue),
        await ensure(_PaymentsPages.VNLvtPage.sendAmountValue).textContains(uploadTestData.SingleNAPAS.amountValue),
        await ensure(_PaymentsPages.VNLvtPage.messageToPayee).textContains(uploadTestData.SingleNAPAS.msgToPayeeValue),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue0),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue1),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue2),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue3),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue4),
        await ensure(_PaymentsPages.VNLvtPage.deductAmountValue).isNotEmpty(),
        
    ]);
}

export async function checkViewSingleNAPASPageAllField3() {
    await Promise.all([
        await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.VNLvtPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(uploadTestData.SingleNAPAS.amountValue),
        await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(uploadTestData.SingleNAPAS.fromAccount),
        await ensure(_PaymentsPages.VNLvtPage.newCardNumberValue).textContains(uploadTestData.SingleNAPAS.newPayeeCardNumber),
        await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).textContains(uploadTestData.SingleNAPAS.newPayeeName2),
        await ensure(_PaymentsPages.VNLvtPage.paymentDetailValue).textContains(uploadTestData.SingleNAPAS.paymentDetailsValue),
        await ensure(_PaymentsPages.VNLvtPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.VNLvtPage.paymentType).textContains(uploadTestData.SingleNAPAS.paymentTypeValue),
        await ensure(_PaymentsPages.VNLvtPage.sendAmountValue).textContains(uploadTestData.SingleNAPAS.amountValue),
        await ensure(_PaymentsPages.VNLvtPage.messageToPayee).textContains(uploadTestData.SingleNAPAS.msgToPayeeValue),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue0),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue1),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue2),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue3),
        await ensure(_PaymentsPages.VNLvtPage.emailList).textContains(uploadTestData.SingleNAPAS.emailValue4),
        await ensure(_PaymentsPages.VNLvtPage.deductAmountValue).isNotEmpty(),
        
    ]);
}

export async function deletePayee(payeename : string) {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(payeename);
        await _optPages.BeneficiaryPage.deletePayeeBtn.click();
        await _optPages.BeneficiaryPage.loadConditionForConfirmDeleteButton();
        await _optPages.BeneficiaryPage.confirmDelete.click();
        await _optPages.BeneficiaryPage.loadConditionForDismissButton();
        await _optPages.BeneficiaryPage.dismiss.click();
}
export async function deleteTemplate(templateName : string){
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
    await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
    await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
        templateName = text.trim();
    });
    await _PaymentsPages.PaymentTemplatesPage.deleteBtn.jsClick();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForDeletePage();
    await _PaymentsPages.PaymentTemplatesPage.preDeleteBtn.jsClick();  //preview delete
    await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
    await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
}