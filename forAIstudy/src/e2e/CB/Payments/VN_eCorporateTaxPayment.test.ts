/*
 * ?Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages, FilesPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { ensure, SIT, handlerCase } from "../../../lib";
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
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.eCorporate.SIT.loginCompanyId : testData.eCorporate.UAT.loginCompanyId, SIT ? testData.eCorporate.SIT.loginUserId : testData.eCorporate.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
  it("Create eCorporate Tax Payment", async function () {
    await _PaymentsPages.openMenu(Menu.Payments.VNeCorporateTax);
    await _PaymentsPages.VNTaxPaymentPage.loadCondition();
    await _PaymentsPages.VNTaxPaymentPage.fromAccount.select(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccount);
    await _PaymentsPages.VNTaxPaymentPage.taxCode.select(testData.eCorporate.taxCode);
    await _PaymentsPages.VNTaxPaymentPage.addBtn1.click();
    await _PaymentsPages.VNTaxPaymentPage.addBtn2.click();
    await _PaymentsPages.VNTaxPaymentPage.existingContractBtn.jsClick();
    await _PaymentsPages.VNTaxPaymentPage.nextButton.click();
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForPrevewPage();
    await _PaymentsPages.VNTaxPaymentPage.submitButton.click();
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.VNTaxPaymentPage.getInfoReferenceID().then((text) => {
      reference = text;
    });
    await ensure(_PaymentsPages.VNTaxPaymentPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(
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
    await _PaymentsPages.openMenu(Menu.Payments.VNeCorporateTax);
    await _PaymentsPages.VNTaxPaymentPage.loadCondition();
    await _PaymentsPages.VNTaxPaymentPage.fromAccount.select(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccoun);
    await _PaymentsPages.VNTaxPaymentPage.taxCode.select(testData.eCorporate.taxCode);
    await _PaymentsPages.VNTaxPaymentPage.addBtn1.click();
    await _PaymentsPages.VNTaxPaymentPage.addBtn2.click();
    await _PaymentsPages.VNTaxPaymentPage.nextButton.click();
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForPrevewPage();
    await _PaymentsPages.VNTaxPaymentPage.approveNowCheckBox.jsClick();
    await _PaymentsPages.VNTaxPaymentPage.pushOption.clickIfExist();
    await _PaymentsPages.VNTaxPaymentPage.getChallengeSMS.jsClickIfExist();
    await _PaymentsPages.VNTaxPaymentPage.challengeResponse.input(testData.eCorporate.challengeResponse);
    await _PaymentsPages.VNTaxPaymentPage.submitButton.click();
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.VNTaxPaymentPage.getInfoReferenceID().then((text) => {
      reference1 = text;
    });
    await ensure(_PaymentsPages.VNTaxPaymentPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(
      reference1
    );
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.VNTaxPaymentPage.fromAccountValue).textContains(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccount),
      await ensure(_PaymentsPages.VNTaxPaymentPage.refValue).textIs(reference1),
      await ensure(_PaymentsPages.VNTaxPaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.BankRejected, testData.status.Received,testData.status.Completed),
    ]);
  });

  it("Reject eCorporate Tax Payment", async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== reference.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("VN - Tax Payment", testData.status.PendingApproval);
    }
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
    await _PaymentsPages.VNTaxPaymentPage.rejectButton.click();
    await _PaymentsPages.VNTaxPaymentPage.reasonForRejection.input(testData.eCorporate.rejectReason);
    await _PaymentsPages.VNTaxPaymentPage.rejectDialogButton.click();
    await _PaymentsPages.VNTaxPaymentPage.getDialogReferenceID().then((text) => {
      reference = text;
    });
    await _PaymentsPages.VNTaxPaymentPage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.VNTaxPaymentPage.statusValue).textContains(testData.status.Rejected),
    ]);
  });

  it("Delete eCorporate Tax Payment", async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== reference.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("VN - Tax Payment", testData.status.PendingApproval);
    }
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
    await _PaymentsPages.VNTaxPaymentPage.deleteButton.click();
    await _PaymentsPages.VNTaxPaymentPage.deleteDialogButton.click();
    await _PaymentsPages.VNTaxPaymentPage.getDialogReferenceID().then((text) => {
      reference = text;
    }
    );
    await _PaymentsPages.VNTaxPaymentPage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_PaymentsPages.VNTaxPaymentPage.transactionResult).textIs("No information to display"),
    ]);
  });

  it("Create an eCorporate Tax Payment for approve", async function () {
    await _PaymentsPages.openMenu(Menu.Payments.VNeCorporateTax);
    await _PaymentsPages.VNTaxPaymentPage.loadCondition();
    await _PaymentsPages.VNTaxPaymentPage.fromAccount.select(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccount);
    await _PaymentsPages.VNTaxPaymentPage.taxCode.select(testData.eCorporate.taxCode);
    await _PaymentsPages.VNTaxPaymentPage.addBtn1.click();
    await _PaymentsPages.VNTaxPaymentPage.addBtn2.click();
    await _PaymentsPages.VNTaxPaymentPage.existingContractBtn.jsClick();
    await _PaymentsPages.VNTaxPaymentPage.nextButton.click();
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForPrevewPage();
    await _PaymentsPages.VNTaxPaymentPage.submitButton.click();
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.VNTaxPaymentPage.getInfoReferenceID().then((text) => {
      reference1 = text;
    });
    await ensure(_PaymentsPages.VNTaxPaymentPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference1);
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.VNTaxPaymentPage.statusValue).textIs(testData.status.PendingApproval),
    ]);
  });

  it("Approve an eCorporate Tax Payment via Transfer Center", async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== reference1.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference1);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("VN - Tax Payment", testData.status.PendingApproval
      );
    }
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
    await _PaymentsPages.VNTaxPaymentPage.approveButton.click();
    await _PaymentsPages.VNTaxPaymentPage.pushOption.jsClickIfExist();
    await _PaymentsPages.VNTaxPaymentPage.getChallengeSMS.jsClickIfExist();
    await _PaymentsPages.VNTaxPaymentPage.challengeResponse.input(testData.eCorporate.challengeResponse);
    await _PaymentsPages.VNTaxPaymentPage.approveButton.click();
    await _PaymentsPages.VNTaxPaymentPage.getDialogReferenceID().then((text) => {
      reference1 = text;
    });
    await _PaymentsPages.VNTaxPaymentPage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference1);
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.VNTaxPaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.BankRejected, testData.status.Completed,testData.status.Received),
    ]);
  });

  it('Upload eCorporate Tax Payment via File Service', async function () {
    paymentType = "Tax Payment - Tax Payment File";
    await _FilesPages.filemanagement_UploadFile.fsUpload2(_FilesPages, paymentType, SIT ? testData.eCorporate.SIT.fileName : testData.eCorporate.UAT.fileName, approvalOption).then(async (data) => {
      fileName = data;
    });
    await _PaymentsPages.VNTaxPaymentPage.refreshBtn.jsClick();
    await _FilesPages.ViewFilePage.Filter.input(fileName);
    await _PaymentsPages.VNTaxPaymentPage.refreshBtn.jsClick();
    await _FilesPages.ViewFilePage.loadCondition();
    await _FilesPages.filemanagement_UploadFile.Showtransactions.jsClick();
    await _PaymentsPages.VNTaxPaymentPage.refLink.click();
    await _PaymentsPages.VNTaxPaymentPage.loadConditionForViewTaxPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.VNTaxPaymentPage.fromAccountValue).textContains(SIT ? testData.eCorporate.SIT.fromAccount : testData.eCorporate.UAT.fromAccount),
      await ensure(_PaymentsPages.VNTaxPaymentPage.refValue).isNotEmpty(),
      await ensure(_PaymentsPages.VNTaxPaymentPage.statusValue).textIs(testData.status.PendingApproval),
    ]);

  });
});