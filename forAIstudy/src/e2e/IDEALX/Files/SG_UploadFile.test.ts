/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, ApprovalsPages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let testData = _FilesPages.fetchTestData('SG_testData_01.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/SG_uploadTestData.json');
let fileName = "";
let uploadSuccessFlag = false;
let remitFileName = '';

describe('File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Upload Bulk Payment DBS via FileServices Upload By Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileName : testData.FileService.UAT.fileName, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewBulkPage();

        await checkViewBulkPaymentPageAllField(); // add for IDXP-812
    });

    it('Approval Bulk Payment DBS created via FS Upload', async function () {
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.clickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.FileService.challengeResponse);
        await browser.sleep(5000)
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _FilesPages.AccountTransferPage.paymentMenu.click();
        await _FilesPages.TransferCentersPage.loadCondition();
        await _FilesPages.TransferCentersPage.transferCenterFilter.input(fileName);
        await _FilesPages.TransferCentersPage.refLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionforViewPaymentPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Approved, testData.status.Received),
        ]);
    });

    it('Upload New UFF GIRO Payment with 5 transaction via By File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForGIRO : testData.FileService.UAT.fileNameForGIRO, testData.FileService.approvalOptionByFile, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.giroPaymentPage.loadConditionForViewGiroPaymentPage();

        await checkViewGiroPageAllField(false); //IDXP-812
    });

    //IDXP-2022
    it('Upload  UFF GIRO Payment with UFFV2 only input values to mandatory fields', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForGIROUFFV2 : testData.FileService.UAT.fileNameForGIROUFFV2, testData.FileService.approvalOptionByFile, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.giroPaymentPage.loadConditionForViewGiroPaymentPage();

        await checkViewGiroPageAllField(true); //IDXP-812
    });

    it('Upload New UFF LVT Payment with 5 transaction via By Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForGIRO : testData.FileService.UAT.fileNameForGIRO, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForGIRO).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValueForGIRO).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Bulk Payment that without swift bic transaction via By File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForBPY : testData.FileService.UAT.fileNameForBPY, testData.FileService.approvalOptionByFile, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewBulkPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue2).textContains(testData.status.PendingApproval),
            //add for AB-11702 DASB-46862 AB-11985
            await ensure(_PaymentsPages.BulkPaymentPage.transactionBankCode0).textContains("7088 888"),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionBankCode1).textContains("7135 690")
        ]);
    });
    //IDXP-2022
    it('Upload BULK Payment with UFFv2', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForBPYv2 : testData.FileService.UAT.fileNameForBPYv2, testData.FileService.approvalOptionByTransaction, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewBulkPage();
        await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(uploadTestData.bulkPaymentDBS.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.bulkPaymentDBS.BulkpaymentTypeView),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.bulkPaymentDBS.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),

        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.bulkPaymentDBS.payeeName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(uploadTestData.bulkPaymentDBS.payeeBankName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.bulkPaymentDBS.payeeBankId1),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.bulkPaymentDBS.accountNumber1),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.bulkPaymentDBS.amount1),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue).textContains(uploadTestData.bulkPaymentDBS.purposeCode1),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.bulkPaymentDBS.refForPayee1),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.bulkPaymentDBS.paymentDetails1),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.bulkPaymentDBS.msgToPayee1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPaymentDBS.emailId10),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPaymentDBS.emailId11),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPaymentDBS.emailId12),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPaymentDBS.emailId13),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPaymentDBS.emailId14),

       //Payee 2
       await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(uploadTestData.bulkPaymentDBS.payeeName2),
       await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName2).textContains(uploadTestData.bulkPaymentDBS.payeeBankName2),
       await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic2).textContains(uploadTestData.bulkPaymentDBS.payeeBankId2),
       await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(uploadTestData.bulkPaymentDBS.accountNumber2),
       await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(uploadTestData.bulkPaymentDBS.amount2),
       await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue2).textContains(uploadTestData.bulkPaymentDBS.purposeCode2),
       await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(uploadTestData.bulkPaymentDBS.refForPayee2),
       await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
       await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue2).textContains(uploadTestData.bulkPaymentDBS.paymentDetails2),
       await ensure(_PaymentsPages.BulkPaymentPage.messageValue2).textContains(uploadTestData.bulkPaymentDBS.msgToPayee2),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPaymentDBS.emailId20),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPaymentDBS.emailId21),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPaymentDBS.emailId22),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPaymentDBS.emailId23),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPaymentDBS.emailId24),
    ]);
    });


    it('Upload New UFF Bulk Collection with 5 transaction via Per Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForCOL : testData.FileService.UAT.fileNameForCOL, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await checkViewBulkCollectionPageAllField();
    });

    //IDXP-2022 BUlk Collection
    it('Upload BULK Collection with UFFv2', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForCOLv2 : testData.FileService.UAT.fileNameForCOLv2, testData.FileService.approvalOptionByTransaction, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewBulkPage();
        await Promise.all([
        await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(uploadTestData.BulkCollection.fromAccount),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(uploadTestData.BulkCollection.amount1),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentType).textContains(uploadTestData.BulkCollection.paymentTypeView),
        await ensure(_PaymentsPages.BulkCollectionPage.totalAmountValue).textContains(uploadTestData.BulkCollection.totalAmount),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionSummaryValue).textContains(uploadTestData.BulkCollection.totalAmount),
        // Payer 1
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue).textContains(uploadTestData.BulkCollection.newPayeeName1),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue).textContains(uploadTestData.BulkCollection.newPayeeName1),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankName).textContains(uploadTestData.BulkCollection.payerBankName1),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankSwiftBic).textContains(uploadTestData.BulkCollection.payerBankID1),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(uploadTestData.BulkCollection.payerBankAccountNumber1),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue).textContains(uploadTestData.BulkCollection.DDAreference1),
        await ensure(_PaymentsPages.BulkCollectionPage.purposeCodeValue).textContains(uploadTestData.BulkCollection.purposeCode1),
        await ensure(_PaymentsPages.BulkCollectionPage.refForPayeeValue).textContains(uploadTestData.BulkCollection.referenceForPayer1),
        await _PaymentsPages.BulkCollectionPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionDetailValue).textContains(uploadTestData.BulkCollection.collectionDetailsToThePayerBank1),
        await ensure(_PaymentsPages.BulkCollectionPage.messageValue).textContains(uploadTestData.BulkCollection.message1),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId10),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId11),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId12),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId13),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId14),

        // payer 2
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue2).textContains(uploadTestData.BulkCollection.newPayeeName2),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue2).textContains(uploadTestData.BulkCollection.newPayeeName2),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankName2).textContains(uploadTestData.BulkCollection.payerBankName2),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankSwiftBic2).textContains(uploadTestData.BulkCollection.payerBankID2),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue2).textContains(uploadTestData.BulkCollection.payerBankAccountNumber2),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue2).textContains(uploadTestData.BulkCollection.DDAreference2),
        await ensure(_PaymentsPages.BulkCollectionPage.purposeCodeValue2).textContains(uploadTestData.BulkCollection.purposeCode2),
        await ensure(_PaymentsPages.BulkCollectionPage.refForPayeeValue2).textContains(uploadTestData.BulkCollection.referenceForPayer2),
        await _PaymentsPages.BulkCollectionPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionDetailValue2).textContains(uploadTestData.BulkCollection.collectionDetailsToThePayerBank2),
        await ensure(_PaymentsPages.BulkCollectionPage.messageValue2).textContains(uploadTestData.BulkCollection.message2),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId20),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId21),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId22),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId23),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId24),
    ]);
    });

    it('Upload New UFF Payroll with 5 transaction via By File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForSAL : testData.FileService.UAT.fileNameForSAL, testData.FileService.approvalOptionByFile, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await checkViewPayrollPageAllField();
    });

    it('Upload New UFF Payroll DBS with 5 transaction via Per Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForSPE : testData.FileService.UAT.fileNameForSPE, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Payroll 02 with 5 transaction via By File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForSL2 : testData.FileService.UAT.fileNameForSL2, testData.FileService.approvalOptionByFile, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Payroll 02 DBS with 5 transaction via Per Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForSE2 : testData.FileService.UAT.fileNameForSE2, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Management Payroll with 5 transaction via By File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForMP : testData.FileService.UAT.fileNameForMP, testData.FileService.approvalOptionByFile, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Management Payroll DBS with 5 transaction via Per Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForMPE : testData.FileService.UAT.fileNameForMPE, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await checkViewManagePayrollDBSPageAllField(); //IDXP-812
    });

    it('Upload New UFF Management Payroll 02 with 5 transaction via Per Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForMP2 : testData.FileService.UAT.fileNameForMP2, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewBulkPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue2).textContains(testData.status.PendingApproval),
            //add for AB-11702 DASB-46862 AB-11985
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains("DBSSSGS0XXX"),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic2).textContains("BKCHSGS0XXX")
        ]);
    });

    it('Upload New UFF Management Payroll 02 DBS with 5 transaction via Per Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForME2 : testData.FileService.UAT.fileNameForME2, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Cheque Express-BCH with 5 transaction via By File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForBCH : testData.FileService.UAT.fileNameForBCH, testData.FileService.approvalOptionByFile, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();

        await checkViewChequePageAllField(false); //IDXP-812
    });
    //IDXP-2100 REMOVE CCH
    /* it('Upload New UFF Corporate Cheque-CCH with 5 transaction via Per Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForCCH : testData.FileService.UAT.fileNameForCCH, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
       
        await checkViewChequePageAllField(true); //IDXP-812
    });*/

    it('Upload New UFF MEPS-HVT with 5 transacitons via By File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForMEP : testData.FileService.UAT.fileNameForMEP, testData.FileService.approvalOptionByFile, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await checkViewMEPSPageAllField(true, false, false);// IDXP-812
    });

    it('Upload New UFF DemandDraft Payment-DD via Per Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, testData.FileService.SIT.fileNameForDD, testData.FileService.approvalOptionByTransaction, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();

        await checkViewDDPageAllField(true, false, false); //IDXP-812
    });

    it('Upload New UFF Express Bulk Payment-GOP via Per Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, testData.FileService.SIT.fileNameForGOP, testData.FileService.approvalOptionByTransaction, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();

        await checkViewGOPPageAllField(); //IDXP-812
    });

    it('Upload New UFF Express Bulk Collection-GOC via Per Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, testData.FileService.SIT.fileNameForGOC, testData.FileService.approvalOptionByTransaction, testData.FileService.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF with All Payment Types via By Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForALL : testData.FileService.UAT.fileNameForALL, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await browser.sleep(8000)
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        // await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage2();
        await _FilesPages.uploadFilePage.paymentReferenceLink1.jsClick();        

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForGIRO).isNotEmpty(),
        ]);
    });
    // R8.11 SGTT support new purpose code when  Payee country = Myanmar
    it('Upload TT with new purpose code with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForTT : testData.FileService.UAT.fileNameForTT, testData.FileService.approvalOptionByTransaction).then(async data => {
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

        await checkViewTTPageAllField(true, false, false, false); // add for IDXP-812
    });

    it('Upload ICT with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForICT : testData.FileService.UAT.fileNameForICT, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();

        await checkViewICTPageAllField(); //IDXP-812
    });

    it('Upload ACT with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForACT : testData.FileService.UAT.fileNameForACT, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();

        await checkViewACTPageAllField(true,false); //IDXP-812
    });

    it('Upload TT with Remittance format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Remittance - Regional Remittance", SIT ? testData.FileService.SIT.fileNameForTTRemit : testData.FileService.UAT.fileNameForTTRemit, testData.FileService.approvalOptionByTransaction).then(async data => {
            remitFileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
        await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag = true;
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await checkViewTTPageAllField(false, true, false, false); // add for IDXP-812
        
        if(uploadSuccessFlag && 0 !== remitFileName.trim().length) {
            await deleteFile();
        }
    });

    it('Upload MEPS with Remittance format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Remittance - Regional Remittance", SIT ? testData.FileService.SIT.fileNameForMEPSRemit : testData.FileService.UAT.fileNameForMEPSRemit, testData.FileService.approvalOptionByTransaction).then(async data => {
            remitFileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
        await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag = true;
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await checkViewMEPSPageAllField(false,true,false); // add for IDXP-812
        
        if(uploadSuccessFlag && 0 !== remitFileName.trim().length) {
            await deleteFile();
        }
    });
    //add for IEBAA-3647
    it('Upload ACT with UFF format and File Header - Record type is blank', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload9(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForACTHeaderBlank : testData.FileService.UAT.fileNameForACTHeaderBlank, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await ensure(_FilesPages.uploadFilePage.errorMsg).textContains(testData.FileService.errorMessage);
    })
    //IDXP-2022
     it('Upload TT with UFFV2 Detailed format all fields with max length', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId, "123123");
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForTTUFFV2 : testData.FileService.UAT.fileNameForTTUFFV2, testData.FileService.approvalOptionByTransaction).then(async data => {
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

        await checkViewTTPageAllField(false, false, false, false,true); // add for IDXP-812
    });

    it('Upload ACT with UFFV2 Detailed format all fields with max length', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForACTUFFV2 : testData.FileService.UAT.fileNameForACTUFFV2, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();

        await checkViewACTPageAllField(false,true);
    });

    it('Upload RTGS with UFFV2 simple format all fields with max length', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForMEPSUFFV2 : testData.FileService.UAT.fileNameForMEPSUFFV2, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.headerRefValue).isNotEmpty(),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.MEPSPaymentPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(uploadTestData.MEPSPaymentUFFV2.amountValue),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains( uploadTestData.MEPSPaymentUFFV2.fromAccount),
            await ensure(_PaymentsPages.MEPSPaymentPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSnewPayeeAccountNumberValue).textContains(uploadTestData.MEPSPaymentUFFV2.newPayeeAcctNumber),
            await ensure(_PaymentsPages.MEPSPaymentPage.newPayeeNameValue).textContains(uploadTestData.MEPSPaymentUFFV2.newPayeeNameValue),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress1Value).textContains(uploadTestData.MEPSPaymentUFFV2.newPayeeAdd1),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress2Value).textContains(uploadTestData.MEPSPaymentUFFV2.newPayeeAdd2),
            await ensure(_PaymentsPages.MEPSPaymentPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.MEPSPaymentPage.paymentTypeValue).textContains(uploadTestData.MEPSPaymentUFFV2.paymentType),
            await ensure(_PaymentsPages.MEPSPaymentPage.sendAmountValue).textContains(uploadTestData.MEPSPaymentUFFV2.amountValue),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankName).textContains(uploadTestData.MEPSPaymentUFFV2.payeeBankName),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankCounty).textContains(uploadTestData.MEPSPaymentUFFV2.payeeBankCountry),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankCode).textIs(uploadTestData.MEPSPaymentUFFV2.payeeBankCode),
            await ensure(_PaymentsPages.MEPSPaymentPage.paymentDetailValue).textContains(uploadTestData.MEPSPaymentUFFV2.paymentDetailValue),
            await ensure(_PaymentsPages.MEPSPaymentPage.totalDeductValue).textContains(uploadTestData.MEPSPaymentUFFV2.amountValue),
            await ensure(_PaymentsPages.MEPSPaymentPage.bankChargeValue).textContains(uploadTestData.MEPSPaymentUFFV2.bankChargeSHA),
            await ensure(_PaymentsPages.MEPSPaymentPage.chargeAcctValue).textContains( uploadTestData.MEPSPaymentUFFV2.fromAccount), 
            await ensure(_PaymentsPages.MEPSPaymentPage.referenceValue).isNotEmpty(),
        ])
    });
});

