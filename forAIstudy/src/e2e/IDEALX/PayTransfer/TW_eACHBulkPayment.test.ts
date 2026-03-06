/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages, FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../lib";
import { browser } from 'protractor';
import * as moment from "moment"
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
let TemplateName = "";
let paymentReference = '';
let verifyReference = "";
let templateRef = "";
let eACHBulkTemplateName =""
let approvalReference = "";
let _PaymentsPages = new PaymentsPages();
let currentDate = moment(new Date()).format("DD MMM YYYY");
let _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let uploadTestData = _FilesPages.fetchTestData("uploadTestData/TW_uploadTestData.json");
let fileName = '';

describe('TW_eACH Bulk Payment ', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.eACHBulkPayment.SIT.loginCompanyId : testData.eACHBulkPayment.UAT.loginCompanyId, SIT ? testData.eACHBulkPayment.SIT.loginUserId : testData.eACHBulkPayment.UAT.loginUserId, SIT ? 123123 : testData.eACHBulkPayment.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an eACH Bulk Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount);
        //await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Immediate [eACH]");
        await _PaymentsPages.BulkPaymentPage.bankCharge.select("Your payee (CRED/BEN)");
        await _PaymentsPages.BulkPaymentPage.scrollTo(0,700);
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.eACHBulkPayment.billerServiceID);
        await addNewPayee(testData.eACHBulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await checkViewBulkACHPageAllFieldForOnline(); //IDXP-812
    });

    it('Create eACH Bulk with Approval Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        //await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Immediate [eACH]");
        await _PaymentsPages.BulkPaymentPage.scrollTo(0,700);
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.eACHBulkPayment.billerServiceID);
        await addNewPayee(testData.eACHBulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.eACHBulkPayment.challengeResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.eACHBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create eACH Bulk with Approval Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount);
        //await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Immediate [eACH]");
        await _PaymentsPages.BulkPaymentPage.scrollTo(0,700);
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.eACHBulkPayment.billerServiceID);
        await addNewPayee(testData.eACHBulkPayment.amountA2Ix);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.eACHBulkPayment.challengeResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();

        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.eACHBulkPayment.amountA2),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PartialApproved)
        ]);
    });

    it('Create eACH Bulk Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount);
        //await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Immediate [eACH]");
        await _PaymentsPages.BulkPaymentPage.scrollTo(0,700);
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.eACHBulkPayment.billerServiceID);
        await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(testData.eACHBulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentPage.addButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.eACHBulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.jsClick();
        await _PaymentsPages.BulkPaymentPage.payeeFreeText4Sender.input(testData.eACHBulkPayment.payeeFreeText4Sender);
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.eACHBulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.eACHBulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.eACHBulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.eACHBulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'eACHBULK' + generatedID();
        await _PaymentsPages.TelegraphicTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            templateRef = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(templateRef);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.eACHBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.eACHBulkPayment.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateFromAccount).textContains(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateAmount).textContains(testData.eACHBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.eACHBulkPayment.existingPayee),
        ]);
    });

    it('Create eACH Bulk Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.eACHBulkPayment.existingTemplate);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Save eACH Bulk Payment As Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount);
        //await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Immediate [eACH]");
        await _PaymentsPages.BulkPaymentPage.scrollTo(0,700);
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.eACHBulkPayment.billerServiceID);
        await addNewPayee(testData.eACHBulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.saveAsDraft.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.eACHBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });

    it('Copy eACH Bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.eACHBulk, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.copyButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.amount.clean();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.eACHBulkPayment.amountVIx)
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.eACHBulkPayment.amountV),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification)
        ]);
    });

    it('Reject eACH Bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.eACHBulk, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.reasonForRejection.input(testData.eACHBulkPayment.rejectReason);
        await _PaymentsPages.BulkPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.rejectStatus).textContains(testData.status.Rejected)
        ]);
    });

    it('Edit eACH Bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.eACHBulk, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.editButton.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.deletePayee.click();
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.eACHBulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.eACHBulkPayment.newPayeeNickname);
        await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT ? testData.eACHBulkPayment.SIT.payeeBankID : testData.eACHBulkPayment.UAT.payeeBankID);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.eACHBulkPayment.accountNumber);
        await _PaymentsPages.BulkPaymentPage.payeeNationalID.input(testData.eACHBulkPayment.payeeNationalID);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.eACHBulkPayment.editamount);
        await _PaymentsPages.BulkPaymentPage.batchId.clean();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.eACHBulkPayment.editamount),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.eACHBulkPayment.newPayeeName),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Delete eACH Bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.eACHBulk, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.eACHBulkPayment.labelNoInformationDisplay);
    });

    // R8.9 DASB-33353 TW IDEAL eACH Bulk payment add new fields Mandate deatail/ Company stock code/ Passbook memo

    it('Upload TW eACH Bulk payment that Mandate deatails Company stock code Passbook memo have max length value', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.eACHBulkPayment.SIT.fileName : testData.eACHBulkPayment.UAT.fileName, testData.eACHBulkPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewBulkACHPageAllFieldForFS(); // Add for IDXP-812
    });

    it('Download eACH Bulk Payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.filesMangementCenter.click();
        await _FilesPages.uploadFilePage.downloadTab.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.creDownloadFileBtn.click();
        let fileName = 'downloadeACHBulk' + generatedID();
        await _FilesPages.downloadFilePage.fileName.input(fileName);
        await _FilesPages.downloadFilePage.paymentType.select(testData.eACHBulkPayment.downloadFileType);
        await _FilesPages.downloadFilePage.scrollTo(0, 400);
        await _FilesPages.downloadFilePage.absoluteDatesBtn.jsClick();
        await _FilesPages.downloadFilePage.startAbsoluteDate.select(testData.eACHBulkPayment.fromDate);
        await _FilesPages.downloadFilePage.endAbsoluteDate.select(currentDate);
        await _FilesPages.downloadFilePage.loadConditionForDownloadFile();
        await _FilesPages.downloadFilePage.nextBtn.jsClick();
        await _FilesPages.downloadFilePage.dismissBtn.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.refershButton.jsClick();
        await Promise.all([
            await ensure(_FilesPages.downloadFilePage.fileLink).textContains(fileName),
            await ensure(_FilesPages.downloadFilePage.downloadBtn).isNotDisabled(),
        ]);
    });

    // R8.9 DASB-33353 TW IDEAL eACH Bulk payment add new fields Mandate deatail/ Company stock code/ Passbook memo

    it('Create TW eACH Bulk payment template that Mandate deatails Company stock code Passbook memo have max length value', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.TWBulkTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        eACHBulkTemplateName = 'eACHBulk' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(eACHBulkTemplateName);
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount);
        //await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Immediate (eACH)");
        await _PaymentsPages.BulkPaymentPage.scrollTo(0, 700);
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.eACHBulkPayment.billerServiceID);
        await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(testData.eACHBulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentPage.addButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.eACHBulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.payeeMandateDetail.input(testData.eACHBulkPayment.MandatedetailsValue);
        await _PaymentsPages.BulkPaymentPage.payeeStockCode.input(testData.eACHBulkPayment.CompanyStockCodeValue);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.jsClick();
        await _PaymentsPages.BulkPaymentPage.payeePassbook.input(testData.eACHBulkPayment.PassbookmemoValue);
        await _PaymentsPages.BulkPaymentPage.payeeFreeText4Sender.input(testData.eACHBulkPayment.payeeFreeText4Sender);
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.eACHBulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.eACHBulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.eACHBulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.eACHBulkPayment.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.eACHBulkPayment.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.eACHBulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(eACHBulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewBulkPage();
        await _PaymentsPages.BulkPaymentPage.ViewShowOptionalDetails.jsClick();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateName).textIs(eACHBulkTemplateName),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateAmount).textContains(testData.eACHBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.eACHBulkPayment.existingPayee),
            await ensure(_PaymentsPages.BulkPaymentPage.ViewMandatedetails).textContains(testData.eACHBulkPayment.MandatedetailsValue),
            await ensure(_PaymentsPages.BulkPaymentPage.ViewstockCode).textContains(testData.eACHBulkPayment.CompanyStockCodeValue),
            await ensure(_PaymentsPages.BulkPaymentPage.ViewPassbook).textContains(testData.eACHBulkPayment.PassbookmemoValue),
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.Approved)
        ]);
    });

    // it('Approve eACH Bulk Payment Template', async function () {
    //     await new NavigatePages().loginIdealx(SIT ? testData.eACHBulkPayment.SIT.loginCompanyId : testData.eACHBulkPayment.UAT.loginCompanyId, SIT ? testData.eACHBulkPayment.SIT.verifyUserId : testData.eACHBulkPayment.UAT.verifyUserId, "123123");
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    //     await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //     if (0 !== eACHBulkTemplateName.trim().length) {
    //         await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(eACHBulkTemplateName);
    //     }
    //     await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
    //         eACHBulkTemplateName = text.trim();
    //     });
    //     await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
    //     await _PaymentsPages.PaymentTemplatesPage.approveBtn.jsClick();
    //     await _PaymentsPages.BulkPaymentPage.approveButton.jsClick(); //preview approve
    //     await _PaymentsPages.BulkPaymentPage.dismissButton.click();
    //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(eACHBulkTemplateName);
    //     await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
    //     await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewBulkPage();

    //     await Promise.all([
    //         await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionStatus).textContains(testData.status.Approved)

    //     ]);
    // });

    it('Delete eACH Bulk Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== eACHBulkTemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(eACHBulkTemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.pendingTab.click();
            await _PaymentsPages.PaymentTemplatesPage.showAdditonFilter.click();
            await _PaymentsPages.PaymentTemplatesPage.paymentTypeList.select(testData.paymentType.eACHBulk);
    
        }
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
            eACHBulkTemplateName = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.deleteBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForDeletePage();
        await _PaymentsPages.PaymentTemplatesPage.preDeleteBtn.jsClick();  //preview delete
        await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(eACHBulkTemplateName);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.eACHBulkPayment.labelNoInformationDisplay);
    });

    // R8.9 DASB-33353 TW IDEAL eACH Bulk payment add new fields Mandate deatail/ Company stock code/ Passbook memo
    it('Approve TW eACH Bulk payment that Mandate deatails Company stock code Passbook memo have max length value', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount);
        //await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Immediate [eACH]");
        await _PaymentsPages.BulkPaymentPage.scrollTo(0, 700);
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.eACHBulkPayment.billerServiceID);
        await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(testData.eACHBulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentPage.addButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.eACHBulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.payeeMandateDetail.input(testData.eACHBulkPayment.MandatedetailsValue);
        await _PaymentsPages.BulkPaymentPage.payeeStockCode.input(testData.eACHBulkPayment.CompanyStockCodeValue);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.jsClick();
        await _PaymentsPages.BulkPaymentPage.payeePassbook.input(testData.eACHBulkPayment.PassbookmemoValue);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.approveButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.eACHBulkPayment.challengeResponse);
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);

    });
});

