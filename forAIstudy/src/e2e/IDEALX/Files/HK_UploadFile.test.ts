/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, ApprovalsPages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let testData = _FilesPages.fetchTestData('HK_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/HK_uploadTestData.json');
let uploadSuccessFlag = false;
let remitFileName = '';

describe('HKL File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    let fileName = "";
    let paymentType = "ALL - Universal File Format";
    let approvalOptionByTxn= "by transaction";
    let approvalOptionByFile= "by file";
    let reference = "";

    it('Upload HKL FPS File with All Proxy - By File(New UI)', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileName : testData.FileService.UAT.fileName, approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fileNameLink).textContains(fileName),
        ]);
        // add for R8.9 FS copy function
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();
        await checkViewFPSPageAllField(); //IDXP-812
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.continueBtn.clickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        //await _PaymentsPages.FPSPaymentPage.payeeBankID.select(testData.FPSPayment.newPayeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).isNotEmpty(),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.FPSPaymentPage.proxyTypeMobNumValue).isNotEmpty,
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.FPSPaymentPage.PurposeCodeValue).textContains(testData.FPSPayment.PurposeCode),
        ]);
    });

    //due to approver new ui

    // it('Approve HKL FPS File via My Approvals (New UI)', async function () {
    //     let _ApprovalsPages = new ApprovalsPages();
    //     // let paymentRefList = [];
    //     // let _totalItems = 0;
    //     await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.ApprovalPage.byFileButton.click();
    //     await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    //     await _ApprovalsPages.ApprovalPage.filter.click();
    //     await _ApprovalsPages.ApprovalPage.filter.input(fileName);
    //     await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    //     await _ApprovalsPages.ApprovalPage.fileList.selectIdealxFile(1);
    //     await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
    //     await _ApprovalsPages.AccountTransferPage.pushOption.jsClickIfExist();
    //     await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
    //     await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.FileService.challengeResponse);
    //     await _ApprovalsPages.ApprovalPage.previewApproveBtn.click();
    //     await browser.sleep(1000)
    //     // await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
    //     // await _ApprovalsPages.ApprovalPage.completeTotalItems.getText().then(async items => {
    //     //     _totalItems = parseInt(items);
    //     // });
    //     // await _ApprovalsPages.ApprovalPage.getApproveTransactionRef(_totalItems).then(async list => {
    //     //     paymentRefList = list;
    //     // });
    //     // for (let i = 0; i < paymentRefList.length; i++) {
    //     //     await _FilesPages.AccountTransferPage.paymentMenu.click();
    //     //     await _FilesPages.TransferCentersPage.transferCenterFilter.input(paymentRefList[i]);
    //     //     await _FilesPages.TransferCentersPage.refLink.click();
    //     //     await _FilesPages.uploadFilePage.loadConditionForViewFPSPage();
    //     //     await Promise.all([
    //     //         await ensure(_FilesPages.uploadFilePage.statusValueForFPS).textContainsLessOne(testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Approved, testData.status.Received, testData.status.BankRejected),
    //     //     ]);
    //     // }
    //     await _FilesPages.AccountTransferPage.paymentMenu.click();
    //     await _FilesPages.TransferCentersPage.loadCondition();
    //     await _FilesPages.TransferCentersPage.transferCenterFilter.input(fileName);
    //     await _FilesPages.TransferCentersPage.refLink.jsClick();
    //     await _FilesPages.uploadFilePage.loadConditionForViewFPSPage();
    //     await Promise.all([
    //         await ensure(_FilesPages.uploadFilePage.statusValueForFPS).textContainsLessOne(testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Approved, testData.status.Received, testData.status.BankRejected),
    //     ]);

    // });

    //Test the company in the whitelist, Payer increase length
    it('Upload HKL Collection Payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload1(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameCOL : testData.FileService.UAT.fileNameCOL, approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fileNameLink).textContains(fileName),
        ]);
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await checkViewBulkCollectionPageAllField(); //IDXP-812

    });

    //Add for IEBAA R8.7 IEBAA-747,Test the company in the whitelist, add HKFPS C3
    it('Upload Bulk Payment Payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload1(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameBPY : testData.FileService.UAT.fileNameBPY, approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fileNameLink).textContains(fileName),
        ]);
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await _FilesPages.uploadFilePage.paymentType.textContains("HK - Bulk Payment (FPS C3)")
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await checkViewBulkPaymentPageAllField(); // IDXP-812
    });

    it('Upload Payroll Payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload1(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameSAL : testData.FileService.UAT.fileNameSAL, approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fileNameLink).textContains(fileName),
        ]);
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await _FilesPages.uploadFilePage.paymentType.textContains("HK - Payroll Payment (FPS C3)")
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await checkViewPayrollPageAllField();// IDXP-812
    });

    it('Approve Payroll via My Approvals', async function () {
        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.filter.click();
        await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.fileList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
        await _ApprovalsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.FileService.challengeResponse);
        await _ApprovalsPages.ApprovalPage.previewApproveBtn.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _FilesPages.AccountTransferPage.paymentMenu.click();
        await _FilesPages.TransferCentersPage.loadCondition();
        await _FilesPages.TransferCentersPage.transferCenterFilter.input(fileName);
        await _FilesPages.TransferCentersPage.refLink.jsClick();
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Approved, testData.status.Received, testData.status.BankRejected),
            // await ensure(_PaymentsPages.BulkCollectionPage.paymentType2).textIs("Hong Kong Payroll (FPS C3)"),
        ]);
    });

    it('Upload CHATS Payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload1(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameCTS : testData.FileService.UAT.fileNameCTS, approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForViewPage();

        await checkViewCTSPageAllField(true, false,false);// IDXP-812
    }); 

    //Add for R8.22 IDXP-2002
    it('Upload CHATS Payment with UFFv2 and Simple format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload1(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameCTSUFFv2 : testData.FileService.UAT.fileNameCTSUFFv2, approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForViewPage();

        await checkViewCTSPageAllField(false, false,false);// IDXP-812
    });

    //CR was revert by IEBAA-3636, comment it out 06272025
    //  it('Upload CHATS Payment with EUR', async function () {
    //     await _FilesPages.uploadFilePage.filesMenu.click();
    //     paymentType = "ALL - Universal File Format";
    //     approvalOption = "by transaction";
    //     await _FilesPages.uploadFilePage.fsUpload1(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameCTSFCY : testData.FileService.UAT.fileNameCTSFCY, approvalOption).then(async data => {
    //         fileName = data;
    //     });
    //     await _FilesPages.uploadFilePage.refresh.jsClick();
    //     await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    //     await _FilesPages.uploadFilePage.refresh.jsClick();
    //     await _FilesPages.uploadFilePage.fileNameLink.jsClick();
    //     await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    //     await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
    //     await _PaymentsPages.HKCHATSPaymentPage.loadConditionForViewPage();

    //     await checkViewCTSPageAllField(true, true);// IDXP-812
    // });

    // R8.9 FPS outward C3 MVP2 
    it('File Services upload HK FPS Payment(Batch) with FPS payee', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.AutoPayPayment.SIT.fileName1 : testData.AutoPayPayment.UAT.fileName1, testData.AutoPayPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.toPayNowValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval)
        ]);
    });

    it('File Services upload HK FPS Payment(Batch) with Account Number payee', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.AutoPayPayment.SIT.fileName2 : testData.AutoPayPayment.UAT.fileName2, testData.AutoPayPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.toPayeeValue).isNotEmpty(),
            // R8.11 Payee name should support !@#$%^&()_+~{}:><?`-=[];',./*
            await ensure(_PaymentsPages.AutoPayPaymentPage.toPayeeNameValue).textContains("!@#$%^&()_+~{}:><?`-=[]\\;',./*"),
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval)
        ]);
    });

    // Autopay payment rename to FPS Payment(batch)
    it('Upload Autopay Payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload1(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameAutoPay : testData.FileService.UAT.fileNameAutoPay, approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();

        await checkViewAutoPayPageAllField();// IDXP-812
    });

    // Add for R8.10 IEBAA-1626
    it('Upload Bulk Payment with AutoPay format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "Bulk Payment - AutoPay";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameBPYAutoPayFormat : testData.FileService.UAT.fileNameBPYAutoPayFormat, approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fileNameLink).textContains(fileName),
        ]);
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await _FilesPages.uploadFilePage.paymentType.textContains("HK - Bulk Payment (FPS C3)")
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewBulkPaymentPageAllFieldAutoPayFormat(); //IDXP-812
    });

    // Add for R8.10 IEBAA-1626
    it('Upload Management Payroll Payment with AutoPay format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "Management Payroll (Alternate) - AutoPay";
        approvalOptionByFile= "By file amount - in HKD";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNamePayrroll02AutoPayFormat : testData.FileService.UAT.fileNamePayrroll02AutoPayFormat, approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fileNameLink).textContains(fileName),
        ]);
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await _FilesPages.uploadFilePage.paymentType.textContains("HK - Management Payroll (Alternate) (FPS C3)")
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await checkViewPayrollPageAllFieldAutoPayFormat(); //IDXP-812
    });

    it('Upload Bulk Collection Payment with AutoPay format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "Bulk Collection - AutoPay";
        approvalOptionByFile = "By file amount - in HKD";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameColAutoPayFormat : testData.FileService.UAT.fileNameColAutoPayFormat, approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await checkViewBulkCollectionPageAllFieldAutoPayFormat(); //IDXP-812
    });

    it('Upload CHATS Payment with Remittance format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "Remittance - Regional Remittance";
        await _FilesPages.uploadFilePage.fsUpload1(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameCTSRemit : testData.FileService.UAT.fileNameCTSRemit, approvalOptionByTxn).then(async data => {
            remitFileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag = true;
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForViewPage();

        await checkViewCTSPageAllField(false, false,true);// IDXP-812
        // Remittance format file, just only can upload one time, so delete it for last time to upload
        if (uploadSuccessFlag && 0 !== remitFileName.trim().length) {
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
    //add for R8.16 IDXP-995
    it('Upload HKL ACT File with High Risk Payee', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "ALL - Universal File Format";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameACTHighRisk : testData.FileService.UAT.fileNameACTHighRisk, approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fileNameLink).textContains(fileName),
        ]);
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForAlertOverlay();
        await browser.sleep(10000);
        await _FilesPages.uploadFilePage.proceedButton.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await Promise.all([
            await ensure(_FilesPages.ViewFilePage.HighRisk).textContains(testData.FileService.HighRisk),
            await ensure(_FilesPages.ViewFilePage.alertMeaasge).isNotEmpty()
        ]);
    
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.HighRisk).textContains(testData.FileService.HighRisk),
            await ensure(_PaymentsPages.AccountTransferPage.alertMeaasge).isNotEmpty()
        ]);    
    });

    it('Upload HK FPS(Batch) with High Risk Payee', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "ALL - Universal File Format";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameFPSViaBatchHighRisk : testData.FileService.UAT.fileNameACTHighRisk, approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fileNameLink).textContains(fileName),
        ]);
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForAlertOverlay();
        await browser.sleep(10000);
        await _FilesPages.uploadFilePage.proceedButton.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await Promise.all([
            await ensure(_FilesPages.ViewFilePage.HighRisk).textContains(testData.FileService.HighRisk),
            await ensure(_FilesPages.ViewFilePage.alertMeaasge).isNotEmpty()
        ]);
    
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.HighRisk).textContains(testData.FileService.HighRisk),
            await ensure(_PaymentsPages.LVTPaymentPage.alertMeaasge).isNotEmpty()
        ]);  
    });     
});