export async function checkViewBulkPaymentPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(uploadTestData.bulkPaymentDBS.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.bulkPaymentDBS.paymentTypeView),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.bulkPaymentDBS.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),

        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.bulkPaymentDBS.payeeName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(uploadTestData.bulkPaymentDBS.payeeBankName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.bulkPaymentDBS.payeeBankId1),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.bulkPaymentDBS.accountNumber1),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.bulkPaymentDBS.amount1),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue).textContains(uploadTestData.bulkPaymentDBS.purposeCode1),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.bulkPaymentDBS.refForPayee1),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.bulkPaymentDBS.paymentDetails1),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.bulkPaymentDBS.msgToPayee1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPaymentDBS.emailId10),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPaymentDBS.emailId11),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPaymentDBS.emailId12),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPaymentDBS.emailId13),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPaymentDBS.emailId14),

       //Payee 2
       await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(uploadTestData.bulkPaymentDBS.payeeName2),
       await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName2).textContains(uploadTestData.bulkPaymentDBS.payeeBankName2),
       await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic2).textContains(uploadTestData.bulkPaymentDBS.payeeBankId2),
       await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(uploadTestData.bulkPaymentDBS.accountNumber2),
       await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(uploadTestData.bulkPaymentDBS.amount2),
       await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue2).textContains(uploadTestData.bulkPaymentDBS.purposeCode2),
       await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(uploadTestData.bulkPaymentDBS.refForPayee2),
       await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
       await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue2).textContains(uploadTestData.bulkPaymentDBS.paymentDetails2),
       await ensure(_PaymentsPages.BulkPaymentPage.messageValue2).textContains(uploadTestData.bulkPaymentDBS.msgToPayee2),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPaymentDBS.emailId20),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPaymentDBS.emailId21),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPaymentDBS.emailId22),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPaymentDBS.emailId23),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPaymentDBS.emailId24),
    ]);
}

