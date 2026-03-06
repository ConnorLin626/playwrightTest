/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let TemplateName = '';
let paymentReference = '';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');

describe('CN_Telegraphic Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a CN TT Payment with new Payee (type2)', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLocalOverseasPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select(testData.TelegraphicTransfer.Country);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd3.input(testData.TelegraphicTransfer.newPayeeAdd3);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.payeeBankID.select(SIT ? testData.TelegraphicTransfer.SIT.payeeBankID : testData.TelegraphicTransfer.UAT.payeeBankID);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeRoutingCode.input(testData.TelegraphicTransfer.newPayeeRoutingCode);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.intermediaryBankIsIntermediary.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.intermediaryBankCountry.select(testData.TelegraphicTransfer.intermediaryBankCountry);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.intermediaryBankID.select(testData.TelegraphicTransfer.intermediaryBankID);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurpose);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isTaxFreeGoods.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.contractNum.input(testData.TelegraphicTransfer.contractNum);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.transRemark1.input(testData.TelegraphicTransfer.transRemark1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.digiDocFileUploadButton.select(testData.TelegraphicTransfer.digidoc.uploadFileName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.DocType.select(testData.TelegraphicTransfer.DocumentType);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.utilizedAmount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isBeneAdvising.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isTransactionNote.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAcctNumber),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.paymentDateValue).isNotEmpty(),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.digiDocUploaded).textContains(testData.TelegraphicTransfer.digidoc.uploadFileName),
        ]);
    });