export async function checkViewFPSPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.FPSPaymentPage.headerRef).isNotEmpty(),
        await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.FPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(uploadTestData.FPS.amountValue),
        await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(uploadTestData.FPS.fromAccount),
        // await ensure(_PaymentsPages.FPSPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.FPSPaymentPage.newPayeeAcctNumbValue).textContains(uploadTestData.FPS.newPayeeAcct),
        await ensure(_PaymentsPages.FPSPaymentPage.newPayeeNameValue).textContains(uploadTestData.FPS.newPayeeName),
        await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.FPSPaymentPage.paymentTypeValue).textContains(uploadTestData.FPS.paymentType),
        await ensure(_PaymentsPages.FPSPaymentPage.sendAmtValue).textContains(uploadTestData.FPS.amountValue),
        await ensure(_PaymentsPages.FPSPaymentPage.payeeBankNameValue).textContains(uploadTestData.FPS.payeeBankNameValue),
        await ensure(_PaymentsPages.FPSPaymentPage.payeeBankAdd1Value).textContains(uploadTestData.FPS.payeeBankAdd1Value),
        await ensure(_PaymentsPages.FPSPaymentPage.payeeBankAdd2Value).textContains(uploadTestData.FPS.payeeBankAdd2Value),
        await ensure(_PaymentsPages.FPSPaymentPage.payeeBankCityValue).textContains(uploadTestData.FPS.payeeBankCityValue),
        await ensure(_PaymentsPages.FPSPaymentPage.payeeBankCountryValue).textContains(uploadTestData.FPS.payeeBankCountryValue),
        await ensure(_PaymentsPages.FPSPaymentPage.payeeSwiftBicValue).textContains(uploadTestData.FPS.payeeSwiftBicValue),
        await ensure(_PaymentsPages.FPSPaymentPage.payeeBankCodeValue).textContains(uploadTestData.FPS.payeeBankCodeValue),
        await ensure(_PaymentsPages.FPSPaymentPage.paymentDetailValue).textContains(uploadTestData.FPS.paymentDetailsValue),
        await ensure(_PaymentsPages.FPSPaymentPage.GreetingtothepayeeValue).textContains(uploadTestData.FPS.GreetingtothepayeeValue),
        await ensure(_PaymentsPages.FPSPaymentPage.emailList).textContains(uploadTestData.FPS.emailValue0),
        await ensure(_PaymentsPages.FPSPaymentPage.emailList).textContains(uploadTestData.FPS.emailValue1),
        await ensure(_PaymentsPages.FPSPaymentPage.emailList).textContains(uploadTestData.FPS.emailValue2),
        await ensure(_PaymentsPages.FPSPaymentPage.emailList).textContains(uploadTestData.FPS.emailValue3),
        await ensure(_PaymentsPages.FPSPaymentPage.emailList).textContains(uploadTestData.FPS.emailValue4),
        await ensure(_PaymentsPages.FPSPaymentPage.totalDeductAmt).textContains(uploadTestData.FPS.amountValue),
        await ensure(_PaymentsPages.FPSPaymentPage.chargeAcctValue).isNotEmpty(),
        await ensure(_PaymentsPages.FPSPaymentPage.PurposeCodeValue).textContains(uploadTestData.FPS.purposeCodeValue),
        await ensure(_PaymentsPages.FPSPaymentPage.custRefValue).isNotEmpty(),
        // await ensure(_PaymentsPages.FPSPaymentPage.messageToApproverValue).textContains(uploadTestData.FPS.messageToApproverValue)
    ]);
}

