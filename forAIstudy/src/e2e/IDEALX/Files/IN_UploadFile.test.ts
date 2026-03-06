/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages,PaymentsPages,ApprovalsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();

let testData = _FilesPages.fetchTestData('IN_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/IN_uploadTestData.json');
let fileType = "ALL - Universal File Format";
let uploadSuccessFlag = false;
let fileName = '';
let fileName1='';

describe('IN File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    let remitFileName = '';

    it('Upload RTGS payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForRTGS : testData.FileService.UAT.fileNameForRTGS, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();

        await checkViewRTGSPageAllField(); // IDXP-812
    });


    // Add for IEBAA-3757
    it('Upload RTGS payment after final approval bank return reject code RF02', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForRTGSRF02 : testData.FileService.UAT.fileNameForRTGSRF02, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textIs(uploadTestData.status.PendingApproval)
        ])
        //Another user approval RTGS payment
        await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.verifyUserId : testData.FileService.UAT.loginUserId, "123123");
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await browser.sleep(5000);
        await _ApprovalsPages.ApprovalPage.byFileButton.click();
        await _ApprovalsPages.ApprovalPage.byFileAdditionFilter.click();
        await _ApprovalsPages.ApprovalPage.toCalendar.click();
        await _ApprovalsPages.ApprovalPage.leftButton.click();
        await _ApprovalsPages.ApprovalPage.seletOneDay.click();
        await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.click();
        await _ApprovalsPages.ApprovalPage.fileList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input("123123");
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.ApprovalPage.fileNameText.getText().then(async value => {
            fileName = value;
        });
        await browser.sleep(3000);// Waiting for status change
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, fileName);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textIs(testData.status.BankRejected),

            await ensure(_PaymentsPages.RTGSPaymentPage.bankRejectSection).textContains(testData.status.BankRejected),
            await ensure(_PaymentsPages.RTGSPaymentPage.bankRemarksValue).textContains(testData.FileService.bankRemarks),
        ]);
        await _PaymentsPages.TelegraphicTransferPage.notificationButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForNotificationPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.MessageInfo).textIs(testData.FileService.inboxMessage),
        ]);

    });


    it('Upload NEFT payment with UFF format', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId, "123123");
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForNEFT : testData.FileService.UAT.fileNameForNEFT, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();

        await checkViewNEFTPageAllField(); // IDXP-812
    });

    it('Upload Bulk collection payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForCOL : testData.FileService.UAT.fileNameForCOL, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await checkViewBulkCollectionPageAllField(); // IDXP-812
    });

    it('Upload TT payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForTT : testData.FileService.UAT.fileNameForTT, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await checkViewTTPageAllField(); // IDXP-812
    });

    //R8.22 IDXP-2116
    it('Upload TT payment with Payee counry is AE', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForTT2 : testData.FileService.UAT.fileNameForTT2, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(uploadTestData.TT.payeeBankName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(uploadTestData.TT.payeeBankLocationforAE),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankRoutingCode).textContains(uploadTestData.TT.payeeBankRoutingCode),
            await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textIs(uploadTestData.TT.purposeCodeValue),
            await ensure(_PaymentsPages.TelegraphicTransferPage.ReceivingPartyPurposeCodeView).textContains(uploadTestData.TT.RPPC),
            await ensure(_PaymentsPages.TelegraphicTransferPage.RPPCLableView).textContains("Purpose of payment (Receiving party purpose code)"),
        ]);
    });

    it('Upload Manage Payroll 02 payment with NEFT format', async function () {
        fileType = "Management Payroll (Alternate) - NEFT";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForMP2 : testData.FileService.UAT.fileNameForMP2, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await checkViewPayrollPageAllField(); // IDXP-812
    });

    it('Upload Bulk payment with NEFT format', async function () {
        fileType = "Bulk Payment - NEFT";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForBPY : testData.FileService.UAT.fileNameForBPY, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await checkViewBulkPaymentPageAllField(); // IDXP-812
    });

    it('Upload ACT with Remittance format', async function () {
        fileType = "Remittance - Regional Remittance";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForACTRemit : testData.FileService.UAT.fileNameForACTRemit, testData.FileService.approvalOptionTransaction).then(async data => {
            remitFileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag = true;
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();

        await checkViewACTPageAllField(); // IDXP-812
    });

    // Remittance format file, just only can upload one time, so delete it for last time to upload
    it('Delete Remittance format file', async function () {
        if(uploadSuccessFlag && 0 !== remitFileName.trim().length) {
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
    });
    
    //Add for R8.21 IDXP-2263
     it('Upload payment check payment not contain GST and CBDT ', async function () {
        let paymentType = "India e-Tax";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.filesMangementCenter.click();
        await _FilesPages.uploadFilePage.uploadFilesTab.click();
        await _FilesPages.uploadFilePage.loadCondition();
        await _FilesPages.uploadFilePage.browseforfiles.select(SIT ? testData.ETAXPayment.SIT.fileName2 : testData.ETAXPayment.UAT.fileName2).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName1 = (data.substr(pos + 1));
        });
        await _FilesPages.uploadFilePage.loadConditionUpload();
        await _FilesPages.uploadFilePage.PaymentType.select(paymentType);
         await Promise.all([
            await ensure(_FilesPages.uploadFilePage.PaymentType).textNotContains(testData.ETAXPayment.TaxTypeGST),
            await ensure(_FilesPages.uploadFilePage.PaymentType).textNotContains(testData.ETAXPayment.TaxTypeCBDT),
        ]);   
    });

    //Add for R8.21 IDXP-2263
    it("Approve file via my approve by field tab", async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileButton.click();
        // await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.showAddFilter.jsClick();
        await _ApprovalsPages.ApprovalPage.toCalendar.click();
        await _ApprovalsPages.ApprovalPage.todayButton.jsClick();
        await _ApprovalsPages.ApprovalPage.currentDay.jsClick();
        await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.jsClick();
        await _ApprovalsPages.ApprovalPage.fileList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input("123123");
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.ApprovalPage.fileNameText.getText().then(async value => {
            fileName = value;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(fileName);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
        ]);
    });
});