//     it('Create a CNTT Payment with ApprovalNow pMchllenge(Type 3 – Trade Related: Advance Payment)', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLocalOverseasPayee);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA2);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
// 		await _PaymentsPages.PaymentLocalOverseasPayeePage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurpose);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isTaxFreeGoods.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.contractNum.input(testData.TelegraphicTransfer.contractNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.transRemark1.input(testData.TelegraphicTransfer.transRemark1);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.advPmtAmt.input(testData.TelegraphicTransfer.advPmtAmt);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.propContractAmt.input(testData.TelegraphicTransfer.propContractAmt);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.expectedDeclDays.input(testData.TelegraphicTransfer.expectedDeclDays);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.remarks.input(testData.TelegraphicTransfer.remarks);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesShared.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isBeneAdvising.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.faxTab.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.faxCountryCode0.selectFirst();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.faxAreaCode0.input(testData.TelegraphicTransfer.faxAreaCode0);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.faxNo0.input(testData.TelegraphicTransfer.faxNo0);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.message.input(testData.TelegraphicTransfer.message);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isTransactionNote.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isMessageToOrderingBank.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.approvalNowCheckBox.jsClick();
//         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.pchallengeText).textContains(testData.TelegraphicTransfer.pMChllengeText);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input(testData.TelegraphicTransfer.challengeResponse);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
//             paymentReference = text;
//         });
//         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textIs(testData.status.PartialApproved),
//         ]);
//     });
//
//     it('Create a CNTT Payment with ApprovalNow pMchllenge(Type 3 – Capital)', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLocalOverseasPayee);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA2);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
// 		await _PaymentsPages.PaymentLocalOverseasPayeePage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurpose);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isTaxFreeGoods.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1Value2);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1Value2);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.contractNum.input(testData.TelegraphicTransfer.contractNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.transRemark1.input(testData.TelegraphicTransfer.transRemark1);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.transType.select(testData.TelegraphicTransfer.transactionType);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.certifApprNum.input(testData.TelegraphicTransfer.certifApprNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.remarks.input(testData.TelegraphicTransfer.remarks);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesShared.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isBeneAdvising.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.faxTab.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.faxCountryCode0.selectFirst();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.faxAreaCode0.input(testData.TelegraphicTransfer.faxAreaCode0);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.faxNo0.input(testData.TelegraphicTransfer.faxNo0);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.message.input(testData.TelegraphicTransfer.message);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isTransactionNote.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isMessageToOrderingBank.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.approvalNowCheckBox.jsClick();
//         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.pchallengeText).textContains(testData.TelegraphicTransfer.pMChllengeText);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input(testData.TelegraphicTransfer.challengeResponse);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
//             paymentReference = text;
//         });
//         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textIs(testData.status.PartialApproved),
//         ]);
//     });
//
//     it('Create a CNTT Payment with Save as Template(Type 1)', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLocalOverseasPayee);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountV);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(testData.TelegraphicTransfer.existingCNPayee);
// 		await _PaymentsPages.PaymentLocalOverseasPayeePage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurpose);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isTaxFreeGoods.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.pmtNature.select(testData.TelegraphicTransfer.pmtNature);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1Value2);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1Value2);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.contractNum.input(testData.TelegraphicTransfer.contractNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isBeneAdvising.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId1.input(testData.TelegraphicTransfer.emailId1);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId2.input(testData.TelegraphicTransfer.emailId2);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId3.input(testData.TelegraphicTransfer.emailId3);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId4.input(testData.TelegraphicTransfer.emailId4);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.message.input(testData.TelegraphicTransfer.message);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isTransactionNote.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isMessageToOrderingBank.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.savaAsTemplateCheckBox.jsClick();
//         TemplateName = 'CNTTTEMP' + generatedID();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.templateName.input(TemplateName);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
//             paymentReference = text;
//         });
//         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
//
//         await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
//         await _PaymentsPages.PaymentTemplatesPage.loadCondition();
//         await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
//         await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
//         await _PaymentsPages.PaymentTemplatesPage.loadConditionForTTtempViewPayge();
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.templateNameValue).textIs(TemplateName),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amountV),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingCNPayee),
//         ]);
//
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amountV),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingCNPayee),
//         ]);
//     });
//
//     it('Create a CNTT Payment from Template', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
//         await _PaymentsPages.PaymentTemplatesPage.loadCondition();
//         if (0 !== TemplateName.trim().length) {
//             await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
//         } else {
//             await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TelegraphicTransfer.existingTemplateName);
//         }
//         await _PaymentsPages.PaymentTemplatesPage.loadCondition();
//         await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionCreatePaymentTemplate();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
//             reference2 = text;
//         });
//         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).isNotEmpty(),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).isNotEmpty(),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toExistingPayeeNameValue).isNotEmpty(),
//         ]);
//     });
//
//     it('Create a CNTT with Save as Draft(Trade Related-Not Advance Payment–Declared Customs with No Goods)', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLocalOverseasPayee);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA1);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
// 		await _PaymentsPages.PaymentLocalOverseasPayeePage.counterptycntryCode.select(testData.TelegraphicTransfer.counterptycntryCode);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.specPmtPurpose.select(testData.TelegraphicTransfer.specPmtPurposeValue2);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isTaxFreeGoods.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.fxAppRefNum.input(testData.TelegraphicTransfer.fxAppRefNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.pmtBOPCategory1.select(testData.TelegraphicTransfer.pmtBOPCategory1);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.BOPseriesCode1.select(testData.TelegraphicTransfer.BOPseriesCode1);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.contractNum.input(testData.TelegraphicTransfer.contractNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.invoiceNum.input(testData.TelegraphicTransfer.invoiceNum);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.transRemark1.input(testData.TelegraphicTransfer.transRemark1);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.declareCustoms.select(testData.TelegraphicTransfer.declareCustoms);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.customsDeclCcy.select(testData.TelegraphicTransfer.customsDeclCcy);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.trdType.select(testData.TelegraphicTransfer.tradeType);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isBeneAdvising.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId1.input(testData.TelegraphicTransfer.emailId1);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId2.input(testData.TelegraphicTransfer.emailId2);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId3.input(testData.TelegraphicTransfer.emailId3);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId4.input(testData.TelegraphicTransfer.emailId4);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.message.input(testData.TelegraphicTransfer.message);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isTransactionNote.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.isMessageToOrderingBank.jsClick();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.saveAsDraft.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
//             paymentReference = text;
//         });
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textIs(testData.status.Saved),
//         ]);
//     });
//
//     it('Copy a CNTT via Transfer Center', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         if (0 !== reference2.trim().length) {
//             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
//         } else {
//             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("CN - Telegraphic Transfer", testData.status.PendingVerification);
//         }
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.copyButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.clean();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountV);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
//             reference3 = text;
//         });
//         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).isNotEmpty(),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).isNotEmpty(),
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContains(testData.status.PendingVerification),
//         ]);
//     });
//
//     it('Reject a CNTT Payment via Transfer Center', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         if (0 !== reference.trim().length) {
//             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
//         } else {
//             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("CN - Telegraphic Transfer", testData.status.PendingApproval);
//         }
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.rejectButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.reasonForRejection.input("reasonForRejection");
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.rejectDialogButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
//             reference = text;
//         });
//         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXRejectDialogSuccess();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textIs(testData.status.Rejected),
//         ]);
//     });
//
//     it('Edit a CNTT Payment via Transfer Center', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         if (0 !== reference.trim().length) {
//             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
//         } else {
//             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("CN - Telegraphic Transfer", testData.status.PendingApproval);
//         }
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.editButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.clean();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.editAmount);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
//             reference = text;
//         });
//         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).isNotEmpty(),
//         ]);
//     });
//
//     it('Delete a CNTT Payment via Transfer Center', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         if (0 !== reference.trim().length) {
//             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
//         } else {
//             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("CN - Telegraphic Transfer", testData.status.PendingApproval);
//         }
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.deleteButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.deleteDialogButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
//             reference = text;
//         });
//         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXRejectDialogSuccess();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.loadCondition();
//         await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
//
//         await Promise.all([
//             await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
//         ]);
//     });
//
// });
//
// describe('CN_Telegraphic Transfer_Approvals', async function () {
//     this.retries(browser.params.caseRetryTimes);
//     before(async function () { await new NavigatePages().loginCB(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.verifyUserId : testData.TelegraphicTransfer.UAT.verifyUserId); });
//     const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
//
//     it('Verify a CNTT Payment via My Verify', async function () {
//         await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
//         await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVeirfyTab();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
//         await _PaymentsPages.VerificationAndReleasesPage.verifyTab.click();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyTxnTab();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
//         await _PaymentsPages.VerificationAndReleasesPage.verifyTabByTxn.click();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyBtn();
//         if (0 !== reference3.trim().length) {
//             await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForVerifyTxn.input(reference3);
//         } else {
//             await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForVerifyTxnTW.select('CN - Telegraphic Transfer');
//         }
//         await _PaymentsPages.VerificationAndReleasesPage.goButtonForVerifyTxn.click();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
//         await _PaymentsPages.VerificationAndReleasesPage.verifyByTxnI3Select1stTxn.click();
//         await _PaymentsPages.VerificationAndReleasesPage.verifyTxnButton.click();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyPaymentPage();
//         await _PaymentsPages.VerificationAndReleasesPage.confirmVerifyI3Button.click();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyBtn();
//         await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
//         await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
//             paymentReference = text;
//         });
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContains(testData.status.PendingApproval),
//         ]);
//     });
//
//     it('Approve a CNTT Payment via Transfer Center', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         if (0 !== reference3.trim().length) {
//             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
//         } else {
//             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("CN - Telegraphic Transfer", testData.status.PendingApproval);
//         }
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input(testData.TelegraphicTransfer.challengeResponse);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.click();
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
//             paymentReference = text;
//         });
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
//         ]);
//     });
//
//     it('Release a CNTT Payment via My Release', async function () {
//         await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
//         await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTab();
//         await _PaymentsPages.VerificationAndReleasesPage.releaseTab.click();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTxnTab();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
//         await _PaymentsPages.VerificationAndReleasesPage.releaseTabByTxn.click();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseBtn();
//         if (0 !== reference3.trim().length) {
//             await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForReleaseTxn.input(reference3);
//         } else {
//             await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForReleaseTxn.select('CN - Telegraphic Transfer');
//         }
//         await _PaymentsPages.VerificationAndReleasesPage.goButtonForReleaseTxn.click();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
//         await _PaymentsPages.VerificationAndReleasesPage.releaseByTxnI3Select1stTxn.click();
//         await _PaymentsPages.VerificationAndReleasesPage.releaseTxnI3Button.click();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleasePaymentPage();
//         await _PaymentsPages.VerificationAndReleasesPage.confirmReleaseI3Button.click();
//         await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseBtn();
//         await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
//         await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
//             paymentReference = text;
//         });
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
//         await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
//
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
//         ]);
//     });
});
