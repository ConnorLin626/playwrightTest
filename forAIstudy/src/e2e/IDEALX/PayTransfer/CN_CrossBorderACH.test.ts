/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure,randomNumbers, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference: string = null;
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');

describe('CN - Cross Border Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CrossBorder.SIT.loginCompanyId : testData.CrossBorder.UAT.loginCompanyId, SIT ? testData.CrossBorder.SIT.loginUserId : testData.CrossBorder.UAT.loginUserId,testData.CrossBorder.UAT.pinID ); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    
    //R8.14 add CROATIA + EUR
    it('Create a Cross Border ACH Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.isElementPresent().then(text => {
            if(text==false)
            {
            _PaymentsPages.CrossBoarderACHPage.page.click();
            }
        });
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(testData.CrossBorder.cROATIACtry);
        await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
        await _PaymentsPages.CrossBoarderACHPage.newPayee.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeName.input(testData.CrossBorder.newPayeeName);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeNickname.input(testData.CrossBorder.newPayeeNickname);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAdd1.input(testData.CrossBorder.newPayeeAdd1);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAdd2.input(testData.CrossBorder.newPayeeAdd2);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAdd3.input(testData.CrossBorder.newPayeeAdd3);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeBankID.input(testData.CrossBorder.payeeBankId);
        await _PaymentsPages.CrossBoarderACHPage.loadConditionForBank();
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNo);
        await _PaymentsPages.CrossBoarderACHPage.addPayeeBtn.click();
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amount);
        await _PaymentsPages.CrossBoarderACHPage.purposePaymentLine.input(testData.CrossBorder.purposePaymentLine);
        await _PaymentsPages.CrossBoarderACHPage.showHideDetail.click(); 
        await _PaymentsPages.CrossBoarderACHPage.paymentDetailLine.input(testData.CrossBorder.paymentDetail);
        await _PaymentsPages.CrossBoarderACHPage.counterPartyCode.select(testData.CrossBorder.counterPartyCode);
        await _PaymentsPages.CrossBoarderACHPage.specPmtPurpose.select(testData.CrossBorder.specPmtPurpose);
        await _PaymentsPages.CrossBoarderACHPage.pmtCategory1.select(testData.CrossBorder.pmtCategory1);
        await _PaymentsPages.CrossBoarderACHPage.seriesCode1.select(testData.CrossBorder.seriesCode1);
        await _PaymentsPages.CrossBoarderACHPage.cnttTransRemark1.input(testData.CrossBorder.cnttTransRemark1);
        await _PaymentsPages.CrossBoarderACHPage.MessageToPayee.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.Email1.input(testData.CrossBorder.Email1);
        await _PaymentsPages.CrossBoarderACHPage.Email2.input(testData.CrossBorder.Email2);
        await _PaymentsPages.CrossBoarderACHPage.Email3.input(testData.CrossBorder.Email3);
        await _PaymentsPages.CrossBoarderACHPage.Email4.input(testData.CrossBorder.Email4);
        await _PaymentsPages.CrossBoarderACHPage.Email5.input(testData.CrossBorder.Email5);
        await _PaymentsPages.CrossBoarderACHPage.Message.input(testData.CrossBorder.Message);
        await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.CrossBorder.amount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.CrossBorder.EUR),
        ]);
    });

    it('Create a Cross Border ACH Payment with upload file', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.isElementPresent().then(text => {
            if(text==false)
            {
            _PaymentsPages.CrossBoarderACHPage.page.click();
            _PaymentsPages.TransferCentersPage.loadCondition();
            }
        });
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(testData.CrossBorder.paymentCountry);
        await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
        await _PaymentsPages.CrossBoarderACHPage.addExistingPayee(SIT ? testData.CrossBorder.SIT.existingFilterValue : testData.CrossBorder.UAT.existingFilterValue);
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amount);
        await _PaymentsPages.CrossBoarderACHPage.purposePaymentLine.input(testData.CrossBorder.purposePaymentLine);
        await _PaymentsPages.CrossBoarderACHPage.counterPartyCode.select(testData.CrossBorder.counterPartyCode);
        await _PaymentsPages.CrossBoarderACHPage.specPmtPurpose.select(testData.CrossBorder.specPmtPurpose);
        await _PaymentsPages.CrossBoarderACHPage.pmtCategory1.select(testData.CrossBorder.pmtCategory1);
        await _PaymentsPages.CrossBoarderACHPage.seriesCode1.select(testData.CrossBorder.seriesCode1);
        await _PaymentsPages.CrossBoarderACHPage.cnttTransRemark1.input(testData.CrossBorder.cnttTransRemark1);
        await _PaymentsPages.CrossBoarderACHPage.digiDocFileUploadButton.select(testData.CrossBorder.fileName);
        await _PaymentsPages.CrossBoarderACHPage.DocType.select("Customs form")
        await _PaymentsPages.CrossBoarderACHPage.utilizedAmount.input(testData.CrossBorder.amount);
        await _PaymentsPages.CrossBoarderACHPage.showHideDetail.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.paymentDetailLine.input(testData.CrossBorder.paymentDetailLine);
        await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.CrossBorder.amount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.CrossBoarderACHPage.digiDocUploaded).textContains(testData.CrossBorder.fileName),
        ]);
    });
    //IDXP-2278 Cross Border
    it('edit a Cross Border ACH Payment with save as draft which payee be updated', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.isElementPresent().then(text => {
            if(text==false)
            {
            _PaymentsPages.CrossBoarderACHPage.page.click();
            }
        });
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(testData.CrossBorder.cROATIACtry);
        await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
        await _PaymentsPages.CrossBoarderACHPage.filterExistingPayee.input(testData.CrossBorder.updatedPayee);
        await _PaymentsPages.CrossBoarderACHPage.addPayee.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amount);
        await _PaymentsPages.CrossBoarderACHPage.purposePaymentLine.input(testData.CrossBorder.purposePaymentLine);
        await _PaymentsPages.CrossBoarderACHPage.showHideDetail.click(); 
        await _PaymentsPages.CrossBoarderACHPage.paymentDetailLine.input(testData.CrossBorder.paymentDetail);
        await _PaymentsPages.CrossBoarderACHPage.counterPartyCode.select(testData.CrossBorder.counterPartyCode);
        await _PaymentsPages.CrossBoarderACHPage.specPmtPurpose.select(testData.CrossBorder.specPmtPurpose);
        await _PaymentsPages.CrossBoarderACHPage.pmtCategory1.select(testData.CrossBorder.pmtCategory1);
        await _PaymentsPages.CrossBoarderACHPage.seriesCode1.select(testData.CrossBorder.seriesCode1);
        await _PaymentsPages.CrossBoarderACHPage.cnttTransRemark1.input(testData.CrossBorder.cnttTransRemark1);
        await _PaymentsPages.CrossBoarderACHPage.MessageToPayee.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.Email1.input(testData.CrossBorder.Email1);
        await _PaymentsPages.CrossBoarderACHPage.Email2.input(testData.CrossBorder.Email2);
        await _PaymentsPages.CrossBoarderACHPage.Email3.input(testData.CrossBorder.Email3);
        await _PaymentsPages.CrossBoarderACHPage.Email4.input(testData.CrossBorder.Email4);
        await _PaymentsPages.CrossBoarderACHPage.Email5.input(testData.CrossBorder.Email5);
        await _PaymentsPages.CrossBoarderACHPage.Message.input(testData.CrossBorder.Message);
        await _PaymentsPages.CrossBoarderACHPage.saveButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForDismissDialog();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        //await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        //edit payee
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.CrossBorder.updatedPayee);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
        //await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
        let ramNumbers = randomNumbers();
        //await _PaymentsPages.BeneficiaryPage.addAddress.jsClick();
        await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.accountNumber+ramNumbers);
        //await _PaymentsPages.BeneficiaryPage.checkBtn.click();
        await browser.sleep(2000);
        await _PaymentsPages.BeneficiaryPage.next.click();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
                
        //edit txn
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("Cross Border ACH", testData.status.Saved);
        }
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4ViewPaymentOldUI();
        await _PaymentsPages.CrossBoarderACHPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("One or more payee details have been updated."),
            await ensure(_PaymentsPages.CrossBoarderACHPage.payeeAccountDetail).textContains(testData.Beneficiary.accountNumber+ramNumbers),
        ]);
        await browser.sleep(2000);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
                            
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4ViewPaymentOldUI();
        await Promise.all([
        //await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.updatedPayee),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeAcctNum1).textContains(testData.Beneficiary.accountNumber+ramNumbers),
        ]);
                






    });
    
});
