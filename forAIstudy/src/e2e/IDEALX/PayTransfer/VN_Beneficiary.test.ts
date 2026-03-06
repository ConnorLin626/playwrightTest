/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser,ExpectedConditions } from 'protractor';

let _optPages = new PaymentsPages();
let testData = _optPages.fetchTestData("VN_testData.json");

describe('VN Beneficiary', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Beneficiary.SIT.loginCompanyId : testData.Beneficiary.UAT.loginCompanyId, SIT ? testData.Beneficiary.SIT.loginUserId : testData.Beneficiary.UAT.loginUserId,testData.Beneficiary.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    let NAPAS247PayeeNickName = "";

    it('Create NAPAS247 Beneficiary.', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        await _optPages.BeneficiaryPage.newNAPAStab.click();
        await _optPages.BeneficiaryPage.PaytoCard.jsClick();
        //await browser.sleep(2000);
        await _optPages.BeneficiaryPage.CardNumber.input(testData.Beneficiary.newCardNumber);
        await browser.sleep(2000);
        await _optPages.BeneficiaryPage.VerifyButton.click();
        await browser.wait(
                ExpectedConditions.visibilityOf(_optPages.BeneficiaryPage.RetrievedPayeeName.element),
            )
        NAPAS247PayeeNickName = 'NAPASFastFund247PayeeNickName' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeNickName.input(NAPAS247PayeeNickName);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(NAPAS247PayeeNickName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeNickName).textIs(NAPAS247PayeeNickName),
            await ensure(_optPages.BeneficiaryPage.centerCardNum).textContains(testData.Beneficiary.newCardNumberValue)
        ]);

        await deletePayee(NAPAS247PayeeNickName);  
    });   
})

export async function deletePayee(payeename : string) {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(payeename);
        await _optPages.BeneficiaryPage.deletePayeeBtn.click();
        await _optPages.BeneficiaryPage.loadConditionForConfirmDeleteButton();
        await _optPages.BeneficiaryPage.confirmDelete.click();
        await _optPages.BeneficiaryPage.loadConditionForDismissButton();
        await _optPages.BeneficiaryPage.dismiss.click();
}