export async function checkViewBulkCollectionPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(uploadTestData.BulkCollection.fromAccount),
        //await ensure(_PaymentsPages.BulkCollectionPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentType).textContains(uploadTestData.BulkCollection.paymentTypeView),
        await ensure(_PaymentsPages.BulkCollectionPage.totalAmountValue).textContains(uploadTestData.BulkCollection.totalAmount),
        await ensure(_PaymentsPages.BulkCollectionPage.viewConsolidateCreditValue).textContains(uploadTestData.BulkCollection.CreditType),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionSummaryValue).textContains(uploadTestData.BulkCollection.totalAmount),
        // Payer 1
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue).textContains(uploadTestData.BulkCollection.newPayeeName1),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue).textContains(uploadTestData.BulkCollection.newPayeeName1),
        // await ensure(_PaymentsPages.BulkCollectionPage.payeeBankName).textContains(uploadTestData.BulkCollection.payerBankName1),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankDetManual).textContains(uploadTestData.BulkCollection.payerBankID1),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(uploadTestData.BulkCollection.payerBankAccountNumber1),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue).textContains(uploadTestData.BulkCollection.DDAreference1),
        await ensure(_PaymentsPages.BulkCollectionPage.mandateIdValue).textContains(uploadTestData.BulkCollection.mandateIdValue1),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(uploadTestData.BulkCollection.amount1),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionCodeView).textContains(uploadTestData.BulkCollection.transactionCodeView1),
        await ensure(_PaymentsPages.BulkCollectionPage.particularsValue).textContains(uploadTestData.BulkCollection.particularsValue1),
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
        // await ensure(_PaymentsPages.BulkCollectionPage.payeeBankName2).textContains(uploadTestData.BulkCollection.payerBankName2),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankDetManual).textContains(uploadTestData.BulkCollection.payerBankID2),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue2).textContains(uploadTestData.BulkCollection.payerBankAccountNumber2),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue2).textContains(uploadTestData.BulkCollection.DDAreference2),
        await ensure(_PaymentsPages.BulkCollectionPage.mandateIdValue2).textContains(uploadTestData.BulkCollection.mandateIdValue2),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue2).textContains(uploadTestData.BulkCollection.amount2),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionCodeView2).textContains(uploadTestData.BulkCollection.transactionCodeView2),
        await ensure(_PaymentsPages.BulkCollectionPage.particularsValue2).textContains(uploadTestData.BulkCollection.particularsValue2),
        await _PaymentsPages.BulkCollectionPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionDetailValue2).textContains(uploadTestData.BulkCollection.collectionDetailsToThePayerBank2),
        await ensure(_PaymentsPages.BulkCollectionPage.messageValue2).textContains(uploadTestData.BulkCollection.message2),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId20),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId21),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId22),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId23),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList2).textContains(uploadTestData.BulkCollection.emailId24)
    ]);
}

