/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { TradeFinancePages} from '../../../pages/Trade';
import { ensure, SIT, handlerCase,PROJECT_TYPE, generatedID, devWatch} from "../../../lib";
import { browser } from 'protractor';
import * as moment from "moment";

let _TradeFinancePages = new TradeFinancePages();
let currentDate = moment(new Date()).format("DD MMM YYYY");
let reference = "";
let referenceEdit ="";
let templateName='';

let testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

describe('Trade Finance - Import LC Issuance', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {await new NavigatePages().loginIdealx(SIT ? testData.newImportLCIssuance.SIT.loginCompanyId : testData.newImportLCIssuance.UAT.loginCompanyId,SIT ? testData.newImportLCIssuance.SIT.loginUserId : testData.newImportLCIssuance.UAT.loginUserId,"123123",)});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Import LC Issuance', async function () {
        await _TradeFinancePages.NewImportLCIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadCondition();
        await _TradeFinancePages.NewImportLCIssuancePage.IDLCApplicationMenu.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForCreateIDLC();
        // select debit from account
        await _TradeFinancePages.NewImportLCIssuancePage.debitFrom.click();
        await _TradeFinancePages.NewImportLCIssuancePage.debitFromFilter.input(testData.newImportLCIssuance.debitFrom);
        await _TradeFinancePages.NewImportLCIssuancePage.filterResult.jsClick();
        // select trade party
        await _TradeFinancePages.NewImportLCIssuancePage.tradeParty.click();
        await _TradeFinancePages.NewImportLCIssuancePage.tradePartyFilter.input(testData.newImportLCIssuance.applicantPartyID);
        await _TradeFinancePages.NewImportLCIssuancePage.tradePartyFilterResult.jsClick();
        //select trade bene
        await _TradeFinancePages.NewImportLCIssuancePage.tradeBene.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.tradeBeneFilter.input(testData.newImportLCIssuance.beneficiaryPartyID);
        await _TradeFinancePages.NewImportLCIssuancePage.tradeBeneFilterResult.jsClick();
        // input other details
        await _TradeFinancePages.NewImportLCIssuancePage.scrollTo(0,800);
        await _TradeFinancePages.NewImportLCIssuancePage.Amount.input(testData.newImportLCIssuance.amount);
        await _TradeFinancePages.NewImportLCIssuancePage.scrollTo(0,1400);
        await _TradeFinancePages.NewImportLCIssuancePage.expireDate.select(currentDate);
        await _TradeFinancePages.NewImportLCIssuancePage.beneBank.click();
        await _TradeFinancePages.NewImportLCIssuancePage.beneBankResult.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.availableBy.click();
        await _TradeFinancePages.NewImportLCIssuancePage.availableByValue.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.fixedMaturity.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.tenorDate.select(currentDate);
        await _TradeFinancePages.NewImportLCIssuancePage.shipmentTerms.click();
        await _TradeFinancePages.NewImportLCIssuancePage.shipmentTermsReslut.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.shipmentDate.select(currentDate),
        await _TradeFinancePages.NewImportLCIssuancePage.presentationDays.input(testData.newImportLCIssuance.presentationDays),
        await _TradeFinancePages.NewImportLCIssuancePage.descriptionGoods.input(testData.newImportLCIssuance.descriptionGoods)
        await _TradeFinancePages.NewImportLCIssuancePage.transportBySeaOrAir.click();
        await _TradeFinancePages.NewImportLCIssuancePage.transportBySeaOrAirValue.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.placeOfDispatchOrReceipt.input(testData.newImportLCIssuance.placeOfDispatchOrReceipt),
        await _TradeFinancePages.NewImportLCIssuancePage.loadingDestination.input(testData.newImportLCIssuance.loadingDestination),
        await _TradeFinancePages.NewImportLCIssuancePage.dischargeDestination.input(testData.newImportLCIssuance.dischargeDestination),
        await _TradeFinancePages.NewImportLCIssuancePage.placeOfDestinationOrDelivery.input(testData.newImportLCIssuance.placeOfDestinationOrDelivery),
        await _TradeFinancePages.NewImportLCIssuancePage.otherDocuments.input(testData.newImportLCIssuance.otherDocuments),
        await _TradeFinancePages.NewImportLCIssuancePage.additionalInformation.input(testData.newImportLCIssuance.additionalInformation),
        await _TradeFinancePages.NewImportLCIssuancePage.supportDocBtn.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.digiDocFileUploadButton.select(testData.newImportLCIssuance.fileName),
        await _TradeFinancePages.NewImportLCIssuancePage.docBeneficiary.input(testData.newImportLCIssuance.docBeneficiary),
        await _TradeFinancePages.NewImportLCIssuancePage.docReceivingBank.input(testData.newImportLCIssuance.docReceivingBank),
        await _TradeFinancePages.NewImportLCIssuancePage.importFinancingBtn.jsClick(); //Add for R8.20 IEBAA-3515
        await _TradeFinancePages.NewImportLCIssuancePage.contactPerson.clean();
        await _TradeFinancePages.NewImportLCIssuancePage.contactPerson.input(testData.newImportLCIssuance.contactPerson);
        await _TradeFinancePages.NewImportLCIssuancePage.contactPersonNumber.clean();
        await _TradeFinancePages.NewImportLCIssuancePage.contactPersonNumber.input(testData.newImportLCIssuance.contactPersonNumber);
        await _TradeFinancePages.NewImportLCIssuancePage.specialInstrBtn.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.specialInstruction.input(testData.newImportLCIssuance.specialInstruction);
        await _TradeFinancePages.NewImportLCIssuancePage.reviewBtn.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForPreviewIDLC();
        await _TradeFinancePages.NewImportLCIssuancePage.submitBtn.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForComplatePage();
        await _TradeFinancePages.NewImportLCIssuancePage.tradeRef.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference);
        await _TradeFinancePages.NewImportLCIssuancePage.doneBtn.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewImportLCIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewImportLCIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForViewPage();
        await _TradeFinancePages.NewImportLCIssuancePage.showInstructionstobank.jsClick();

        await Promise.all([
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.viewTxnStatus).textContains(testData.status.PendingApproval),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.tradeAmount).textContains(testData.newImportLCIssuance.amount),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.partyName).textContains(testData.newImportLCIssuance.applicantPartyID),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.beneName).textContains(testData.newImportLCIssuance.beneficiaryPartyID),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.importfinancingrequest).textIs(testData.newImportLCIssuance.importfinancingrequest),
        ]); 

    });   

    it('Edit Import LC Issuance', async function () {
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
            await _TradeFinancePages.NewImportLCIssuancePage.filterTypeIDLC.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.filterStatus.click();
            await _TradeFinancePages.NewImportLCIssuancePage.clearAll.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.pendingStatus.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.applyChange.click();
        }
        await _TradeFinancePages.NewImportLCIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForViewPage();
        await _TradeFinancePages.NewImportLCIssuancePage.editBtn.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForCreateIDLC();
        await _TradeFinancePages.NewImportLCIssuancePage.Amount.clean();
        await _TradeFinancePages.NewImportLCIssuancePage.Amount.input(testData.newImportLCIssuance.editAmount);
        if (0 !== reference.trim().length) {
            await _TradeFinancePages.NewImportLCIssuancePage.importFinancingBtn.jsClick(); //Add for R8.20 IEBAA-3515
        }
        await _TradeFinancePages.NewImportLCIssuancePage.reviewBtn.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForPreviewIDLC();
        await _TradeFinancePages.NewImportLCIssuancePage.submitBtn.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForComplatePage();
        await _TradeFinancePages.NewImportLCIssuancePage.tradeRef.getText().then(text => {
            referenceEdit = text.trim();
        });
        await _TradeFinancePages.NewImportLCIssuancePage.doneBtn.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewImportLCIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewImportLCIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForViewPage();
        await Promise.all([
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.viewTxnStatus).textContains(testData.status.PendingApproval),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.tradeRef).textIs(referenceEdit),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.tradeAmount).textContains(testData.newImportLCIssuance.editAmount),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.partyName).isNotEmpty(),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.beneName).isNotEmpty(),
        ]); 
        //Add for R8.20 IEBAA-3515
        if(referenceEdit == reference){
            await _TradeFinancePages.NewImportLCIssuancePage.showInstructionstobank.jsClick();
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.InstructionstobankValue).textNotContains(testData.newImportLCIssuance.importfinancingrequest);
        }
    });   
 
    it('Save Import LC Issuance as template', async function () {
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
            await _TradeFinancePages.NewImportLCIssuancePage.filterTypeIDLC.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.filterStatus.click();
            await _TradeFinancePages.NewImportLCIssuancePage.clearAll.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.pendingStatus.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.applyChange.click();
        }
        await _TradeFinancePages.NewImportLCIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForViewPage();
        await _TradeFinancePages.NewImportLCIssuancePage.saveAsTemplateBtn.click();
        templateName='AutoIDLC'+generatedID();
        await _TradeFinancePages.NewImportLCIssuancePage.templateName.input(templateName);
        await _TradeFinancePages.NewImportLCIssuancePage.confirmBtn.click();
        //go to trade center check
        await _TradeFinancePages.NewImportLCIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadCondition();
        await _TradeFinancePages.NewImportLCIssuancePage.txnTab.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewImportLCIssuancePage.additionalFilter.click();
        await _TradeFinancePages.NewImportLCIssuancePage.resetToDefault.click();
        await _TradeFinancePages.NewImportLCIssuancePage.applyChange.click();
        await _TradeFinancePages.NewImportLCIssuancePage.filterInput.input(templateName); 
        await _TradeFinancePages.NewImportLCIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForViewPage();
        await Promise.all([
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.viewTxnStatus).textContains(testData.status.Template),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.tradeRef).textIs(templateName),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.tradeAmount).isNotEmpty(),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.partyName).isNotEmpty(),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.beneName).isNotEmpty(),
        ]); 
    });   

    it('Copy Import LC Issuance', async function () {
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadCondition();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnTab.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        if (0 !== reference.trim().length) {
            await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        } else {
            await _TradeFinancePages.NewImportLCIssuancePage.additionalFilter.click();
            await _TradeFinancePages.NewImportLCIssuancePage.filterSubProduct.click();
            await _TradeFinancePages.NewImportLCIssuancePage.clearAll.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.filterTypeIDLC.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.filterStatus.click();
            await _TradeFinancePages.NewImportLCIssuancePage.clearAll.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.pendingStatus.jsClick();
            await _TradeFinancePages.NewImportLCIssuancePage.applyChange.click();
        }
        await _TradeFinancePages.NewImportLCIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForViewPage();
        await _TradeFinancePages.NewImportLCIssuancePage.copyBtn.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.reviewBtn.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForPreviewIDLC();
        await _TradeFinancePages.NewImportLCIssuancePage.submitBtn.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForComplatePage();
        await _TradeFinancePages.NewImportLCIssuancePage.tradeRef.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference);
        await _TradeFinancePages.NewImportLCIssuancePage.doneBtn.click();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewImportLCIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewImportLCIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewImportLCIssuancePage.loadConditionForViewPage();
        await Promise.all([
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.viewTxnStatus).textContains(testData.status.PendingApproval),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.tradeAmount).isNotEmpty(),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.partyName).isNotEmpty(),
            await ensure(await _TradeFinancePages.NewImportLCIssuancePage.beneName).isNotEmpty(),
        ]); 
    });  
});
