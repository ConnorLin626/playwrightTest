/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
let referenceEdit='';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('IN_testData.json');

describe('IN_Bulk Collection', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BulkCollection.SIT.loginCompanyId : testData.BulkCollection.UAT.loginCompanyId, SIT ? testData.BulkCollection.SIT.loginUserId : testData.BulkCollection.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a Bulk collection with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.ucicCode.input(testData.BulkCollection.UCICCode);
        await _PaymentsPages.BulkCollectionPage.newPayerTab.click();
        await _PaymentsPages.BulkCollectionPage.newPayeeName.input(testData.BulkCollection.newPayerName);
        await _PaymentsPages.BulkCollectionPage.payerBankID.input(testData.BulkCollection.payerBankID);
        await _PaymentsPages.BulkCollectionPage.payerBankResult.click();
        await _PaymentsPages.BulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
        await _PaymentsPages.BulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
        await _PaymentsPages.BulkCollectionPage.addPayer.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amount);
        await _PaymentsPages.BulkCollectionPage.payeeRef.input(testData.BulkCollection.referenceForPayer);
        await _PaymentsPages.BulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.BulkCollectionPage.msgToPayer.jsClick();
        await _PaymentsPages.BulkCollectionPage.emailIdO.input(testData.BulkCollection.emailIdO);
        await _PaymentsPages.BulkCollectionPage.emailId1.input(testData.BulkCollection.emailId1);
        await _PaymentsPages.BulkCollectionPage.emailId2.input(testData.BulkCollection.emailId2);
        await _PaymentsPages.BulkCollectionPage.emailId3.input(testData.BulkCollection.emailId3);
        await _PaymentsPages.BulkCollectionPage.emailId4.input(testData.BulkCollection.emailId4);
        await _PaymentsPages.BulkCollectionPage.msg.input(testData.BulkCollection.message);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await checkViewPageAllField(false);  //Add for IDXP-812
    });

    it('Edit an Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.editButton.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.amount.clean();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.editAmount);
        await _PaymentsPages.BulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.BulkCollectionPage.msg.clean();
        await _PaymentsPages.BulkCollectionPage.msg.input(testData.BulkCollection.messageEdit);
        await _PaymentsPages.BulkCollectionPage.batchID.clean()
        await _PaymentsPages.BulkCollectionPage.nextButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        if (referenceEdit==reference){
            await checkViewPageAllField(true); //Add for IDXP-812
        }
        else{
            await Promise.all([
                await ensure(_PaymentsPages.BulkCollectionPage.amountValue).isNotEmpty(),
        ]);
    }
    }); 
});


export async function checkViewPageAllField(isEdit= false) {
    await Promise.all([
       
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(isEdit ? testData.BulkCollection.editAmount:testData.BulkCollection.amount),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkCollectionPage.ucicCodeValue).textContains(testData.BulkCollection.UCICCode),
        await ensure(_PaymentsPages.BulkCollectionPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentType).textContains(testData.BulkCollection.paymentType),
        await ensure(_PaymentsPages.BulkCollectionPage.totalAmountValue).textContains(isEdit ? testData.BulkCollection.editAmount:testData.BulkCollection.amount),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.referenceValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.BulkCollectionPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.colTotalPayee).textContains(testData.BulkCollection.totalItem),
        await ensure(_PaymentsPages.BulkCollectionPage.colTotalAmount).textContains(isEdit ? testData.BulkCollection.editAmount:testData.BulkCollection.amount),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue).textContains(testData.BulkCollection.newPayerName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue).textContains(testData.BulkCollection.newPayerName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankName).textContains(testData.BulkCollection.payerBankName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankSwiftBic).textContains(testData.BulkCollection.payerBankID),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(testData.BulkCollection.payerBankAccountNumber),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue).textContains(testData.BulkCollection.DDAreference),
        await ensure(_PaymentsPages.BulkCollectionPage.refForPayeeValue).textContains(testData.BulkCollection.referenceForPayer),
        await _PaymentsPages.BulkCollectionPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkCollectionPage.messageValue).textContains(isEdit ? testData.BulkCollection.messageEdit :testData.BulkCollection.message),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailIdO),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId1),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId2),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId3),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId4),
        await ensure(_PaymentsPages.BulkCollectionPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}