// when upload with autopayment format, only blow fields will have values
export async function checkViewBulkCollectionPageAllFieldAutoPayFormat() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(uploadTestData.BulkCollection.fromAccount),
        // await ensure(_PaymentsPages.BulkCollectionPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentType).textContains(uploadTestData.BulkCollection.paymentTypeView),
        await ensure(_PaymentsPages.BulkCollectionPage.totalAmountValue).textContains(uploadTestData.BulkCollection.totalAmount),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.batchIDValue).isNotEmpty(),

        // Payer 1
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue).textContains(uploadTestData.BulkCollection.newPayeeName1),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue).textContains(uploadTestData.BulkCollection.newPayeeName1),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankDetManual).textContains(uploadTestData.BulkCollection.payerBankID1),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(uploadTestData.BulkCollection.payerBankAccountNumber1),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue).textContains(uploadTestData.BulkCollection.DDAreference1),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(uploadTestData.BulkCollection.amount1),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionCodeView).textContains(uploadTestData.BulkCollection.transactionCodeView1AutoPay),
        await ensure(_PaymentsPages.BulkCollectionPage.particularsValue).textContains(uploadTestData.BulkCollection.particularsValue1),

        // payer 2
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue2).textContains(uploadTestData.BulkCollection.newPayeeName2),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue2).textContains(uploadTestData.BulkCollection.newPayeeName2),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankDetManual).textContains(uploadTestData.BulkCollection.payerBankID2),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue2).textContains(uploadTestData.BulkCollection.payerBankAccountNumber2),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue2).textContains(uploadTestData.BulkCollection.DDAreference2),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue2).textContains(uploadTestData.BulkCollection.amount2),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionCodeView2).textContains(uploadTestData.BulkCollection.transactionCodeView2AutoPay),
        await ensure(_PaymentsPages.BulkCollectionPage.particularsValue2).textContains(uploadTestData.BulkCollection.particularsValue2)
    ]);
}

