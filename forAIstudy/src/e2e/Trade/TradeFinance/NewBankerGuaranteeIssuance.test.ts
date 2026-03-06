/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { TradeFinancePages} from '../../../pages/Trade';
import { ensure, SIT, handlerCase,PROJECT_TYPE, generatedID,devWatch} from "../../../lib";
import { browser } from 'protractor';
import * as moment from "moment";

let _TradeFinancePages = new TradeFinancePages();
let currentDate = moment(new Date()).format("DD MMM YYYY");
let reference = "";
let templateName='';

let testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

describe('Trade Finance - Banker Guarantee Issuance', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {await new NavigatePages().loginIdealx(SIT ? testData.newBankerGuarantee.SIT.loginCompanyId : testData.newBankerGuarantee.UAT.loginCompanyId,SIT ? testData.newBankerGuarantee.SIT.loginUserId : testData.newBankerGuarantee.UAT.loginUserId,"123123",)});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create BG Application with approve now', async function () {
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadCondition();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.BGApplicationMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForCreateBG();
        // select debit from account
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.debitFrom.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.debitFromFilter.input(testData.newBankerGuarantee.debitFrom);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterResult.jsClick();
        // select trade party
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeParty.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradePartyFilter.input(testData.newBankerGuarantee.applicantPartyID);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradePartyFilterResult.jsClick();
        //select trade bene
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeBene.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeBeneFilter.input(testData.newBankerGuarantee.beneficiaryPartyID);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeBeneFilterResult.jsClick();
        // input other details
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.scrollTo(0,800);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.digiDocFileUploadButton.select(testData.newBankerGuarantee.fileName);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.Amount.input(testData.newBankerGuarantee.guaranteeAmount);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.scrollTo(0,1200);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.expireDate.select(currentDate);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.claimPeriod.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.firstResult.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.contactNumber.input(testData.newBankerGuarantee.contractNumber);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.scrollTo(0,1700);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.contractDate.select(currentDate);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.contactAmount.input(testData.newBankerGuarantee.contractAmount);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.purpose.input(testData.newBankerGuarantee.purposeOfContract);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.additionaInformationBtn.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.additionaInformation.input(testData.newBankerGuarantee.additionalInformation);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.digiDocFileUpload2Button.select(testData.newBankerGuarantee.fileName);
        // await _TradeFinancePages.NewBankerGuaranteeIssuancePage.issueBank.click();
        // await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeBeneFilterResult.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.deliveryMethod.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.deliveryMethodFilterResult.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.reviewBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForPreviewBG();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.approveNowBtn.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.approveNowsubmitBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.confirmBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.responseCode.input(testData.newBankerGuarantee.responseCode);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.approveDialog.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForComplatePage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.doneBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();
        await Promise.all([
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.viewTxnStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeAmount).textContains(testData.newBankerGuarantee.guaranteeAmount),
        ]); 
    });   

    it('Edit BG Application and Tick Save as Template', async function () {
        this.timeout(420000);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadCondition();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.BGApplicationMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForCreateBG();
        // select debit from account
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.debitFrom.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.debitFromFilter.input(testData.newBankerGuarantee.debitFrom);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterResult.jsClick();
        // select trade party
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeParty.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradePartyFilter.input(testData.newBankerGuarantee.applicantPartyID);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradePartyFilterResult.jsClick();
        //select trade bene
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeBene.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeBeneFilter.input(testData.newBankerGuarantee.beneficiaryPartyID);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeBeneFilterResult.jsClick();
        // input other details
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.scrollTo(0,800);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.digiDocFileUploadButton.select(testData.newBankerGuarantee.fileName);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.Amount.input(testData.newBankerGuarantee.guaranteeAmount);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.scrollTo(0,1200);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.expireDate.select(currentDate);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.claimPeriod.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.firstResult.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.contactNumber.input(testData.newBankerGuarantee.contractNumber);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.scrollTo(0,1700);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.contractDate.select(currentDate);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.contactAmount.input(testData.newBankerGuarantee.contractAmount);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.purpose.input(testData.newBankerGuarantee.purposeOfContract);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.additionaInformationBtn.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.additionaInformation.input(testData.newBankerGuarantee.additionalInformation);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.digiDocFileUpload2Button.select(testData.newBankerGuarantee.fileName);
        // await _TradeFinancePages.NewBankerGuaranteeIssuancePage.issueBank.click();
        // await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeBeneFilterResult.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.deliveryMethod.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.deliveryMethodFilterResult.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.reviewBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForPreviewBG();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.submitBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForComplatePage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.doneBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.editBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForCreateBG();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.Amount.input(testData.newBankerGuarantee.contractAmount);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.reviewBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForPreviewBG();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.saveAsTemplateBtn.jsClick();
        templateName = 'BGtemplate' + generatedID();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.templateInput.input(templateName);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.submitBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForComplatePage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.doneBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();
        await Promise.all([
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.viewTxnStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeAmount).textContains(testData.newBankerGuarantee.contractAmount),
        ]); 

        // check template
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadCondition();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnTab.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(templateName);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.viewTxnStatus).textContains(testData.status.Template),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeAmount).textContains(testData.newBankerGuarantee.contractAmount)
        ]);
    }); 

    it('Approve BG Application via filter transaction ', async function () {
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadCondition();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnTab.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        if (0 !== reference.trim().length) {
            await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        } else {
            await _TradeFinancePages.OverViewPage.filterBtn.click();
        await _TradeFinancePages.OverViewPage.scrollTo(0,500)
        await _TradeFinancePages.OverViewPage.reSetBtn.click();
        await _TradeFinancePages.OverViewPage.filterStatus.click();
        await _TradeFinancePages.OverViewPage.clearAll.jsClick();
        await _TradeFinancePages.OverViewPage.filterStatusPendingApproval.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterType.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.clearAllForType.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterTypeBG.jsClick();
        await _TradeFinancePages.OverViewPage.searchBtn.click();
        }
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.approveBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.confirmBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.responseCode.input(testData.newBankerGuarantee.responseCode);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.approveDialog.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef.getText().then(text => {
            reference = text.trim();
        });
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.finishBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();
        await Promise.all([
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.viewTxnStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef).textIs(reference),
        ]); 
        // Check will not display on My Approve page
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.approvalMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForMyApprovePage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.approvalTradeTab.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        await Promise.all([
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.noRecord).textContains(testData.newBankerGuarantee.NoRecordFound),
        ]);   
    });

    it('Copy BG Application then Reject', async function () {
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadCondition();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnTab.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        if (0 !== templateName.trim().length) {
            await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(templateName);
        } else {
            await _TradeFinancePages.OverViewPage.filterBtn.click();
            await _TradeFinancePages.OverViewPage.scrollTo(0,500)
            await _TradeFinancePages.OverViewPage.reSetBtn.click();
            await _TradeFinancePages.OverViewPage.filterStatus.click();
            await _TradeFinancePages.OverViewPage.clearAll.jsClick();
            await _TradeFinancePages.OverViewPage.filterStatusPendingApproval.jsClick();
            await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterType.jsClick();
            await _TradeFinancePages.NewBankerGuaranteeIssuancePage.clearAllForType.jsClick();
            await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterTypeBG.jsClick();
            await _TradeFinancePages.OverViewPage.searchBtn.click();
        }
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.copyBtn.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.reviewBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForPreviewBG();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.submitBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForComplatePage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.doneBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();
        await Promise.all([
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.viewTxnStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef).textIs(reference),
        ]); 
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.rejectBtn.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.reasonForReject.input(testData.newBankerGuarantee.reasonForReject);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.confirmRejectBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.dismissBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        await Promise.all([
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnListStatus).textContains("Modification needed"),
        ]);
    });  
     
    //Add for IEBAA-2702  eBG
    it('Create BG Application with new format', async function () {
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadCondition();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.BGApplicationMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForCreateBG();
        // select debit from account
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.debitFrom.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.debitFromFilter.input(testData.newBankerGuarantee.debitFrom);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterResult.jsClick();
        // select trade party
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeParty.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradePartyFilter.input(testData.newBankerGuarantee.applicantPartyID);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradePartyFilterResult.jsClick();
        //select trade bene
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeBene.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeBeneFilter.input(testData.newBankerGuarantee.ebeneficiaryPartyID);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeBeneFilterResult.jsClick();
        // input other details
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.scrollTo(0,800);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.guaranteeFormat.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.guaranteeFormatResult.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.Amount.input(testData.newBankerGuarantee.guaranteeAmount);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.uenNum.input(testData.newBankerGuarantee.uenNum);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.purposeOfGuarantee.input(testData.newBankerGuarantee.purposeOfGuarantee);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.scrollTo(0,1200);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.expireDate.select(currentDate);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.contactNumber.input(testData.newBankerGuarantee.contractNumber);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.scrollTo(0,1700);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.bankCharge.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.debitFromFilter.input(testData.newBankerGuarantee.debitFrom);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterResult.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.specialiInstructionsBtn.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.specialiInstructions.input(testData.newBankerGuarantee.specialiInstructions);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.reviewBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForPreviewBG();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.submitBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForComplatePage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.doneBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.instructiontoBankSection.click();

        await Promise.all([
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.viewTxnStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeAmount).textContains(testData.newBankerGuarantee.guaranteeAmount),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.guaranteeBeneValue).textContains(testData.newBankerGuarantee.ebeneficiaryPartyID),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.guaranteeFormatValue).textContains(testData.newBankerGuarantee.guaranteeFormatValue),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.purposeOfGuaranteeValue).textContains(testData.newBankerGuarantee.purposeOfGuarantee),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.caseRefNumTitle).textContains(testData.newBankerGuarantee.caseRefNumTitle),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.caseRefNumValue).textContains(testData.newBankerGuarantee.contractNumber),
        ]); 
    });   

    it('Edit BG Application with new format', async function () {
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.editBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForCreateBG();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.Amount.input(testData.newBankerGuarantee.contractAmount);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.reviewBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForPreviewBG();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.submitBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForComplatePage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.doneBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.instructiontoBankSection.click();

        await Promise.all([
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.viewTxnStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef).textIs(reference),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeAmount).textContains(testData.newBankerGuarantee.contractAmount),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.guaranteeBeneValue).textContains(testData.newBankerGuarantee.ebeneficiaryPartyID),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.guaranteeFormatValue).textContains(testData.newBankerGuarantee.guaranteeFormatValue),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.purposeOfGuaranteeValue).textContains(testData.newBankerGuarantee.purposeOfGuarantee),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.caseRefNumTitle).textContains(testData.newBankerGuarantee.caseRefNumTitle),
            await ensure(await _TradeFinancePages.NewBankerGuaranteeIssuancePage.caseRefNumValue).textContains(testData.newBankerGuarantee.contractNumber),
        ]); 
    });

    it('Approve BG Application which with new format ', async function () {
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeFinanceMenu.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadCondition();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnTab.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.approveBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.confirmBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.responseCode.input(testData.newBankerGuarantee.responseCode);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.approveDialog.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef.getText().then(text => {
            reference = text.trim();
        });
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.finishBtn.click();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForTxn();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.filterInput.input(reference);
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.txnCenterRef.jsClick();
        await _TradeFinancePages.NewBankerGuaranteeIssuancePage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_TradeFinancePages.NewBankerGuaranteeIssuancePage.viewTxnStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved,testData.status.Proceed,testData.status.Processing),
            await ensure(_TradeFinancePages.NewBankerGuaranteeIssuancePage.tradeRef).textIs(reference)
            // await ensure(_TradeFinancePages.NewBankerGuaranteeIssuancePage.viewTxnApprovedStatus).textContains(testData.status.Approved)
        ]); 
    });
});
