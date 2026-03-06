/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, AccountPages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _AccountPages = new AccountPages();
let _PaymentsPages = new PaymentsPages();
let testData = _AccountPages.fetchTestData('SG_testData.json');
let reference: string = null;

describe('Cheque Status', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Accounts.ChequeStatus.SIT.loginCompanyId : testData.Accounts.ChequeStatus.UAT.loginCompanyId, SIT ? testData.Accounts.ChequeStatus.SIT.loginUserId : testData.Accounts.ChequeStatus.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Cheque Status Display with ALL', async function () {

        await displayChequeStatusWithSearch(); //due to IDXP-2100 change to not filter type

    });

    // it.skip('Cheque Status Display with Search Corporate Cheque', async function () {

    //   await displayChequeStatusWithSearch('Corporate Cheque');

    // });

    it('Cheque Status Display with Search Cheque Express', async function () {

        await displayChequeStatusWithSearch();

    });

    it('Switch Tabs', async function () {
        await displayChequeStatusWithSearch();
        await _AccountPages.chequeStatusPage.tabIssued.click();
        await _AccountPages.chequeStatusPage.loadCondition4Search();
        await _AccountPages.chequeStatusPage.tabExpired.click();
        await _AccountPages.chequeStatusPage.loadCondition4Search();
        await _AccountPages.chequeStatusPage.tabPresented.click();
        await _AccountPages.chequeStatusPage.loadCondition4Search();
        await _AccountPages.chequeStatusPage.tabReturnedStopped.click();
        await _AccountPages.chequeStatusPage.loadCondition4Search();
        await _AccountPages.chequeStatusPage.tabShowAll.click();
        await _AccountPages.chequeStatusPage.loadCondition4Search();

    });

    //245 is old ui
    // it.skip('Stop Cheque Action', async function () {

    //     await displayChequeStatusWithSearch('ALL');
    //     await _AccountPages.chequeStatusPage.chequeStateFilter.clean();
    //     await _AccountPages.chequeStatusPage.chequeStateFilter.input(SIT ? testData.Accounts.ChequeStatus.SIT.chequeNumberForStopCheque : testData.Accounts.ChequeStatus.UAT.chequeNumberForStopCheque);
    //     await _AccountPages.chequeStatusPage.stopChequeActionBtn.jsClick();
    //     await _AccountPages.chequeStatusPage.loadConditionForGoToStopCheque();
    //     await _PaymentsPages.StopChequePage.stopChequeBtn.click();
    //     await _PaymentsPages.StopChequePage.previewI3Button.click();
    //     await _PaymentsPages.StopChequePage.loadConditionForSubmit();
    //     await _PaymentsPages.StopChequePage.submitI3Button.jsClick();
    //     await _PaymentsPages.StopChequePage.getIdealxInfoReferenceID().then(text => {
    //         reference = text;
    //         console.log('Reference of Create Stop Cheque Action:', reference);
    //     });
    //     await _PaymentsPages.StopChequePage.goToViewStopChequeViaRef(reference);
    //     await _PaymentsPages.StopChequePage.loadConditionOnView();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.StopChequePage.fromAccountValue).textContains(SIT ? testData.Accounts.ChequeStatus.SIT.fromAccount : testData.Accounts.ChequeStatus.UAT.fromAccount),
    //         await ensure(_PaymentsPages.StopChequePage.statusValue).textIs(testData.status.PendingApproval),
    //     ]);
    // });

    it('Can search cheque with value date is blank', async function () {
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.chequeStatusPage.chequeStatueTab.click();
        await _AccountPages.chequeStatusPage.loadCondition();
        await _AccountPages.chequeStatusPage.showHideAddFilterBtn.jsClick();
        await _AccountPages.chequeStatusPage.loadCondition4Search();
        await _AccountPages.chequeStatusPage.scrollTo(0, 300)
        await _AccountPages.chequeStatusPage.accountSelect.select(SIT ? testData.Accounts.ChequeStatus.SIT.fromAccount : testData.Accounts.ChequeStatus.UAT.fromAccountForValue);
        await _AccountPages.chequeStatusPage.searchButton.click();
        await _AccountPages.chequeStatusPage.loadCondition4Search();
        await Promise.all([
            await ensure(_AccountPages.chequeStatusPage.chequeStatusListTBody).isElementPresent()
        ]);
    });
});

async function displayChequeStatusWithSearch(): Promise<void> {
    await _AccountPages.FixedDepositsPage.accountMenu.click();
    await _AccountPages.chequeStatusPage.chequeStatueTab.click();
    await _AccountPages.chequeStatusPage.loadCondition();
    await _AccountPages.chequeStatusPage.showHideAddFilterBtn.jsClick();
    await _AccountPages.chequeStatusPage.loadCondition4Search();
    await _AccountPages.chequeStatusPage.scrollTo(0, 300)
    //Because only one organisation in dropdown, the dropdown is disable, the OptionSelect.selet is very low, so comment below to improve the step
    //  await _AccountPages.chequeStatusPage.organisationSelect.select(SIT ? testData.Accounts.ChequeStatus.SIT.organisation : testData.Accounts.ChequeStatus.UAT.organisation);
    await _AccountPages.chequeStatusPage.accountSelect.select(SIT ? testData.Accounts.ChequeStatus.SIT.fromAccount : testData.Accounts.ChequeStatus.UAT.fromAccount);
    // await _AccountPages.chequeStatusPage.dateFromSelect.select(SIT ? testData.Accounts.ChequeStatus.SIT.dateFrom : testData.Accounts.ChequeStatus.UAT.dateFrom);
    // await _AccountPages.chequeStatusPage.dateToSelect.select(SIT ? testData.Accounts.ChequeStatus.SIT.dateTo : testData.Accounts.ChequeStatus.UAT.dateTo);
    //await _AccountPages.chequeStatusPage.productTypeRadioGrp.select(prodcutType);
    await _AccountPages.chequeStatusPage.searchButton.click();
    await _AccountPages.chequeStatusPage.loadCondition4Search();

    await Promise.all([
        await ensure(_AccountPages.chequeStatusPage.chequeStatusListTBody).isElementPresent()
    ]);
}