describe('TW_eACH Bulk Payment ', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.eACHBulkPayment.SIT.loginCompanyId1 : testData.eACHBulkPayment.UAT.loginCompanyId, SIT ? testData.eACHBulkPayment.SIT.loginUserId1 : testData.eACHBulkPayment.UAT.loginUserId,  SIT ? 123123 : testData.eACHBulkPayment.UAT.Password); });
    const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // add IDXP-2013
    it('Create TW eACH Bulk payment from view template page', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.eACHBulkPayment.TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();
        await _PaymentsPages.PaymentTemplatesPage.makeAPayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await Promise.all([
            await _PaymentsPages.BulkPaymentPage.selectFromAccount.isDisabled(),
            await _PaymentsPages.BulkPaymentPage.bankCharge.isDisabled(),
            await _PaymentsPages.BulkPaymentPage.payCharges.isDisabled(),
            await _PaymentsPages.BulkPaymentPage.serviceID.isDisabled(),
            await _PaymentsPages.BulkPaymentPage.mandateDetail.isDisabled(),
            await _PaymentsPages.BulkPaymentPage.stockCode.isDisabled(),
        ]);
    });
});

describe('Verify And Release eACH Bulk Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.eACHBulkPayment.SIT.loginCompanyId : testData.eACHBulkPayment.UAT.loginCompanyId, SIT ? testData.eACHBulkPayment.SIT.verifyUserId : testData.eACHBulkPayment.UAT.verifyUserId, SIT ? 123123 : testData.eACHBulkPayment.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an eACH Bulk Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, testData.paymentType.eACHBulk).then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });

    it('Approve an eACH Bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.eACHBulk, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.approveButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.eACHBulkPayment.challengeResponse);
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Release an eACH Bulk Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.eACHBulk).then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received),
        ]);
    });
});

