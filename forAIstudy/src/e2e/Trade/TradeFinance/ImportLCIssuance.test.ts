/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase, devWatch } from '../../../lib';
import * as moment from 'moment';
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

let customerRef = 'IDLCISS' + generatedID();
let expiryDate = moment().add(10, 'days').format('DD-MMM-YYYY');
let tenorDate = moment().add(10, 'days').format('DD-MMM-YYYY');
let Description = '';
console.log(expiryDate);

describe('Import LC Issuance', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.importLC.SIT.loginCompanyId : testData.importLC.UAT.loginCompanyId,
            SIT ? testData.importLC.SIT.loginUserId : testData.importLC.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Import LC Issuance', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.importLCIssuancePage.loadCondition();
        // step 1
        await _TradeFinancePages.importLCIssuancePage.selectProductType.selectByValue(testData.paymentType.IDLC);
        await _TradeFinancePages.importLCIssuancePage.selectSubProductType.selectByValue(testData.paymentType.IDLC_ISS);
        await _TradeFinancePages.importLCIssuancePage.continueButton.click();
        // step 2
        await _TradeFinancePages.importLCIssuancePage.selectRouting.selectByValue("654");
        await _TradeFinancePages.shippingGuaranteePage.customerRef.input(customerRef);
        await _TradeFinancePages.importLCIssuancePage.continueSaveButton.click();
        await ensure(_TradeFinancePages.importLCIssuancePage).isTradeSuccess();
        //input test data
        await _TradeFinancePages.importLCIssuancePage.selectApplicant.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.beneficiaryPartyID.input(SIT ? testData.importLC.SIT.beneficiaryPartyID : testData.importLC.UAT.beneficiaryPartyID);
        await _TradeFinancePages.importLCIssuancePage.expiryDate.input(expiryDate);
        await _TradeFinancePages.importLCIssuancePage.expiryPlace.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.arcIsoCurrencyCdKy.select(testData.currency.USD);
        await _TradeFinancePages.importLCIssuancePage.transAmount.input(testData.importLC.transAmount);
        await _TradeFinancePages.importLCIssuancePage.tenorPhrase.selectByValue(testData.importLC.tenorPhrase);
        await _TradeFinancePages.importLCIssuancePage.tenorDate.input(tenorDate);
        await _TradeFinancePages.importLCIssuancePage.creditTransferable.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.descOfGoods.input(testData.importLC.descOfGoods);
        await _TradeFinancePages.importLCIssuancePage.shipmentPeriod.input(testData.importLC.shipmentPeriod);
        await _TradeFinancePages.importLCIssuancePage.shippingTerms.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.insuranceByCd.selectByValue("SELLER");
        await _TradeFinancePages.importLCIssuancePage.debitAccNo.selectByValue(SIT ? "137005-022-SEK" : "881016-021-CNH");
        await _TradeFinancePages.importLCIssuancePage.cntPerson.input(testData.importLC.cntPerson);
        await _TradeFinancePages.importLCIssuancePage.telephoneNumber.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.areaCode.input(testData.importLC.areaCode);
        await _TradeFinancePages.importLCIssuancePage.number.input(testData.importLC.number);
        await _TradeFinancePages.importLCIssuancePage.submit.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
        //Check on Edit Page
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.importLCIssuancePage.loadConditionForImportLCEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.importLCIssuancePage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.importLCIssuancePage.applicantValue).isNotEmpty(),
            await ensure(_TradeFinancePages.importLCIssuancePage.expiryDate).textContains(expiryDate),
            await ensure(_TradeFinancePages.importLCIssuancePage.transAmount).isNotEmpty(),
            await ensure(_TradeFinancePages.importLCIssuancePage.debitAccNo).isNotEmpty(),
        ]);
    });

    it('Approve Import LC Issuance', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.importLCIssuancePage.loadConditionForImportLCEditPage();
        await _TradeFinancePages.importLCIssuancePage.approve.click();
        await _TradeFinancePages.importLCIssuancePage.confirmButton.click();
        await _TradeFinancePages.importLCIssuancePage.approvePassword.input(testData.importLC.approvePassword);
        await _TradeFinancePages.importLCIssuancePage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRef);
        await _TradeFinancePages.importLCIssuancePage.loadConditionForImportLCViewPage();
        await ensure(_TradeFinancePages.importLCIssuancePage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);

    });
    it('Upload attatchment for Import LC Issuance', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.importLCIssuancePage.loadCondition();
        // step 1
        await _TradeFinancePages.importLCIssuancePage.selectProductType.selectByValue(testData.paymentType.IDLC);
        await _TradeFinancePages.importLCIssuancePage.selectSubProductType.selectByValue(testData.paymentType.IDLC_ISS);
        await _TradeFinancePages.importLCIssuancePage.continueButton.click();
        // step 2
        await _TradeFinancePages.importLCIssuancePage.selectRouting.selectByValue("654");
        customerRef = 'IDLC' + generatedID();
        await _TradeFinancePages.shippingGuaranteePage.customerRef.input(customerRef);
        await _TradeFinancePages.importLCIssuancePage.continueSaveButton.click();
        await ensure(_TradeFinancePages.importLCIssuancePage).isTradeSuccess();
        //input test data
        await _TradeFinancePages.importLCIssuancePage.selectApplicant.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.beneficiaryPartyID.input(SIT ? testData.importLC.SIT.beneficiaryPartyID : testData.importLC.UAT.beneficiaryPartyID);
        await _TradeFinancePages.importLCIssuancePage.expiryDate.input(expiryDate);
        await _TradeFinancePages.importLCIssuancePage.expiryPlace.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.arcIsoCurrencyCdKy.select(testData.currency.USD);
        await _TradeFinancePages.importLCIssuancePage.transAmount.input(testData.importLC.transAmount);
        await _TradeFinancePages.importLCIssuancePage.tenorPhrase.selectByValue(testData.importLC.tenorPhrase);
        await _TradeFinancePages.importLCIssuancePage.tenorDate.input(tenorDate);
        await _TradeFinancePages.importLCIssuancePage.creditTransferable.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.descOfGoods.input(testData.importLC.descOfGoods);
        await _TradeFinancePages.importLCIssuancePage.shipmentPeriod.input(testData.importLC.shipmentPeriod);
        await _TradeFinancePages.importLCIssuancePage.shippingTerms.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.insuranceByCd.selectByValue("SELLER");
        await _TradeFinancePages.importLCIssuancePage.debitAccNo.selectByValue(SIT ? "137005-022-SEK" : "881016-021-CNH");
        await _TradeFinancePages.importLCIssuancePage.cntPerson.input(testData.importLC.cntPerson);
        await _TradeFinancePages.importLCIssuancePage.telephoneNumber.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.areaCode.input(testData.importLC.areaCode);
        await _TradeFinancePages.importLCIssuancePage.number.input(testData.importLC.number);
        await _TradeFinancePages.importLCIssuancePage.manageDoc.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForUpload();
        Description = "Description" + generatedID();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.description1.input(Description);
        let fileName = "";
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.file1Name.select("300dpiTrade.jpg").then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.uploadButton.click();

        let windows = await browser.getAllWindowHandles();
        await browser.switchTo().window(windows[0]);
        await _TradeFinancePages.transactionReviewPage.pageSwitchToI3();
        await Promise.all([
            await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.successfulMessageText).textIs("Attachment(s) added successfully"),
            //await ensure(_TradeFinancePages.importLCIssuancePage.tableList).textContains(Description),
            // console.log(2),
        ]);
        await _TradeFinancePages.importLCIssuancePage.submit.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
        //Check on Edit Page
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.importLCIssuancePage.loadConditionForImportLCEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.importLCIssuancePage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.importLCIssuancePage.applicantValue).isNotEmpty(),
            await ensure(_TradeFinancePages.importLCIssuancePage.expiryDate).textContains(expiryDate),
            await ensure(_TradeFinancePages.importLCIssuancePage.transAmount).isNotEmpty(),
            await ensure(_TradeFinancePages.importLCIssuancePage.debitAccNo).isNotEmpty(),
            // console.log(2),
            //await ensure(_TradeFinancePages.importLCIssuancePage.tableList).textContains(Description),
        ]);
    });

    it('Upload attatchment for Import LC Issuance with attachment less than 300 dpi', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.importLCIssuancePage.loadCondition();
        // step 1
        await _TradeFinancePages.importLCIssuancePage.selectProductType.selectByValue(testData.paymentType.IDLC);
        await _TradeFinancePages.importLCIssuancePage.selectSubProductType.selectByValue(testData.paymentType.IDLC_ISS);
        await _TradeFinancePages.importLCIssuancePage.continueButton.click();
        // step 2
        await _TradeFinancePages.importLCIssuancePage.selectRouting.selectByValue("654");
        customerRef = 'IDLCIS' + generatedID();
        await _TradeFinancePages.shippingGuaranteePage.customerRef.input(customerRef);
        await _TradeFinancePages.importLCIssuancePage.continueSaveButton.click();
        await ensure(_TradeFinancePages.importLCIssuancePage).isTradeSuccess();
        //input test data
        await _TradeFinancePages.importLCIssuancePage.selectApplicant.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.beneficiaryPartyID.input(SIT ? testData.importLC.SIT.beneficiaryPartyID : testData.importLC.UAT.beneficiaryPartyID);
        await _TradeFinancePages.importLCIssuancePage.expiryDate.input(expiryDate);
        await _TradeFinancePages.importLCIssuancePage.expiryPlace.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.arcIsoCurrencyCdKy.select(testData.currency.USD);
        await _TradeFinancePages.importLCIssuancePage.transAmount.input(testData.importLC.transAmount);
        await _TradeFinancePages.importLCIssuancePage.tenorPhrase.selectByValue(testData.importLC.tenorPhrase);
        await _TradeFinancePages.importLCIssuancePage.tenorDate.input(tenorDate);
        await _TradeFinancePages.importLCIssuancePage.creditTransferable.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.descOfGoods.input(testData.importLC.descOfGoods);
        await _TradeFinancePages.importLCIssuancePage.shipmentPeriod.input(testData.importLC.shipmentPeriod);
        await _TradeFinancePages.importLCIssuancePage.shippingTerms.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.insuranceByCd.selectByValue("SELLER");
        await _TradeFinancePages.importLCIssuancePage.debitAccNo.selectByValue(SIT ? "137005-022-SEK" : "881016-021-CNH");
        await _TradeFinancePages.importLCIssuancePage.cntPerson.input(testData.importLC.cntPerson);
        await _TradeFinancePages.importLCIssuancePage.telephoneNumber.selectFirst();
        await _TradeFinancePages.importLCIssuancePage.areaCode.input(testData.importLC.areaCode);
        await _TradeFinancePages.importLCIssuancePage.number.input(testData.importLC.number);
        await _TradeFinancePages.importLCIssuancePage.manageDoc.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForUpload();
        Description = "Description" + generatedID();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.description1.input(Description);
        let fileName = "";
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.file1Name.select("96dpiTrade.jpg").then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.uploadButton.click();

        await Promise.all([
            await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.errorMessageText).textIs("The uploaded image file is less than 300 DPI. Image file must be minimum 300 DPI."),
        ]);
    });
});