describe('IN SwitchTo SC company upload file', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.files.SIT.loginCompanyId : testData.files.UAT.loginCompanyId, SIT ? testData.files.SIT.loginUserId : testData.files.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Upload Payroll with NEFT file format and ticked Confidential File', async function () {
        await _FilesPages.uploadFilePage.companyMenu.click();
        await _FilesPages.uploadFilePage.selectCompany.click();
        await _FilesPages.uploadFilePage.searchCompany.input(SIT ? "1003009" : "1003009");
        await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForMenu();
        await _FilesPages.uploadFilePage.filesMenu.jsClick();
        fileType = "Payroll - NEFT";
        await _FilesPages.uploadFilePage.fsUpload4(_FilesPages, fileType, SIT ? testData.files.SIT.fileName : testData.files.UAT.fileName, testData.FileService.approvalOptionTransaction).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.FromAccount).textContains(SIT ? testData.files.SIT.FromAccount : testData.files.UAT.FromAccount),
            await ensure(_FilesPages.uploadFilePage.Amount).textContains(SIT ? testData.files.SIT.Amount : testData.files.UAT.Amount),
        ]);
    });
});

export async function checkViewRTGSPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.RTGSPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textIs(uploadTestData.status.PendingVerification),
        await ensure(_PaymentsPages.RTGSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.deductAmtValue).textContains(uploadTestData.RTGS.amountValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(uploadTestData.RTGS.fromAccount),
        await ensure(_PaymentsPages.RTGSPaymentPage.acctBalanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.toNewPayeeAcctNumValue).textContains(uploadTestData.RTGS.newPayeeAcct),
        await ensure(_PaymentsPages.RTGSPaymentPage.toNewPayeeNameValue).textContains(uploadTestData.RTGS.newPayeeName),
        await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.paymentTypeValue).textContains(uploadTestData.RTGS.paymentType),
        await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(uploadTestData.RTGS.amountValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankNameValue).textContains(uploadTestData.RTGS.payeeBankNameValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankAdd1Value).textContains(uploadTestData.RTGS.payeeBankAdd1Value),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankAdd2Value).textContains(uploadTestData.RTGS.payeeBankAdd2Value),
        // await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankAdd3Value).textContains(uploadTestData.RTGS.payeeBankAdd3Value),
        // await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCityValue).textContains(uploadTestData.RTGS.payeeBankCityValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCountryValue).textContains(uploadTestData.RTGS.payeeBankCountryValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeSwiftBicValue).textContains(uploadTestData.RTGS.payeeSwiftBicValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCodeValue).textContains(uploadTestData.RTGS.payeeBankCodeValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBrchCodeValue).textContains(uploadTestData.RTGS.payeeBrchCodeValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.paymentDetailsValue).textContains(uploadTestData.RTGS.paymentDetailsValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.msgValue).textContains(uploadTestData.RTGS.msgValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue0),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue1),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue2),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue3),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue4),
        await ensure(_PaymentsPages.RTGSPaymentPage.totalDeductAmtValue).textContains(uploadTestData.RTGS.amountValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.custRefValue).isNotEmpty(),
        // await ensure(_PaymentsPages.RTGSPaymentPage.messageToApproverValue).textContains(uploadTestData.RTGS.transactionNote)
     ]);
}

