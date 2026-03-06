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
let reference = "";
let testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

let createPIF = async function (isCNY:boolean) {
    await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
    await _TradeFinancePages.TradeFinancingPage.applicationMenu.click();
    //financing type
    await _TradeFinancePages.TradeFinancingPage.importRadio.jsClick();
    if(isCNY){
        await _TradeFinancePages.TradeFinancingPage.noRadio.jsClick();
    }else{
        await _TradeFinancePages.TradeFinancingPage.yesRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.goodAndServiceRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.switchButton.jsClick();
    }
    await _TradeFinancePages.TradeFinancingPage.internationalRadio.jsClick();
    //financing applicant
    await _TradeFinancePages.TradeFinancingPage.applicantFrom.click();
    await _TradeFinancePages.TradeFinancingPage.applicantFilter.input(testData.purchaseInvoiceFinanceCN.applicant);
    await _TradeFinancePages.TradeFinancingPage.applicantSelectFirst.click();
    //financing supplier
    await _TradeFinancePages.TradeFinancingPage.supplierFrom.click();
    await _TradeFinancePages.TradeFinancingPage.supplierFilter.input(testData.purchaseInvoiceFinanceCN.supplier);
    await _TradeFinancePages.TradeFinancingPage.supplierSelect.click();
    //financing details
    if(isCNY){
        await _TradeFinancePages.TradeFinancingPage.invoiceCcy.click();
        await _TradeFinancePages.TradeFinancingPage.invoiceCcySearch.input(testData.purchaseInvoiceFinanceCN.invoiceCcy);
        await _TradeFinancePages.TradeFinancingPage.invoiceCcySelect.click();
    }
    await _TradeFinancePages.TradeFinancingPage.invoiceAmount.input(testData.purchaseInvoiceFinanceCN.invoiceAmt);
    await _TradeFinancePages.TradeFinancingPage.financePeriod.click();
    await _TradeFinancePages.TradeFinancingPage.numberOfDaysSelect.click();
    await _TradeFinancePages.TradeFinancingPage.numberOfDaysInput.input(testData.purchaseInvoiceFinanceCN.numberOfDays);
    await _TradeFinancePages.TradeFinancingPage.specificDateRadio.jsClick();   
    await _TradeFinancePages.TradeFinancingPage.financeValueDate.select(newDate);
    // Debit Upon Loan Maturity  comment out for AB-14621 
    //await _TradeFinancePages.TradeFinancingPage.debitAccount.click();
    //await _TradeFinancePages.TradeFinancingPage.debitAccountFilter.input(testData.purchaseInvoiceFinanceCN.debitAccount);
    //await _TradeFinancePages.TradeFinancingPage.debitAccountSelect.click();
    //shipment details
    await _TradeFinancePages.TradeFinancingPage.goodsRadio.jsClick();
    await _TradeFinancePages.TradeFinancingPage.descriptionOfGoods.input(testData.purchaseInvoiceFinanceCN.descriptionOfGoods);
    //disbursement instruction
    await _TradeFinancePages.TradeFinancingPage.loanDisburse.click();
    await _TradeFinancePages.TradeFinancingPage.disbursementSelect.click();
    await _TradeFinancePages.TradeFinancingPage.bankLocation.click();
    await _TradeFinancePages.TradeFinancingPage.bankLocationFilter.input(testData.purchaseInvoiceFinanceCN.bankLocation);
    await _TradeFinancePages.TradeFinancingPage.bankLocationSelect.click(); 
    await _TradeFinancePages.TradeFinancingPage.payeeBank.click();
    await _TradeFinancePages.TradeFinancingPage.payeeBankSelect.click();
    await _TradeFinancePages.TradeFinancingPage.payeeBankAccount.input(testData.purchaseInvoiceFinanceCN.payeeBankAccount);
    await _TradeFinancePages.TradeFinancingPage.payeeRef.input(testData.purchaseInvoiceFinanceCN.payeeRef);
    await _TradeFinancePages.TradeFinancingPage.interBankSwitch.jsClick();
    await _TradeFinancePages.TradeFinancingPage.interBankLocation.click();
    await _TradeFinancePages.TradeFinancingPage.interBankLocationSelcet.click();
    await _TradeFinancePages.TradeFinancingPage.interBankId.click();
    await _TradeFinancePages.TradeFinancingPage.interBankSelect.click();
    //regulatory reporting 
    await _TradeFinancePages.TradeFinancingPage.applicantReportAccount.click();
    await _TradeFinancePages.TradeFinancingPage.reportAccountFilter.input(testData.purchaseInvoiceFinanceCN.reportAccount);
    await _TradeFinancePages.TradeFinancingPage.reportAccountSelect.click();
    await _TradeFinancePages.TradeFinancingPage.fullRef.input(testData.purchaseInvoiceFinanceCN.fullRef);
    await _TradeFinancePages.TradeFinancingPage.transactionRemark1.input(testData.purchaseInvoiceFinanceCN.transactionRemark1);
    await _TradeFinancePages.TradeFinancingPage.contractNumber.input(testData.purchaseInvoiceFinanceCN.contractNumber);
    if(isCNY){
        await _TradeFinancePages.TradeFinancingPage.proportionOfContractAmt.input(testData.purchaseInvoiceFinanceCN.proportionOfContractAmt);
        await _TradeFinancePages.TradeFinancingPage.declarationDays.input(testData.purchaseInvoiceFinanceCN.declarationDays);
        await _TradeFinancePages.TradeFinancingPage.additionalRemarks.input(testData.purchaseInvoiceFinanceCN.additionalRemarks);
    }
    await _TradeFinancePages.TradeFinancingPage.digiDocFileUploadButton.select(testData.purchaseInvoiceFinanceCN.fileName);
    //instructions to bank
    await _TradeFinancePages.NewBankerGuaranteeIssuancePage.scrollTo(0,5500);
    //  Application Issuing Charges  comment out for AB-14621 
    //await _TradeFinancePages.TradeFinancingPage.chargeAccount.click();
    //await _TradeFinancePages.TradeFinancingPage.chargeAccountSelect.click();
    await _TradeFinancePages.TradeFinancingPage.specialInstructionsSwitch.click();
    await _TradeFinancePages.TradeFinancingPage.specialInstructions.input(testData.purchaseInvoiceFinanceCN.specialInstruction);

    await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
    //until IEBAA-3500 dev
    //await _TradeFinancePages.TradeFinancingPage.skipForNow.jsClickIfExist();
    await _TradeFinancePages.TradeFinancingPage.message.input(testData.purchaseInvoiceFinanceCN.messageToApprover);
    await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
    await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit2();
    await _TradeFinancePages.TradeFinancingPage.tradeRef.getText().then(text => {
        reference = text.trim();
    });
    console.log(reference);           
    await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
    await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
}


