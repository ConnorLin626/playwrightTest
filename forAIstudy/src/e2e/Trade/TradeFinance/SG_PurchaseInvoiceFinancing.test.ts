/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { TradeFinancePages} from '../../../pages/Trade';
import { ensure, SIT, handlerCase,PROJECT_TYPE, generatedID} from "../../../lib";
import { browser } from 'protractor';
import * as moment from "moment";

let _TradeFinancePages = new TradeFinancePages();
let currentDate = moment(new Date()).format("DD MMM YYYY");
let reference = "";
let referenceEdit ="";
let templateName='';
let payeeName ='';

let testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

describe('Trade Finance - SG Purchase Invoice Finaning', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {await new NavigatePages().loginIdealx(SIT ? testData.purchaseInvoiceFinanceSG.SIT.loginCompanyId : testData.purchaseInvoiceFinanceSG.UAT.loginCompanyId,SIT ? testData.purchaseInvoiceFinanceSG.SIT.loginUserId : testData.purchaseInvoiceFinanceSG.UAT.loginUserId,"123123",)});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
 
    //Import;Yes(Post-shipment);Goods and services(Purchase Invoice Financing)
    it('Create SG Purchase Invoice Finaning', async function () {
        await createPIF(true,true);
        await _TradeFinancePages.TradeFinancingPage.goToViewPageViaRef(reference);
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewTxnStatus).textContains(testData.status.PendingApproval),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.financingType).textContains(testData.purchaseInvoiceFinanceSG.financingTypeGS),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).textContains(testData.newImportLCIssuance.amount),
            await ensure(await _TradeFinancePages.TradeFinancingPage.supplierName).textContains(testData.purchaseInvoiceFinanceSG.supplier),
        ])
        await _TradeFinancePages.TradeFinancingPage.disbursementSection.jsClick();
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyName).textContains(payeeName),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyAddress).textContains(testData.purchaseInvoiceFinanceSG.payeeAddress),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyTownCity).textContains(testData.purchaseInvoiceFinanceSG.townCity),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyCountry).textContains(testData.purchaseInvoiceFinanceSG.payeeLocation),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyPostalCode).textContains(testData.purchaseInvoiceFinanceSG.postalCode),
        ])
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
            await ensure(await _TradeFinancePages.transactionPartiesPage.partyAdd1).textContains(testData.purchaseInvoiceFinanceSG.payeeAddress),
            await ensure(await _TradeFinancePages.transactionPartiesPage.locationName).textContains(testData.purchaseInvoiceFinanceSG.payeeLocation),
            await ensure(await _TradeFinancePages.transactionPartiesPage.townCity).textContains(testData.purchaseInvoiceFinanceSG.townCity),
            await ensure(await _TradeFinancePages.transactionPartiesPage.postalCode).textContains(testData.purchaseInvoiceFinanceSG.postalCode),
            await ensure(await _TradeFinancePages.transactionPartiesPage.benTransfer).isSelected()
        ])
        await _TradeFinancePages.transactionPartiesPage.cancelButton.click();
    });

    // Import;Yes(Post-shipment);Freight charges(Freight Loan)
    it('Edit SG Purchase Invoice Finaning', async function () { 
        await new NavigatePages().loginIdealx(SIT ? testData.purchaseInvoiceFinanceSG.SIT.loginCompanyId : testData.purchaseInvoiceFinanceSG.UAT.loginCompanyId,SIT ? testData.purchaseInvoiceFinanceSG.SIT.loginUserId : testData.purchaseInvoiceFinanceSG.UAT.loginUserId,"123123",)
        await _TradeFinancePages.NewImportLCIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadCondition();
        await _TradeFinancePages.NewImportLCIssuancePage.txnTab.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForTxn();
        if (0 !== reference.trim().length) {
            await _TradeFinancePages.NewImportLCIssuancePage.filterInput.input(reference); 
        }else{
            await _TradeFinancePages.NewImportLCIssuancePage.additionalFilter.click();
            await _TradeFinancePages.NewImportLCIssuancePage.filterSubProduct.click();
            await _TradeFinancePages.NewImportLCIssuancePage.clearAll.jsClick();
            await _TradeFinancePages.TradeFinancingPage.filterTypeAPF.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.filterStatus.click();
            await _TradeFinancePages.NewImportLCIssuancePage.clearAll.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.pendingStatus.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.applyChange.click();
        }
        await _TradeFinancePages.TradeFinancingPage.txnCenterRef.jsClick();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForViewPage();
        await _TradeFinancePages.NewImportLCIssuancePage.editBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForEditPage();
        await _TradeFinancePages.TradeFinancingPage.freightChargesRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.billRef.input(testData.purchaseInvoiceFinanceSG.billRef);
        await _TradeFinancePages.TradeFinancingPage.invoiceAmount.clean();
        await _TradeFinancePages.TradeFinancingPage.invoiceAmount.input(testData.purchaseInvoiceFinanceSG.editAmount);
        await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
        //await _TradeFinancePages.TradeFinancingPage.skipForNow.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForPreviewPage();
        await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit();
        await _TradeFinancePages.TradeFinancingPage.tradeRef.getText().then(text => {
            referenceEdit = text.trim();
        });
        await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
        await _TradeFinancePages.TradeFinancingPage.goToViewPageViaRef(referenceEdit);
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewTxnStatus).textContains(testData.status.PendingApproval),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRef).textIs(referenceEdit),
            await ensure(await _TradeFinancePages.TradeFinancingPage.financingType).textContains(testData.purchaseInvoiceFinanceSG.financingTypeFC),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).textContains(testData.purchaseInvoiceFinanceSG.editAmount),
            await ensure(await _TradeFinancePages.TradeFinancingPage.supplierName).isNotEmpty(),
        ]); 
    });   
    //Import;No(Pre - shipment);Goods and services(Advance payment)
    it('Save SG Purchase Invoice Finaning as template', async function () {
        await createPIF(false,true)
        await _TradeFinancePages.TradeFinancingPage.goToViewPageViaRef(reference);
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewTxnStatus).textContains(testData.status.PendingApproval),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.financingType).textContains(testData.purchaseInvoiceFinanceSG.financingType),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).textContains(testData.newImportLCIssuance.amount),
            await ensure(await _TradeFinancePages.TradeFinancingPage.supplierName).textContains(testData.purchaseInvoiceFinanceSG.supplier),
        ])
        await _TradeFinancePages.NewImportLCIssuancePage.saveAsTemplateBtn.click();
        templateName='AutoPIF'+generatedID();
        await _TradeFinancePages.NewImportLCIssuancePage.templateName.input(templateName);
        await _TradeFinancePages.NewImportLCIssuancePage.confirmBtn.click();
        //go to trade center check
        await _TradeFinancePages.NewImportLCIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadCondition();
        await _TradeFinancePages.NewImportLCIssuancePage.txnTab.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.TradeFinancingPage.goToViewPageViaRef(templateName);
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewTxnStatus).textContains(testData.status.Template),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRef).textIs(templateName),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).isNotEmpty(),
        ]); 
        await _TradeFinancePages.TradeFinancingPage.disbursementSection.jsClick();
        await Promise.all([
             await ensure(await _TradeFinancePages.TradeFinancingPage.partyName).textContains(payeeName),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyAddress).textContains(testData.purchaseInvoiceFinanceSG.payeeAddress),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyTownCity).textContains(testData.purchaseInvoiceFinanceSG.townCity),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyCountry).textContains(testData.purchaseInvoiceFinanceSG.payeeLocation),
            await ensure(await _TradeFinancePages.TradeFinancingPage.partyPostalCode).textContains(testData.purchaseInvoiceFinanceSG.postalCode),
        ]); 
    });   
    //has SLI/Eway-Bill
    it('Copy SG Purchase Invoice Finaning as template', async function () {
        await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadCondition();
        await _TradeFinancePages.TradeFinancingPage.applicationMenu.click();
        //financing type
        await _TradeFinancePages.TradeFinancingPage.importRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.yesRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.goodAndServiceRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.digiDocFileUploadButton.select2(testData.purchaseInvoiceFinanceSG.sliFileName);
        await _TradeFinancePages.TradeFinancingPage.financePeriod.click();
        await _TradeFinancePages.TradeFinancingPage.numberOfDaysSelect.click();
        await _TradeFinancePages.TradeFinancingPage.numberOfDaysInput.input(testData.purchaseInvoiceFinanceSG.numberOfDays);
        await _TradeFinancePages.TradeFinancingPage.debitAccount.click();
        await _TradeFinancePages.TradeFinancingPage.debitAccountFilter.input(testData.purchaseInvoiceFinanceSG.debitAccount);
        await _TradeFinancePages.TradeFinancingPage.debitAccountSelect.click(); 
        //shipment details
        await _TradeFinancePages.TradeFinancingPage.goodsRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.descriptionOfGoods.input(testData.purchaseInvoiceFinanceSG.descriptionGoods);
        await _TradeFinancePages.TradeFinancingPage.loanDisburse.click();
        await _TradeFinancePages.TradeFinancingPage.disbursementSelect.click();
        await _TradeFinancePages.TradeFinancingPage.payeeName.click();
        await _TradeFinancePages.TradeFinancingPage.firstPayee.click();
        await _TradeFinancePages.TradeFinancingPage.bankLocation.click();
        await _TradeFinancePages.TradeFinancingPage.bankLocationFilter.input(testData.purchaseInvoiceFinanceSG.bankLocation);
        await _TradeFinancePages.TradeFinancingPage.bankLocationSelect.click(); 
        await _TradeFinancePages.TradeFinancingPage.payeeBank.click();
        await _TradeFinancePages.TradeFinancingPage.payeeBankSelect.click();
        await _TradeFinancePages.TradeFinancingPage.payeeBankAccount.input(testData.purchaseInvoiceFinanceSG.payeeBankAccount);
        await _TradeFinancePages.TradeFinancingPage.interBankSwitch.jsClick();
        await _TradeFinancePages.TradeFinancingPage.interBankLocation.click();
        await _TradeFinancePages.TradeFinancingPage.interBankLocationSelcet.click();
        await _TradeFinancePages.TradeFinancingPage.interBankId.click();
        await _TradeFinancePages.TradeFinancingPage.interBankSelect.click();
        await _TradeFinancePages.TradeFinancingPage.chargeAccount.click();
        await _TradeFinancePages.TradeFinancingPage.chargeAccountSelect.click();
        //await _TradeFinancePages.TradeFinancingPage.digiDocFileUploadButton.select(testData.purchaseInvoiceFinanceSG.fileName);
        await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
        //await _TradeFinancePages.TradeFinancingPage.skipForNow.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForPreviewPage();
        await _TradeFinancePages.TradeFinancingPage.message.input(testData.purchaseInvoiceFinanceCN.messageToApprover);
        await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit();
        await _TradeFinancePages.TradeFinancingPage.tradeRef.getText().then(text => {
            reference = text.trim();
        });
        await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
        await _TradeFinancePages.TradeFinancingPage.goToViewPageViaRef(reference);
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewTxnStatus).textContains(testData.status.PendingApproval),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).isNotEmpty(),
            await ensure(await _TradeFinancePages.TradeFinancingPage.supplierName).isNotEmpty()
        ]); 
        await _TradeFinancePages.NewImportLCIssuancePage.copyBtn.jsClick();
        await _TradeFinancePages.TradeFinancingPage.digiDocFileUploadButton.select2(testData.purchaseInvoiceFinanceSG.sliFileName);
        await _TradeFinancePages.TradeFinancingPage.debitAccount.click();
        await _TradeFinancePages.TradeFinancingPage.debitAccountFilter.input(testData.purchaseInvoiceFinanceSG.debitAccount);
        await _TradeFinancePages.TradeFinancingPage.debitAccountSelect.click();
        await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
        //await _TradeFinancePages.TradeFinancingPage.skipForNow.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForPreviewPage();
        await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
        await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit();
        await _TradeFinancePages.TradeFinancingPage.tradeRef.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference);
        await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
        await _TradeFinancePages.TradeFinancingPage.goToViewPageViaRef(reference);
        await Promise.all([
            await ensure(await _TradeFinancePages.TradeFinancingPage.viewTxnStatus).textContains(testData.status.PendingApproval),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.TradeFinancingPage.tradeAmount).isNotEmpty(),
            await ensure(await _TradeFinancePages.TradeFinancingPage.supplierName).isNotEmpty()
        ]); 
    });  
});
export async function createPIF(isImport:Boolean,isNewPayee:Boolean) {
    await _TradeFinancePages.TradeFinancingPage.tradeFinanceMenu.click();
    await _TradeFinancePages.NewImportLCIssuancePage.loadCondition();
    await _TradeFinancePages.TradeFinancingPage.applicationMenu.click();
    await _TradeFinancePages.TradeFinancingPage.importRadio.jsClick();
    //financing type
    if(isImport){
        await _TradeFinancePages.TradeFinancingPage.yesRadio.jsClick();
        await _TradeFinancePages.TradeFinancingPage.goodAndServiceRadio.jsClick();
    }else{
        await _TradeFinancePages.TradeFinancingPage.noRadio.jsClick();
    }
    await _TradeFinancePages.TradeFinancingPage.switchButton.jsClick();
    //financing applicant
    await _TradeFinancePages.TradeFinancingPage.applicantFrom.click();
    await _TradeFinancePages.TradeFinancingPage.applicantFilter.input(testData.purchaseInvoiceFinanceSG.applicant);
    await _TradeFinancePages.TradeFinancingPage.applicantSelect.click();
    //financing supplier
    await _TradeFinancePages.TradeFinancingPage.supplierFrom.click();
    await _TradeFinancePages.TradeFinancingPage.supplierFilter.input(testData.purchaseInvoiceFinanceSG.supplier);
    await _TradeFinancePages.TradeFinancingPage.supplierSelect.click();
    await _TradeFinancePages.TradeFinancingPage.invoiceAmount.input(testData.purchaseInvoiceFinanceSG.invoiceAmt);
    await _TradeFinancePages.TradeFinancingPage.financePeriod.click();
    await _TradeFinancePages.TradeFinancingPage.numberOfDaysSelect.click();
    await _TradeFinancePages.TradeFinancingPage.numberOfDaysInput.input(testData.purchaseInvoiceFinanceSG.numberOfDays);
    await _TradeFinancePages.TradeFinancingPage.specificDateRadio.jsClick();    
    await _TradeFinancePages.TradeFinancingPage.financeValueDate.select(currentDate);
    await _TradeFinancePages.TradeFinancingPage.debitAccount.click();
    await _TradeFinancePages.TradeFinancingPage.debitAccountFilter.input(testData.purchaseInvoiceFinanceSG.debitAccount);
    await _TradeFinancePages.TradeFinancingPage.debitAccountSelect.click();
    //shipment details
    await _TradeFinancePages.TradeFinancingPage.goodsRadio.jsClick();
    await _TradeFinancePages.TradeFinancingPage.descriptionOfGoods.input(testData.purchaseInvoiceFinanceSG.descriptionGoods);
    //disbursement instruction
    await _TradeFinancePages.TradeFinancingPage.loanDisburse.click();
    await _TradeFinancePages.TradeFinancingPage.disbursementSelect.click();
    payeeName="TradePayee"+generatedID();
    if(isNewPayee){
        await _TradeFinancePages.TradeFinancingPage.payeeArrow.click();
        await _TradeFinancePages.TradeFinancingPage.addPayee.click();
        await _TradeFinancePages.TradeFinancingPage.newPayeeName.input(payeeName);
        await _TradeFinancePages.TradeFinancingPage.payeeAddreess.input(testData.purchaseInvoiceFinanceSG.payeeAddress);
        await _TradeFinancePages.TradeFinancingPage.payeeLocation.click();
        await _TradeFinancePages.TradeFinancingPage.payeeLocationValue.click();
        await _TradeFinancePages.TradeFinancingPage.townCity.input(testData.purchaseInvoiceFinanceSG.townCity);
        await _TradeFinancePages.TradeFinancingPage.postalCode.input(testData.purchaseInvoiceFinanceSG.postalCode);
        await _TradeFinancePages.TradeFinancingPage.saveForFutrue.jsClick();
        await _TradeFinancePages.TradeFinancingPage.confirmButton.click();
    }
    await _TradeFinancePages.TradeFinancingPage.bankLocation.click();
    await _TradeFinancePages.TradeFinancingPage.bankLocationFilter.input(testData.purchaseInvoiceFinanceSG.bankLocation);
    await _TradeFinancePages.TradeFinancingPage.bankLocationSelect.click(); 
    await _TradeFinancePages.TradeFinancingPage.payeeBank.click();
    await _TradeFinancePages.TradeFinancingPage.payeeBankSelect.click();
    await _TradeFinancePages.TradeFinancingPage.payeeBankAccount.input(testData.purchaseInvoiceFinanceSG.payeeBankAccount);
    await _TradeFinancePages.TradeFinancingPage.payeeRef.input(testData.purchaseInvoiceFinanceSG.payeeRef);
    await _TradeFinancePages.TradeFinancingPage.interBankSwitch.jsClick();
    await _TradeFinancePages.TradeFinancingPage.interBankLocation.click();
    await _TradeFinancePages.TradeFinancingPage.interBankLocationSelcet.click();
    await _TradeFinancePages.TradeFinancingPage.interBankId.click();
    await _TradeFinancePages.TradeFinancingPage.interBankSelect.click();
    await _TradeFinancePages.TradeFinancingPage.digiDocFileUploadButton.select(testData.purchaseInvoiceFinanceSG.fileName);
    //instructions to bank
    await _TradeFinancePages.TradeFinancingPage.chargeAccount.click();
    await _TradeFinancePages.TradeFinancingPage.chargeAccountSelect.click();
    await _TradeFinancePages.NewImportLCIssuancePage.contactPerson.clean();
    await _TradeFinancePages.NewImportLCIssuancePage.contactPerson.input(testData.purchaseInvoiceFinanceSG.contactPerson);
    await _TradeFinancePages.NewImportLCIssuancePage.contactPersonNumber.clean();
    await _TradeFinancePages.NewImportLCIssuancePage.contactPersonNumber.input(testData.purchaseInvoiceFinanceSG.contactPersonNumber);
    if(isImport){
        await _TradeFinancePages.TradeFinancingPage.specialInstructionsSwitch.click();
        await _TradeFinancePages.TradeFinancingPage.specialInstructions.input(testData.purchaseInvoiceFinanceSG.specialInstruction);
    }
    await _TradeFinancePages.TradeFinancingPage.reviewBtn.click();
    //await _TradeFinancePages.TradeFinancingPage.skipForNow.click();
    await _TradeFinancePages.TradeFinancingPage.loadConditionForPreviewPage();
    await _TradeFinancePages.TradeFinancingPage.message.input(testData.purchaseInvoiceFinanceCN.messageToApprover);
    await _TradeFinancePages.TradeFinancingPage.submitBtn.click();
    await _TradeFinancePages.TradeFinancingPage.loadConditionForSubmit();
    await _TradeFinancePages.TradeFinancingPage.tradeRef.getText().then(text => {
        reference = text.trim();
    });
    await _TradeFinancePages.TradeFinancingPage.doneBtn.click();
    await _TradeFinancePages.TradeFinancingPage.loadConditionForTxn();
}