export async function checkViewNEFTPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.NEFTPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textIs(uploadTestData.status.PendingVerification),
        await ensure(_PaymentsPages.NEFTPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).textContains(uploadTestData.NEFT.amountValue),
        await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).textContains(uploadTestData.NEFT.fromAccount),
        await ensure(_PaymentsPages.NEFTPaymentPage.acctBalanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.NEFTPaymentPage.toNewPayeeAcctValue).textContains(uploadTestData.NEFT.newPayeeAcct),
        await ensure(_PaymentsPages.NEFTPaymentPage.toNewPayeeNameValue).textContains(uploadTestData.NEFT.newPayeeName),
        await ensure(_PaymentsPages.NEFTPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.NEFTPaymentPage.paymentTypeValue).textContains(uploadTestData.NEFT.paymentType),
        await ensure(_PaymentsPages.NEFTPaymentPage.sendAmtValue).textContains(uploadTestData.NEFT.amountValue),
        await ensure(_PaymentsPages.NEFTPaymentPage.bankIFSCodeValue).textContains(uploadTestData.NEFT.bankIFSCodeValue),
        await ensure(_PaymentsPages.NEFTPaymentPage.paymentDetailsValue).textContains(uploadTestData.NEFT.paymentDetailsValue),
        await ensure(_PaymentsPages.NEFTPaymentPage.msgValue).textContains(uploadTestData.NEFT.msgValue),
        await ensure(_PaymentsPages.NEFTPaymentPage.emailListValue).textContains(uploadTestData.NEFT.emailValue0),
        await ensure(_PaymentsPages.NEFTPaymentPage.emailListValue).textContains(uploadTestData.NEFT.emailValue1),
        await ensure(_PaymentsPages.NEFTPaymentPage.emailListValue).textContains(uploadTestData.NEFT.emailValue2),
        await ensure(_PaymentsPages.NEFTPaymentPage.emailListValue).textContains(uploadTestData.NEFT.emailValue3),
        await ensure(_PaymentsPages.NEFTPaymentPage.emailListValue).textContains(uploadTestData.NEFT.emailValue4),
        await ensure(_PaymentsPages.NEFTPaymentPage.custRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.NEFTPaymentPage.batchIDValue).isNotEmpty()
     ]);
}

