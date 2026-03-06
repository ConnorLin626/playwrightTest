/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let reference = '';
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_ICT_NON_DOL', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.IntraCompanyTransfer.SIT.loginCompanyId : testData.IntraCompanyTransfer.UAT.loginCompanyId, SIT ? testData.IntraCompanyTransfer.SIT.loginUserIdNonDOL : testData.IntraCompanyTransfer.UAT.loginUserIdNonDOL); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create an ICT Payment by non DOL Maker', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGIntraCompanyTransafer);
        await _PaymentsPages.intraCompanyTransferPage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.intraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccountWithFCY : testData.IntraCompanyTransfer.UAT.toAccountWithFCY);
        await _PaymentsPages.intraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.totalAmount);
        await Promise.all([
            ensure(_PaymentsPages.intraCompanyTransferPage.dolMessage).isElementPresent(),
        ]);
        if (await _PaymentsPages.intraCompanyTransferPage.useFxCheckBox.isElementPresent()) {
            await _PaymentsPages.intraCompanyTransferPage.useFxCheckBox.jsClick();
        }
        await _PaymentsPages.intraCompanyTransferPage.fxContract0.jsClickIfExist();
        await _PaymentsPages.intraCompanyTransferPage.fxContract1.jsClickIfExist();
        if (await _PaymentsPages.intraCompanyTransferPage.fRef0.isElementPresent()) {
            await _PaymentsPages.intraCompanyTransferPage.fRef0.input(testData.DOLFxContracts.fxRef1);
        }
        await _PaymentsPages.intraCompanyTransferPage.fxContractAmt1.input(testData.DOLFxContracts.fxAmt1);
        if (await _PaymentsPages.intraCompanyTransferPage.fRef1.isElementPresent()) {
            await _PaymentsPages.intraCompanyTransferPage.fRef1.input(testData.DOLFxContracts.fxRef2);
        }
        await _PaymentsPages.intraCompanyTransferPage.fxContractAmt2.input(testData.DOLFxContracts.fxAmt2);

        await _PaymentsPages.intraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.intraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.intraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.intraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.intraCompanyTransferPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.intraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.intraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountA1),
            await ensure(_PaymentsPages.intraCompanyTransferPage.exchangeRateTable).isElementPresent(),
        ]);
    });
});