/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from "../../../lib";
import * as moment from 'moment';
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

let customerRef = 'EDC' + generatedID();
let dated = moment(new Date()).format('DD-MMM-YYYY');
let maturityDate = moment().add(10, 'days').format('DD-MMM-YYYY');
let departureDate = moment().add(10, 'days').format('DD-MMM-YYYY');
console.log(dated);

describe('Export Bill under Collection', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.exportBillUnderCollection.SIT.loginCompanyId : testData.exportBillUnderCollection.UAT.loginCompanyId,
            SIT ? testData.exportBillUnderCollection.SIT.loginUserId : testData.exportBillUnderCollection.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Export Bill under Collection', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.exportBillUnderCollectionPage.loadCondition();
        // step 1
        await _TradeFinancePages.exportBillUnderCollectionPage.selectProductType.selectByValue(testData.paymentType.EDC);
        await _TradeFinancePages.exportBillUnderCollectionPage.continueButton.click();
        // step 2
        await _TradeFinancePages.exportBillUnderCollectionPage.selectRouting.selectFirst();
        await _TradeFinancePages.exportBillUnderCollectionPage.customerRef.input(customerRef);
        console.log(customerRef);
        await _TradeFinancePages.exportBillUnderCollectionPage.continueSaveButton.click();
        await ensure(_TradeFinancePages.exportBillUnderCollectionPage).isTradeSuccess();
        //input test data
        await _TradeFinancePages.exportBillUnderCollectionPage.drawer.selectFirst();
        await _TradeFinancePages.exportBillUnderCollectionPage.partyId.input(SIT ? testData.exportBillUnderCollection.SIT.partyId : testData.exportBillUnderCollection.UAT.partyId);
        await _TradeFinancePages.exportBillUnderCollectionPage.collectFromPartyId.input(SIT ? testData.exportBillUnderCollection.SIT.collectFromPartyId : testData.exportBillUnderCollection.UAT.collectFromPartyId);
        // await _TradeFinancePages.exportBillUnderCollectionPage.collectFromBankCountry.selectFirst();
        // await _TradeFinancePages.exportBillUnderCollectionPage.collFromBnkSWIFTAdrs.input(testData.exportBillUnderCollection.collFromBnkSWIFTAdrs);
        await _TradeFinancePages.exportBillUnderCollectionPage.currency.select(testData.currency.USD);
        await _TradeFinancePages.exportBillUnderCollectionPage.transAmount.input(testData.exportBillUnderCollection.transAmount);
        await _TradeFinancePages.exportBillUnderCollectionPage.tenorPhrase.selectByValue(testData.exportBillUnderCollection.tenorPhrase);
        await _TradeFinancePages.exportBillUnderCollectionPage.tenorDays.input(testData.exportBillUnderCollection.tenorDays);
        await _TradeFinancePages.exportBillUnderCollectionPage.mixedPaymentDetails.input(testData.exportBillUnderCollection.mixedPaymentDetails);
        await _TradeFinancePages.exportBillUnderCollectionPage.vesselNameFlightNo.input(testData.exportBillUnderCollection.vesselNameFlightNo);
        await _TradeFinancePages.exportBillUnderCollectionPage.imoNo.input(testData.exportBillUnderCollection.imoNo);
        await _TradeFinancePages.exportBillUnderCollectionPage.departureDate.input(departureDate);
        await _TradeFinancePages.exportBillUnderCollectionPage.blAwbOrCargoReceiptNo.input(testData.exportBillUnderCollection.blAwbOrCargoReceiptNo);
        await _TradeFinancePages.exportBillUnderCollectionPage.portofloading.input(testData.exportBillUnderCollection.portofloading);
        await _TradeFinancePages.exportBillUnderCollectionPage.portofdischarge.input(testData.exportBillUnderCollection.portofdischarge);
        await _TradeFinancePages.exportBillUnderCollectionPage.documentAgainst.selectByValue("DPS");
        await _TradeFinancePages.exportBillUnderCollectionPage.protestCd.selectByValue("PRN");
        await _TradeFinancePages.exportBillUnderCollectionPage.yourBankCharges.selectByValue(testData.exportBillUnderCollection.yourBankCharges);
        await _TradeFinancePages.exportBillUnderCollectionPage.osBankChargeForCd.selectByValue("OBR");
        // await _TradeFinancePages.exportBillUnderCollectionPage.accountNumber.selectByValue(SIT ? "137005-022-SEK" : "881016-021-CNH");
        // await _TradeFinancePages.exportBillUnderCollectionPage.amount.input(testData.exportBillUnderCollection.amount);
        // await _TradeFinancePages.exportBillUnderCollectionPage.fxType.selectByValue(testData.exportBillUnderCollection.fxType);
        await _TradeFinancePages.exportBillUnderCollectionPage.debitAccNo.selectByValue(SIT ? "137005-022-SEK" : "881016-021-CNH");
        await _TradeFinancePages.exportBillUnderCollectionPage.cntPerson.input(testData.exportBillUnderCollection.cntPerson);
        await _TradeFinancePages.exportBillUnderCollectionPage.telephoneNumber.selectFirst();
        await _TradeFinancePages.exportBillUnderCollectionPage.areaCode.input(testData.exportBillUnderCollection.areaCode);
        await _TradeFinancePages.exportBillUnderCollectionPage.number.input(testData.exportBillUnderCollection.number);
        await _TradeFinancePages.exportBillUnderCollectionPage.fillBillExhange.click();
        await _TradeFinancePages.exportBillUnderCollectionPage.drawName.input(testData.exportBillUnderCollection.drawName);
        await _TradeFinancePages.exportBillUnderCollectionPage.drawNameAddress.input(testData.exportBillUnderCollection.drawNameAddress);
        await _TradeFinancePages.exportBillUnderCollectionPage.valueReceived.input(testData.exportBillUnderCollection.valueReceived);
        await _TradeFinancePages.exportBillUnderCollectionPage.fillInAndPrintInvoiceDet.click();
        // await _TradeFinancePages.exportBillUnderCollectionPage.quanity.input(testData.exportBillUnderCollection.quanity);
        await _TradeFinancePages.exportBillUnderCollectionPage.fillInCurrency.selectFirst();
        await _TradeFinancePages.exportBillUnderCollectionPage.fillInAmount.input(testData.exportBillUnderCollection.fillInAmount);
        await _TradeFinancePages.exportBillUnderCollectionPage.descOfGood.input(testData.exportBillUnderCollection.descOfGood);
        await _TradeFinancePages.exportBillUnderCollectionPage.submit.click();
        await _TradeFinancePages.exportBillUnderCollectionPage.loadConditionForConfirmPage();
        await _TradeFinancePages.exportBillUnderCollectionPage.yesButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
        //Check on Edit Page
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.exportBillUnderCollectionPage.loadConditionForExportLCEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.exportBillUnderCollectionPage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.exportBillUnderCollectionPage.applicantValue).isNotEmpty(),
            await ensure(_TradeFinancePages.exportBillUnderCollectionPage.transactionDate).isNotEmpty(),
            await ensure(_TradeFinancePages.exportBillUnderCollectionPage.transAmount).textIs(testData.exportBillUnderCollection.transAmount),
            await ensure(_TradeFinancePages.exportBillUnderCollectionPage.debitAccNo).isNotEmpty(),
            await ensure(_TradeFinancePages.exportBillUnderCollectionPage.yourBankCharges).isNotEmpty(),
        ]);
    });

    it('Approve Export Bill under Collection', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.exportBillUnderCollectionPage.loadConditionForExportLCEditPage();
        await _TradeFinancePages.exportBillUnderCollectionPage.approve.click();
        await _TradeFinancePages.exportBillUnderCollectionPage.confirmButton.click();
        await _TradeFinancePages.exportBillUnderCollectionPage.approvePassword.input(testData.exportBillUnderCollection.approvePassword);
        await _TradeFinancePages.exportBillUnderCollectionPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRef);
        await _TradeFinancePages.exportBillUnderCollectionPage.loadConditionForExportLCViewPage();
        await ensure(_TradeFinancePages.exportBillUnderCollectionPage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });
});
