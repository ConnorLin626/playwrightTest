/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { TradeFinancePages} from '../../../pages/Trade';
import { ensure, SIT, handlerCase,PROJECT_TYPE, generatedID} from "../../../lib";
import { browser } from 'protractor';
import * as moment from "moment";
import { Test } from 'mocha';

let _TradeFinancePages = new TradeFinancePages();
let newDate = moment(new Date()).format("DD MMM YYYY");
let tradeAmount = "";
let payeeName = "";
let reference = "";
let templateName = "";

let testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

describe('Trade Finance - Pre Shipment Financing', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {await new NavigatePages().loginIdealx(SIT ? testData.newPreShipmentFinancing.SIT.loginCompanyId : testData.newPreShipmentFinancing.UAT.loginCompanyId,SIT ? testData.newPreShipmentFinancing.SIT.loginUserId : testData.newPreShipmentFinancing.UAT.loginUserId,"123123",)});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it('Create the PSF application', async function () {
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.TradeFinancingPage.applicationMenu.click();
        await _TradeFinancePages.TradeFinancingPage.exportRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.noRadio.jsClick();

        await _TradeFinancePages.TradeFinancingPage.financingAgainstExportRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.exportLetterofCreditNumber.input(testData.newPreShipmentFinancing.exportLetterofCreditNumber);
        await _TradeFinancePages.TradeFinancingPage.switchButton.jsClick();
        //financing details
        await _TradeFinancePages.TradeFinancingPage.invoiceAmount.input(testData.newPreShipmentFinancing.invoiceAmt);
        await _TradeFinancePages.TradeFinancingPage.financePeriod.click();
        await _TradeFinancePages.TradeFinancingPage.numberOfDaysSelect.click();
        await _TradeFinancePages.TradeFinancingPage.numberOfDaysInput.input(testData.newPreShipmentFinancing.numberOfDays);
        await _TradeFinancePages.TradeFinancingPage.specificDateRadio.jsClick();    
        await _TradeFinancePages.TradeFinancingPage.financeValueDate.select(newDate);
        await _TradeFinancePages.TradeFinancingPage.debitAccount.click();
        await _TradeFinancePages.TradeFinancingPage.debitAccountFilter.input(testData.newPreShipmentFinancing.debitAccount);
        await _TradeFinancePages.TradeFinancingPage.debitAccountSelect.click();
        //shipment details
        await _TradeFinancePages.TradeFinancingPage.servicesRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.descriptionOfServices.input(testData.newPreShipmentFinancing.descriptionOfServices);
        //disbursement instruction
        await _TradeFinancePages.TradeFinancingPage.loanDisburse.click();
        await _TradeFinancePages.TradeFinancingPage.disbursementSelect.click();
        await _TradeFinancePages.TradeFinancingPage.payee.jsClick();
        await _TradeFinancePages.TradeFinancingPage.payeeFirstResultSelect.getText().then(text => {
            payeeName = text.trim();
        });
        await _TradeFinancePages.TradeFinancingPage.payeeFirstResultSelect.click(); 
        await _TradeFinancePages.TradeFinancingPage.payeeBank.click();
        await _TradeFinancePages.TradeFinancingPage.payeeBankSelect.click();
        await _TradeFinancePages.TradeFinancingPage.payeeBankAccount.input(testData.newPreShipmentFinancing.payeeBankAccount);
        await _TradeFinancePages.TradeFinancingPage.payeeRef.input(testData.newPreShipmentFinancing.payeeRef);
        await _TradeFinancePages.TradeFinancingPage.interBankSwitch.jsClick();
        await _TradeFinancePages.TradeFinancingPage.interBankLocation.click();
        await _TradeFinancePages.TradeFinancingPage.interBankLocationSelcet.click();
        await _TradeFinancePages.TradeFinancingPage.interBankId.click();
        await _TradeFinancePages.TradeFinancingPage.interBankSelect.click();
        
        await _TradeFinancePages.TradeFinancingPage.digiDocFileUploadButton.select(testData.newPreShipmentFinancing.fileName);

        //instructions to bank
        await _TradeFinancePages.TradeFinancingPage.chargeAccount.click();
        await _TradeFinancePages.TradeFinancingPage.chargeAccountSelect.click();
        await _TradeFinancePages.TradeFinancingPage.specialInstructionsSwitch.click();
        await _TradeFinancePages.TradeFinancingPage.specialInstructions.input(testData.newPreShipmentFinancing.specialInstruction);
        
        await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
        //await _TradeFinancePages.TradeFinancingPage.skipForNow.click();
        await _TradeFinancePages.TradeFinancingPage.message.input(testData.newPreShipmentFinancing.messageToApprover);
        await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit();
        await _TradeFinancePages.TradeFinancingPage.psfRef.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference);
        await _TradeFinancePages.TradeFinancingPage.doneBtn.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(reference);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.disbursementInstructionField.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).textContains(testData.newPreShipmentFinancing.invoiceAmt),
            await ensure(await _TradeFinancePages.TradeFinancingPage.psfRef).textIs(reference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewPSFTxnStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.TradeFinancingPage.payeeNameValue).textContains(payeeName),
        ]);     
    });

    it('Save the PSF application as template via view transaction page', async function () {
        await _TradeFinancePages.TradeFinancingPage.saveAsTemplateBtn.click();
        templateName = "EBPSF"+generatedID();
        await _TradeFinancePages.TradeFinancingPage.templateName.input(templateName);
        await _TradeFinancePages.TradeFinancingPage.confirmBtn.click();
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.TradeFinancingPage.tradeTransactionsButton.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(templateName);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.disbursementInstructionField.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).textContains(testData.newPreShipmentFinancing.invoiceAmt),
            await ensure(await _TradeFinancePages.TradeFinancingPage.psfRef).textIs(templateName),
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewPSFTxnStatus).textContains(testData.status.Template),
            await ensure(await _TradeFinancePages.TradeFinancingPage.payeeNameValue).textContains(payeeName),
        ]);
    });

    it('Edit the PSF application', async function () {
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.TradeFinancingPage.tradeTransactionsButton.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(reference);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.editBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForEditPage();
        await _TradeFinancePages.TradeFinancingPage.financingAgainstPurchaseRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.purchaseOrderReference.input(testData.newPreShipmentFinancing.purchaseOrderReference);
        await _TradeFinancePages.TradeFinancingPage.invoiceAmount.input(testData.newPreShipmentFinancing.editInvoiceAmt);
        await _TradeFinancePages.TradeFinancingPage.financePeriod.click();
        await _TradeFinancePages.TradeFinancingPage.specificDueDateTypeSelect.click();
        await _TradeFinancePages.TradeFinancingPage.specificDueDate.select(newDate);
        await _TradeFinancePages.TradeFinancingPage.debitAccount.click();
        await _TradeFinancePages.TradeFinancingPage.debitAccountFilter.input(testData.newPreShipmentFinancing.editDebitAccount);
        await _TradeFinancePages.TradeFinancingPage.debitAccountSelect.click();
        console.log(newDate);
        //Add for IEBAA-3500
        payeeName="TradeNewPayee"+generatedID();
        await _TradeFinancePages.TradeFinancingPage.payeeArrow.click();
        await _TradeFinancePages.TradeFinancingPage.addPayee.click();
        await _TradeFinancePages.TradeFinancingPage.newPayeeName.input(payeeName);
        await _TradeFinancePages.TradeFinancingPage.payeeAddreess.input(testData.newPreShipmentFinancing.payeeAddress);
        await _TradeFinancePages.TradeFinancingPage.payeeLocation.click();
        await _TradeFinancePages.TradeFinancingPage.searchPayeeLocation.input(testData.newPreShipmentFinancing.payeeLocation)
        await _TradeFinancePages.TradeFinancingPage.payeeLocationValue.click();
        await _TradeFinancePages.TradeFinancingPage.townCity.input(testData.newPreShipmentFinancing.townCity);
        await _TradeFinancePages.TradeFinancingPage.postalCode.input(testData.newPreShipmentFinancing.postalCode);
        await _TradeFinancePages.TradeFinancingPage.saveForFutrue.jsClick();
        await _TradeFinancePages.TradeFinancingPage.confirmButton.click();
        await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
        //await _TradeFinancePages.TradeFinancingPage.skipForNow.click();
        await _TradeFinancePages.TradeFinancingPage.message.input(testData.newPreShipmentFinancing.messageToApprover);
        await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit();
        await _TradeFinancePages.TradeFinancingPage.psfRef.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference);
        await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(reference);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.disbursementInstructionField.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).textContains(testData.newPreShipmentFinancing.editInvoiceAmt),
            await ensure(await _TradeFinancePages.TradeFinancingPage.psfRef).textIs(reference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewPSFTxnStatus).textContains(testData.status.PendingApproval),
            await ensure(await _TradeFinancePages.TradeFinancingPage.purchaseOrderReferenceValue).textContains(testData.newPreShipmentFinancing.purchaseOrderReference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.dueDateTitle).textContains('Due date'),
            await ensure(await _TradeFinancePages.TradeFinancingPage.psfDueDateValue).isNotEmpty(),
            await ensure(await _TradeFinancePages.TradeFinancingPage.debitAccountValue).textContains(testData.newPreShipmentFinancing.editDebitAccount),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyName).textContains(payeeName),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyAddress).textContains(testData.newPreShipmentFinancing.payeeAddress),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyTownCity).textContains(testData.newPreShipmentFinancing.townCity),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyCountry).textContains(testData.newPreShipmentFinancing.payeeLocation),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyPostalCode).textContains(testData.newPreShipmentFinancing.postalCode),
        ]);
    });

    it('Copy the PSF application from previous transaction', async function () {
        await _TradeFinancePages.TradeFinancingPage.payeeNameValue.getText().then(text => {
            payeeName = text.trim();
        });
        await _TradeFinancePages.TradeFinancingPage.tradeAmount.getText().then(text => {
            tradeAmount = text.trim();
        });
        await _TradeFinancePages.TradeFinancingPage.copyBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForEditPage();
        await _TradeFinancePages.TradeFinancingPage.digiDocFileUploadButton.select(testData.newPreShipmentFinancing.fileName);
        await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
        await _TradeFinancePages.TradeFinancingPage.message.input(testData.newPreShipmentFinancing.messageToApprover);
        await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit();
        await _TradeFinancePages.TradeFinancingPage.psfRef.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference);
        await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(reference);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.disbursementInstructionField.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).textContains(tradeAmount),
            await ensure(await _TradeFinancePages.TradeFinancingPage.psfRef).textIs(reference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewPSFTxnStatus).textContains(testData.status.PendingApproval),
            await ensure(await _TradeFinancePages.TradeFinancingPage.payeeNameValue).textContains(payeeName),
        ]);
    });
    
    it('Check Transaction Party can search the Party', async function () {
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadCondition();
        await _TradeFinancePages.transactionPartiesPage.txnPartyTab.click();
        await _TradeFinancePages.transactionPartiesPage.loadConditionForParty();    
        await _TradeFinancePages.transactionPartiesPage.filterButton.jsClick();
        await _TradeFinancePages.transactionPartiesPage.partyName.input(payeeName);
        await _TradeFinancePages.transactionPartiesPage.submitFilterButton.click();
        await _TradeFinancePages.transactionPartiesPage.record.jsClick();
        await _TradeFinancePages.transactionPartiesPage.editButton.click();
        await _TradeFinancePages.transactionPartiesPage.loadConditionForEditPartyPage();
        await Promise.all([
            await ensure(await _TradeFinancePages.transactionPartiesPage.partyName).textContains(payeeName),
            await ensure(await _TradeFinancePages.transactionPartiesPage.partyAdd1).textContains(testData.newPreShipmentFinancing.payeeAddress),
            await ensure(await _TradeFinancePages.transactionPartiesPage.locationName).textContains(testData.newPreShipmentFinancing.payeeLocation),
            await ensure(await _TradeFinancePages.transactionPartiesPage.townCity).textContains(testData.newPreShipmentFinancing.townCity),
            await ensure(await _TradeFinancePages.transactionPartiesPage.postalCode).textContains(testData.newPreShipmentFinancing.postalCode),
            await ensure(await _TradeFinancePages.transactionPartiesPage.benTransfer).isSelected()
            ])
            await _TradeFinancePages.transactionPartiesPage.cancelButton.click();
    });
})