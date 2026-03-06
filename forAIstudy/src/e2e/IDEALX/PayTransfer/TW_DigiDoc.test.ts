/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import {NavigatePages, PaymentsPages, ApprovalsPages, FilesPages} from '../../../pages/IDEALX';
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import {browser, promise} from 'protractor';

let _ApprovalsPages = new ApprovalsPages();
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let reference = "";
let fileName = "";
let _FilesPages = new FilesPages();

describe('TW digidoc', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TT.SIT.loginCompanyId : testData.TT.UAT.loginCompanyId, SIT ? testData.TT.SIT.loginUserId : testData.TT.UAT.loginUserId, SIT ? 123123 : testData.TT.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Upload the document', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await fillUpValueWithNewPayee();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOTTPaymentPage();
        await promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TT.SIT.fromAccount : testData.TT.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TT.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploaded).textContains(testData.digidoc.uploadFileName),
        ])
    });

    let paymentType = "";
    let approvalOption = "";
    it('FS upload a TT Payment with DigiDoc file', async function () {
        paymentType = "ALL - Universal File Format";
        approvalOption = "transaction";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.digidoc.SIT.fileName : testData.digidoc.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;
            console.log(fileName);
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.AddAttachmentBtn.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForAddAttachmentPage();
        await _PaymentsPages.TelegraphicTransferPage.UploadfileBtn.select(testData.digidoc.uploadFileName);
        await _PaymentsPages.TelegraphicTransferPage.ConfirmUploadBtn.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploaded).textContains(testData.digidoc.uploadFileName),
        ]);
    });

});

    //due to approver new ui

// describe('TW digidoc - ITT', async function () {
//     this.retries(browser.params.caseRetryTimes);
//     before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TT.SIT.loginCompanyId : testData.TT.UAT.loginCompanyId, SIT ? testData.TT.SIT.loginUserId : testData.TT.UAT.loginUserId, "123123"); });
//     const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

//     it('Edit ITT with DigiDoc file', async function () {
//         await displayDataWithSearchandSelectFirstOne();
//         await _PaymentsPages.ITTPage.loadCondition4ITTView();
//         await _PaymentsPages.ITTPage.editButton.click();
//         await _PaymentsPages.ITTPage.loadCondition4ITTEdit();
//         await _PaymentsPages.ITTPage.oiRemittance.select(testData.ITT.oiRemittance);
//         // await _FilesPages.uploadFilePage.byTxn.jsClick();
//         await _PaymentsPages.ITTPage.originatingCode.select(testData.ITT.originatingCode);
//         // await _FilesPages.uploadFilePage.byTxn.jsClick();
//         if(await _PaymentsPages.ITTPage.trashBinIcon.isDisplayed()){
//             await _PaymentsPages.ITTPage.trashBinIcon.click();
//         }
//         await _PaymentsPages.ITTPage.digiDocFileUploadButton.select(testData.digidoc.uploadFileName);
//         await _PaymentsPages.ITTPage.nextButton.click();
//         await _PaymentsPages.ITTPage.loadCondition4ITTSubmit();
//         await _PaymentsPages.ITTPage.submitButton.click();
//         await _PaymentsPages.ITTPage.loadCondition4ITTFinish();
//         await displayDataWithSearchandSelectFirstOne();
//         await _PaymentsPages.ITTPage.loadCondition4ITTView();
//         await Promise.all([
//             await ensure(_PaymentsPages.ITTPage.fileNameDiv).textContains(testData.digidoc.uploadFileName)
//         ]);
//     });
// });

async function fillUpValueWithNewPayee(): Promise<void> {
    await _PaymentsPages.TelegraphicTransferPage.loadCondition();
    await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TT.SIT.fromAccount : testData.TT.UAT.fromAccount);
    await _PaymentsPages.TelegraphicTransferPage.amountCcy.select(testData.TT.paymentCurrency)
    await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TT.amount);
    await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
    await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
    await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.TT.Country);
    await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(SIT ? testData.TT.SIT.payeeBankID : testData.TT.UAT.payeeBankID);
    //due to new task#DASB-14900 
    //await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testData.TT.newPayeeRoutingCode);
    await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TT.newPayeeAcctNumber);
    await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TT.newPayeeName);
    await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TT.newPayeeNickname);
    await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TT.payeeLocation);
    await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TT.townCity);
    await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TT.newPayeeAdd1);
    await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TT.newPayeeAdd2);
    await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TT.postalCode);
    await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.TT.purposeCode);
    await _ApprovalsPages.transferCentersPage.scrollTo(0, 3500);
    await _PaymentsPages.TelegraphicTransferPage.digiDocFileUploadButton.select(testData.digidoc.uploadFileName);
    await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
}

async function displayDataWithSearchandSelectFirstOne(): Promise<void> {
    await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    await _ApprovalsPages.ApprovalPage.loadCondition();
    await _PaymentsPages.ITTPage.ITTApprove.click();
    await _PaymentsPages.ITTPage.loadCondition2();
    await _PaymentsPages.ITTPage.showAddFilterLabel2.jsClick();
    await _PaymentsPages.ITTPage.scrollTo(0, 300);
    await _PaymentsPages.ITTPage.dateFromSelect.select(testData.ITT.dateFrom);
    await _PaymentsPages.ITTPage.dateToSelect.select(testData.ITT.dateTo);
    await _PaymentsPages.ITTPage.searchButton.click();
    await _PaymentsPages.ITTPage.loadCondition4Search();
    await _PaymentsPages.ITTPage.firstDataItem.click();
}