export async function checkViewBulkPaymentPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(uploadTestData.bulkPayment.fromAccount),
        // await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.bulkPayment.paymentTypeView),
        // await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeC3Value).textContains(uploadTestData.bulkPayment.paymentTypeC3Value),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.bulkPayment.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.DebitTypeValue).textContains(uploadTestData.bulkPayment.DebitTypeValue),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),

        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.bulkPayment.payeeName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual).textContains(uploadTestData.bulkPayment.payeeBankMaual),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.bulkPayment.accountNumber1),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.bulkPayment.amount1),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains(uploadTestData.bulkPayment.TransactionCodeValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.bulkPayment.refForPayee1),
        await ensure(_PaymentsPages.BulkPaymentPage.ParticularsValue).textContains(uploadTestData.bulkPayment.ParticularsValue1),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.bulkPayment.paymentDetails1),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.bulkPayment.msgToPayee1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPayment.emailId10),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPayment.emailId11),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPayment.emailId12),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPayment.emailId13),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.bulkPayment.emailId14),


        //Payee 2
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(uploadTestData.bulkPayment.payeeName2),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaua2).textContains(uploadTestData.bulkPayment.payeeBankMaua2),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(uploadTestData.bulkPayment.accountNumber2),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue2).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(uploadTestData.bulkPayment.amount2),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue2).textContains(uploadTestData.bulkPayment.TransactionCodeValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(uploadTestData.bulkPayment.refForPayee2),
        await ensure(_PaymentsPages.BulkPaymentPage.ParticularsValue2).textContains(uploadTestData.bulkPayment.ParticularsValue2),
        await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue2).textContains(uploadTestData.bulkPayment.paymentDetails2),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue2).textContains(uploadTestData.bulkPayment.msgToPayee2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPayment.emailId20),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPayment.emailId21),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPayment.emailId22),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPayment.emailId23),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.bulkPayment.emailId24),
    ]);
}

