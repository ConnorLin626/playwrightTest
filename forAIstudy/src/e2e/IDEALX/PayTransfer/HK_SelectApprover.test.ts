import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from "protractor";
import {NavigatePages} from "../../../pages/Navigate";
import {PaymentsPages} from "../../../pages/IDEALX";

const _PaymentsPages = new PaymentsPages();
let reference = '';
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

describe('HK select auth reskin', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, "123123");});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create HK TT with select auth', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        //await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.TelegraphicTransfer.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await selectApprover(testData.SelectApprover.approverName);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await Promise.all([
            await ensure(_PaymentsPages.selectApproverPage.idealXInfoMsg4SelectApprover).textContains(testData.SelectApprover.selectApproverSuccessMsg),
        ]);
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await browser.sleep(2000); // wait page refresh
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.selectApproverPage.selectedApproverName).textContains(testData.SelectApprover.approverName),
        ]);
    });
});

async function selectApprover(approverName: string): Promise<void> {
    await _PaymentsPages.selectApproverPage.selectApproveButton.click();
    await _PaymentsPages.selectApproverPage.loadCondition();
    await _PaymentsPages.selectApproverPage.approverFilter.input(approverName);
    await _PaymentsPages.selectApproverPage.approverList.selectIdealxFile(1);
    await _PaymentsPages.selectApproverPage.previewButton.click();
    await _PaymentsPages.selectApproverPage.loadCondition4Submit();
    await _PaymentsPages.selectApproverPage.submitButton.click();
}