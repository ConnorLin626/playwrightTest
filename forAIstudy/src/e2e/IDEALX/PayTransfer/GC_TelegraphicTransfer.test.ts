/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE, devWatch } from "../../../lib";
import { browser } from "protractor";
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
let referenceEdit  = "";
let TemplateName = "";
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let fileName = "";
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData("GC_testData.json");

describe("GC Telegraphic Transfer  Payment", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, "123123");
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create TT Payment with existing Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingTTPayee)
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.TelegraphicTransfer.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.LocationOfService.select(testData.TelegraphicTransfer.locationofService);
        await _PaymentsPages.TelegraphicTransferPage.CAAcknNumber.input(testData.TelegraphicTransfer.CAAcknNumber);
        await _PaymentsPages.TelegraphicTransferPage.digiDocFileUploadButton.select(testData.TelegraphicTransfer.uploadFileName);
        await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.TelegraphicTransfer.DocumentType);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.A2Ack.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
                reference = text;
            });
        console.log(reference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await checkViewPageAllField(false)  // add for IDXP-1562
    });

        
    it('Edit TT Payment via Transfer Center and ticked save as template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("GIFT City Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'GCTT' + generatedID();
        await _PaymentsPages.TelegraphicTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); // add for IDXP-1562
        } else {
            await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.editAmount)
            ]);
        }
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForTTtempViewPayge();
            
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.editAmount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingTTPayee),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateTTStatus).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Upload TT with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileType, SIT ? testData.FileService.SIT.fileNameForTT : testData.FileService.UAT.fileNameForTT, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toNewPayeeNameValue).textContains(testData.FileService.newTTPayee),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toNewPayeeAcctNumValue).textContains(testData.FileService.payeeAccountNum)
        ])
    });

});
 export async function checkViewPageAllField(isEdit :boolean) {
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).textContains(isEdit ? referenceEdit : reference),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            //await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingTTPayee),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeAcctValue).textContains(testData.TelegraphicTransfer.ExistingPayeeAcctValue),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd1Value).textContains(testData.TelegraphicTransfer.PayeeAdd1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd2Value).textContains(testData.TelegraphicTransfer.PayeeAdd2),
            //Due to IDXP-2004
            //await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd3Value).textContains(testData.TelegraphicTransfer.PayeeAdd3),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(testData.TelegraphicTransfer.paymentType),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(isEdit ? testData.TelegraphicTransfer.editAmount:testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(testData.TelegraphicTransfer.payeeBankName),
            //await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(testData.TelegraphicTransfer.payeeBankLocation),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).textContains(testData.TelegraphicTransfer.bankAdd1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress2).textContains(testData.TelegraphicTransfer.bankAdd2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankCity).textContains(testData.TelegraphicTransfer.bankCity),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankRoutingCode).textContains(testData.TelegraphicTransfer.beneRoutingCode),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textIs(testData.TelegraphicTransfer.payeeBankID),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(testData.TelegraphicTransfer.paymentDetail),
            await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(testData.TelegraphicTransfer.message),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailIdO),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId3),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId4),
            await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(testData.TelegraphicTransfer.bankChargeUs),
            await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textContains(testData.TelegraphicTransfer.purposeCodeValue),
            await ensure(_PaymentsPages.TelegraphicTransferPage.localOfServiceValue).textContains(testData.TelegraphicTransfer.locationofService),
            await ensure(_PaymentsPages.TelegraphicTransferPage.caAckNumValue).textContains(testData.TelegraphicTransfer.CAAcknNumber),
            await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploadedDocumentType3).textContains(testData.TelegraphicTransfer.DocumentType),
            await ensure(_PaymentsPages.TelegraphicTransferPage.custRefValue).textContains(isEdit ? referenceEdit : reference),
            await ensure(_PaymentsPages.TelegraphicTransferPage.messageToApproverValue).textContains(testData.TelegraphicTransfer.transactionNote),
            await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(testData.TelegraphicTransfer.messageToOrderingBank),
            await ensure(_PaymentsPages.TelegraphicTransferPage.nextApprover).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.activityLog).textContains(isEdit ? "Modify" : "Create")
        ])
    }


    