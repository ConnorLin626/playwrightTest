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

let customerRef = 'EDLC' + generatedID();
let dated = moment(new Date()).format('DD-MMM-YYYY');
let maturityDate = moment().add(10, 'days').format('DD-MMM-YYYY');
let departureDate = moment().add(10, 'days').format('DD-MMM-YYYY');
console.log(dated);

describe('Export Bill under LC', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.exportLC.SIT.loginCompanyId : testData.exportLC.UAT.loginCompanyId,
            SIT ? testData.exportLC.SIT.loginUserId : testData.exportLC.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Export Bill under LC', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.exportLCPage.loadCondition();
        // step 1
        await _TradeFinancePages.exportLCPage.selectProductType.selectByValue(testData.paymentType.EDLC);
        await _TradeFinancePages.exportLCPage.continueButton.click();
        // step 2
        await _TradeFinancePages.exportLCPage.selectRouting.selectFirst();
        // auto assigned
        if (await _TradeFinancePages.exportLCPage.customerRef.isElementPresent()) {
            await _TradeFinancePages.exportLCPage.customerRef.input(customerRef);
            console.log(customerRef);
        }
        await _TradeFinancePages.exportLCPage.continueSaveButton.click();
        await ensure(_TradeFinancePages.exportLCPage).isTradeSuccess();
        //input test data
        await _TradeFinancePages.exportLCPage.applicantName.input(testData.exportLC.applicantName);
        await _TradeFinancePages.exportLCPage.applicantNameAddress.input(testData.exportLC.applicantNameAddress);
        await _TradeFinancePages.exportLCPage.applicantCountry.selectFirst();
        await _TradeFinancePages.exportLCPage.issuingBankName.input(testData.exportLC.issuingBankName);
        await _TradeFinancePages.exportLCPage.issuingBankNameAddress.input(testData.exportLC.issuingBankNameAddress);
        await _TradeFinancePages.exportLCPage.issuingBankCountry.selectFirst();
        await _TradeFinancePages.exportLCPage.issuingBankSWIFTAddress.input(testData.exportLC.issuingBankSWIFTAddress);
        await _TradeFinancePages.exportLCPage.lcNumber.input(testData.exportLC.lcNumber);
        await _TradeFinancePages.exportLCPage.dated.input(dated);
        await _TradeFinancePages.exportLCPage.currency.select(testData.currency.USD);
        await _TradeFinancePages.exportLCPage.transAmount.input(testData.exportLC.transAmount);
        await _TradeFinancePages.exportLCPage.tenorPhrase.selectByValue(testData.exportLC.tenorPhrase);
        await _TradeFinancePages.exportLCPage.maturityDate.input(maturityDate);
        // await _TradeFinancePages.exportLCPage.descOfGood.input(testData.exportLC.descOfGood);
        await _TradeFinancePages.exportLCPage.mixedPaymentDetails.input(testData.exportLC.mixedPaymentDetails);
        await _TradeFinancePages.exportLCPage.vesselNameFlightNo.input(testData.exportLC.vesselNameFlightNo);
        await _TradeFinancePages.exportLCPage.imoNo.input(testData.exportLC.imoNo);
        await _TradeFinancePages.exportLCPage.departureDate.input(departureDate);
        await _TradeFinancePages.exportLCPage.blAwbOrCargoReceiptNo.input(testData.exportLC.blAwbOrCargoReceiptNo);
        await _TradeFinancePages.exportLCPage.portofloading.input(testData.exportLC.portofloading);
        await _TradeFinancePages.exportLCPage.portofdischarge.input(testData.exportLC.portofdischarge);
        await _TradeFinancePages.exportLCPage.originalAndAmendment.selectByValue("OOS");
        await _TradeFinancePages.exportLCPage.toRemitCheckBox.click();
        await _TradeFinancePages.exportLCPage.payeeAcctNo.input(testData.exportLC.payeeAcctNo);
        await _TradeFinancePages.exportLCPage.payeeBnkName.input(testData.exportLC.payeeBnkName);
        await _TradeFinancePages.exportLCPage.payeeBankAddr1.input(testData.exportLC.payeeBankAddr1);
        await _TradeFinancePages.exportLCPage.payeeBankCountry.selectFirst();
        await _TradeFinancePages.exportLCPage.payeeBankSwift.input(testData.exportLC.payeeBankSwift);
        await _TradeFinancePages.exportLCPage.inBankCheckBox.click();
        await _TradeFinancePages.exportLCPage.intermediaryBankName.input(testData.exportLC.intermediaryBankName);
        await _TradeFinancePages.exportLCPage.intermediaryBankAddr1.input(testData.exportLC.intermediaryBankAddr1);
        await _TradeFinancePages.exportLCPage.intermediaryBankCountry.selectFirst();
        await _TradeFinancePages.exportLCPage.intermediaryBankSWIFT.input(testData.exportLC.intermediaryBankSWIFT);
        await _TradeFinancePages.exportLCPage.cntPerson.input(testData.exportLC.cntPerson);
        await _TradeFinancePages.exportLCPage.telephoneNumber.selectFirst();
        await _TradeFinancePages.exportLCPage.areaCode.input(testData.exportLC.areaCode);
        await _TradeFinancePages.exportLCPage.number.input(testData.exportLC.number);
        await _TradeFinancePages.exportLCPage.faxNumber.selectFirst();
        await _TradeFinancePages.exportLCPage.faxAreaCode.input(testData.exportLC.faxAreaCode);
        await _TradeFinancePages.exportLCPage.faxNum.input(testData.exportLC.faxNum);
        if (await _TradeFinancePages.exportLCPage.fillBillExhange.isElementSelected()) {
            await _TradeFinancePages.exportLCPage.drweBankName.input(testData.exportLC.drweBankName);
            await _TradeFinancePages.exportLCPage.drweBankAddr1.input(testData.exportLC.drweBankAddr1);
        }
        await _TradeFinancePages.exportLCPage.submit.click();
        await _TradeFinancePages.exportLCPage.loadConditionForConfirmPage();
        await _TradeFinancePages.exportLCPage.yesButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
        //Check on Edit Page
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.exportLCPage.loadConditionForExportLCEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.exportLCPage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.exportLCPage.applicantValue).isNotEmpty(),
            await ensure(_TradeFinancePages.exportLCPage.dated).textContains(dated),
            await ensure(_TradeFinancePages.exportLCPage.transAmount).textIs(testData.exportLC.transAmount),
        ]);
    });

    it('Approve Export Bill under LC', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.exportLCPage.loadConditionForExportLCEditPage();
        await _TradeFinancePages.exportLCPage.approve.click();
        await _TradeFinancePages.exportLCPage.confirmButton.click();
        await _TradeFinancePages.exportLCPage.approvePassword.input(testData.exportLC.approvePassword);
        await _TradeFinancePages.exportLCPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRef);
        await _TradeFinancePages.exportLCPage.loadConditionForExportLCViewPage();
        await ensure(_TradeFinancePages.exportLCPage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });
});
