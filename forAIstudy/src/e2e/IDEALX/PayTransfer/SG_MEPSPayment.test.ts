/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import * as moment from "moment";
// this from Online MEPS Create, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate for MEPS,then Approval
let reference2 = "";
// this from copy MEPS,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';
let referenceEdit='';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
let currentDate = moment(new Date()).format("DD MMM YYYY");

describe('SG_RTGS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MEPSPayment.SIT.loginCompanyId : testData.MEPSPayment.UAT.loginCompanyId, SIT ? testData.MEPSPayment.SIT.loginUserId : testData.MEPSPayment.UAT.loginUserId, 'P@ssword1A!'); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create RTGSPayment Payment with new Payee', async function () {
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
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.MEPSPayment.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.MEPSPayment.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
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
        await checkViewPageAllField(false); // for IDXP-812 
    });

    it('Create RTGSPayment with ApprovalNow with Mchanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
        await _PaymentsPages.MEPSPaymentPage.existingPayee.select(testData.MEPSPayment.existingPayee);
        await _PaymentsPages.MEPSPaymentPage.paymentType.jsClick();
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
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
        await _PaymentsPages.MEPSPaymentPage.approvalNowCheckBox.jsClick();
        // await ensure(_PaymentsPages.MEPSPaymentPage.MEPSmChanllengeText).textContains(testData.MEPSPayment.MEPSmChanllengeText);
        await _PaymentsPages.MEPSPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.MEPSPaymentPage.challengeResponse.input('OK');
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.MEPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create RTGSPayment with ApprovalNow without Mchanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA2);
        await _PaymentsPages.MEPSPaymentPage.existingPayee.select(testData.MEPSPayment.existingPayee);
        await _PaymentsPages.MEPSPaymentPage.paymentType.jsClick();
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.MEPSPaymentPage.paymentDetail.input(testData.MEPSPayment.paymentDetail);
        await _PaymentsPages.MEPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.MEPSPaymentPage.emailIdO.input(testData.MEPSPayment.emailIdO);
        await _PaymentsPages.MEPSPaymentPage.emailId1.input(testData.MEPSPayment.emailId1);
        await _PaymentsPages.MEPSPaymentPage.message.input(testData.MEPSPayment.message);
        await _PaymentsPages.MEPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.MEPSPaymentPage.transactionNote.input(testData.MEPSPayment.transactionNote);
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.approvalNowCheckBox.jsClick();
        // await ensure(_PaymentsPages.MEPSPaymentPage.MEPSwithoutMchanllenge).textContains(testData.MEPSPayment.MEPSWithoutChanllenge);
        await _PaymentsPages.MEPSPaymentPage.challengeResponse.input('OK');
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.MEPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(testData.status.PartialApproved),
        
        ]);
    });

   //Add for IEBAA-709
   it('Create RTGSPayment with existing payee', async function () {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click(); 
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.AccountTransferPage.makePayment.click();
    await _PaymentsPages.MEPSPaymentPage.loadCondition();
    await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
    await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
    await _PaymentsPages.MEPSPaymentPage.existingPayee.select(testData.MEPSPayment.existingRTGSPayee);
    await _PaymentsPages.MEPSPaymentPage.paymentType.jsClick();
    await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
    await _PaymentsPages.MEPSPaymentPage.paymentDetail.input(testData.MEPSPayment.paymentDetail);
    await _PaymentsPages.MEPSPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.MEPSPaymentPage.emailIdO.input(testData.MEPSPayment.emailIdO);
    await _PaymentsPages.MEPSPaymentPage.emailId1.input(testData.MEPSPayment.emailId1);
    await _PaymentsPages.MEPSPaymentPage.message.input(testData.MEPSPayment.message);
    await _PaymentsPages.MEPSPaymentPage.isTransactionNote.jsClick();
    await _PaymentsPages.MEPSPaymentPage.transactionNote.input(testData.MEPSPayment.transactionNote);
    await _PaymentsPages.MEPSPaymentPage.nextButton.click();
    await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
    await _PaymentsPages.MEPSPaymentPage.submitButton.click();
    await _PaymentsPages.MEPSPaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.MEPSPaymentPage.getIdealxInfoReferenceID().then(text => {
        paymentReference = text;
    });

    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
    await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

    await Promise.all([
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected,testData.status.PendingApproval),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.amountA1),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSpayeeNameValue).textContains(testData.MEPSPayment.existingRTGSPayee),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentTypeValue).textContains('Singapore RTGS Payment'),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentDateValue).textContains(currentDate),
        
        ]);
    });

    it('Create RTGSPayment with new payee and tick ApprovalNow ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
        await _PaymentsPages.MEPSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.MEPSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.MEPSPaymentPage.Country.select(testData.MEPSPayment.Country);
        await _PaymentsPages.MEPSPaymentPage.payeeBankID.select(testData.MEPSPayment.PayeebankIDSupportPARTIOR);
        await _PaymentsPages.MEPSPaymentPage.newPayeeAcctNumber.input(testData.MEPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.MEPSPaymentPage.newPayeeName.input(testData.MEPSPayment.newPayeeName);
        await _PaymentsPages.MEPSPaymentPage.newPayeeNickname.input(testData.MEPSPayment.newPayeeNickname);
        await _PaymentsPages.BeneficiaryPage.switchFormatButton.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.BeneficiaryPage.streetName.input(testData.Beneficiary.streetName);
        await _PaymentsPages.BeneficiaryPage.buildingNum.input(testData.Beneficiary.buildingNum);
        await _PaymentsPages.BeneficiaryPage.buildingName.input(testData.Beneficiary.buildingName);
        await _PaymentsPages.BeneficiaryPage.floor.input(testData.Beneficiary.floor);
        await _PaymentsPages.BeneficiaryPage.room.input(testData.Beneficiary.room);
        await _PaymentsPages.BeneficiaryPage.department.input(testData.Beneficiary.department);
        await _PaymentsPages.BeneficiaryPage.subDepartment.input(testData.Beneficiary.subDepartment);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.BeneficiaryPage.countrySubDivsion.input(testData.Beneficiary.countrySubDivsion);
        await _PaymentsPages.BeneficiaryPage.townLocationName.input(testData.Beneficiary.townLocationName);
        await _PaymentsPages.BeneficiaryPage.districtName.input(testData.Beneficiary.districtName);
        await _PaymentsPages.MEPSPaymentPage.paymentType.jsClick();
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
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
        await _PaymentsPages.MEPSPaymentPage.approvalNowCheckBox.jsClick();
        // await ensure(_PaymentsPages.MEPSPaymentPage.MEPSmChanllengeText).textContains(testData.MEPSPayment.MEPSmChanllengeText);
        await _PaymentsPages.MEPSPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.MEPSPaymentPage.challengeResponse.input('OK');
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.MEPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.amountA1),
            await ensure(_PaymentsPages.MEPSPaymentPage.newPayeeNameValue).textContains(testData.MEPSPayment.newPayeeName),
            await ensure(_PaymentsPages.MEPSPaymentPage.paymentTypeValue).textContains('Singapore RTGS Payment'),
            await ensure(_PaymentsPages.MEPSPaymentPage.paymentDateValue).textContains(currentDate)
        ]);
    });

    it('Create RTGSPayment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
        await _PaymentsPages.MEPSPaymentPage.existingPayee.select(testData.MEPSPayment.existingPayee);
        await _PaymentsPages.MEPSPaymentPage.paymentType.jsClick();
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.MEPSPaymentPage.paymentDetail.input(testData.MEPSPayment.paymentDetail);
        await _PaymentsPages.MEPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.MEPSPaymentPage.emailIdO.input(testData.MEPSPayment.emailIdO);
        await _PaymentsPages.MEPSPaymentPage.emailId1.input(testData.MEPSPayment.emailId1);
        await _PaymentsPages.MEPSPaymentPage.message.input(testData.MEPSPayment.message);
        await _PaymentsPages.MEPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.MEPSPaymentPage.transactionNote.input(testData.MEPSPayment.transactionNote);
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'MEPSTName' + generatedID();
        await _PaymentsPages.MEPSPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.MEPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.MEPSPaymentPage.fromAccountForTemplate).textContains(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.MEPSPaymentPage.amountForTemplate).textContains(testData.MEPSPayment.amountA1),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeNameForTemplate).textContains(testData.MEPSPayment.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.amountA1),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSpayeeNameValue).textContains(testData.MEPSPayment.existingPayee),
        ]);
    });

    it('Create RTGSPayment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.MEPSPayment.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        //await _PaymentsPages.MEPSPaymentPage.loadConditionCreatePayemntTemplate();
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).isNotEmpty(),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSpayeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create RTGSPayment with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
        await _PaymentsPages.MEPSPaymentPage.existingPayee.select(testData.MEPSPayment.existingPayee);
        await _PaymentsPages.MEPSPaymentPage.paymentType.jsClick();
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
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
        await _PaymentsPages.MEPSPaymentPage.saveAsDraft.click();
        await _PaymentsPages.MEPSPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.MEPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.amountA1),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSpayeeNameValue).textContains(testData.MEPSPayment.existingPayee),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(testData.status.Saved),

        ]);
    });

    it('Copy RTGSPayment Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await _PaymentsPages.MEPSPaymentPage.copyButton.jsClick();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.amount.clean();
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountV);
        await browser.sleep(3000);
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.amountV),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(testData.status.PendingVerification),
        ]);
    });

    it('Edit RTGSPayment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await _PaymentsPages.MEPSPaymentPage.editButton.click();
        await _PaymentsPages.MEPSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.amount.clean();
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.editAmount);
        await browser.sleep(3000);
        await _PaymentsPages.MEPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); // Add for IDXP-812
        } else {
        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.editAmount),
        ]);
        }
    });

    it('Reject RTGSPayment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await _PaymentsPages.MEPSPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.MEPSPaymentPage.reasonForRejection.input(testData.MEPSPayment.rejectReason);
        await _PaymentsPages.MEPSPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.MEPSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.MEPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Delete RTGSPayment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await _PaymentsPages.MEPSPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.MEPSPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.MEPSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.MEPSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.MEPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
    
    //Add forIDXP-2004
    it('Create RTGS Payment with existing payee that towncity no value check will display update payee detail pop up', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
        await _PaymentsPages.MEPSPaymentPage.existingPayee.select(testData.MEPSPayment.existingRTGSPayee1);
        await _PaymentsPages.MEPSPaymentPage.paymentType.jsClick();
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.MEPSPaymentPage.paymentDetail.input(testData.MEPSPayment.paymentDetail);
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.updatePayeePopUp).textContains(testData.MEPSPayment.updatePayeeDeatil),
        ]);
        await _PaymentsPages.TelegraphicTransferPage.closBtn.click();
    });
});

