/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, handlerCase, SIT } from '../../../lib';
import { browser, ExpectedConditions } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

describe('Transaction Parties', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.transactionParties.SIT.loginCompanyId : testData.transactionParties.UAT.loginCompanyId, SIT ? testData.transactionParties.SIT.loginUserId : testData.transactionParties.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
    let random = Math.round(Math.random() * 100000);
    let partyId = "Id" + random
    let cifId = "AutoTestCifId" + random
    let partyName = "AutoTestPartyName" + random;
    let countryCd = "102";
    let editPartyName = "AutoTestPartyNameEdit" + random;
    it('Create a new Party', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionParties);
        await _TradeFinancePages.transactionPartiesPage.loadCondition();
        await browser.wait(ExpectedConditions.elementToBeClickable(
            _TradeFinancePages.transactionPartiesPage.createButton.element), _TradeFinancePages.transactionPartiesPage.createButton.getTimeOut());
        await _TradeFinancePages.transactionPartiesPage.createButton.click();
        await _TradeFinancePages.partyDetailsPage.partyId.input(partyId);
        await _TradeFinancePages.partyDetailsPage.partyName.input(partyName);
        await _TradeFinancePages.partyDetailsPage.addr1.input("Address line 1");
        await _TradeFinancePages.partyDetailsPage.addr2.input("Address line 2");
        await _TradeFinancePages.partyDetailsPage.addr3.input("Address line 3");
        await _TradeFinancePages.partyDetailsPage.selectCountry.selectByValue(countryCd);
        await _TradeFinancePages.partyDetailsPage.isAcc.jsClickIfExist(1000);
        await _TradeFinancePages.partyDetailsPage.isBene.jsClickIfExist(1000);
        await _TradeFinancePages.partyDetailsPage.isDrwe1.jsClickIfExist(1000);
        await _TradeFinancePages.partyDetailsPage.isAppl1.jsClickIfExist(1000);
        await _TradeFinancePages.partyDetailsPage.contactName.input("Lenin");
        await _TradeFinancePages.partyDetailsPage.contactTitle.input("Lenin");
        await _TradeFinancePages.partyDetailsPage.contactDetail.input("Lenin");
        if (await _TradeFinancePages.partyDetailsPage.cifId.ElementExist(100)) {
            _TradeFinancePages.partyDetailsPage.cifId.input(cifId);
        }
        await _TradeFinancePages.partyDetailsPage.saveButton.click();

        await Promise.all([
            await ensure(_TradeFinancePages.transactionPartiesPage).isTradeSuccess(),//has success message.
            await ensure(_TradeFinancePages.transactionPartiesPage.partyMsgText).textContains('submitted successfully'),
        ]);
    });

    it('Find and check the newly created Party', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionParties);
        await _TradeFinancePages.transactionPartiesPage.loadCondition();
        await _TradeFinancePages.transactionPartiesPage.filterButton.click();
        await _TradeFinancePages.transactionPartiesPage.partyName.clean();
        await _TradeFinancePages.transactionPartiesPage.partyName.input(partyName);
        await _TradeFinancePages.transactionPartiesPage.selectCountry.selectByValue(countryCd);
        await _TradeFinancePages.transactionPartiesPage.submitFilterButton.click();
        await _TradeFinancePages.transactionPartiesPage.record.clickIfExist();
        await _TradeFinancePages.transactionPartiesPage.editButton.click();
        await Promise.all([
            await ensure(_TradeFinancePages.partyDetailsPage.partyId).textContains(partyId.toUpperCase()),
            await ensure(_TradeFinancePages.partyDetailsPage.partyName).textContains(partyName),
        ]);
    });

    it('Edit newly created Party', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionParties);
        await _TradeFinancePages.transactionPartiesPage.loadCondition();
        await _TradeFinancePages.transactionPartiesPage.filterButton.click();
        await _TradeFinancePages.transactionPartiesPage.partyName.clean();
        await _TradeFinancePages.transactionPartiesPage.partyName.input(partyName);
        await _TradeFinancePages.transactionPartiesPage.selectCountry.selectByValue(countryCd);
        await _TradeFinancePages.transactionPartiesPage.submitFilterButton.click();
        await _TradeFinancePages.transactionPartiesPage.record.clickIfExist();
        await _TradeFinancePages.transactionPartiesPage.editButton.click();
        await _TradeFinancePages.partyDetailsPage.partyName.clean();
        await _TradeFinancePages.partyDetailsPage.partyName.input(editPartyName);
        await _TradeFinancePages.partyDetailsPage.saveEditButton.click();
        await Promise.all([
            await ensure(_TradeFinancePages.transactionPartiesPage).isTradeSuccess(), // has success message.
            await ensure(_TradeFinancePages.transactionPartiesPage.partyMsgText).textContains('submitted successfully'),
        ]);
    });
    it('Delete newly created Party', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionParties);
        await _TradeFinancePages.transactionPartiesPage.loadCondition();
        await _TradeFinancePages.transactionPartiesPage.filterButton.click();
        await _TradeFinancePages.transactionPartiesPage.partyName.clean();
        await _TradeFinancePages.transactionPartiesPage.partyName.input(editPartyName);
        await _TradeFinancePages.transactionPartiesPage.selectCountry.selectByValue(countryCd);
        await _TradeFinancePages.transactionPartiesPage.submitFilterButton.click();
        await _TradeFinancePages.transactionPartiesPage.record.clickIfExist();
        await _TradeFinancePages.transactionPartiesPage.deleteButton.click();
        await _TradeFinancePages.transactionPartiesPage.confirmButton.click();
        await Promise.all([
            await ensure(_TradeFinancePages.transactionPartiesPage).isTradeSuccess(), // has success message.
            await ensure(_TradeFinancePages.transactionPartiesPage.partyMsgText).textContains('Deleted successfully'),
        ]);
    });
});