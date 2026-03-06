/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages, ApprovalsPages } from '../../../pages/IDEALX';
import { ensure, handlerCase, SIT, PROJECT_TYPE } from '../../../lib';
import { browser, promise } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('IN_testData.json');
let _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let fileName = "";
let CAAcknowledgementnumber = '';

describe('IN_DigiDoc', async function () {

    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.OTT.SIT.loginCompanyId : testData.OTT.UAT.loginCompanyId, SIT ? testData.OTT.SIT.loginUserId : testData.OTT.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a TT Payment with DigiDoc file', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.OTT.SIT.fromAccount : testData.OTT.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.OTT.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(SIT ? testData.OTT.SIT.existingPayee : testData.OTT.UAT.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.OTT.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.LocationOfService.select(testData.OTT.LocationOfService);
        await _PaymentsPages.TelegraphicTransferPage.CAAcknNumber.input(testData.OTT.CAAcknowledgementnumber);
        await _PaymentsPages.TelegraphicTransferPage.digiDocFileUploadButton.select(testData.digidoc.uploadFileName);
        await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.OTT.DocumentType);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesShared.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.A2Ack.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.OTT.SIT.fromAccount : testData.OTT.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.OTT.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
            await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploadedDocumentType1).textContains(testData.OTT.DocumentType),
        ])
    });

    //Add for IDXP-2205 IN TT
        it('Create a TT Payment with DigiDoc file&ApproveNow mChllenge', async function () {
            await _PaymentsPages.AccountTransferPage.paymentMenu.click();
            await _PaymentsPages.TransferCentersPage.loadCondition();
            await _PaymentsPages.AccountTransferPage.makePayment.click();
            await _PaymentsPages.TelegraphicTransferPage.loadCondition();
            await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.OTT.SIT.fromAccount : testData.OTT.UAT.fromAccount);
            await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.OTT.Docamount);
            await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(SIT ? testData.OTT.SIT.existingPayee : testData.OTT.UAT.existingPayee);
            await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.OTT.purposeCode);
            await _PaymentsPages.TelegraphicTransferPage.LocationOfService.select(testData.OTT.LocationOfService);
            await _PaymentsPages.TelegraphicTransferPage.CAAcknNumber.input(testData.OTT.CAAcknowledgementnumber);
            await _PaymentsPages.TelegraphicTransferPage.digiDocFileUploadButton.select(testData.digidoc.uploadFileName);
            await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.OTT.DocumentType);
            await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.OTT.DocpaymentDetail);
            await _PaymentsPages.TelegraphicTransferPage.bankChargesShared.jsClick();
            await _PaymentsPages.TelegraphicTransferPage.A2Ack.jsClick();
            await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
            await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
            await _PaymentsPages.TelegraphicTransferPage.approvalNowCheckBox.jsClick();
            //await ensure(_PaymentsPages.TelegraphicTransferPage.mchallengeText).textContains(testData.TelegraphicTransfer.mChllengeText);     
            await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
            await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input('123123123');
            await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
            await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
            await browser.sleep(3000)//wait status change
            await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
                reference = text;
            });
            await _PaymentsPages.AccountTransferPage.paymentMenu.click();
            await _PaymentsPages.TransferCentersPage.loadCondition();
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
            await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
            await _PaymentsPages.TelegraphicTransferPage.ShowHistoryButton.click();
            await promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.OTT.SIT.fromAccount : testData.OTT.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeAcctValue).textContains(SIT ? testData.OTT.SIT.existingPayee : testData.OTT.UAT.existingPayee),
            await ensure(_PaymentsPages.TelegraphicTransferPage.HistoryComment0).textIs(testData.digidoc.RejectComment),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.PendingSupportingDocument),
        ])
        });
        it('Edit a IN TT Payment via Transfer Center', async function () {
                await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
                await _PaymentsPages.TransferCentersPage.loadCondition();
                if (0 !== reference.trim().length) {
                    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
                } else {
                    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - Telegraphic Transfer", testData.status.PendingSupportingDocument);
                }
                await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
                await _PaymentsPages.TelegraphicTransferPage.AddAttachmentBtn.click();
                await _PaymentsPages.TelegraphicTransferPage.loadConditionForAddAttachmentPage();
                 if(_PaymentsPages.TelegraphicTransferPage.DocDeleteButton.isDisplayed)
                {
                    await _PaymentsPages.TelegraphicTransferPage.DocDeleteButton.jsClick();
                    await _PaymentsPages.TelegraphicTransferPage.loadConditionForAddAttachmentPage();
                };
                await _PaymentsPages.TelegraphicTransferPage.UploadfileBtn.select(testData.digidoc.uploadFileName);
                await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.digidoc.DocumentType);
                await _PaymentsPages.TelegraphicTransferPage.DocComment.input(testData.digidoc.DocComment);
                await _PaymentsPages.TelegraphicTransferPage.ConfirmUploadBtn.click();
                await _PaymentsPages.TelegraphicTransferPage.ProceedButton.click();
                await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
                await _PaymentsPages.TelegraphicTransferPage.ShowHistoryButton.jsClick();
                await Promise.all([
                await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.OTT.SIT.fromAccount : testData.OTT.UAT.fromAccount),
                await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeAcctValue).textContains(SIT ? testData.OTT.SIT.existingPayee : testData.OTT.UAT.existingPayee),
                await ensure(_PaymentsPages.TelegraphicTransferPage.HistoryComment0).textContains(testData.digidoc.DocComment),
                await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.PendingApproval),
                ]); 

            });
    //

    it('FS upload a TT Payment with DigiDoc file', async function () {

        CAAcknowledgementnumber = '221001';
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.digidoc.SIT.fileName : testData.digidoc.UAT.fileName, testData.digidoc.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await _PaymentsPages.TelegraphicTransferPage.AddAttachmentBtn.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForAddAttachmentPage();
        await _PaymentsPages.TelegraphicTransferPage.UploadfileBtn.select(testData.digidoc.uploadFileName);
        await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.digidoc.DocumentType);
        await _PaymentsPages.TelegraphicTransferPage.ConfirmUploadBtn.click();
        await _PaymentsPages.TelegraphicTransferPage.proceedSubmitBtn.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploadedDocumentType2).textContains(testData.digidoc.DocumentType),
            await ensure(_PaymentsPages.TelegraphicTransferPage.CAAcknownumber).textContains(CAAcknowledgementnumber),
        ]);
    });
});

    //due to approver new ui