// when upload with autopayment format, only blow fields will have values
export async function checkViewBulkPaymentPageAllFieldAutoPayFormat() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(uploadTestData.bulkPayment.fromAccount),
        // await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.bulkPayment.paymentTypeView),
        // await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeC3Value).textContains(uploadTestData.bulkPayment.paymentTypeC3Value),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.bulkPayment.totalAmountAutoPayment),
        await ensure(_PaymentsPages.BulkPaymentPage.DebitTypeValue).textContains(uploadTestData.bulkPayment.DebitTypeValue),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),

        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.bulkPayment.payeeName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual).textContains(uploadTestData.bulkPayment.payeeBankMaual),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.bulkPayment.accountNumber1),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.bulkPayment.amount1),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains(uploadTestData.bulkPayment.TransactionCodeValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.bulkPayment.refForPayee1),
        await ensure(_PaymentsPages.BulkPaymentPage.ParticularsValue).textContains(uploadTestData.bulkPayment.ParticularsValue1),

        //Payee 2
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(uploadTestData.bulkPayment.payeeName2),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaua2).textContains(uploadTestData.bulkPayment.payeeBankMaua2),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(uploadTestData.bulkPayment.accountNumber2),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue2).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(uploadTestData.bulkPayment.amount2),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue2).textContains(uploadTestData.bulkPayment.TransactionCodeValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(uploadTestData.bulkPayment.refForPayee2),
        await ensure(_PaymentsPages.BulkPaymentPage.ParticularsValue2).textContains(uploadTestData.bulkPayment.ParticularsValue2)
    ]);
}

export async function checkViewPayrollPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.PayrollPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(uploadTestData.payroll.fromAccount),
        // await ensure(_PaymentsPages.PayrollPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(uploadTestData.payroll.paymentTypeView),
        // await ensure(_PaymentsPages.PayrollPage.paymentTypeC3).textContains(uploadTestData.payroll.paymentTypeC3),
        await ensure(_PaymentsPages.PayrollPage.amountView).textContains(uploadTestData.payroll.totalAmount),
        await ensure(_PaymentsPages.PayrollPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.batchIDValue).isNotEmpty(),

        //Payee 1
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(uploadTestData.payroll.payeeName1),
        await ensure(_PaymentsPages.PayrollPage.payeeBankMaual).textContains(uploadTestData.payroll.payeeBankMaual),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(uploadTestData.payroll.accountNumber1),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(uploadTestData.status.PendingApproval, uploadTestData.status.PendingVerification),
        await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(uploadTestData.payroll.amount1),
        await ensure(_PaymentsPages.PayrollPage.TransactionCodeValue).textContains(uploadTestData.payroll.TransactionCodeValue1),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue).textContains(uploadTestData.payroll.refForPayee1),
        await ensure(_PaymentsPages.PayrollPage.particularsValue).textContains(uploadTestData.payroll.ParticularsValue1),
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
        await ensure(_PaymentsPages.PayrollPage.payeeBankMaual2).textContains(uploadTestData.payroll.payeeBankMaua2),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue2).textContains(uploadTestData.payroll.accountNumber2),
        await ensure(_PaymentsPages.PayrollPage.amount2).textContains(uploadTestData.payroll.amount2),
        await ensure(_PaymentsPages.PayrollPage.TransactionCodeValue2).textContains(uploadTestData.payroll.TransactionCodeValue2),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue2).textContains(uploadTestData.payroll.refForPayee2),
        await ensure(_PaymentsPages.PayrollPage.particularsValue2).textContains(uploadTestData.payroll.ParticularsValue2),
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

