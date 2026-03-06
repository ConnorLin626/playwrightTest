/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { TradeFinancePages} from '../../../pages/Trade';
import { ensure, SIT, handlerCase,PROJECT_TYPE, devWatch,scrollTo } from "../../../lib";
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
let reference = "";

const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

describe('Trade Finance - OverView', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.OverView.SIT.loginCompanyId : testData.OverView.UAT.loginCompanyId,
            SIT ? testData.OverView.SIT.loginUserId : testData.OverView.UAT.loginUserId,"123123",)
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Check Overview tab - Total amount', async function () {
        await _TradeFinancePages.OverViewPage.tradeFinanceMenu.click();
        await _TradeFinancePages.OverViewPage.loadCondition();
        // check defalue ccy
        await Promise.all([
            await ensure(await _TradeFinancePages.OverViewPage.defaultCcy).textContains(testData.OverView.defaultCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmountCcy).textContains(testData.OverView.defaultCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmount).isNotEmpty(),
        ]); 
        //change to other ccy and check
        await _TradeFinancePages.OverViewPage.selecttCcy.input(testData.OverView.changeCcy);
        await _TradeFinancePages.OverViewPage.filterCCyVale.jsClick();
        await Promise.all([
            await ensure(await _TradeFinancePages.OverViewPage.defaultCcy).textContains(testData.OverView.changeCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmountCcy).textContains(testData.OverView.changeCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmount).isNotEmpty(),
        ]); 
        // //change back to default ccy
      
        // await _TradeFinancePages.OverViewPage.selecttCcy.click();
        // await _TradeFinancePages.OverViewPage.selecttCcy.clean();
        // await _TradeFinancePages.OverViewPage.selecttCcy.input(testData.OverView.defaultCcy);
        // await _TradeFinancePages.OverViewPage.filterCCyVale.jsClick();
        // await Promise.all([
        //     await ensure(await _TradeFinancePages.OverViewPage.defaultCcy).textContains(testData.OverView.defaultCcy),
        // ]); 
    });

    it('Overview tab - Page direct', async function () {
        await _TradeFinancePages.OverViewPage.tradeFinanceMenu.click();
        await _TradeFinancePages.OverViewPage.loadCondition();
        await _TradeFinancePages.OverViewPage.appliaction.jsClick();
        await _TradeFinancePages.OverViewPage.loadConditionForTxn();
        await Promise.all([
            await ensure(await _TradeFinancePages.OverViewPage.txnRef).isElementPresent(),
        ]);
    });

    it('All transaction tab - filter transaction ', async function () {
        await _TradeFinancePages.OverViewPage.tradeFinanceMenu.click();
        await _TradeFinancePages.OverViewPage.loadCondition();
        await _TradeFinancePages.OverViewPage.txnTab.click();
        await _TradeFinancePages.OverViewPage.loadConditionForTxn();
        await _TradeFinancePages.OverViewPage.filterBtn.click();
        await _TradeFinancePages.OverViewPage.scrollTo(0,500)
        await _TradeFinancePages.OverViewPage.reSetBtn.click();
        await _TradeFinancePages.OverViewPage.filterStatus.click();
        await _TradeFinancePages.OverViewPage.clearAll.jsClick();
        await _TradeFinancePages.OverViewPage.filterStatusPendingApproval.jsClick();
        await _TradeFinancePages.OverViewPage.searchBtn.click();
        await _TradeFinancePages.OverViewPage.txnRef.getText().then(text => {
            reference = text;
        });
        await _TradeFinancePages.OverViewPage.txnRef.jsClick();
        await _TradeFinancePages.OverViewPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(await _TradeFinancePages.OverViewPage.viewTxnStatus).textContains("PENDING APPROVAL"),
            await ensure(await _TradeFinancePages.OverViewPage.viewTxnRef).isNotEmpty(),
        ]);
        // // do approve
        // await _TradeFinancePages.OverViewPage.approveBtn.jsClick();
        // await _TradeFinancePages.OverViewPage.confirmBtn.click();
        // await _TradeFinancePages.OverViewPage.responseCode.input("123");
        // await _TradeFinancePages.OverViewPage.approveDialog.click();
        // await _TradeFinancePages.OverViewPage.loadConditionForApproveComplatePage();
        // await _TradeFinancePages.OverViewPage.doneBtn.click();
        // await _TradeFinancePages.OverViewPage.loadConditionForTxn();
        // await _TradeFinancePages.OverViewPage.filterInput.input(reference);
        // await _TradeFinancePages.OverViewPage.loadConditionForTxn();
        // await _TradeFinancePages.OverViewPage.txnRef.jsClick();
        // await _TradeFinancePages.OverViewPage.loadConditionForViewPage();
        // await Promise.all([
        //     await ensure(await _TradeFinancePages.OverViewPage.viewTxnStatus).textContains("APPROVED"),
        //     await ensure(await _TradeFinancePages.OverViewPage.viewTxnRef).textIs(reference),
        // ]);
    });

    it('Check Processed transaction - Total amount', async function () {
        await _TradeFinancePages.OverViewPage.tradeFinanceMenu.click();
        await _TradeFinancePages.OverViewPage.loadCondition();
        await _TradeFinancePages.OverViewPage.txnTab.click();
        await _TradeFinancePages.OverViewPage.loadConditionForTxn();
        await _TradeFinancePages.OverViewPage.processTab.click();
        await _TradeFinancePages.OverViewPage.loadCondition();
        // check defalue ccy
        await Promise.all([
            await ensure(await _TradeFinancePages.OverViewPage.defaultCcy).textContains(testData.OverView.defaultCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmountCcy).textContains(testData.OverView.defaultCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmount).isNotEmpty(),
        ]); 
        //change to other ccy and check
        await _TradeFinancePages.OverViewPage.selecttCcy.input(testData.OverView.changeCcy);
        await _TradeFinancePages.OverViewPage.filterCCyVale.jsClick();
        await Promise.all([
            await ensure(await _TradeFinancePages.OverViewPage.defaultCcy).textContains(testData.OverView.changeCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmountCcy).textContains(testData.OverView.changeCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmount).isNotEmpty(),
        ]); 
    });

    it('Check Processed transaction - Total amount', async function () {
        await _TradeFinancePages.OverViewPage.tradeFinanceMenu.click();
        await _TradeFinancePages.OverViewPage.loadCondition();
        await _TradeFinancePages.OverViewPage.txnTab.click();
        await _TradeFinancePages.OverViewPage.loadConditionForTxn();
        await _TradeFinancePages.OverViewPage.processTab.click();
        await _TradeFinancePages.OverViewPage.loadCondition();
        // check defalue ccy
        await Promise.all([
            await ensure(await _TradeFinancePages.OverViewPage.defaultCcy).textContains(testData.OverView.defaultCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmountCcy).textContains(testData.OverView.defaultCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmount).isNotEmpty(),
        ]); 
        //change to other ccy and check
        await _TradeFinancePages.OverViewPage.selecttCcy.input(testData.OverView.changeCcy);
        await _TradeFinancePages.OverViewPage.filterCCyVale.jsClick();
        await Promise.all([
            await ensure(await _TradeFinancePages.OverViewPage.defaultCcy).textContains(testData.OverView.changeCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmountCcy).textContains(testData.OverView.changeCcy),
            await ensure(await _TradeFinancePages.OverViewPage.totalAmount).isNotEmpty(),
        ]); 
    });

    it('Switch Between New and old UI', async function () {
        await _TradeFinancePages.OverViewPage.tradeFinanceMenu.click();
        await _TradeFinancePages.OverViewPage.loadCondition();
        await _TradeFinancePages.OverViewPage.switchUIBtn.jsClick();
        await _TradeFinancePages.OverViewPage.useOldBtn.click();
        // await _TradeFinancePages.OverViewPage.loadConditionForOldPage();
        // await Promise.all([
        //     await ensure(await _TradeFinancePages.OverViewPage.inquiryTitle).textContains(testData.OverView.inquiryTitle),
        //     await ensure(await _TradeFinancePages.OverViewPage.overViewTab).isNotElementPresent(),
        // ]); 
        // Change back to new UI
        await _TradeFinancePages.OverViewPage.switchUIBtn.jsClick();
        await _TradeFinancePages.OverViewPage.useOldBtn.click();
        await _TradeFinancePages.OverViewPage.loadCondition();
        await Promise.all([
            await ensure(await _TradeFinancePages.OverViewPage.overViewTab).isVisible(),
        ]); 
        });

});    
    
