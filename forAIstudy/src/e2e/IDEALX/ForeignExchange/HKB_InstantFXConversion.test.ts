/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, ForeignExchangePages,PaymentsPages} from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE, randomNumbers } from "../../../lib";
import { browser } from "protractor";

let _ForeignExchangePages = new ForeignExchangePages();
let _PaymentsPages = new PaymentsPages();
let testData = _ForeignExchangePages.fetchTestData("HKB_testData.json");
let statementReference='';

describe("HKB instant FX Conversion", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {  await new NavigatePages().loginIdealx(SIT ? testData.InstantFXConversion.SIT.loginCompanyId : testData.InstantFXConversion.UAT.loginCompanyId, SIT ? testData.InstantFXConversion.SIT.loginUserId : testData.InstantFXConversion.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create HKBP Instant FX Conversion", async function () {
        await _ForeignExchangePages.instantFXConversionPage.foreignExchangeMenu.click();
        await _ForeignExchangePages.instantFXConversionPage.loadCondition();
        await _ForeignExchangePages.instantFXConversionPage.createFXButton.click();
        await _ForeignExchangePages.instantFXConversionPage.loadConditionForCreatePage();
        await _ForeignExchangePages.instantFXConversionPage.fromCCY.click();
        await _ForeignExchangePages.instantFXConversionPage.search.input(testData.InstantFXConversion.fromCCY)
        await _ForeignExchangePages.instantFXConversionPage.searchResult.jsClick();
        await _ForeignExchangePages.instantFXConversionPage.toCCY.click();
        await _ForeignExchangePages.instantFXConversionPage.search.input(testData.InstantFXConversion.toCCY)
        await _ForeignExchangePages.instantFXConversionPage.searchResult.jsClick();
        await _ForeignExchangePages.instantFXConversionPage.amount.input(testData.InstantFXConversion.amount)
        await _ForeignExchangePages.instantFXConversionPage.fromAccount.click();
        await _ForeignExchangePages.instantFXConversionPage.fromAccountValue.jsClick();
        await _ForeignExchangePages.instantFXConversionPage.toAccount.click();
        await _ForeignExchangePages.instantFXConversionPage.toAccountValue.jsClick();
        await _ForeignExchangePages.instantFXConversionPage.messageToApprover.input(testData.InstantFXConversion.messageToApprover)
        statementReference = 'EBICT' + randomNumbers() + randomNumbers();
        await _ForeignExchangePages.instantFXConversionPage.statementReference.input(statementReference);
        await _ForeignExchangePages.instantFXConversionPage.getRate.jsClick();
        await _ForeignExchangePages.instantFXConversionPage.getChallenge.clickIfExist();
        await _ForeignExchangePages.instantFXConversionPage.responseCode.input(testData.InstantFXConversion.responseCode);
        await _ForeignExchangePages.instantFXConversionPage.submitBtn.click();
        await _ForeignExchangePages.instantFXConversionPage.loadConditionForConfirmPage();
        await _ForeignExchangePages.instantFXConversionPage.confirmNowBtn.jsClick();
        await _ForeignExchangePages.instantFXConversionPage.loadConditionForCompletePage();
        await Promise.all([
            await ensure(_ForeignExchangePages.instantFXConversionPage.transactionRef).textIs(statementReference),
            await ensure(_ForeignExchangePages.instantFXConversionPage.statementRef).textIs(statementReference),
            await ensure(_ForeignExchangePages.instantFXConversionPage.fromAccountView).textIs(SIT ? testData.InstantFXConversion.SIT.fromAccountValue : testData.InstantFXConversion.UAT.fromAccountValue),
            await ensure(_ForeignExchangePages.instantFXConversionPage.toAccountView).textIs(SIT ? testData.InstantFXConversion.SIT.toAccountValue : testData.InstantFXConversion.UAT.toAccountValue),
            await ensure(_ForeignExchangePages.instantFXConversionPage.amountView).textIs(testData.InstantFXConversion.amountView),
          ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(statementReference);
        await _ForeignExchangePages.instantFXConversionPage.loadConditionForViewPage();
        await Promise.all([
           await ensure(_ForeignExchangePages.instantFXConversionPage.transactionRefView).textIs(statementReference),
           await ensure(_ForeignExchangePages.instantFXConversionPage.statementRefViewHKBP).textIs(statementReference),
           await ensure(_ForeignExchangePages.instantFXConversionPage.fromAccountView).textIs(SIT ? testData.InstantFXConversion.SIT.fromAccountValue : testData.InstantFXConversion.UAT.fromAccountValue),
           await ensure(_ForeignExchangePages.instantFXConversionPage.toAccountView).textIs(SIT ? testData.InstantFXConversion.SIT.toAccountValue : testData.InstantFXConversion.UAT.toAccountValue),
           //await ensure(_ForeignExchangePages.instantFXConversionPage.amountView).textIs(testData1.InstantFXConversion.amountView),
          ]);
      });
});