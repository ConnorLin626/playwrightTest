/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let reference = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('VN_testData.json');

describe('VN_LVT', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.LVT.SIT.loginCompanyId : testData.LVT.UAT.loginCompanyId, SIT ? testData.LVT.SIT.loginUserId : testData.LVT.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Can not create LVT with item amount greater than 500000000 VND', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.VNPaymentLocalOverseasPayee);
        await _PaymentsPages.VNLvtPage.loadCondition();
        await _PaymentsPages.VNLvtPage.fromAccount.select(SIT ? testData.LVT.SIT.fromAccount : testData.LVT.UAT.fromAccount);
        await _PaymentsPages.VNLvtPage.amount.input(testData.LVT.moreThanMaxAmount);
        await _PaymentsPages.VNLvtPage.newPayeeTab.click();
        await _PaymentsPages.VNLvtPage.newPayeeName.input(testData.LVT.newPayeeName);
        await _PaymentsPages.VNLvtPage.payeeBankID.select(SIT ? testData.LVT.SIT.payeeBankID : testData.LVT.UAT.payeeBankID);
        await _PaymentsPages.VNLvtPage.newPayeeAcctNumber.input(testData.LVT.newPayeeAcctNumber);
        await ensure(_PaymentsPages.VNLvtPage.LVTCheckBox).hasClassName("disabled");
    });

    it('Create LVT with item amount enqual to 499999999 VND', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.VNPaymentLocalOverseasPayee);
        await _PaymentsPages.VNLvtPage.loadCondition();
        await _PaymentsPages.VNLvtPage.fromAccount.select(SIT ? testData.LVT.SIT.fromAccount : testData.LVT.UAT.fromAccount);
        await _PaymentsPages.VNLvtPage.amount.input(testData.LVT.maxAmount);
        await _PaymentsPages.VNLvtPage.newPayeeTab.click();
        await _PaymentsPages.VNLvtPage.newPayeeName.input(testData.LVT.newPayeeName);
        await _PaymentsPages.VNLvtPage.payeeBankID.select(SIT ? testData.LVT.SIT.payeeBankID : testData.LVT.UAT.payeeBankID);
        await _PaymentsPages.VNLvtPage.newPayeeAcctNumber.input(testData.LVT.newPayeeAcctNumber);
        await _PaymentsPages.VNLvtPage.LVTCheckBox.jsClick();
        await _PaymentsPages.VNLvtPage.paymentDetail.input(testData.LVT.paymentDetails);
        await _PaymentsPages.VNLvtPage.nextButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
        await _PaymentsPages.VNLvtPage.submitButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
        await _PaymentsPages.VNLvtPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.VNLvtPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(SIT ? testData.LVT.SIT.fromAccount : testData.LVT.UAT.fromAccount),
            await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.LVT.maxAmount),
        ]);
    });
});