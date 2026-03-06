/*
 * ?Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages, FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

// this from Create, then Reject/Delete
const lib_1 = require("../../../lib");
let approvalOption = "";
let reference = "";
let reference1 = "";
let fileName = "";

let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let paymentType = ''
let testData = _PaymentsPages.fetchTestData("VN_testData.json");

describe("VN_eCorporate Tax Payment", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.eCorporate.SIT.loginCompanyId : testData.eCorporate.UAT.loginCompanyId, SIT ? testData.eCorporate.SIT.loginUserId : testData.eCorporate.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create eCorporate Tax Payment", async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.VNTaxPaymentPage.taxMenu.click();
        await _PaymentsPages.VNTaxPaymentPage.loadCondition();
        await _PaymentsPages.VNTaxPaymentPage.fromAccount.select(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccount);
        await _PaymentsPages.VNTaxPaymentPage.taxCode.select(testData.eCorporate.taxCode);
        await _PaymentsPages.VNTaxPaymentPage.applyAndView.click();
        await _PaymentsPages.VNTaxPaymentPage.SequentialBtn.click();
        await _PaymentsPages.VNTaxPaymentPage.addBtn1.click();
        // await _PaymentsPages.VNTaxPaymentPage.addBtn2.click();
        await _PaymentsPages.VNTaxPaymentPage.existingContractBtn.jsClick();
        await _PaymentsPages.VNTaxPaymentPage.nextButton.click();
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.VNTaxPaymentPage.submitButton.click();
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.VNTaxPaymentPage.getIdealxInfoReferenceID().then((text) => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(
            reference
        );
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.VNTaxPaymentPage.fromAccountValue).textContains(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccount),
            await ensure(_PaymentsPages.VNTaxPaymentPage.refValue).textContains(reference),
            await ensure(_PaymentsPages.VNTaxPaymentPage.fxViewSection).isNotEmpty(),
            await ensure(_PaymentsPages.VNTaxPaymentPage.statusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it("Create eCorporate Tax Payment with approve now", async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.VNTaxPaymentPage.taxMenu.click();
        await _PaymentsPages.VNTaxPaymentPage.loadCondition();
        await _PaymentsPages.VNTaxPaymentPage.fromAccount.select(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccoun);
        await _PaymentsPages.VNTaxPaymentPage.taxCode.select(testData.eCorporate.taxCode);
        await _PaymentsPages.VNTaxPaymentPage.applyAndView.click();
        await _PaymentsPages.VNTaxPaymentPage.SequentialBtn.click();
        await _PaymentsPages.VNTaxPaymentPage.addBtn1.click();
        // await _PaymentsPages.VNTaxPaymentPage.addBtn2.click();
        await _PaymentsPages.VNTaxPaymentPage.nextButton.click();
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.VNTaxPaymentPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.VNTaxPaymentPage.pushOption.clickIfExist();
        await _PaymentsPages.VNTaxPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.VNTaxPaymentPage.challengeResponse.input(testData.eCorporate.challengeResponse);
        await _PaymentsPages.VNTaxPaymentPage.submitButton.click();
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.VNTaxPaymentPage.getIdealxInfoReferenceID().then((text) => {
            reference1 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(
            reference1
        );
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.VNTaxPaymentPage.fromAccountValue).textContains(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccount),
            await ensure(_PaymentsPages.VNTaxPaymentPage.refValue).textIs(reference1),
            await ensure(_PaymentsPages.VNTaxPaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.BankRejected, testData.status.Completed),
        ]);
    });

    it("Reject eCorporate Tax Payment", async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("VN - Tax Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
        await _PaymentsPages.VNTaxPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.VNTaxPaymentPage.reasonForRejection.input(testData.eCorporate.rejectReason);
        await _PaymentsPages.VNTaxPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.VNTaxPaymentPage.getDialogReferenceID().then((text) => {
            reference = text;
        });
        await _PaymentsPages.VNTaxPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.VNTaxPaymentPage.statusValue).textContains(testData.status.Rejected),
        ]);
    });

    it("Delete eCorporate Tax Payment", async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("VN - Tax Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
        await _PaymentsPages.VNTaxPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.VNTaxPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.VNTaxPaymentPage.getDialogReferenceID().then((text) => {
            reference = text;
        }
        );
        await _PaymentsPages.VNTaxPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_PaymentsPages.VNTaxPaymentPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it("Create an eCorporate Tax Payment for approve", async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.VNTaxPaymentPage.taxMenu.click();
        await _PaymentsPages.VNTaxPaymentPage.loadCondition();
        await _PaymentsPages.VNTaxPaymentPage.fromAccount.select(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccount);
        await _PaymentsPages.VNTaxPaymentPage.taxCode.select(testData.eCorporate.taxCode);
        await _PaymentsPages.VNTaxPaymentPage.applyAndView.click();
        await _PaymentsPages.VNTaxPaymentPage.SequentialBtn.click();
        await _PaymentsPages.VNTaxPaymentPage.addBtn1.click();
        // await _PaymentsPages.VNTaxPaymentPage.addBtn2.click();
        await _PaymentsPages.VNTaxPaymentPage.existingContractBtn.jsClick();
        await _PaymentsPages.VNTaxPaymentPage.nextButton.click();
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.VNTaxPaymentPage.submitButton.click();
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.VNTaxPaymentPage.getIdealxInfoReferenceID().then((text) => {
            reference1 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.VNTaxPaymentPage.statusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it("Approve an eCorporate Tax Payment via Transfer Center", async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference1.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("VN - Tax Payment", testData.status.PendingApproval
            );
        }
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
        await _PaymentsPages.VNTaxPaymentPage.approveButton.jsClick();
        await _PaymentsPages.VNTaxPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.VNTaxPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.VNTaxPaymentPage.challengeResponse.input(testData.eCorporate.challengeResponse);
        await _PaymentsPages.VNTaxPaymentPage.approveButton.click();
        await _PaymentsPages.VNTaxPaymentPage.getDialogReferenceID().then((text) => {
            reference1 = text;
        });
        await _PaymentsPages.VNTaxPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.VNTaxPaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.BankRejected, testData.status.Completed, testData.status.Received),
        ]);
    });

    it('Upload eCorporate Tax Payment via File Service', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "Tax Payment File";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.eCorporate.SIT.fileName : testData.eCorporate.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _PaymentsPages.VNTaxPaymentPage.refreshBtn.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _PaymentsPages.VNTaxPaymentPage.refreshBtn.jsClick();
        await _FilesPages.uploadFilePage.loadCondition();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await _PaymentsPages.VNTaxPaymentPage.refLink.jsClick();
        await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.VNTaxPaymentPage.fromAccountValue).textContains(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccount),
            await ensure(_PaymentsPages.VNTaxPaymentPage.refValue).isNotEmpty(),
            await ensure(_PaymentsPages.VNTaxPaymentPage.statusValue).textIs(testData.status.PendingApproval),
        ]);

    });
    //add for IDXP-2139(IEBAA-3525)
    it("Upload eCorporate Tax Payment via File Servicewith below condition Tax Period input 33 12 9999", async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "Tax Payment File";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.eCorporate.SIT.fileName2 : testData.eCorporate.UAT.fileName2, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _PaymentsPages.VNTaxPaymentPage.refreshBtn.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _PaymentsPages.VNTaxPaymentPage.refreshBtn.jsClick();
        await _FilesPages.uploadFilePage.loadCondition();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.errorMsg).textContains(testData.eCorporate.errorMsg)
        ]);
    });
    it("Online Create VN Tax Payment with below condition Tax Period input 00 Q0 2025", async function () {
        await new NavigatePages().loginIdealxForLang(SIT ? testData.eCorporate.SIT.loginCompanyId : testData.eCorporate.UAT.loginCompanyId, SIT ? testData.eCorporate.SIT.loginUserId : testData.eCorporate.UAT.loginUserId, "123123", "Vietnamese");
        await createVNTaxWithTaxPeriod(testData.eCorporate.taxPeriodErrorFormate01);
        await Promise.all([
        await ensure(_PaymentsPages.VNTaxPaymentPage.taxPeriodErrMsg).textContains(testData.eCorporate.taxPeriodErrMsg)
        ]);
    });
});

export async function createVNTaxWithTaxPeriod(taxperiod: string) {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.VNTaxPaymentPage.taxMenu.click();
    await _PaymentsPages.VNTaxPaymentPage.loadCondition();
    await _PaymentsPages.VNTaxPaymentPage.fromAccount.select(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccoun);
    await _PaymentsPages.VNTaxPaymentPage.applyAndView.click();
    await _PaymentsPages.VNTaxPaymentPage.SequentialBtn.click();
    await _PaymentsPages.VNTaxPaymentPage.addBtn1.click();
    await _PaymentsPages.VNTaxPaymentPage.taxPeriod.input(taxperiod);
    await _PaymentsPages.VNTaxPaymentPage.nextButton.click();
}