// when upload with autopayment format, only blow fields will have values
export async function checkViewPayrollPageAllFieldAutoPayFormat() {
    await Promise.all([
        await ensure(_PaymentsPages.PayrollPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(uploadTestData.payroll.fromAccount),
        // await ensure(_PaymentsPages.PayrollPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(uploadTestData.payroll.paymentTypeViewMP2),
        // await ensure(_PaymentsPages.PayrollPage.paymentTypeC3).textContains(uploadTestData.payroll.paymentTypeC3),
        await ensure(_PaymentsPages.PayrollPage.amountView).textContains(uploadTestData.payroll.totalAmountAutoPayFormat),
        await ensure(_PaymentsPages.PayrollPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.batchIDValue).isNotEmpty(),

        //Payee 1
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(uploadTestData.payroll.payeeName1AutoPayFormat),
        await ensure(_PaymentsPages.PayrollPage.payeeBankMaual).textContains(uploadTestData.payroll.payeeBankMaual),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(uploadTestData.payroll.accountNumber1),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(uploadTestData.status.PendingApproval, uploadTestData.status.PendingVerification),
        await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(uploadTestData.payroll.amount1),
        await ensure(_PaymentsPages.PayrollPage.TransactionCodeValue).textContains(uploadTestData.payroll.TransactionCodeValue1),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue).textContains(uploadTestData.payroll.refForPayee1),
        await ensure(_PaymentsPages.PayrollPage.particularsValue).textContains(uploadTestData.payroll.ParticularsValue1),

        //Payee 2
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue2).textContains(uploadTestData.payroll.payeeName2),
        await ensure(_PaymentsPages.PayrollPage.payeeBankMaual2).textContains(uploadTestData.payroll.payeeBankMaua2),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue2).textContains(uploadTestData.payroll.accountNumber2),
        await ensure(_PaymentsPages.PayrollPage.amount2).textContains(uploadTestData.payroll.amount2),
        await ensure(_PaymentsPages.PayrollPage.TransactionCodeValue2).textContains(uploadTestData.payroll.TransactionCodeValue2),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue2).textContains(uploadTestData.payroll.refForPayee2),
        await ensure(_PaymentsPages.PayrollPage.particularsValue2).textContains(uploadTestData.payroll.ParticularsValue2)
    ]);
}