//UFF and Remit format
export async function checkViewTTPageAllField(isUFF: boolean = false, isRemit: boolean = false, isRemit13: boolean = false, isRemit14: boolean = false,isUFFV2: boolean = false) {
    if(isUFF || isRemit) {
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(uploadTestData.TT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(uploadTestData.TT.amountValue),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAcctNumber),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd3),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(uploadTestData.TT.paymentType),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(uploadTestData.TT.payeeBankName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(uploadTestData.TT.payeeBankLocation),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textIs(uploadTestData.TT.myPayeeBankID),
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankName).textIs(uploadTestData.TT.intermediaryBankName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankSWIFTBIC).textIs(uploadTestData.TT.intermediaryBankID),
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankAdress1).textContains(uploadTestData.TT.intermediaryBankCountry),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(uploadTestData.TT.paymentDetail),
            await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(uploadTestData.TT.bankChargeUs),
            await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(uploadTestData.TT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(uploadTestData.TT.messageToOrderingBank),
            await ensure(_PaymentsPages.TelegraphicTransferPage.nextApprover).isNotEmpty(),
        ]);
        if (isUFF) {
            await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(uploadTestData.TT.message),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailIdO),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId3),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId4),
            await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textContains(uploadTestData.TT.specPmtPurpose),
            ]);
        }
    }
    if (isUFFV2) {
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(uploadTestData.TTUFFV2.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(uploadTestData.TTUFFV2.amountValue),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTUFFV2.newPayeeAcctNumber),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTUFFV2.newPayeeName),
            //await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTUFFV2.newPayeeAdd1),
            //await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTUFFV2.newPayeeAdd2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(uploadTestData.TTUFFV2.paymentType),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(uploadTestData.TTUFFV2.payeeBankName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(uploadTestData.TTUFFV2.payeeBankLocation),
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankName).textIs(uploadTestData.TTUFFV2.intermediaryBankName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankSWIFTBIC).textIs(uploadTestData.TTUFFV2.intermediaryBankID),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(uploadTestData.TTUFFV2.paymentDetail),
            ]);
        }

    if(isRemit13 || isRemit14) {
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(uploadTestData.TTRemit.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTRemit.newPayeeAcctNumber),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTRemit.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTRemit.newPayeeAdd1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTRemit.newPayeeAdd2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTRemit.newPayeeAdd3),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(uploadTestData.TTRemit.paymentType),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(uploadTestData.TTRemit.payeeBankName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(uploadTestData.TTRemit.payeeBankLocation),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(uploadTestData.TTRemit.paymentDetail),
            await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(uploadTestData.TTRemit.bankChargeUs),
            await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(uploadTestData.TTRemit.fromAccount),
        ]);

        if(isRemit13) {
            await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankName).textContains(uploadTestData.TTRemit.intermediaryBankName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankSWIFTBIC).textContains(uploadTestData.TTRemit.intermediaryBankID)
            ]);
        }
    }
}

