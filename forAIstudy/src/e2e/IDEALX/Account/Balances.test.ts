/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, AccountPages,FilesPages,SwitchToSubsiPages } from '../../../pages/IDEALX';
import { saveScreen, ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import moment = require('moment');

let _AccountPages = new AccountPages();
let testData = _AccountPages.fetchTestData('SG_testData.json');
let firstAccountNum = "";
let dateFrom = moment().subtract(6, 'months').format('DD MMM YYYY');
let dateTo = moment().format('DD MMM YYYY');
let _FilesPages = new FilesPages();
let _switchToSubsiPages = new SwitchToSubsiPages();

describe('Balances', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(
            SIT ? testData.Accounts.Balance.SIT.login.loginCompanyId : testData.Accounts.Balance.UAT.login.loginCompanyId,
            SIT ? testData.Accounts.Balance.SIT.login.loginUserId : testData.Accounts.Balance.UAT.login.loginUserId, "123123");
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // it('Balance display with Search', async function () {

    //     await displayBalanceWithSearch();

    // });

    // it('Check Show daily summary', async function () {

    //     await _AccountPages.balancesPage.showDailySummaryLink.jsClick();
    //     await _AccountPages.balancesPage.loadCondition4ShowDailySummary();
    //     await Promise.all([
    //         await ensure(_AccountPages.balancesPage.dailySummaryItemBizDate).isNotEmpty(),
    //         await ensure(_AccountPages.balancesPage.dailySummaryItemAvailableBal).isNotEmpty()
    //     ]);
    // });

    // it('Check View Transaction History', async function () {

    //     await _AccountPages.balancesPage.viewTransactionHistoryLink.jsClick();
    //     await _AccountPages.balancesPage.loadCondition4ViewTransactionHistory();
    //     let accountNum = firstAccountNum.match(/(?<=-).*(?=-)/g).toString();
    //     await Promise.all([
    //         await ensure(_AccountPages.balancesPage.accountDetailItemLabel).textContainsLessOne(accountNum, SIT ? testData.Accounts.Activities.SIT.accountValue : testData.Accounts.Activities.UAT.accountValue)
    //     ]);
    // });

    it('Create Transfer to own account via Balance Action', async function () {

        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.balancesPage.accountBalanceTab.click();
        await _AccountPages.balancesPage.loadCondition();
        await _AccountPages.balancesPage.accountNum.jsClick();
        await _AccountPages.balancesPage.loadConditionForBalancePage();
       
        await _AccountPages.balancesPage.actionTransferOwnAccountButton.jsClick();
        await _AccountPages.balancesPage.createICT();

    });

    it('Create Single Payment via Balance Action', async function () {

        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.balancesPage.accountBalanceTab.click();
        await _AccountPages.balancesPage.loadCondition();
        await _AccountPages.balancesPage.accountNum.jsClick();
        await _AccountPages.balancesPage.loadConditionForBalancePage();
        await _AccountPages.balancesPage.actionSinglePaymenttButton.jsClick();
        await _AccountPages.balancesPage.createSinglePayment();

    });
    //add for AB-14784
    it('Switch ccy at Balance detail page multi time', async function () {

        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.balancesPage.accountBalanceTab.click();
        await _AccountPages.balancesPage.loadCondition();
        await _AccountPages.balancesPage.filtAccButton.jsClick();
        await _AccountPages.chequeStatusPage.chequeStateFilter.input(testData.Accounts.Balance.account);
        await _AccountPages.balancesPage.collapseBtn.jsClick();
        await _AccountPages.balancesPage.accountNum.jsClick();
        await _AccountPages.balancesPage.ccyButton.jsClick();
        await _AccountPages.balancesPage.loadConditionForBalancePage();
        await _AccountPages.balancesPage.ccySelect.jsClick();
        await _AccountPages.balancesPage.firstccy.jsClick();
        await ensure(_AccountPages.balancesPage.ccySelect).textContains(testData.Accounts.Balance.SEKccy);
        await _AccountPages.balancesPage.ccySelect.jsClick();
        await _AccountPages.balancesPage.baseccy.jsClick();
        await ensure(_AccountPages.balancesPage.ccySelect).textContains(testData.Accounts.Balance.MYRccy);
        await _AccountPages.balancesPage.ccySelect.jsClick();
        await _AccountPages.balancesPage.firstccy.jsClick();
        await ensure(_AccountPages.balancesPage.ccySelect).textContains(testData.Accounts.Balance.SEKccy);
        //await _AccountPages.balancesPage.actionSinglePaymenttButton.jsClick();
        //await _AccountPages.balancesPage.createSinglePayment();

    });
     // Add R8.7
     it('Check Total available balance will calcuate correct', async function () {
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.balancesPage.accountBalanceTab.click();
        await _AccountPages.balancesPage.loadCondition();
        await _AccountPages.balancesPage.orgSelect.click();
        await _AccountPages.balancesPage.subsiOrgSelect.click();
        await Promise.all([
            await ensure(_AccountPages.balancesPage.availableBalacne).isNotEmpty(),
        ]);
    });
    
    //add for AB-14784
    it('change to SC account Switch ccy at Balance detail page multi time', async function () {

        await _FilesPages.uploadFilePage.companyMenu.click();
        await _FilesPages.uploadFilePage.selectCompany.click();
        await _FilesPages.uploadFilePage.searchCompany.input("KING QUEEN HOLDINGS LTD");
        await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
        await _switchToSubsiPages.viewSubsiPage.loadCondition();
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.balancesPage.accountBalanceTab.click();
        await _AccountPages.balancesPage.loadCondition();
        await _AccountPages.balancesPage.filtAccButton.jsClick();
        await _AccountPages.chequeStatusPage.chequeStateFilter.input(testData.Accounts.Balance.SCaccount);
        await _AccountPages.balancesPage.collapseBtn.jsClick();
        await _AccountPages.balancesPage.accountNum.jsClick();
        await _AccountPages.balancesPage.ccyButton.jsClick();
        await _AccountPages.balancesPage.loadConditionForBalancePage();
        await _AccountPages.balancesPage.ccySelect.jsClick();
        await _AccountPages.balancesPage.firstccy.jsClick();
        await ensure(_AccountPages.balancesPage.ccySelect).textContains(testData.Accounts.Balance.TWDccy);
        await _AccountPages.balancesPage.ccySelect.jsClick();
        await _AccountPages.balancesPage.baseccy.jsClick();
        await ensure(_AccountPages.balancesPage.ccySelect).textContains(testData.Accounts.Balance.SGDccy);
        await _AccountPages.balancesPage.ccySelect.jsClick();
        await _AccountPages.balancesPage.firstccy.jsClick();
        await ensure(_AccountPages.balancesPage.ccySelect).textContains(testData.Accounts.Balance.TWDccy);
        //await _AccountPages.balancesPage.actionSinglePaymenttButton.jsClick();
        //await _AccountPages.balancesPage.createSinglePayment();

    });

    // it('User cannot view the account balance when dont have account access', async function () {
    //     await new NavigatePages().loginIdealx(
    //         SIT ? testData.Accounts.Balance.SIT.login.loginCompanyId : testData.Accounts.Balance.UAT.login.loginCompanyId,
    //         SIT ? testData.Accounts.Balance.SIT.login.userNotAccountBalance : testData.Accounts.Balance.UAT.login.userNotAccountBalance, "123123");
    //     await _AccountPages.FixedDepositsPage.accountMenu.click();
    //     await _AccountPages.balancesPage.accountBalanceTab.click();
    //     await _AccountPages.balancesPage.loadCondition();
    //     await _AccountPages.balancesPage.modifySearchButton.jsClick();
    //     await _AccountPages.balancesPage.lastTwoAndCurrent.jsClick();
    //     await _AccountPages.balancesPage.searchButton.click();
    //     await _AccountPages.balancesPage.loadCondition4Search();

    //     await Promise.all([
    //         await ensure(_AccountPages.balancesPage.firstListItem).isNotElementPresent()
    //     ]);
    // });


});

async function displayBalanceWithSearch(): Promise<void> {
    await _AccountPages.FixedDepositsPage.accountMenu.click();
    await _AccountPages.balancesPage.accountBalanceTab.click();
    await _AccountPages.balancesPage.loadCondition();
    await _AccountPages.balancesPage.modifySearchButton.jsClick();
    await _AccountPages.balancesPage.lastTwoAndCurrent.jsClick();
    // await _AccountPages.balancesPage.balanceCustomizeRadio.jsClick();
    // await _AccountPages.balancesPage.fromAccountInput.input(SIT ? testData.Accounts.Balance.SIT.organisation : testData.Accounts.Balance.UAT.organisation);
    // await _AccountPages.balancesPage.dateFromSelect.select(dateFrom);
    // await _AccountPages.balancesPage.dateToSelect.select(dateTo);
    await _AccountPages.balancesPage.searchButton.click();
    await _AccountPages.balancesPage.loadCondition4Search();

    await Promise.all([
        await ensure(_AccountPages.balancesPage.firstListItem).isElementPresent()
    ]);
    await _AccountPages.balancesPage.firstAccountNum.getText().then(data => {
        firstAccountNum = data;
    })
}