describe('Trade Finance - CN Purchase Invoice Finaning', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {await new NavigatePages().loginIdealx(SIT ? testData.purchaseInvoiceFinanceCN.SIT.loginCompanyId : testData.purchaseInvoiceFinanceCN.UAT.loginCompanyId,SIT ? testData.purchaseInvoiceFinanceCN.SIT.loginUserId : testData.purchaseInvoiceFinanceCN.UAT.loginUserId,"123123",)});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it('Create the PIF application - CN - Scenario 1', async function () {
        this.timeout(480000);
        await createPIF(false);
        await _TradeFinancePages.TradeFinancingPage.goToViewPageViaRef(reference);
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.instructionsToBankField.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewTxnStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).textContains(testData.purchaseInvoiceFinanceCN.invoiceAmt),
            await ensure(await _TradeFinancePages.TradeFinancingPage.supplierName).textContains(testData.purchaseInvoiceFinanceCN.supplier),
            await ensure(await _TradeFinancePages.TradeFinancingPage.debitAccountBlankValue).textContains(testData.purchaseInvoiceFinanceCN.debitAccount),
            await ensure(await _TradeFinancePages.TradeFinancingPage.chargeAccountValue).textContains(testData.purchaseInvoiceFinanceCN.ChargeAccount),
        ]);     
    });

    it('Create the PIF application - CN - Scenario 2', async function () {
        this.timeout(480000);
        await createPIF(true);
        await _TradeFinancePages.TradeFinancingPage.goToViewPageViaRef(reference);
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.instructionsToBankField.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewTxnStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).textContains(testData.purchaseInvoiceFinanceCN.invoiceAmt),
            await ensure(await _TradeFinancePages.TradeFinancingPage.supplierName).textContains(testData.purchaseInvoiceFinanceCN.supplier),
            await ensure(await _TradeFinancePages.TradeFinancingPage.debitAccountBlankValue).textContains(testData.purchaseInvoiceFinanceCN.debitAccount),
            await ensure(await _TradeFinancePages.TradeFinancingPage.chargeAccountValue).textContains(testData.purchaseInvoiceFinanceCN.ChargeAccount),
        ]);     
    });

    it('Edit the PIF application - CN Regulatory reporting section', async function () {
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.TradeFinancingPage.tradeTransactionsButton.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(reference);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.editBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForEditPage();
        await _TradeFinancePages.TradeFinancingPage.applicantReportAccount.click();
        await _TradeFinancePages.TradeFinancingPage.reportAccountFilter.input(testData.purchaseInvoiceFinanceCN.editReportAccount);
        await _TradeFinancePages.TradeFinancingPage.reportAccountSelect.click();
        await _TradeFinancePages.TradeFinancingPage.paymentNature.click();
        await _TradeFinancePages.TradeFinancingPage.paymentNatureSelect.click();
        await _TradeFinancePages.TradeFinancingPage.taxFreeYesRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.fullRef.input(testData.purchaseInvoiceFinanceCN.editFullRef);
        await _TradeFinancePages.TradeFinancingPage.bopCode.click();
        await _TradeFinancePages.TradeFinancingPage.bopCodeFilter.input(testData.purchaseInvoiceFinanceCN.editBopCode);
        await _TradeFinancePages.TradeFinancingPage.bopCodeSelect.click();
        await _TradeFinancePages.TradeFinancingPage.transactionRemark1.input(testData.purchaseInvoiceFinanceCN.editBopCode);
        await _TradeFinancePages.TradeFinancingPage.contractNumber.input(testData.purchaseInvoiceFinanceCN.editContractNumber);
        await _TradeFinancePages.TradeFinancingPage.proportionOfContractAmt.input(testData.purchaseInvoiceFinanceCN.editProportionOfContractAmt);
        await _TradeFinancePages.TradeFinancingPage.declarationDays.input(testData.purchaseInvoiceFinanceCN.editDeclarationDays);
        await _TradeFinancePages.TradeFinancingPage.additionalRemarks.input(testData.purchaseInvoiceFinanceCN.editAdditionalRemarks);
        await _TradeFinancePages.TradeFinancingPage.digiDocFileUploadButton.select(testData.purchaseInvoiceFinanceCN.fileName); 
        await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
        //until IEBAA-3500 dev
        //await _TradeFinancePages.TradeFinancingPage.skipForNow.jsClickIfExist();
        await _TradeFinancePages.TradeFinancingPage.message.input(testData.purchaseInvoiceFinanceCN.messageToApprover);
        await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
        await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.filterInput.input(reference);
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.TradeFinancingPage.regulatoryReportField.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewTxnStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).textContains(testData.purchaseInvoiceFinanceCN.invoiceAmt),
            await ensure(await _TradeFinancePages.TradeFinancingPage.supplierName).textContains(testData.purchaseInvoiceFinanceCN.supplier),
            await ensure(await _TradeFinancePages.TradeFinancingPage.reportingAccountValue).textContains(testData.purchaseInvoiceFinanceCN.editReportAccount),
            await ensure(await _TradeFinancePages.TradeFinancingPage.taxRequirement).textContains("Tax-free"),
            await ensure(await _TradeFinancePages.TradeFinancingPage.paymentNatureValue).textContains(testData.purchaseInvoiceFinanceCN.editPaymentNature),
            await ensure(await _TradeFinancePages.TradeFinancingPage.fullRefValue).textContains(testData.purchaseInvoiceFinanceCN.editFullRef),
            await ensure(await _TradeFinancePages.TradeFinancingPage.bopCodeValue).textContains(testData.purchaseInvoiceFinanceCN.editBopCode),
            await ensure(await _TradeFinancePages.TradeFinancingPage.remarksValue).textContains(testData.purchaseInvoiceFinanceCN.editBopCode),
            await ensure(await _TradeFinancePages.TradeFinancingPage.contractNumberValue).textContains(testData.purchaseInvoiceFinanceCN.editContractNumber),
            await ensure(await _TradeFinancePages.TradeFinancingPage.proportionValue).textContains(testData.purchaseInvoiceFinanceCN.editProportionOfContractAmt),
            await ensure(await _TradeFinancePages.TradeFinancingPage.declarationValue).textContains(testData.purchaseInvoiceFinanceCN.editDeclarationDays),
            await ensure(await _TradeFinancePages.TradeFinancingPage.additionRemarksValue).textContains(testData.purchaseInvoiceFinanceCN.editAdditionalRemarks),
        ]);
    });
})