export async function checkViewBulkCollectionPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(uploadTestData.BulkCollection.fromAccount),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(uploadTestData.BulkCollection.amount1),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentType).textContains(uploadTestData.BulkCollection.paymentTypeView),
        await ensure(_PaymentsPages.BulkCollectionPage.totalAmountValue).textContains(uploadTestData.BulkCollection.totalAmount),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionSummaryValue).textContains(uploadTestData.BulkCollection.totalAmount),
        // Payer 1
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue).textContains(uploadTestData.BulkCollection.newPayeeName1),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue).textContains(uploadTestData.BulkCollection.newPayeeName1),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankName).textContains(uploadTestData.BulkCollection.payerBankName1),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankSwiftBic).textContains(uploadTestData.BulkCollection.payerBankID1),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(uploadTestData.BulkCollection.payerBankAccountNumber1),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue).textContains(uploadTestData.BulkCollection.DDAreference1),
        await ensure(_PaymentsPages.BulkCollectionPage.purposeCodeValue).textContains(uploadTestData.BulkCollection.purposeCode1),
        await ensure(_PaymentsPages.BulkCollectionPage.refForPayeeValue).textContains(uploadTestData.BulkCollection.referenceForPayer1),
        await _PaymentsPages.BulkCollectionPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionDetailValue).textContains(uploadTestData.BulkCollection.collectionDetailsToThePayerBank1),
        await ensure(_PaymentsPages.BulkCollectionPage.messageValue).textContains(uploadTestData.BulkCollection.message1),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId10),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId11),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId12),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId13),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId14),

        // payer 2
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue2).textContains(uploadTestData.BulkCollection.newPayeeName2),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue2).textContains(uploadTestData.BulkCollection.newPayeeName2),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankName2).textContains(uploadTestData.BulkCollection.payerBankName2),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankSwiftBic2).textContains(uploadTestData.BulkCollection.payerBankID2),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue2).textContains(uploadTestData.BulkCollection.payerBankAccountNumber2),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue2).textContains(uploadTestData.BulkCollection.DDAreference2),
        await ensure(_PaymentsPages.BulkCollectionPage.purposeCodeValue2).textContains(uploadTestData.BulkCollection.purposeCode2),
        await ensure(_PaymentsPages.BulkCollectionPage.refForPayeeValue2).textContains(uploadTestData.BulkCollection.referenceForPayer2),
        await _PaymentsPages.BulkCollectionPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionDetailValue2).textContains(uploadTestData.BulkCollection.collectionDetailsToThePayerBank2),
        await ensure(_PaymentsPages.BulkCollectionPage.messageValue2).textContains(uploadTestData.BulkCollection.message2),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId20),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId21),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId22),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId23),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId24),
    ]);
}

export async function checkViewPayrollPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.PayrollPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(uploadTestData.payroll.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(uploadTestData.payroll.paymentTypeView),
        await ensure(_PaymentsPages.PayrollPage.amountView).textContains(uploadTestData.payroll.totalAmount),
        await ensure(_PaymentsPages.PayrollPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.batchIDValue).isNotEmpty(),

        //Payee 1
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(uploadTestData.payroll.payeeName1),
        await ensure(_PaymentsPages.PayrollPage.bankNameValue).textContains(uploadTestData.payroll.payeeBankName1),
        await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue).textContains(uploadTestData.payroll.payeeBankId1),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(uploadTestData.payroll.accountNumber1),
        await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(uploadTestData.payroll.amount1),
        await ensure(_PaymentsPages.PayrollPage.purposeCodeValue).textContains(uploadTestData.payroll.purposeCode1),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue).textContains(uploadTestData.payroll.refForPayee1),
        await _PaymentsPages.PayrollPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.PayrollPage.paymentDetailValue).textContains(uploadTestData.payroll.paymentDetails1),
        await ensure(_PaymentsPages.PayrollPage.messageValue).textContains(uploadTestData.payroll.msgToPayee1),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.payroll.emailId10),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.payroll.emailId11),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.payroll.emailId12),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.payroll.emailId13),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.payroll.emailId14),

       //Payee 2
       await ensure(_PaymentsPages.PayrollPage.payeeNameValue2).textContains(uploadTestData.payroll.payeeName2),
       await ensure(_PaymentsPages.PayrollPage.bankNameValue2).textContains(uploadTestData.payroll.payeeBankName2),
       await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue2).textContains(uploadTestData.payroll.payeeBankId2),
       await ensure(_PaymentsPages.PayrollPage.accountNumberValue2).textContains(uploadTestData.payroll.accountNumber2),
       await ensure(_PaymentsPages.PayrollPage.amount2).textContains(uploadTestData.payroll.amount2),
       await ensure(_PaymentsPages.PayrollPage.purposeCodeValue2).textContains(uploadTestData.payroll.purposeCode2),
       await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue2).textContains(uploadTestData.payroll.refForPayee2),
       await _PaymentsPages.PayrollPage.showOptionView2.jsClick(),
       await ensure(_PaymentsPages.PayrollPage.paymentDetailValue2).textContains(uploadTestData.payroll.paymentDetails2),
       await ensure(_PaymentsPages.PayrollPage.messageValue2).textContains(uploadTestData.payroll.msgToPayee2),
       await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.payroll.emailId20),
       await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.payroll.emailId21),
       await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.payroll.emailId22),
       await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.payroll.emailId23),
       await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.payroll.emailId24)
    ]);
}

export async function checkViewManagePayrollDBSPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.PayrollPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(uploadTestData.managePayrollDBS.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(uploadTestData.managePayrollDBS.paymentTypeView),
        await ensure(_PaymentsPages.PayrollPage.amountView).textContains(uploadTestData.managePayrollDBS.totalAmount),
        await ensure(_PaymentsPages.PayrollPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.batchIDValue).isNotEmpty(),

        //Payee 1
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(uploadTestData.managePayrollDBS.payeeName1),
        await ensure(_PaymentsPages.PayrollPage.bankNameValue).textContains(uploadTestData.managePayrollDBS.payeeBankName1),
        await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue).textContains(uploadTestData.managePayrollDBS.payeeBankId1),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(uploadTestData.managePayrollDBS.accountNumber1),
        await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(uploadTestData.managePayrollDBS.amount1),
        await ensure(_PaymentsPages.PayrollPage.purposeCodeValue).textContains(uploadTestData.managePayrollDBS.purposeCode1),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue).textContains(uploadTestData.managePayrollDBS.refForPayee1),
        await _PaymentsPages.PayrollPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.PayrollPage.paymentDetailValue).textContains(uploadTestData.managePayrollDBS.paymentDetails1),
        await ensure(_PaymentsPages.PayrollPage.messageValue).textContains(uploadTestData.managePayrollDBS.msgToPayee1),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.managePayrollDBS.emailId10),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.managePayrollDBS.emailId11),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.managePayrollDBS.emailId12),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.managePayrollDBS.emailId13),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.managePayrollDBS.emailId14),

       //Payee 2
       await ensure(_PaymentsPages.PayrollPage.payeeNameValue2).textContains(uploadTestData.managePayrollDBS.payeeName2),
       await ensure(_PaymentsPages.PayrollPage.bankNameValue2).textContains(uploadTestData.managePayrollDBS.payeeBankName2),
       await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue2).textContains(uploadTestData.managePayrollDBS.payeeBankId2),
       await ensure(_PaymentsPages.PayrollPage.accountNumberValue2).textContains(uploadTestData.managePayrollDBS.accountNumber2),
       await ensure(_PaymentsPages.PayrollPage.amount2).textContains(uploadTestData.managePayrollDBS.amount2),
       await ensure(_PaymentsPages.PayrollPage.purposeCodeValue2).textContains(uploadTestData.managePayrollDBS.purposeCode2),
       await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue2).textContains(uploadTestData.managePayrollDBS.refForPayee2),
       await _PaymentsPages.PayrollPage.showOptionView2.jsClick(),
       await ensure(_PaymentsPages.PayrollPage.paymentDetailValue2).textContains(uploadTestData.managePayrollDBS.paymentDetails2),
       await ensure(_PaymentsPages.PayrollPage.messageValue2).textContains(uploadTestData.managePayrollDBS.msgToPayee2),
       await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.managePayrollDBS.emailId20),
       await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.managePayrollDBS.emailId21),
       await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.managePayrollDBS.emailId22),
       await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.managePayrollDBS.emailId23),
       await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.managePayrollDBS.emailId24)
    ]);
}

export async function checkViewGiroPageAllField(isUFFV2: boolean = false ) {
    if(isUFFV2){
        await Promise.all([
        await ensure(_PaymentsPages.giroPaymentPage.statusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.giroPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.giroPaymentPage.amountValue).textContains(uploadTestData.giroPayment.amountValue),
        await ensure(_PaymentsPages.giroPaymentPage.fromAccountValue).textContains(uploadTestData.giroPayment.fromAccount),
        await ensure(_PaymentsPages.giroPaymentPage.accountNumberValue).textContains(uploadTestData.giroPayment.payeeAcctNumber),
        await ensure(_PaymentsPages.giroPaymentPage.payeeNameValue).textContains(uploadTestData.giroPayment.payeeName),
        
        await ensure(_PaymentsPages.giroPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.giroPaymentPage.paymentType).textContains(uploadTestData.giroPayment.paymentTypeView),
        await ensure(_PaymentsPages.giroPaymentPage.sendAmountValue).textContains(uploadTestData.giroPayment.amountValue),
        await ensure(_PaymentsPages.giroPaymentPage.payeeBankNameValue).textContains(uploadTestData.giroPayment.payeeBankName),
        await ensure(_PaymentsPages.giroPaymentPage.payeeBankIDValue).textIs(uploadTestData.giroPayment.payeeBankIDValue),
        await ensure(_PaymentsPages.giroPaymentPage.payeeBankCodeValue).textContains(uploadTestData.giroPayment.payeeBankCodeValue),
        await ensure(_PaymentsPages.giroPaymentPage.payeeBankBranchCodeValue).textContains(uploadTestData.giroPayment.payeeBankBranchCodeValue),
        await ensure(_PaymentsPages.giroPaymentPage.paymentDeatilValue).textContains(uploadTestData.giroPayment.paymentDeatilValue),
        await ensure(_PaymentsPages.giroPaymentPage.messageToPayee).textContains(uploadTestData.giroPayment.messageToPayee),
        await ensure(_PaymentsPages.giroPaymentPage.emailList).textContains(uploadTestData.giroPayment.emailId0),
        await ensure(_PaymentsPages.giroPaymentPage.emailList).textContains(uploadTestData.giroPayment.emailId1),
        await ensure(_PaymentsPages.giroPaymentPage.emailList).textContains(uploadTestData.giroPayment.emailId2),
        await ensure(_PaymentsPages.giroPaymentPage.emailList).textContains(uploadTestData.giroPayment.emailId3),
        await ensure(_PaymentsPages.giroPaymentPage.emailList).textContains(uploadTestData.giroPayment.emailId4),
        await ensure(_PaymentsPages.giroPaymentPage.totalDeductValue).isNotEmpty(),
        await ensure(_PaymentsPages.giroPaymentPage.purposeCodeValue).textContains(uploadTestData.giroPayment.purposeCodeValue),
        await ensure(_PaymentsPages.giroPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.giroPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.giroPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.giroPaymentPage.payeeBankAddress).isNotEmpty(),
        // await ensure(_PaymentsPages.giroPaymentPage.messageToApproverValue).textContains(uploadTestData.giroPayment.messageToApproverValue)
        ]);
    }else{
        await Promise.all([
            await ensure(_PaymentsPages.giroPaymentPage.payeeAddress1).textContains(uploadTestData.giroPayment.payeeAddress1),
            await ensure(_PaymentsPages.giroPaymentPage.payeeAddress2).textContains(uploadTestData.giroPayment.payeeAddress2),
            await ensure(_PaymentsPages.giroPaymentPage.payeeAddress3).textContains(uploadTestData.giroPayment.payeeAddress3)
    ])

}
}