describe('SG_RTGSPayment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MEPSPayment.SIT.loginCompanyId : testData.MEPSPayment.UAT.loginCompanyId, SIT ? testData.MEPSPayment.SIT.verifyUserId : testData.MEPSPayment.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify RTGSPayment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'SG - RTGS Payment').then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve RTGSPayment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await _PaymentsPages.MEPSPaymentPage.approveButton.jsClick();
        await _PaymentsPages.MEPSPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.MEPSPaymentPage.challengeResponse.input('OK');
        await _PaymentsPages.MEPSPaymentPage.approveButton.jsClick();
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

    it('Release RTGSPayment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "SG - RTGS Payment").then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received,testData.status.Completed),
        ]);
    });
});

export async function checkViewPageAllField(isEdit:Boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(isEdit? testData.MEPSPayment.editAmount : testData.MEPSPayment.amountA1),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSnewPayeeAccountNumberValue).textContains(testData.MEPSPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(testData.status.PendingApproval),
        //Check all field
        await ensure(_PaymentsPages.MEPSPaymentPage.headerRefValue).textContains(isEdit? referenceEdit : reference),
        await ensure(_PaymentsPages.MEPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.newPayeeNameValue).textContains(testData.MEPSPayment.newPayeeName),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress1Value).textContains(testData.MEPSPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress2Value).textContains(testData.MEPSPayment.newPayeeAdd2),
        // await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress3Value).textContains(testData.MEPSPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentTypeValue).textContains(testData.MEPSPayment.paymentType),
        await ensure(_PaymentsPages.MEPSPaymentPage.sendAmountValue).textContains(isEdit? testData.MEPSPayment.editAmount : testData.MEPSPayment.amountA1),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankName).textContains(testData.MEPSPayment.payeeBankName),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankAdress1).textContains(testData.MEPSPayment.payeeBankAdress),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankSwiftBic).textIs(testData.MEPSPayment.PayeebankID),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankCode).textIs(testData.MEPSPayment.payeeBankCode),
        await ensure(_PaymentsPages.MEPSPaymentPage.IntermediaryBankSWIFTBIC).textIs(testData.MEPSPayment.intermediarySwiftBic),
        await ensure(_PaymentsPages.MEPSPaymentPage.IntermediaryBankName).textIs(testData.MEPSPayment.intermediaryBankName),
        await ensure(_PaymentsPages.MEPSPaymentPage.IntermediaryBankAdress).textContains(SIT ? testData.MEPSPayment.SIT.intermediaryBankAdress:testData.MEPSPayment.UAT.intermediaryBankAdress),
        await ensure(_PaymentsPages.MEPSPaymentPage.messageValue).textContains(testData.MEPSPayment.message),
        await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(testData.MEPSPayment.emailIdO),
        await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(testData.MEPSPayment.emailId1),
        await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(testData.MEPSPayment.emailId2),
        await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(testData.MEPSPayment.emailId3),
        await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(testData.MEPSPayment.emailId4),
        await ensure(_PaymentsPages.MEPSPaymentPage.totalDeductValue).textContains(isEdit? testData.MEPSPayment.editAmount : testData.MEPSPayment.amountA1),
        await ensure(_PaymentsPages.MEPSPaymentPage.referenceValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.MEPSPaymentPage.bankChargeValue).textContains(testData.MEPSPayment.bankChargeThey),
        //await ensure(_PaymentsPages.MEPSPaymentPage.chargeAcctValue).textContains(""), if choose they,chargeacctvalue not value
        await ensure(_PaymentsPages.MEPSPaymentPage.messageToApproverValue).textContains(testData.MEPSPayment.transactionNote),
        await ensure(_PaymentsPages.MEPSPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT)(
         await ensure(_PaymentsPages.MEPSPaymentPage.balanceValue).isNotEmpty()
    )
}

export async function addAddressAllFieldOldUI(format : string) {
    if(format.includes("sample")){
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
    }else{
        await _PaymentsPages.BeneficiaryPage.switchFormatButton.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.BeneficiaryPage.streetName.input(testData.Beneficiary.streetName);
        await _PaymentsPages.BeneficiaryPage.buildingNum.input(testData.Beneficiary.buildingNum);
        await _PaymentsPages.BeneficiaryPage.buildingName.input(testData.Beneficiary.buildingName);
        await _PaymentsPages.BeneficiaryPage.floor.input(testData.Beneficiary.floor);
        await _PaymentsPages.BeneficiaryPage.room.input(testData.Beneficiary.room);
        await _PaymentsPages.BeneficiaryPage.department.input(testData.Beneficiary.department);
        await _PaymentsPages.BeneficiaryPage.subDepartment.input(testData.Beneficiary.subDepartment);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.BeneficiaryPage.countrySubDivsion.input(testData.Beneficiary.countrySubDivsion);
        await _PaymentsPages.BeneficiaryPage.townLocationName.input(testData.Beneficiary.townLocationName);
        await _PaymentsPages.BeneficiaryPage.districtName.input(testData.Beneficiary.districtName);
    }
}