// describe('IN digidoc - ITT', async function () {
//     this.retries(browser.params.caseRetryTimes);
//     before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ITT.SIT.loginCompanyId : testData.ITT.UAT.loginCompanyId, SIT ? testData.ITT.SIT.loginUserId : testData.ITT.UAT.loginUserId, "123123"); });
//     const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
//     it('Edit ITT with DigiDoc file', async function () {
//         await displayDataWithSearchandSelectFirstOne();
//         await _PaymentsPages.ITTPage.loadCondition4ITTView();
//         await _PaymentsPages.ITTPage.editButton.click();
//         await _PaymentsPages.ITTPage.loadCondition4ITTEdit();
//         await _PaymentsPages.ITTPage.purposeCode.select(testData.ITT.purposeCode);
//         await _PaymentsPages.ITTPage.fxContract.input(testData.ITT.fxContract);
//         await _PaymentsPages.ITTPage.disposalAccountInstruction.input(testData.ITT.disposalAccountInstruction);
//         await _PaymentsPages.ITTPage.billRef.input(testData.ITT.billRef);
//         await _PaymentsPages.ITTPage.digiDocFileUploadButton.select(testData.digidoc.uploadFileName);
//         await _PaymentsPages.ITTPage.nextButton.click();
//         await _PaymentsPages.ITTPage.loadCondition4ITTSubmit();
//         await _PaymentsPages.ITTPage.submitButton.click();
//         await displayDataWithSearchandSelectFirstOne();
//         await _PaymentsPages.ITTPage.loadCondition4ITTView();
//         await Promise.all([
//             await ensure(_PaymentsPages.ITTPage.purposeCodeValue).textContains(testData.ITT.purposeCode)
//         ]);
//     });

//     async function displayDataWithSearchandSelectFirstOne(): Promise<void> {
//         await _ApprovalsPages.ApprovalPage.approvalMenu.click();
//         await _ApprovalsPages.ApprovalPage.loadCondition();
//         await _PaymentsPages.ITTPage.ITTApprove.click();
//         await _PaymentsPages.ITTPage.loadCondition2();
//         await _PaymentsPages.ITTPage.showAddFilterLabel2.jsClick();
//         await _PaymentsPages.ITTPage.scrollTo(0, 300);
//         await _PaymentsPages.ITTPage.dateFromSelect.select(testData.ITT.dateFrom);
//         await _PaymentsPages.ITTPage.dateToSelect.select(testData.ITT.dateTo);
//         await _PaymentsPages.ITTPage.searchButton.click();
//         await _PaymentsPages.ITTPage.loadCondition4Search();
//         await _PaymentsPages.ITTPage.firstDataItem.click();
//     }
// });