export async function addNewPayee(amountValue: any) {
    await _PaymentsPages.BulkPaymentPage.newPayee.click();
    await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.eACHBulkPayment.newPayeeName);
    await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.eACHBulkPayment.newPayeeNickname);
    await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT ? testData.eACHBulkPayment.SIT.payeeBankID : testData.eACHBulkPayment.UAT.payeeBankID);
    await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
    await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.eACHBulkPayment.accountNumber);
    await _PaymentsPages.BulkPaymentPage.payeeNationalID.input(testData.eACHBulkPayment.payeeNationalID);
    await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
    await _PaymentsPages.BulkPaymentPage.amount.input(amountValue);
    await _PaymentsPages.BulkPaymentPage.payeeMandateDetail.input(testData.eACHBulkPayment.MandatedetailsValue);
    await _PaymentsPages.BulkPaymentPage.payeeStockCode.input(testData.eACHBulkPayment.CompanyStockCodeValue);
    await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.jsClick();
    await _PaymentsPages.BulkPaymentPage.payeePassbook.input(testData.eACHBulkPayment.PassbookmemoValue);
    await _PaymentsPages.BulkPaymentPage.payeeFreeText4Sender.input(testData.eACHBulkPayment.payeeFreeText4Sender);
    await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.eACHBulkPayment.emailIdO);
    await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.eACHBulkPayment.emailId1);
    await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.eACHBulkPayment.emailId2);
    await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.eACHBulkPayment.emailId3);
    await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.eACHBulkPayment.emailId4);
    await _PaymentsPages.BulkPaymentPage.message.input(testData.eACHBulkPayment.message);
}