export async function checkViewChequePageAllField(isCCH = false) {
    await Promise.all([
        await ensure(_PaymentsPages.chequePaymentPage.hashValueView).isNotEmpty(),
        await ensure(_PaymentsPages.chequePaymentPage.fromAccountView).textContains(uploadTestData.chequePayment.fromAccount),
        await ensure(_PaymentsPages.chequePaymentPage.acctBalanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.chequePaymentPage.paymentTypeValue).textContains(isCCH ? uploadTestData.chequePayment.cchPaymentTypeView : uploadTestData.chequePayment.paymentTypeView),
        await ensure(_PaymentsPages.chequePaymentPage.deductedAmountValue).textContains(uploadTestData.chequePayment.totalAmount),
        await ensure(_PaymentsPages.chequePaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.chequePaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.chequePaymentPage.totalItem).textContains(uploadTestData.chequePayment.totalPayee),
        await ensure(_PaymentsPages.chequePaymentPage.totalAmount).textContains(uploadTestData.chequePayment.totalAmount),

        //Payee 1
        await ensure(_PaymentsPages.chequePaymentPage.chequeName).textContains(uploadTestData.chequePayment.payeeName1),
        await ensure(_PaymentsPages.chequePaymentPage.chequeNickName).textContains(uploadTestData.chequePayment.chequeNickName1),
        await ensure(_PaymentsPages.chequePaymentPage.chequeNum).textContains(uploadTestData.chequePayment.chequeNum1),
        await ensure(_PaymentsPages.chequePaymentPage.deliveryMethod).textContains(uploadTestData.chequePayment.deliveryMethod1),
        await ensure(_PaymentsPages.chequePaymentPage.deliveryAdd).textContains(uploadTestData.chequePayment.deliveryAdd1),
        await ensure(_PaymentsPages.chequePaymentPage.payeeAmount).textContains(uploadTestData.chequePayment.amount1),
        await ensure(_PaymentsPages.chequePaymentPage.refForPayee).textContains(uploadTestData.chequePayment.refForPayee1),
        await _PaymentsPages.chequePaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.chequePaymentPage.printAtLocation).textContains(uploadTestData.chequePayment.printAtLocation1),
        await ensure(_PaymentsPages.chequePaymentPage.invoiceDetails).textContains(uploadTestData.chequePayment.invoiceDetails1),
        await ensure(_PaymentsPages.chequePaymentPage.clientRef10).textContains(uploadTestData.chequePayment.clientRef10),
        await ensure(_PaymentsPages.chequePaymentPage.clientRef20).textContains(uploadTestData.chequePayment.clientRef20),
        await ensure(_PaymentsPages.chequePaymentPage.clientRef30).textContains(uploadTestData.chequePayment.clientRef30),
        await ensure(_PaymentsPages.chequePaymentPage.clientRef40).textContains(uploadTestData.chequePayment.clientRef40),
        await ensure(_PaymentsPages.chequePaymentPage.paymentDetails).textContains(uploadTestData.chequePayment.paymentDetails1),

       //Payee 2
       await ensure(_PaymentsPages.chequePaymentPage.chequeName2).textContains(uploadTestData.chequePayment.payeeName2),
       await ensure(_PaymentsPages.chequePaymentPage.chequeNickName2).textContains(uploadTestData.chequePayment.chequeNickName2),
       await ensure(_PaymentsPages.chequePaymentPage.chequeNum2).textContains(uploadTestData.chequePayment.chequeNum2),
       await ensure(_PaymentsPages.chequePaymentPage.deliveryMethod2).textContains(uploadTestData.chequePayment.deliveryMethod2),
       await ensure(_PaymentsPages.chequePaymentPage.deliveryAdd2).textContains(uploadTestData.chequePayment.deliveryAdd2),
       await ensure(_PaymentsPages.chequePaymentPage.payeeAmount2).textContains(uploadTestData.chequePayment.amount2),
       await ensure(_PaymentsPages.chequePaymentPage.refForPayee2).textContains(uploadTestData.chequePayment.refForPayee2),
       await _PaymentsPages.chequePaymentPage.showOptionView2.jsClick(),
       await ensure(_PaymentsPages.chequePaymentPage.printAtLocation2).textContains(uploadTestData.chequePayment.printAtLocation2),
       await ensure(_PaymentsPages.chequePaymentPage.invoiceDetails2).textContains(uploadTestData.chequePayment.invoiceDetails2),
       await ensure(_PaymentsPages.chequePaymentPage.clientRef11).textContains(uploadTestData.chequePayment.clientRef11),
       await ensure(_PaymentsPages.chequePaymentPage.clientRef21).textContains(uploadTestData.chequePayment.clientRef21),
       await ensure(_PaymentsPages.chequePaymentPage.clientRef31).textContains(uploadTestData.chequePayment.clientRef31),
       await ensure(_PaymentsPages.chequePaymentPage.clientRef41).textContains(uploadTestData.chequePayment.clientRef41),
       await ensure(_PaymentsPages.chequePaymentPage.paymentDetails2).textContains(uploadTestData.chequePayment.paymentDetails2)
    ]);
    
}

