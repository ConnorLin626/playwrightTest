/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
//for IDXP-1269
let reference4 = "";
let referenceEdit ="";
let TemplateName = '';
let paymentReference = '';
let verifyReference = '';
let approvalReference = '';
let _ApprovalsPages = new ApprovalsPages();
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');

describe('CN_Telegraphic Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, testData.TelegraphicTransfer.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a CN TT Payment with new Payee (type2)', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.TelegraphicTransfer.Country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(SIT ? testData.TelegraphicTransfer.SIT.payeeBankID : testData.TelegraphicTransfer.UAT.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testData.TelegraphicTransfer.newPayeeRoutingCode);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TelegraphicTransfer.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankIsIntermediary.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankCountry.select(testData.TelegraphicTransfer.intermediaryBankCountry);
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankID.select(testData.TelegraphicTransfer.intermediaryBankID);
        await _PaymentsPages.TelegraphicTransferPage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
        await _PaymentsPages.TelegraphicTransferPage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurpose);
        await _PaymentsPages.TelegraphicTransferPage.isTaxFreeGoods.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
        await _PaymentsPages.TelegraphicTransferPage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1);
        await _PaymentsPages.TelegraphicTransferPage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1);
        await _PaymentsPages.TelegraphicTransferPage.contractNum.input(testData.TelegraphicTransfer.contractNum);
        await _PaymentsPages.TelegraphicTransferPage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
        await _PaymentsPages.TelegraphicTransferPage.transRemark1.input(testData.TelegraphicTransfer.transRemark1);
        await _PaymentsPages.TelegraphicTransferPage.digiDocFileUploadButton.select(testData.TelegraphicTransfer.digidoc.uploadFileName);
        await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.TelegraphicTransfer.DocumentType);
        await _PaymentsPages.TelegraphicTransferPage.utilizedAmount.input(testData.TelegraphicTransfer.amountA1);
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
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await checkViewPageAllField(false); //add for IDXP-812
    });

    it('Create a CNTT Payment with ApprovalNow pMchllenge(Type 3 – Trade Related: Advance Payment)', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA2);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
        await _PaymentsPages.TelegraphicTransferPage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurpose);
        await _PaymentsPages.TelegraphicTransferPage.isTaxFreeGoods.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
        await _PaymentsPages.TelegraphicTransferPage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1);
        await _PaymentsPages.TelegraphicTransferPage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1);
        await _PaymentsPages.TelegraphicTransferPage.contractNum.input(testData.TelegraphicTransfer.contractNum);
        await _PaymentsPages.TelegraphicTransferPage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
        await _PaymentsPages.TelegraphicTransferPage.transRemark1.input(testData.TelegraphicTransfer.transRemark1);
        await _PaymentsPages.TelegraphicTransferPage.advPmtAmt.input(testData.TelegraphicTransfer.advPmtAmt);
        await _PaymentsPages.TelegraphicTransferPage.propContractAmt.input(testData.TelegraphicTransfer.propContractAmt);
        await _PaymentsPages.TelegraphicTransferPage.expectedDeclDays.input(testData.TelegraphicTransfer.expectedDeclDays);
        await _PaymentsPages.TelegraphicTransferPage.remarks.input(testData.TelegraphicTransfer.remarks);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesShared.jsClick();
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
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.pushOption.jsClickIfExist();
        await ensure(_PaymentsPages.TelegraphicTransferPage.pchallengeText).textContains(testData.TelegraphicTransfer.pMChllengeText);
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input(testData.TelegraphicTransfer.challengeResponse);
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });

        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a CNTT Payment with ApprovalNow pMchllenge(Type 3 – Capital)', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA2);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
        await _PaymentsPages.TelegraphicTransferPage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurpose);
        await _PaymentsPages.TelegraphicTransferPage.isTaxFreeGoods.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
        await _PaymentsPages.TelegraphicTransferPage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1Value2);
        await _PaymentsPages.TelegraphicTransferPage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1Value2);
        await _PaymentsPages.TelegraphicTransferPage.contractNum.input(testData.TelegraphicTransfer.contractNum);
        await _PaymentsPages.TelegraphicTransferPage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
        await _PaymentsPages.TelegraphicTransferPage.transRemark1.input(testData.TelegraphicTransfer.transRemark1);
        await _PaymentsPages.TelegraphicTransferPage.transType.select(testData.TelegraphicTransfer.transactionType);
        await _PaymentsPages.TelegraphicTransferPage.certifApprNum.input(testData.TelegraphicTransfer.certifApprNum);
        await _PaymentsPages.TelegraphicTransferPage.remarks.input(testData.TelegraphicTransfer.remarks);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesShared.jsClick();
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
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.pushOption.jsClickIfExist();
        await ensure(_PaymentsPages.TelegraphicTransferPage.pchallengeText).textContains(testData.TelegraphicTransfer.pMChllengeText);
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input(testData.TelegraphicTransfer.challengeResponse);
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a CNTT Payment with BOP code1 – Capital and BOP code2 – Capital)', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
        await _PaymentsPages.TelegraphicTransferPage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurpose);
        await _PaymentsPages.TelegraphicTransferPage.isTaxFreeGoods.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
        await _PaymentsPages.TelegraphicTransferPage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1Value2);
        await _PaymentsPages.TelegraphicTransferPage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1Value2);
        await _PaymentsPages.TelegraphicTransferPage.pmtBOPCategory2.select(testData.TelegraphicTransfer.pmtBOPCategory2Value1);
        await _PaymentsPages.TelegraphicTransferPage.BOPseriesCode2.select(testData.TelegraphicTransfer.BOPseriesCode2Value1);
        await _PaymentsPages.TelegraphicTransferPage.BOP1Amount.input(testData.TelegraphicTransfer.BOP1Amount);
        await _PaymentsPages.TelegraphicTransferPage.BOP2Amount.input(testData.TelegraphicTransfer.BOP2Amount);
        await _PaymentsPages.TelegraphicTransferPage.contractNum.input(testData.TelegraphicTransfer.contractNum);
        await _PaymentsPages.TelegraphicTransferPage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
        await _PaymentsPages.TelegraphicTransferPage.transRemark1.input(testData.TelegraphicTransfer.transRemark1);
        await _PaymentsPages.TelegraphicTransferPage.transType.select(testData.TelegraphicTransfer.transactionType);
        await _PaymentsPages.TelegraphicTransferPage.certifApprNum.input(testData.TelegraphicTransfer.certifApprNum);
        await _PaymentsPages.TelegraphicTransferPage.remarks.input(testData.TelegraphicTransfer.remarks);
        await _PaymentsPages.TelegraphicTransferPage.digiDocFileUploadButton.select(testData.TelegraphicTransfer.digidoc.uploadFileName);
        await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.TelegraphicTransfer.DocumentType);
        await _PaymentsPages.TelegraphicTransferPage.utilizedAmount.input(testData.TelegraphicTransfer.amountA1);
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
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference4 = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploaded).textContains(testData.TelegraphicTransfer.digidoc.uploadFileName),
            //Add for all field
            await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).textContains(reference4),
            await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeAcctValue).textContains(testData.TelegraphicTransfer.existingPayeeAcct),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(testData.TelegraphicTransfer.paymentType),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(testData.TelegraphicTransfer.paymentDetail),
            await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(testData.TelegraphicTransfer.message),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailIdO),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId3),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId4),
            await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(testData.TelegraphicTransfer.bankChargeUs),
            await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.localOfServiceValue).textContains(testData.TelegraphicTransfer.counterptycntryCode),
            await ensure(_PaymentsPages.TelegraphicTransferPage.specPmtPurposeValue).textContains(testData.TelegraphicTransfer.specPmtPurpose),
            await ensure(_PaymentsPages.TelegraphicTransferPage.isTaxFreeGoodsValue).textContains(testData.TelegraphicTransfer.isTaxFreeGoodsValue),
            await ensure(_PaymentsPages.TelegraphicTransferPage.pmtCategory2Value).textContains(testData.TelegraphicTransfer.pmtBOPCategory2Value1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.seriesCode2Value).textContains(testData.TelegraphicTransfer.BOPseriesCode2Value1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transRemark1Value).textContains(testData.TelegraphicTransfer.transRemark1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.custRefValue).textContains(reference4),
            await ensure(_PaymentsPages.TelegraphicTransferPage.messageToApproverValue).textContains(testData.TelegraphicTransfer.transactionNote),
            await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(testData.TelegraphicTransfer.messageToOrderingBank),
            await ensure(_PaymentsPages.TelegraphicTransferPage.nextApprover).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.activityLog).textContains("Create")
        ]);
    });

    it('Create a CNTT Payment with Save as Template(Type 1)', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountV);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
        await _PaymentsPages.TelegraphicTransferPage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurpose);
        await _PaymentsPages.TelegraphicTransferPage.isTaxFreeGoods.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.pmtNature.select(testData.TelegraphicTransfer.pmtNature);
        await _PaymentsPages.TelegraphicTransferPage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
        await _PaymentsPages.TelegraphicTransferPage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1Value2);
        await _PaymentsPages.TelegraphicTransferPage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1Value2);
        await _PaymentsPages.TelegraphicTransferPage.contractNum.input(testData.TelegraphicTransfer.contractNum);
        await _PaymentsPages.TelegraphicTransferPage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
        await _PaymentsPages.TelegraphicTransferPage.transRemark1.input(testData.TelegraphicTransfer.transRemark1);
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
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'CNTTTEMP' + generatedID();
        await _PaymentsPages.TelegraphicTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForTTtempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountV),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
        ]);

        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountV),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
        ]);
    });

    it('Create a CNTT Payment from Template', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        // if (0 !== TemplateName.trim().length) {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        // } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TelegraphicTransfer.existingTemplateName);
        // }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create a CNTT with Save as Draft(Trade Related-Not Advance Payment–Declared Customs with No Goods)', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
        await _PaymentsPages.TelegraphicTransferPage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurposeValue2);
        await _PaymentsPages.TelegraphicTransferPage.isTaxFreeGoods.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
        await _PaymentsPages.TelegraphicTransferPage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1);
        await _PaymentsPages.TelegraphicTransferPage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1);
        await _PaymentsPages.TelegraphicTransferPage.contractNum.input(testData.TelegraphicTransfer.contractNum);
        await _PaymentsPages.TelegraphicTransferPage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
        await _PaymentsPages.TelegraphicTransferPage.transRemark1.input(testData.TelegraphicTransfer.transRemark1);
        await _PaymentsPages.TelegraphicTransferPage.declareCustoms.select(testData.TelegraphicTransfer.declareCustoms);
        await _PaymentsPages.TelegraphicTransferPage.customsDeclCcy.select(testData.TelegraphicTransfer.customsDeclCcy);
        await _PaymentsPages.TelegraphicTransferPage.trdType.select(testData.TelegraphicTransfer.tradeType);
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
        await _PaymentsPages.TelegraphicTransferPage.saveAsDraft.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a CNTT via Transfer Center', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== paymentReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("CN - Telegraphic Transfer", testData.status.PendingVerification);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await browser.sleep(5000);
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountV);
        await browser.sleep(2000);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingVerification, testData.status.PendingApproval),
        ]);
    });

    it('Edit a CNTT Payment via Transfer Center', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("CN - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.editAmount);
        await browser.sleep(300);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); //Add for IDXP-812
        } else {
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
        ]);
        }
    });

    it('Reject a CNTT Payment via Transfer Center', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("CN - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.rejectButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.TelegraphicTransferPage.rejectDialogButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.TelegraphicTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.Rejected),
        ]);
    });
    
    it('Copy a CNTT Payment with IDR Currency)', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccountID : testData.TelegraphicTransfer.UAT.fromAccountID);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA2);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
        await _PaymentsPages.TelegraphicTransferPage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurpose);
        await _PaymentsPages.TelegraphicTransferPage.isTaxFreeGoods.jsClick();
        await _ApprovalsPages.TelegraphicTransferPage.pmtNNature.select("保税区");
        await _PaymentsPages.TelegraphicTransferPage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
        await _PaymentsPages.TelegraphicTransferPage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1);
        await _PaymentsPages.TelegraphicTransferPage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1);
        await _PaymentsPages.TelegraphicTransferPage.contractNum.input(testData.TelegraphicTransfer.contractNum);
        await _PaymentsPages.TelegraphicTransferPage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
        await _PaymentsPages.TelegraphicTransferPage.transRemark1.input(testData.TelegraphicTransfer.transRemark1);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesShared.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });

        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccountID : testData.TelegraphicTransfer.UAT.fromAccountID),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountA2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
        ]);
        //Copy this payment
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccountID : testData.TelegraphicTransfer.UAT.fromAccountID),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountA2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingVerification, testData.status.PendingApproval),
        ]);
    });

    it('Delete a CNTT Payment via Transfer Center', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("CN - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.deleteButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.deleteDialogButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.TelegraphicTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
});

