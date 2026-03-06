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
let currentDate = moment(new Date()).format("DD MMM YYYY");
let reference = "";
let reference2 = "";
let EditReference = "";
let copyReference = "";
let templateName = '';

let testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

describe('Trade Finance - Sales Invoice Financing', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {await new NavigatePages().loginIdealx(SIT ? testData.SalesInvoiceFinancing.SIT.loginCompanyId : testData.SalesInvoiceFinancing.UAT.loginCompanyId,SIT ? testData.SalesInvoiceFinancing.SIT.loginUserId : testData.SalesInvoiceFinancing.UAT.loginUserId,"123123",)});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create the SIF application without SLI-Eway-Bill', async function () {
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.TradeFinancingPage.applicationMenu.click();
        //financing type
        await _TradeFinancePages.TradeFinancingPage.exportRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.yesRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.switchButton.jsClick();
        await _TradeFinancePages.TradeFinancingPage.buyername.click();
        await _TradeFinancePages.TradeFinancingPage.buyernameFilter.input(testData.SalesInvoiceFinancing.buyer);
        await _TradeFinancePages.TradeFinancingPage.buyernameSelect.click();
        await _TradeFinancePages.TradeFinancingPage.buyername.click();
        //financing details
        //await _TradeFinancePages.TradeFinancingPage.invoiceCcy.click();
        //await _TradeFinancePages.TradeFinancingPage.invoiceCcySearch.input(testData.SalesInvoiceFinancing.invoiceCcy);
        //await _TradeFinancePages.TradeFinancingPage.invoiceCcySelect.click();
        await _TradeFinancePages.TradeFinancingPage.invoiceAmount.input(testData.SalesInvoiceFinancing.invoiceAmt);
        await _TradeFinancePages.TradeFinancingPage.financedAmount.click();
        await _TradeFinancePages.TradeFinancingPage.financePeriod.click();
        await _TradeFinancePages.TradeFinancingPage.numberOfDaysSelect.click();
        await _TradeFinancePages.TradeFinancingPage.numberOfDaysInput.input(testData.SalesInvoiceFinancing.numberOfDays);
        await _TradeFinancePages.TradeFinancingPage.specificDateRadio.jsClick();    
        await _TradeFinancePages.TradeFinancingPage.financeValueDate.select(currentDate);
        await _TradeFinancePages.TradeFinancingPage.debitAccount.click();
        await _TradeFinancePages.TradeFinancingPage.debitAccountFilter.input(testData.SalesInvoiceFinancing.debitAccount);
        await _TradeFinancePages.TradeFinancingPage.debitAccountSelect.click();
        //shipment details
        await _TradeFinancePages.TradeFinancingPage.goodsRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.descriptionOfGoods.input(testData.SalesInvoiceFinancing.descriptionOfGoods);
        //disbursement instruction
        await _TradeFinancePages.TradeFinancingPage.loanDisburse.click();
        await _TradeFinancePages.TradeFinancingPage.disbursementCASelect.click();
        await _TradeFinancePages.TradeFinancingPage.creditAccount.click();
        await _TradeFinancePages.TradeFinancingPage.creditAccountFilter.input(testData.SalesInvoiceFinancing.creditAccount);
        await _TradeFinancePages.TradeFinancingPage.creditAccountSelect.click();
        await _TradeFinancePages.TradeFinancingPage.digiDocFileUploadButton.select(testData.SalesInvoiceFinancing.digiDocFile);
        await _TradeFinancePages.TradeFinancingPage.chargeAccount.click();
        await _TradeFinancePages.TradeFinancingPage.chargeAccountSelect.click();
        await _TradeFinancePages.TradeFinancingPage.specialInstructionsSwitch.click();
        await _TradeFinancePages.TradeFinancingPage.specialInstructions.input(testData.SalesInvoiceFinancing.specialInstruction);

        await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
        await _TradeFinancePages.TradeFinancingPage.message.input(testData.SalesInvoiceFinancing.messageToApprover);
        await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit();
        await _TradeFinancePages.TradeFinancingPage.tradeRefForSIF.getText().then(text => {
            reference = text.trim();
           });
        console.log(reference);           
        await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(reference);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.instructionsToBankField.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.TxnStatusForSIF).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRefForSIF).textIs(reference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.invoiceAmountValue).textContains(testData.SalesInvoiceFinancing.invoiceAmt),
            await ensure(await _TradeFinancePages.TradeFinancingPage.debitAccountValue).textContains(testData.SalesInvoiceFinancing.debitAccount),
            await ensure(await _TradeFinancePages.TradeFinancingPage.chargeNameValue).textContains(testData.SalesInvoiceFinancing.chargeAccountName),
            await ensure(await _TradeFinancePages.TradeFinancingPage.buyerAdress).textContains(testData.SalesInvoiceFinancing.buyerAdress),
        ]);     
    });
   
    it('Edit the the SIF application', async function () {
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.TradeFinancingPage.tradeTransactionsButton.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(reference);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.editBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForEditPage();
        await _TradeFinancePages.TradeFinancingPage.invoiceAmount.clean();
        await _TradeFinancePages.TradeFinancingPage.invoiceAmount.input(testData.SalesInvoiceFinancing.editInvoiceAmt);
        await _TradeFinancePages.TradeFinancingPage.financePeriod.click();
        console.log("SIFspecialDueDate1");
        await _TradeFinancePages.TradeFinancingPage.specialDueDateSelect.click();
        console.log("SIFspecialDueDate2");
        await _TradeFinancePages.TradeFinancingPage.financeMaturityDate.select(currentDate);
        await _TradeFinancePages.TradeFinancingPage.uponBankApprovalRadio.click();
        await _TradeFinancePages.TradeFinancingPage.servicesRadio.click();
        await _TradeFinancePages.TradeFinancingPage.descriptionOfServices.input(testData.SalesInvoiceFinancing.descriptionOfServices);
        await _TradeFinancePages.TradeFinancingPage.loanDisburse.click();
        await _TradeFinancePages.TradeFinancingPage.otherSelect.click();
        await _TradeFinancePages.TradeFinancingPage.disbursementOthers.input(testData.SalesInvoiceFinancing.Specify);
        await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
        await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit();
        await _TradeFinancePages.TradeFinancingPage.tradeRefForSIF.getText().then(text => {
                EditReference = text.trim();
            });
        await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(EditReference);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.shippingDetailsField.click();
        await _TradeFinancePages.TradeFinancingPage.disbursementInstructionField.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.TxnStatusForSIF).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRefForSIF).textIs(EditReference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.invoiceAmountValue).textContains(testData.SalesInvoiceFinancing.editInvoiceAmt),
            await ensure(await _TradeFinancePages.TradeFinancingPage.dueDateValue).isNotEmpty(),
            await ensure(await _TradeFinancePages.TradeFinancingPage.buyerAdress).textContains(testData.SalesInvoiceFinancing.buyerAdress),
            await ensure(await _TradeFinancePages.TradeFinancingPage.descriptionOfServicesValue).textContains(testData.SalesInvoiceFinancing.descriptionOfServices),
            await ensure(await _TradeFinancePages.TradeFinancingPage.disbursementOthersValue).textContains(testData.SalesInvoiceFinancing.Specify),
            await ensure(await _TradeFinancePages.TradeFinancingPage.financingValueDate).textContains(testData.SalesInvoiceFinancing.financingValueDate),
        ]);
    });

    it('Create the SIF application with SLI-Eway-Bill', async function () {
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.TradeFinancingPage.applicationMenu.click();
        //financing type
        await _TradeFinancePages.TradeFinancingPage.exportRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.yesRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.invoiceDocFileUploadButton.select2(testData.SalesInvoiceFinancing.fileName);
        await _TradeFinancePages.TradeFinancingPage.financePeriod.click();
        await _TradeFinancePages.TradeFinancingPage.numberOfDaysSelect.click();
        await _TradeFinancePages.TradeFinancingPage.numberOfDaysInput.input(testData.SalesInvoiceFinancing.numberOfDays);
        await _TradeFinancePages.TradeFinancingPage.specificDateRadio.jsClick();    
        await _TradeFinancePages.TradeFinancingPage.financeValueDate.select(currentDate);
        await _TradeFinancePages.TradeFinancingPage.debitAccount.click();
        await _TradeFinancePages.TradeFinancingPage.debitAccountFilter.input(testData.SalesInvoiceFinancing.debitAccount);
        await _TradeFinancePages.TradeFinancingPage.debitAccountSelect.click();
        //shipment details
        await _TradeFinancePages.TradeFinancingPage.goodsRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.descriptionOfGoods.input(testData.SalesInvoiceFinancing.descriptionOfGoods);
        //disbursement instruction
        await _TradeFinancePages.TradeFinancingPage.loanDisburse.click();
        await _TradeFinancePages.TradeFinancingPage.otherSelect.click();
        await _TradeFinancePages.TradeFinancingPage.disbursementOthers.input(testData.SalesInvoiceFinancing.Specify);
        await _TradeFinancePages.TradeFinancingPage.chargeAccount.click();
        await _TradeFinancePages.TradeFinancingPage.chargeAccountSelect.click();
        await _TradeFinancePages.TradeFinancingPage.specialInstructionsSwitch.click();
        await _TradeFinancePages.TradeFinancingPage.specialInstructions.input(testData.SalesInvoiceFinancing.specialInstruction);
    
        await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
        await _TradeFinancePages.TradeFinancingPage.message.input(testData.SalesInvoiceFinancing.messageToApprover);
        await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit();
        await _TradeFinancePages.TradeFinancingPage.tradeRefForSIF.getText().then(text => {
            reference2 = text.trim();
        });
        console.log(reference2);           
        await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();  
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(reference2);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.instructionsToBankField.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.TxnStatusForSIF).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRefForSIF).textIs(reference2),
            await ensure(await _TradeFinancePages.TradeFinancingPage.invoiceAmountValue).textContains(testData.SalesInvoiceFinancing.uploadinvoiceAmt),
            await ensure(await _TradeFinancePages.TradeFinancingPage.debitAccountValue).textContains(testData.SalesInvoiceFinancing.debitAccount),
            await ensure(await _TradeFinancePages.TradeFinancingPage.chargeNameValue).textContains(testData.SalesInvoiceFinancing.chargeAccountName),
            await ensure(await _TradeFinancePages.TradeFinancingPage.buyerAdress).textContains(testData.SalesInvoiceFinancing.uploadBuyerAddress),
        ]);

        });
    //update for AB-14621
     it('Copy the SIF application via view page', async function () {
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.TradeFinancingPage.tradeTransactionsButton.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(reference2);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.copyBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForEditPage();
        await _TradeFinancePages.TradeFinancingPage.invoiceDocFileUploadButton.select2(testData.SalesInvoiceFinancing.fileName);
        await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
        await _TradeFinancePages.TradeFinancingPage.message.input(testData.SalesInvoiceFinancing.messageToApprover);
        await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit();
        await _TradeFinancePages.TradeFinancingPage.tradeRefForSIF.getText().then(text => {
            copyReference = text.trim();
        });
        console.log(copyReference);           
        await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(copyReference);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.attachmentsField.click();
        await _TradeFinancePages.TradeFinancingPage.instructionsToBankField.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.TxnStatusForSIF).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRefForSIF).textIs(copyReference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.invoiceAmountValue).textContains(testData.SalesInvoiceFinancing.uploadinvoiceAmt),
            await ensure(await _TradeFinancePages.TradeFinancingPage.debitAccountValue).textContains(testData.SalesInvoiceFinancing.debitAccount),
            await ensure(await _TradeFinancePages.TradeFinancingPage.chargeNameValue).textContains(testData.SalesInvoiceFinancing.chargeAccountName),
            await ensure(await _TradeFinancePages.TradeFinancingPage.uploadFileValue).isNotEmpty(),
            await ensure(await _TradeFinancePages.TradeFinancingPage.buyerAdress).textContains(testData.SalesInvoiceFinancing.uploadBuyerAddress),
            ]);        
    });
    
    it('Save the SIF application as template via view page', async function () {
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.TradeFinancingPage.tradeTransactionsButton.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(copyReference);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.saveAsTemplateBtn.click();
        templateName = "EBSIF"+generatedID();
        await _TradeFinancePages.TradeFinancingPage.templateName.input(templateName);
        await _TradeFinancePages.TradeFinancingPage.confirmBtn.click();
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.TradeFinancingPage.tradeTransactionsButton.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(templateName);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.TxnStatusForSIF).textContainsLessOne(testData.status.Template),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRefForSIF).textIs(templateName),
            await ensure(await _TradeFinancePages.TradeFinancingPage.invoiceAmountValue).textContains(testData.SalesInvoiceFinancing.uploadinvoiceAmt),
        ]);     
    });
})