export async function checkViewDDPageAllField(isUFF: boolean = false, isRemit14: boolean = false, isRemit13: boolean = false) {
    if(isUFF) {
        await Promise.all([
            await ensure(_PaymentsPages.demandDraftPaymentPage.customerReferenceValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.statusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.demandDraftPaymentPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deductAmount).textContains(uploadTestData.DDPayment.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.fromAccountValue).textContains(uploadTestData.DDPayment.fromAccount),
            await ensure(_PaymentsPages.demandDraftPaymentPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.newPayeeNameValue).textContains(uploadTestData.DDPayment.newPayeeNameValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payeeAdd1Value).textContains(uploadTestData.DDPayment.payeeAddress1),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payeeAdd2Value).textContains(uploadTestData.DDPayment.payeeAddress2),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payeeAdd3Value).textContains(uploadTestData.DDPayment.payeeAddress3),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentCcyValue).textContains(uploadTestData.DDPayment.paymentCcyValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payableCountryValue).textContains(uploadTestData.DDPayment.payableCountryValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.chargeAccountValue).textContains(uploadTestData.DDPayment.fromAccount),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentTypeValue).textContains(uploadTestData.DDPayment.paymentType),
            await ensure(_PaymentsPages.demandDraftPaymentPage.sendAmountValue).textContains(uploadTestData.DDPayment.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.exchangeRate).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payableToValue).textContains(uploadTestData.DDPayment.payableToValue),
            // await ensure(_PaymentsPages.demandDraftPaymentPage.postalCodeValue).textContains(uploadTestData.DDPayment.postalCodeValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deliveryModeValue).textContains(uploadTestData.DDPayment.deliveryModeValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailNameValue).textContains(uploadTestData.DDPayment.mailNameValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd1Value).textContains(uploadTestData.DDPayment.mailAdd1Value),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd2Value).textContains(uploadTestData.DDPayment.mailAdd2Value),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd3Value).textContains(uploadTestData.DDPayment.mailAdd3Value),
            await ensure(_PaymentsPages.demandDraftPaymentPage.pickupLocationValue).textContains(uploadTestData.DDPayment.pickupLocation),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDetailsValue).textContains(uploadTestData.DDPayment.paymentDetailsValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deductTotalAmountValue).textContains(uploadTestData.DDPayment.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.custRefValue).isNotEmpty(),
            // await ensure(_PaymentsPages.demandDraftPaymentPage.msgToApproverValue).textContains(uploadTestData.DDPayment.msgToApproverValue)
        ]);
    }

    if(isRemit14 || isRemit13) {
        await Promise.all([
            await ensure(_PaymentsPages.demandDraftPaymentPage.customerReferenceValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.statusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.demandDraftPaymentPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deductAmount).textContains(uploadTestData.DDPaymentRemit14.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.fromAccountValue).textContains(uploadTestData.DDPaymentRemit14.fromAccount),
            await ensure(_PaymentsPages.demandDraftPaymentPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.newPayeeNameValue).textContains(uploadTestData.DDPaymentRemit14.newPayeeNameValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentCcyValue).textContains(uploadTestData.DDPaymentRemit14.paymentCcyValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.chargeAccountValue).textContains(uploadTestData.DDPaymentRemit14.fromAccount),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentTypeValue).textContains(uploadTestData.DDPaymentRemit14.paymentType),
            await ensure(_PaymentsPages.demandDraftPaymentPage.sendAmountValue).textContains(uploadTestData.DDPaymentRemit14.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.exchangeRate).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payableToValue).textContains(uploadTestData.DDPaymentRemit14.payableToValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deliveryModeValue).textContains(uploadTestData.DDPaymentRemit14.deliveryModeValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailNameValue).textContains(uploadTestData.DDPaymentRemit14.mailNameValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd1Value).textContains(uploadTestData.DDPaymentRemit14.mailAdd1Value),
            await ensure(_PaymentsPages.demandDraftPaymentPage.pickupLocationValue).textContains(uploadTestData.DDPaymentRemit14.pickupLocation),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDetailsValue).textContains(uploadTestData.DDPaymentRemit14.paymentDetailsValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deductTotalAmountValue).textContains(uploadTestData.DDPaymentRemit14.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.custRefValue).isNotEmpty()
        ]);
    }
}

// UFF and Remit Format
export async function checkViewMEPSPageAllField(isUFF: boolean = false, isRemit: boolean = false, isRemit14: boolean = false) {
    await Promise.all([
        await ensure(_PaymentsPages.MEPSPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.MEPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(uploadTestData.MEPSPayment.amountValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(isRemit14 ? uploadTestData.MEPSPaymentR13.fromAccount : uploadTestData.MEPSPayment.fromAccount),
        await ensure(_PaymentsPages.MEPSPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSnewPayeeAccountNumberValue).textContains(uploadTestData.MEPSPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.MEPSPaymentPage.newPayeeNameValue).textContains(uploadTestData.MEPSPayment.newPayeeNameValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress1Value).textContains(uploadTestData.MEPSPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress2Value).textContains(uploadTestData.MEPSPayment.newPayeeAdd2),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress3Value).textContains(uploadTestData.MEPSPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentTypeValue).textContains(uploadTestData.MEPSPayment.paymentType),
        await ensure(_PaymentsPages.MEPSPaymentPage.sendAmountValue).textContains(uploadTestData.MEPSPayment.amountValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankName).textContains(uploadTestData.MEPSPayment.payeeBankName),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankCounty).textContains(uploadTestData.MEPSPayment.payeeBankCountry),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankCode).textIs(uploadTestData.MEPSPayment.payeeBankCode),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentDetailValue).textContains(uploadTestData.MEPSPayment.paymentDetailValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.totalDeductValue).textContains(uploadTestData.MEPSPayment.amountValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.bankChargeValue).textContains(uploadTestData.MEPSPayment.bankChargeSHA),
        await ensure(_PaymentsPages.MEPSPaymentPage.chargeAcctValue).textContains(isRemit14 ? uploadTestData.MEPSPaymentR13.fromAccount : uploadTestData.MEPSPayment.fromAccount), 
        await ensure(_PaymentsPages.MEPSPaymentPage.referenceValue).isNotEmpty(),
        // await ensure(_PaymentsPages.MEPSPaymentPage.messageToApproverValue).textContains(uploadTestData.MEPSPayment.transactionNote)
    ]);

    if(isRemit || isUFF) {
        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankAdress1).textContains(uploadTestData.MEPSPayment.payeeBankAdress1),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankAdress2).textContains(uploadTestData.MEPSPayment.payeeBankAdress2),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankCity).textContains(uploadTestData.MEPSPayment.payeeBankCity),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankSwiftBic).textIs(uploadTestData.MEPSPayment.PayeebankID),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBranchCode).textIs(uploadTestData.MEPSPayment.payeeBranchCode),
        ]);
    }

    if(isUFF) {
        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.messageValue).textContains(uploadTestData.MEPSPayment.message),
            await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(uploadTestData.MEPSPayment.emailId0),
            await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(uploadTestData.MEPSPayment.emailId1),
            await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(uploadTestData.MEPSPayment.emailId2),
            await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(uploadTestData.MEPSPayment.emailId3),
            await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(uploadTestData.MEPSPayment.emailId4),
        ]);
    }
}

export async function checkViewICTPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentType).textContains(uploadTestData.ICT.paymentType),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(uploadTestData.ICT.amountValue),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(uploadTestData.ICT.fromAccount),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(uploadTestData.ICT.toAccountValue),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(uploadTestData.ICT.amountValue),
        // await ensure(_PaymentsPages.IntraCompanyTransferPage.messageToApproverValue).textContains(testData.IntraCompanyTransfer.additionNote),
    ]);
}

