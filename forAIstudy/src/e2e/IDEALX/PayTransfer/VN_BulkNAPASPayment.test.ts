/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages,FilesPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE,generatedID } from '../../../lib';
import { browser } from 'protractor';

let reference = "";
let rejectReference = "";
let fileName = "";
let fileforRejectName = "";
let paymentType = "";
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let testData =  _FilesPages.fetchTestData('VN_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/VN_uploadTestData.json');

describe('VN - Bulk NAPAS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FSuploadFile.SIT.loginCompanyId : testData.FSuploadFile.UAT.loginCompanyId, SIT ? testData.FSuploadFile.SIT.loginUserId : testData.FSuploadFile.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('FS upload Single NAPAS payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let paymentType = "ALL - Universal File Format";
        let approvalOption = "transaction";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.FSuploadFile.SIT.fileName3 : testData.FSuploadFile.UAT.fileName3, approvalOption).then(async (data) => {
            fileName = data;
                });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.showOptionView.click();
        await checkViewBulkNAPASPageAllField(); // add for IDXP-2187
    });

    it('Approve BulkNapas Payment with push approval', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.scrollToBottom();
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.pushBtnButton.click();
        await browser.sleep(3000);
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
                reference = text;
            });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
            await Promise.all([
      
                await ensure(_PaymentsPages.BulkPaymentPage.PayeeStatusValue).textContainsLessOne(uploadTestData.status.PartialApproved,uploadTestData.status.Approved),
                await ensure(_PaymentsPages.BulkPaymentPage.PayeeStatusValue2).textContainsLessOne(uploadTestData.status.PartialApproved,uploadTestData.status.Approved),
                await ensure(_PaymentsPages.BulkPaymentPage.PayeeStatusValue3).textContainsLessOne(uploadTestData.status.PartialApproved,uploadTestData.status.Approved),
               
            ]);
        });
     it('Reject BulkNapas Payment via view page', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let paymentType = "ALL - Universal File Format";
        let approvalOption = "transaction";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.FSuploadFile.SIT.fileName3 : testData.FSuploadFile.UAT.fileName3, approvalOption).then(async (data) => {
            fileforRejectName = data;
                });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileforRejectName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.scrollToBottom();
        await _PaymentsPages.BulkPaymentPage.rejectButton4.click();
        //await _PaymentsPages.BulkPaymentPage.loadConditionForDismissRejectDialog();
        await _PaymentsPages.BulkPaymentPage.reasonForRejection.input(uploadTestData.BulkNAPAS.RejectReason);
        await _PaymentsPages.BulkPaymentPage.rejectDialogButton.click(); 
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissRejectDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
                rejectReference = text;
            });
        
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(rejectReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
            await Promise.all([
      
                await ensure(_PaymentsPages.BulkPaymentPage.rejectStatus).textIs(uploadTestData.status.Rejected),
                await ensure(_PaymentsPages.BulkPaymentPage.rejectStatus2).textIs(uploadTestData.status.Rejected),
                await ensure(_PaymentsPages.BulkPaymentPage.rejectStatus3).textIs(uploadTestData.status.Rejected),
               
            ]);
        
    });
    
});

export async function checkViewBulkNAPASPageAllField() {
    await Promise.all([
        
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.BulkNAPAS.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(uploadTestData.BulkNAPAS.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.BulkNAPAS.paymentTypeValue),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.cutOffTimeView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.viewBulkTotalItem).textContains(uploadTestData.BulkNAPAS.TotalPayees),
        await ensure(_PaymentsPages.BulkPaymentPage.totalAmountValue).textContains(uploadTestData.BulkNAPAS.TotalAmount),
         //account number payee
         await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.BulkNAPAS.newPayeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.BulkNAPAS.newPayeeAcct),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(uploadTestData.BulkNAPAS.payeeBankNameValue),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.BulkNAPAS.bankCode),
        await ensure(_PaymentsPages.BulkPaymentPage.PayeeStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textIs(uploadTestData.BulkNAPAS.amountValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textIs(uploadTestData.BulkNAPAS.ReferenceforPayee),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.BulkNAPAS.paymentDetailsValue),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.BulkNAPAS.msgToPayeeValue),    
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkNAPAS.emailValue0), 
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkNAPAS.emailValue1), 
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkNAPAS.emailValue2), 
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkNAPAS.emailValue3), 
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkNAPAS.emailValue4), 
        // card number payee1
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(uploadTestData.BulkNAPAS.newPayeeCardNumber1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(uploadTestData.BulkNAPAS.newPayeeName),
        
        await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textIs(uploadTestData.BulkNAPAS.amountValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textIs(uploadTestData.BulkNAPAS.ReferenceforPayee2),
        await ensure(_PaymentsPages.BulkPaymentPage.PayeeStatusValue2).textIs(uploadTestData.status.PendingApproval),
        // card number payee1
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue3).textContains(uploadTestData.BulkNAPAS.newPayeeCardNumber2),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA3).textContains(uploadTestData.BulkNAPAS.newPayeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.amountViewA3).textIs(uploadTestData.BulkNAPAS.amountValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue3).textIs(uploadTestData.BulkNAPAS.ReferenceforPayee3),
        await ensure(_PaymentsPages.BulkPaymentPage.PayeeStatusValue3).textIs(uploadTestData.status.PendingApproval),
        
    ]);
}