export async function checkViewBulkCollectionPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(uploadTestData.BulkCollection.fromAccount),
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
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankDetManual).textContains(uploadTestData.BulkCollection.payeeBankDetManual1),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(uploadTestData.BulkCollection.payerBankAccountNumber1),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue).textContains(uploadTestData.BulkCollection.DDAreference1),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(uploadTestData.BulkCollection.amount1),
        await ensure(_PaymentsPages.BulkCollectionPage.refForPayeeValue).textContains(uploadTestData.BulkCollection.referenceForPayer1),
        await _PaymentsPages.BulkCollectionPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkCollectionPage.messageValue).textContains(uploadTestData.BulkCollection.message1),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId10),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId11),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId12),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId13),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(uploadTestData.BulkCollection.emailId14),

        // payer 2
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue2).textContains(uploadTestData.BulkCollection.newPayeeName2),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue2).textContains(uploadTestData.BulkCollection.newPayeeName2),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankDetManual2).textContains(uploadTestData.BulkCollection.payeeBankDetManual2),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue2).textContains(uploadTestData.BulkCollection.payerBankAccountNumber2),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue2).textContains(uploadTestData.BulkCollection.DDAreference2),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue2).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue2).textContains(uploadTestData.BulkCollection.amount2),
        await ensure(_PaymentsPages.BulkCollectionPage.refForPayeeValue2).textContains(uploadTestData.BulkCollection.referenceForPayer2),
        await _PaymentsPages.BulkCollectionPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.BulkCollectionPage.messageValue2).textContains(uploadTestData.BulkCollection.message2),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId20),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId21),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId22),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId23),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId24),
    ]);
}

export async function checkViewTTPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).textContains(uploadTestData.TT.amountValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(uploadTestData.TT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAcctNumber),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(uploadTestData.TT.paymentType),
        await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(uploadTestData.TT.payeeBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(uploadTestData.TT.payeeBankLocation),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textIs(uploadTestData.TT.payeeBankSwiftbic),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(uploadTestData.TT.paymentDetail),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(uploadTestData.TT.message),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailIdO),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId4),
        await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(uploadTestData.TT.bankChargeUs),
        await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(uploadTestData.TT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textContains(uploadTestData.TT.purposeCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.underlyingCodeValue).textContains(uploadTestData.TT.underlyingCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.localOfServiceValue).textContains(uploadTestData.TT.localOfService),
        await ensure(_PaymentsPages.TelegraphicTransferPage.caAckNumValue).textContains(uploadTestData.TT.caAckNum),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(uploadTestData.TT.messageToOrderingBank)
    ]);
}

export async function checkViewPayrollPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.PayrollPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(uploadTestData.ManagePayroll02.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(uploadTestData.ManagePayroll02.paymentTypeView),
        await ensure(_PaymentsPages.PayrollPage.amountView).textContains(uploadTestData.ManagePayroll02.totalAmount),
        await ensure(_PaymentsPages.PayrollPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.batchIDValue).isNotEmpty(),

        // Payee 1
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(uploadTestData.ManagePayroll02.newPayeeName1),
        await ensure(_PaymentsPages.PayrollPage.bankNameValue).textContains(uploadTestData.ManagePayroll02.bankNameValue1),
        await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue).textContains(uploadTestData.ManagePayroll02.bankSwiftBicValue1),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(uploadTestData.ManagePayroll02.accountNumberValue1),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(uploadTestData.ManagePayroll02.amount1),
        await ensure(_PaymentsPages.PayrollPage.TransactionCodeValue).textContains(uploadTestData.ManagePayroll02.TransactionCodeValue1),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue).textContains(uploadTestData.ManagePayroll02.referenceForPayeeValue1),
        await _PaymentsPages.PayrollPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.PayrollPage.paymentDetailValue).textContains(uploadTestData.ManagePayroll02.paymentDetailValue1),
        await ensure(_PaymentsPages.PayrollPage.messageValue).textContains(uploadTestData.ManagePayroll02.message1),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.ManagePayroll02.emailId10),

        // payee 2
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue2).textContains(uploadTestData.ManagePayroll02.newPayeeName2),
        // await ensure(_PaymentsPages.PayrollPage.bankNameValue2).textContains(uploadTestData.ManagePayroll02.bankNameValue2),
        await ensure(_PaymentsPages.PayrollPage.payeeBankMaual2).textContains(uploadTestData.ManagePayroll02.payeeBankMaual2),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue2).textContains(uploadTestData.ManagePayroll02.accountNumberValue2),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue2).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.PayrollPage.amount2).textContains(uploadTestData.ManagePayroll02.amount2),
        await ensure(_PaymentsPages.PayrollPage.TransactionCodeValue2).textContains(uploadTestData.ManagePayroll02.TransactionCodeValue2),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue2).textContains(uploadTestData.ManagePayroll02.referenceForPayeeValue2),
        await _PaymentsPages.PayrollPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.PayrollPage.paymentDetailValue2).textContains(uploadTestData.ManagePayroll02.paymentDetailValue2),
        await ensure(_PaymentsPages.PayrollPage.messageValue2).textContains(uploadTestData.ManagePayroll02.message2),
        await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.ManagePayroll02.emailId20),
    ]);
}