describe('CN_Telegraphic Transfer_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.verifyUserId : testData.TelegraphicTransfer.UAT.verifyUserId, testData.TelegraphicTransfer.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a CNTT Payment via My Verify', async function () {

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'CN - Telegraphic Transfer').then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval),
        ]);
    });

    it('Approve a CNTT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("CN - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.approveButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input(testData.TelegraphicTransfer.challengeResponse);
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.TelegraphicTransferPage.approveButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.approveButton.jsClickIfExist();
        await browser.sleep(3000)
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejecteds),
        ]);
    });

    it('Release a CNTT Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, 'CN - Telegraphic Transfer').then(reference => {
            approvalReference = reference;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(isEdit ? testData.TelegraphicTransfer.editAmount :testData.TelegraphicTransfer.amountA1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAcctNumber),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploaded).textContains(testData.TelegraphicTransfer.digidoc.uploadFileName),
        //Add for all field
        await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).textContains(isEdit ? referenceEdit :reference),
        await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAcctNumber),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAdd1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAdd2),
       // await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAdd3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(testData.TelegraphicTransfer.paymentType),
        await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(testData.TelegraphicTransfer.payeeBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(testData.TelegraphicTransfer.payeeBankLocation),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).textContains(testData.TelegraphicTransfer.payeeBankAdd1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress2).textContains(testData.TelegraphicTransfer.payeeBankAdd2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankCity).textContains(testData.TelegraphicTransfer.payeeBankCity),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textIs(testData.TelegraphicTransfer.PayeeBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankName).textIs(SIT?testData.TelegraphicTransfer.intermediaryBankName:testData.TelegraphicTransfer.intermediaryuatBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankSWIFTBIC).textIs(testData.TelegraphicTransfer.intermediaryBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankAdress1).textContains(testData.TelegraphicTransfer.intermediaryBankCountry),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(testData.TelegraphicTransfer.paymentDetail),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(testData.TelegraphicTransfer.message),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailIdO),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId4),
        await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(testData.TelegraphicTransfer.bankChargeUs),
        await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.localOfServiceValue).textContains(testData.TelegraphicTransfer.counterptycntryCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.specPmtPurposeValue).textContains(testData.TelegraphicTransfer.specPmtPurpose),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isTaxFreeGoodsValue).textContains(testData.TelegraphicTransfer.isTaxFreeGoodsValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.approvalRefValue).textContains(testData.TelegraphicTransfer.fxAppRefNum),
        await ensure(_PaymentsPages.TelegraphicTransferPage.pmtCategory1Value).textContains(testData.TelegraphicTransfer.pmtBOPCategory1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.seriesCode1Value).textContains(testData.TelegraphicTransfer.BOPseriesCode1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.contractNumValue).textContains(testData.TelegraphicTransfer.contractNum),
        await ensure(_PaymentsPages.TelegraphicTransferPage.invoiceNumValue).textContains(testData.TelegraphicTransfer.invoiceNum),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transRemark1Value).textContains(testData.TelegraphicTransfer.transRemark1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.custRefValue).textContains(isEdit ? referenceEdit :reference),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageToApproverValue).textContains(testData.TelegraphicTransfer.transactionNote),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(testData.TelegraphicTransfer.messageToOrderingBank),
        await ensure(_PaymentsPages.TelegraphicTransferPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}