export async function checkViewBulkACHPageAllFieldForFS() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? uploadTestData.BulkeACH.SIT.fromAccount : uploadTestData.BulkeACH.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.BulkeACH.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.BulkeACH.newPayeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView).textContains(uploadTestData.BulkeACH.mandatedetails),
        await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView).textContains(uploadTestData.BulkeACH.stockCode),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.passBookView).textContains(uploadTestData.BulkeACH.passbookMemo),
        //Add for IDXP-812
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.BulkeACH.paymentType),
        await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(uploadTestData.BulkeACH.bankChargeUs),
        await ensure(_PaymentsPages.BulkPaymentPage.chargeAccountView).textContains(SIT ? uploadTestData.BulkeACH.SIT.chargeAccount : uploadTestData.BulkeACH.UAT.chargeAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.billerServiceIDValue).textContains(uploadTestData.BulkeACH.billerServiceId),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(uploadTestData.BulkeACH.newPayeeNickName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(SIT ? uploadTestData.BulkeACH.SIT.payeeBankName : uploadTestData.BulkeACH.UAT.payeeBankName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBrchBankName).textContains(SIT ? uploadTestData.BulkeACH.SIT.payeeBankBrchName : uploadTestData.BulkeACH.UAT.payeeBankBrchName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(SIT ? uploadTestData.BulkeACH.SIT.payeeBankSwiftBic : uploadTestData.BulkeACH.UAT.payeeBankSwiftBic),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.BulkeACH.newPayeeAcctNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue).textContains(uploadTestData.BulkeACH.nationalID),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.BulkeACH.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.freeTextView).textContains(uploadTestData.BulkeACH.freetextArea),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.BulkeACH.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkeACH.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkeACH.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkeACH.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkeACH.emailId4),
        await ensure(_PaymentsPages.eACHPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.activityLog).textContains("Create")
    ]);
}

export async function checkViewBulkACHPageAllFieldForOnline() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.eACHBulkPayment.SIT.fromAccount : testData.eACHBulkPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(testData.eACHBulkPayment.paymentTypeValue),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(testData.eACHBulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(testData.eACHBulkPayment.bankChargeThey),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.billerServiceIDValue).textContains(testData.eACHBulkPayment.billerServiceID),
        //Payee
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.eACHBulkPayment.newPayeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(SIT ? testData.eACHBulkPayment.SIT.payeeBankID : testData.eACHBulkPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(testData.eACHBulkPayment.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue).textContains(testData.eACHBulkPayment.payeeNationalID),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.eACHBulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView).textContains(testData.eACHBulkPayment.MandatedetailsValue),
        await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView).textContains(testData.eACHBulkPayment.CompanyStockCodeValue),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.passBookView).textContains(testData.eACHBulkPayment.PassbookmemoValue),
        await ensure(_PaymentsPages.BulkPaymentPage.freeTextView).textContains(testData.eACHBulkPayment.payeeFreeText4Sender),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(testData.eACHBulkPayment.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.eACHBulkPayment.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.eACHBulkPayment.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.eACHBulkPayment.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.eACHBulkPayment.emailId4),
        await ensure(_PaymentsPages.eACHPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.activityLog).textContains("Create")
    ]);
}