export async function checkViewBulkPaymentPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(uploadTestData.BulkPayment.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.BulkPayment.paymentTypeView),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.BulkPayment.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),

        // Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.BulkPayment.newPayeeName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(uploadTestData.BulkPayment.bankNameValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.BulkPayment.bankSwiftBicValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.BulkPayment.accountNumberValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.BulkPayment.amount1),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains(uploadTestData.BulkPayment.TransactionCodeValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.BulkPayment.referenceForPayeeValue1),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.BulkPayment.paymentDetailValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.BulkPayment.message1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkPayment.emailId10),

        // payee 2
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(uploadTestData.BulkPayment.newPayeeName2),
        // await ensure(_PaymentsPages.BulkPaymentPage.bankNameValue2).textContains(uploadTestData.BulkPayment.bankNameValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaua2).textContains(uploadTestData.BulkPayment.payeeBankMaual2),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(uploadTestData.BulkPayment.accountNumberValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue2).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(uploadTestData.BulkPayment.amount2),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue2).textContains(uploadTestData.BulkPayment.TransactionCodeValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(uploadTestData.BulkPayment.referenceForPayeeValue2),
        await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue2).textContains(uploadTestData.BulkPayment.paymentDetailValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue2).textContains(uploadTestData.BulkPayment.message2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.BulkPayment.emailId20),
    ]);
}

export async function checkViewACTPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.AccountTransferPage.headerRef).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.AccountTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.deductAmountValue).textContains(uploadTestData.ACT.amountValue),
        await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(uploadTestData.ACT.fromAccount),
        await ensure(_PaymentsPages.AccountTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeAcctValue).textContains(uploadTestData.ACT.newPayeeAcct),
        await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(uploadTestData.ACT.newPayeeName),
        await ensure(_PaymentsPages.AccountTransferPage.payeeAdd1).textContains(uploadTestData.ACT.payeeAdd1),
        await ensure(_PaymentsPages.AccountTransferPage.payeeAdd2).textContains(uploadTestData.ACT.payeeAdd2),
        await ensure(_PaymentsPages.AccountTransferPage.payeeAdd3).textContains(uploadTestData.ACT.payeeAdd3),
        await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.paymentType).textContains(uploadTestData.ACT.paymentType),
        await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(uploadTestData.ACT.amountValue),
        await ensure(_PaymentsPages.AccountTransferPage.paymentDetailValue).textContains(uploadTestData.ACT.paymentDetailsValue),
        await ensure(_PaymentsPages.AccountTransferPage.totalDeductValue).textContains(uploadTestData.ACT.amountValue),
        await ensure(_PaymentsPages.AccountTransferPage.referenceValue).isNotEmpty()
     ]);
}