export async function checkViewACTPageAllField(isUFF: boolean = false,isUFFdetail: boolean = false) {
    if(isUFF == true && isUFFdetail == false) {
        console.log("isUFF:"+isUFF);
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.headerRef).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.deductAmountValue).textContains(uploadTestData.ACT.amountValue),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(uploadTestData.ACT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeAcctValue).textContains(uploadTestData.ACT.newPayeeAcct),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(uploadTestData.ACT.newPayeeName),
            // await ensure(_PaymentsPages.AccountTransferPage.payeeAdd1).textContains(uploadTestData.ACT.payeeAdd1),
            //await ensure(_PaymentsPages.AccountTransferPage.payeeAdd2).textContains(uploadTestData.ACT.payeeAdd2),
            // await ensure(_PaymentsPages.AccountTransferPage.payeeAdd3).textContains(uploadTestData.ACT.payeeAdd3),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.paymentType).textContains(uploadTestData.ACT.paymentType),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(uploadTestData.ACT.amountValue),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDetailValue).textContains(uploadTestData.ACT.paymentDetail),
            await ensure(_PaymentsPages.AccountTransferPage.messageValue).textContains(uploadTestData.ACT.message),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId0),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId1),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId2),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId3),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId4),
            await ensure(_PaymentsPages.AccountTransferPage.totalDeductValue).textContains(uploadTestData.ACT.amountValue),
            // await ensure(_PaymentsPages.AccountTransferPage.messageToApproverValue).textContains(uploadTestData.ACT.transactionNote)
         ]);
    }else if(isUFF == false && isUFFdetail == false){
        console.log("other:");
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.headerRef).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.deductAmountValue).textContains(uploadTestData.ACTRemit.amountValue),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(uploadTestData.ACTRemit.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeAcctValue).textContains(uploadTestData.ACTRemit.newPayeeAcct),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(uploadTestData.ACTRemit.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.payeeAdd1).textContains(uploadTestData.ACTRemit.payeeAdd1),
            await ensure(_PaymentsPages.AccountTransferPage.payeeAdd2).textContains(uploadTestData.ACTRemit.payeeAdd2),
            await ensure(_PaymentsPages.AccountTransferPage.payeeAdd3).textContains(uploadTestData.ACTRemit.payeeAdd3),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.paymentType).textContains(uploadTestData.ACTRemit.paymentType),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(uploadTestData.ACTRemit.amountValue),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDetailValue).textContains(uploadTestData.ACTRemit.paymentDetail),
            await ensure(_PaymentsPages.AccountTransferPage.totalDeductValue).textContains(uploadTestData.ACTRemit.amountValue)
         ]);
    }
    if(isUFF == false && isUFFdetail == true) {
        console.log("isUFFdetail:"+isUFFdetail);
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.headerRef).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.deductAmountValue).textContains(uploadTestData.ACTdetail.amountValue),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(uploadTestData.ACTdetail.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeAcctValue).textContains(uploadTestData.ACTdetail.newPayeeAcct),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(uploadTestData.ACTdetail.newPayeeName),
            // await ensure(_PaymentsPages.AccountTransferPage.payeeAdd1).textContains(uploadTestData.ACT.payeeAdd1),
            //await ensure(_PaymentsPages.AccountTransferPage.payeeAdd2).textContains(uploadTestData.ACT.payeeAdd2),
            // await ensure(_PaymentsPages.AccountTransferPage.payeeAdd3).textContains(uploadTestData.ACT.payeeAdd3),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.paymentType).textContains(uploadTestData.ACTdetail.paymentType),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(uploadTestData.ACTdetail.amountValue),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDetailValue).textContains(uploadTestData.ACTdetail.paymentDetail),
            await ensure(_PaymentsPages.AccountTransferPage.messageValue).textContains(uploadTestData.ACTdetail.message),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACTdetail.emailId0),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACTdetail.emailId1),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACTdetail.emailId2),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACTdetail.emailId3),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACTdetail.emailId4),
            await ensure(_PaymentsPages.AccountTransferPage.totalDeductValue).textContains(uploadTestData.ACTdetail.amountValue),
            // await ensure(_PaymentsPages.AccountTransferPage.messageToApproverValue).textContains(uploadTestData.ACT.transactionNote)
         ]);
    }
}

export async function deleteFile() {
    await _FilesPages.uploadFilePage.filesMenu.click();
    await _FilesPages.ViewFilePage.loadCondition();
    await _FilesPages.ViewFilePage.Filefilter.input(remitFileName);
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    await _FilesPages.ViewFilePage.deleteFileButn.jsClick();
    await _FilesPages.ViewFilePage.deleteButn.click();
    await _FilesPages.ViewFilePage.OKButn.click();
    uploadSuccessFlag = false;
    remitFileName = '';
}

export async function checkViewGOPPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(uploadTestData.expressBulkPayment.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.expressBulkPayment.paymentTypeView),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.expressBulkPayment.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),

        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.expressBulkPayment.payeeName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(uploadTestData.expressBulkPayment.payeeBankName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.expressBulkPayment.payeeBankId1),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.expressBulkPayment.accountNumber1),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.expressBulkPayment.amount1),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue).textContains(uploadTestData.expressBulkPayment.purposeCode1),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.expressBulkPayment.refForPayee1),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.expressBulkPayment.paymentDetails1),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.expressBulkPayment.msgToPayee1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.expressBulkPayment.emailId10),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.expressBulkPayment.emailId11),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.expressBulkPayment.emailId12),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.expressBulkPayment.emailId13),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.expressBulkPayment.emailId14),

       //Payee 2
       await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(uploadTestData.expressBulkPayment.payeeName2),
       await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName2).textContains(uploadTestData.expressBulkPayment.payeeBankName2),
       await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic2).textContains(uploadTestData.expressBulkPayment.payeeBankId2),
       await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(uploadTestData.expressBulkPayment.accountNumber2),
       await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(uploadTestData.expressBulkPayment.amount2),
       await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue2).textContains(uploadTestData.expressBulkPayment.purposeCode2),
       await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(uploadTestData.expressBulkPayment.refForPayee2),
       await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
       await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue2).textContains(uploadTestData.expressBulkPayment.paymentDetails2),
       await ensure(_PaymentsPages.BulkPaymentPage.messageValue2).textContains(uploadTestData.expressBulkPayment.msgToPayee2),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.expressBulkPayment.emailId20),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.expressBulkPayment.emailId21),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.expressBulkPayment.emailId22),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.expressBulkPayment.emailId23),
       await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.expressBulkPayment.emailId24),
    ]);
}

export async function deleteUploadFile(fileName:string) {
    await _FilesPages.uploadFilePage.filesMenu.click();
    await _FilesPages.ViewFilePage.loadCondition();
    await _FilesPages.ViewFilePage.Filefilter.input(fileName);
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    await _FilesPages.ViewFilePage.deleteFileButn.jsClick();
    await _FilesPages.ViewFilePage.deleteButn.click();
    await _FilesPages.ViewFilePage.OKButn.click();
    uploadSuccessFlag = false;
    remitFileName = '';
}