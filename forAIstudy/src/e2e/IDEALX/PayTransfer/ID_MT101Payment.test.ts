import { browser } from "protractor";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, handlerCase, PROJECT_TYPE, SIT } from "../../../lib";
import { FilesPages, PaymentsPages } from "../../../pages/IDEALX";

let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let testData = _PaymentsPages.fetchTestData('ID_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/ID_uploadTestData.json');

let reference3 = "";
let fileName = "";

describe('ID MT101 Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MT101Payment.SIT.loginCompanyId : testData.MT101Payment.UAT.loginCompanyId, SIT ?  testData.MT101Payment.SIT.loginUserId : testData.MT101Payment.UAT.loginUserId, testData.MT101Payment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('File Services upload ID MT101 Payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.MT101Payment.FileService.fileTypeIx,SIT ? testData.MT101Payment.SIT.uploadFileName : testData.MT101Payment.UAT.uploadFileName, testData.MT101Payment.FileService.approvalOptionByTransaction, testData.MT101Payment.FileService.approvalCurrency).then(async data => {
            fileName = data;
            console.log(fileName);
        });
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForViewPage();

        await checkViewPageAllField(); // IDXP-812
    });

    it('Approve ID MT101 Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(fileName);
        await _PaymentsPages.TransferCentersPage.refLink.jsClick();
        await _PaymentsPages.AccountTransferPage.scrollToBottom();
        await _PaymentsPages.SKNPaymentPage.approveButton.jsClick();
        await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.MT101Payment.responseCode);
        await browser.sleep(3000);
        await _PaymentsPages.mt101PaymentPage.approveBtn.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            reference3 = text;
            console.log(reference3);
        });
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);

        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.mt101PaymentPage.customerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.mt101PaymentPage.statusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.mt101PaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.mt101PaymentPage.deductAmountValue).textContains(uploadTestData.MT101.amountValue),
        await ensure(_PaymentsPages.mt101PaymentPage.fromAccountValue).textContains(SIT ? uploadTestData.MT101.SIT.fromAccount : uploadTestData.MT101.UAT.fromAccount),
        //UAT 没这个字段，先注释掉
        //await ensure(_PaymentsPages.mt101PaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.mt101PaymentPage.newPayeeAcctNum).textContains(uploadTestData.MT101.newPayeeAcctNum),
        await ensure(_PaymentsPages.mt101PaymentPage.newPayeeName).textContains(uploadTestData.MT101.newPayeeName),
        await ensure(_PaymentsPages.mt101PaymentPage.payeeAdd1).textContains(uploadTestData.MT101.payeeAdd1),
        await ensure(_PaymentsPages.mt101PaymentPage.payeeAdd2).textContains(uploadTestData.MT101.payeeAdd2),
        // await ensure(_PaymentsPages.mt101PaymentPage.payeeAdd3).textContains(uploadTestData.MT101.payeeAdd3),
        await ensure(_PaymentsPages.mt101PaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.mt101PaymentPage.pmtTypeValue).textContains(uploadTestData.MT101.paymentType),
        await ensure(_PaymentsPages.mt101PaymentPage.sendAmountValue).textContains(uploadTestData.MT101.amountValue),
        await ensure(_PaymentsPages.mt101PaymentPage.fxContract).textContains(uploadTestData.MT101.fxContract),
        await ensure(_PaymentsPages.mt101PaymentPage.intermediaryBankSwiftbic).textContains(uploadTestData.MT101.intermediaryBankSwiftbic),
        await ensure(_PaymentsPages.mt101PaymentPage.intermediaryBankName).textContains(uploadTestData.MT101.intermediaryBankName),
        await ensure(_PaymentsPages.mt101PaymentPage.intermediaryBankAdd1).textContains(uploadTestData.MT101.intermediaryBankAdd1),
        await ensure(_PaymentsPages.mt101PaymentPage.intermediaryBankAdd1).textContains(SIT ? uploadTestData.MT101.SIT.intermediaryBankAdd2 : uploadTestData.MT101.UAT.intermediaryBankAdd2),
        await ensure(_PaymentsPages.mt101PaymentPage.intermediaryBankCity).textContains(uploadTestData.MT101.intermediaryBankCity),
        await ensure(_PaymentsPages.mt101PaymentPage.intermediaryBankCountry).textContains(uploadTestData.MT101.intermediaryBankCountry),
        await ensure(_PaymentsPages.mt101PaymentPage.regulatoryReporting).textContains(uploadTestData.MT101.regulatoryReporting),
        await ensure(_PaymentsPages.mt101PaymentPage.paymentDetailsValue).textContains(uploadTestData.MT101.paymentDetailsValue),
        await ensure(_PaymentsPages.mt101PaymentPage.totalDeductValue).textContains(uploadTestData.MT101.amountValue),
        await ensure(_PaymentsPages.mt101PaymentPage.bankChargeValue).textContains(uploadTestData.MT101.bankChargeValue),
        await ensure(_PaymentsPages.mt101PaymentPage.custRef).isNotEmpty()
    ]);
}