export async function checkViewCTSPageAllField(isUFF: boolean , isFCY: boolean,isRemittence:Boolean) {
    if (isFCY) {
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.sendAmtValue).textContains(uploadTestData.CHATS.amountV),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.payeeBankSwiftbic2).textContains(uploadTestData.CHATS.payeeBankIDCHATS),
        ]);
    } else {
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.sendAmtValue).textContains(uploadTestData.CHATS.amountValue),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.payeeBankSwiftbicValue).textContains(uploadTestData.CHATS.payeeBankSwiftbic),
        ]);
    }
    await Promise.all([
        await ensure(_PaymentsPages.HKCHATSPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.deductAmtValue).textContains(uploadTestData.CHATS.amountValue),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.fromAccountValue).textContains(uploadTestData.CHATS.fromAccount),
        // await ensure(_PaymentsPages.HKCHATSPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.toAccountNumberValue).textContains(uploadTestData.CHATS.newPayeeAcct),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.toNewPayeeNameValue).textContains(uploadTestData.CHATS.newPayeeName),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.payeeAdd1Value).textContains(uploadTestData.CHATS.payeeAdd1),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.paymentTypeValue).textContains(uploadTestData.CHATS.paymentType),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.paymentDetailValue).textContains(uploadTestData.CHATS.paymentDetailsValue),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.totalDeductAmtValue).textContains(uploadTestData.CHATS.amountValue),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.bankChargeValue).textContains(uploadTestData.CHATS.bankChargeValue),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.chargeAcctValue).isNotEmpty(),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.custRefValue).isNotEmpty(),
        // await ensure(_PaymentsPages.HKCHATSPaymentPage.messageToApproverValue).textContains(uploadTestData.CHATS.messageToApproverValue)
    ]);
    if (isUFF) {
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.payeeAdd2Value).textContains(uploadTestData.CHATS.payeeAdd2),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.payeeAdd3Value).textContains(uploadTestData.CHATS.payeeAdd3),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.msgToPayeeValue).textContains(uploadTestData.CHATS.msgToPayeeValue),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.emailListValue).textContains(uploadTestData.CHATS.emailValue0),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.emailListValue).textContains(uploadTestData.CHATS.emailValue1),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.emailListValue).textContains(uploadTestData.CHATS.emailValue2),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.emailListValue).textContains(uploadTestData.CHATS.emailValue3),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.emailListValue).textContains(uploadTestData.CHATS.emailValue4),
        ]);
    }
    if(isRemittence){
        await ensure(_PaymentsPages.HKCHATSPaymentPage.payeeAdd2Value).textContains(uploadTestData.CHATS.payeeAdd2),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.payeeAdd3Value).textContains(uploadTestData.CHATS.payeeAdd3)
    }
}

export async function checkViewAutoPayPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.AutoPayPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.AutoPayPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(uploadTestData.autoPay.amountValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).textContains(uploadTestData.autoPay.fromAccount),
        // await ensure(_PaymentsPages.AutoPayPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payNowProxyValue).textContains(uploadTestData.autoPay.hkFPSID),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payNowProxyValue).textContains(uploadTestData.autoPay.newPayeeName),
        await ensure(_PaymentsPages.AutoPayPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.paymentTypeValue).textContains(uploadTestData.autoPay.paymentType),
        await ensure(_PaymentsPages.AutoPayPaymentPage.sendAmtValue).textContains(uploadTestData.autoPay.amountValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payeeBankCodeValue).textContains(uploadTestData.autoPay.payeeBankCodeValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payeeBrchCodeValue).textContains(uploadTestData.autoPay.payeeBrchCodeValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.paymentDetailValue).textContains(uploadTestData.autoPay.paymentDetailsValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.msgToPayeeValue).textContains(uploadTestData.autoPay.msgToPayeeValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.emailListValue).textContains(uploadTestData.autoPay.emailValue0),
        await ensure(_PaymentsPages.AutoPayPaymentPage.emailListValue).textContains(uploadTestData.autoPay.emailValue1),
        await ensure(_PaymentsPages.AutoPayPaymentPage.emailListValue).textContains(uploadTestData.autoPay.emailValue2),
        await ensure(_PaymentsPages.AutoPayPaymentPage.emailListValue).textContains(uploadTestData.autoPay.emailValue3),
        await ensure(_PaymentsPages.AutoPayPaymentPage.emailListValue).textContains(uploadTestData.autoPay.emailValue4),
        await ensure(_PaymentsPages.AutoPayPaymentPage.totalDeductAmtValue).textContains(uploadTestData.autoPay.amountValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.custRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.batchIdValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.refForPayeeValue).textContains(uploadTestData.autoPay.refForPayeeValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.particuarsValue).textContains(uploadTestData.autoPay.particuarsValue),
        // await ensure(_PaymentsPages.AutoPayPaymentPage.messageToApproverValue).textContains(uploadTestData.autoPay.messageToApproverValue)
    ]);
}