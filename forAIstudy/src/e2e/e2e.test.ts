/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages, FilesPages } from '../pages/CB';
import { Menu } from '../config/menu'
import { saveScreen, devWatch, ensure, SIT, handlerCase } from '../lib';
import { browser } from 'protractor';

describe('Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    before(async function () { await new NavigatePages().loginCB(SIT ? 'SG2BE12' : 'SG2BE11', SIT ? 'SG2BE12S01' : 'SG2BE11S01'); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Make a Payment', async function () {

        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        //await devWatch();
        await _PaymentsPages.paymentPage.loadCondition();
        await _PaymentsPages.paymentPage.fromAccount.select(SIT ? '0018001304' : '123123123');
        await _PaymentsPages.paymentPage.amount.input('11');
        await _PaymentsPages.paymentPage.existingPayee.select('345000901');
        await _PaymentsPages.paymentPage.paymentDate.select('26 Oct 2018');
        await _PaymentsPages.paymentPage.bankChargesOur.click();
        await _PaymentsPages.paymentPage.nextButton.click();
        await _PaymentsPages.paymentPage.submitButton.click();

        await Promise.all([
            await ensure(_PaymentsPages.paymentPage.nextButton).isNotVisible(),//not preview page
            await ensure(_PaymentsPages.paymentPage).isUXSuccess(),//has success message.
        ]);

    });

    it('Approve a Payment', async function () {

        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.select(1);
        await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input('123123123');
        await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs('12312312');
        await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
        await Promise.all([
            //await ensure(_ApprovalsPages.paymentsPage.challengeResponse).textIs('12312312'),
            await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(),//has success message.
        ]);

    });

});