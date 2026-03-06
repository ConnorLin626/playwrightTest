/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

describe('HK_Bulk Collection', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BulkCollection.SIT.loginCompanyId : testData.BulkCollection.UAT.loginCompanyId, SIT ? testData.BulkCollection.SIT.loginUserId : testData.BulkCollection.UAT.loginUserId,SIT ? testData.BulkCollection.SIT.pinId : testData.BulkCollection.UAT.pinId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
   
     //test company in whitelist, will increate length
    it('Create a Bulk collection with new Payer', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        // await _PaymentsPages.TransferCentersPage.page.click();
        let isbulkCollectionVisible = await _PaymentsPages.BulkCollectionPage.bulkCollection.isElementPresent();
        if (isbulkCollectionVisible === false ){
           await  _PaymentsPages.BulkCollectionPage.nextTab.click();
        };
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.DebitType.click();
        await _PaymentsPages.BulkCollectionPage.DebitTypeValue.jsClick();
        await newPayer();
        await createCommon(testData.BulkCollection.transactionCode)
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
        reference = text;
        }); 
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await checkViewPageAllField(); //IDXP-812
    });

    // add for R8.10 Trasanction code add 38 and 98
    it('Create a Bulk collection with Trasanction code add 38 and 98', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        // await _PaymentsPages.TransferCentersPage.page.click();
        let isbulkCollectionVisible = await _PaymentsPages.BulkCollectionPage.bulkCollection.isElementPresent();
        if (isbulkCollectionVisible === false ){
           await  _PaymentsPages.BulkCollectionPage.nextTab.click();
        };
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.DebitType.click();
        await _PaymentsPages.BulkCollectionPage.ConsolidateCreditValue.jsClick();
        await _PaymentsPages.BulkCollectionPage.filterExistingPayee.input(testData.BulkCollection.existingPayee);
        await _PaymentsPages.BulkCollectionPage.addButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
        await _PaymentsPages.BulkCollectionPage.transactionCode.select(testData.BulkCollection.transactionCode1);
        await _PaymentsPages.BulkCollectionPage.particular.input(testData.BulkCollection.particular);
        await newPayer();
        await createCommon(testData.BulkCollection.transactionCode2)
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.BulkCollection.amountA1),
            await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue).textContains(testData.FileService.payerName),
            await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(testData.FileService.payerAcctNum),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });
});

export async function createCommon(transactionCode:string) {
    await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
    await _PaymentsPages.BulkCollectionPage.transactionCode.select(transactionCode);
    await _PaymentsPages.BulkCollectionPage.purposeOfPayment.select(testData.BulkCollection.purposeOfPayment);
    await _PaymentsPages.BulkCollectionPage.particular.input(testData.BulkCollection.particular);
    await _PaymentsPages.BulkCollectionPage.showOptionDetailPayee1.jsClick();
    await _PaymentsPages.BulkCollectionPage.msgToPayer.jsClick();
    await _PaymentsPages.BulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetails);
    await _PaymentsPages.BulkCollectionPage.emailIdO.input(testData.BulkCollection.emailIdO);
    await _PaymentsPages.BulkCollectionPage.emailId1.input(testData.BulkCollection.emailId1);
    await _PaymentsPages.BulkCollectionPage.emailId2.input(testData.BulkCollection.emailId2);
    await _PaymentsPages.BulkCollectionPage.emailId3.input(testData.BulkCollection.emailId3);
    await _PaymentsPages.BulkCollectionPage.emailId4.input(testData.BulkCollection.emailId4);
    await _PaymentsPages.BulkCollectionPage.msg.input(testData.BulkCollection.msg);
}

export async function newPayer() {
    await _PaymentsPages.BulkCollectionPage.newPayerTab.click();
    await _PaymentsPages.BulkCollectionPage.newPayeeName.input(testData.BulkCollection.payerName);
    await _PaymentsPages.BulkCollectionPage.payerBankID.input(SIT ? testData.BulkCollection.SIT.payerBankID:testData.BulkCollection.UAT.payerBankID);
    await _PaymentsPages.BulkCollectionPage.payerBankResult.click();
    await _PaymentsPages.BulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerAcctNum);
    await _PaymentsPages.BulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
    await _PaymentsPages.BulkCollectionPage.mandateID.input(testData.BulkCollection.MandateID);
    await _PaymentsPages.BulkCollectionPage.addPayer.click();
}

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentType).textContains(testData.BulkCollection.paymentTypeView),
        await ensure(_PaymentsPages.BulkCollectionPage.totalAmountValue).textContains(testData.BulkCollection.amountA1),
        await ensure(_PaymentsPages.BulkCollectionPage.viewConsolidateCreditValue).textContains(testData.BulkCollection.itemCreditType),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.batchIDValue).isNotEmpty(),
        // payer 1
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue).textContains(testData.BulkCollection.payerName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankSwiftBic).textContains(SIT ? testData.BulkCollection.SIT.payerBankID:testData.BulkCollection.UAT.payerBankID),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(testData.BulkCollection.payerAcctNum),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue).textContains(testData.BulkCollection.DDAreference),
        await ensure(_PaymentsPages.BulkCollectionPage.mandateIdValue).textContains(testData.BulkCollection.MandateID),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.BulkCollection.amountA1),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionCodeView).textContains(testData.BulkCollection.transactionCode),
        await ensure(_PaymentsPages.BulkCollectionPage.payeePurposeCodeValue).textContains(testData.BulkCollection.purposeOfPayment ),
        await ensure(_PaymentsPages.BulkCollectionPage.particularsValue).textContains(testData.BulkCollection.particular),
        await _PaymentsPages.BulkCollectionPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionDetailValue).textContains(testData.BulkCollection.collectionDetails),
        await ensure(_PaymentsPages.BulkCollectionPage.messageValue).textContains(testData.BulkCollection.msg),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailIdO),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId1),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId2),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId3),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId4),
    ]);
}