/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _optPages = new PaymentsPages();
let testData = _optPages.fetchTestData("CN_testData.json");

describe('CN Beneficiary', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Beneficiary.SIT.loginCompanyId : testData.Beneficiary.UAT.loginCompanyId, SIT ? testData.Beneficiary.SIT.loginUserId : testData.Beneficiary.UAT.loginUserId,testData.Beneficiary.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    let domesticPayeeName = "";

    it('Create Domestic Beneficiary.', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        domesticPayeeName = 'DomesticPaye·e' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.addAddress.click();
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        // await _optPages.BeneficiaryPage.newPayeeAdd3.input(testData.Beneficiary.newPayeeAdd3);
        await _optPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.newPayeeAcctNumber);
        await _optPages.BeneficiaryPage.printedName.input(testData.Beneficiary.newPayeePrintedName);
        await ensure(_optPages.BeneficiaryPage.newPayeeNumber).textContains(testData.Beneficiary.newPayeeAcctNumber);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(domesticPayeeName),
            await ensure(_optPages.BeneficiaryPage.paymentOptions).textContains(testData.Beneficiary.cnAccountTransfer)
        ]);
    });

    it('Delete Payee', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.loadConditionForDeletePayee();
        await _optPages.BeneficiaryPage.deleteNewPayee.jsClick();
        await _optPages.BeneficiaryPage.confirmDelete.jsClick();
        await _optPages.BeneficiaryPage.dismiss.jsClick();
        await _optPages.BeneficiaryPage.payeeFilter.input(domesticPayeeName);

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.beneficiaryResult).textIs("No data to display")
        ]);
    });

    it('Create Domestic Beneficiary with old address format', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        await _optPages.BeneficiaryPage.bankCategory.select("Other Bank");
        await _optPages.BeneficiaryPage.OtherBankType.select("Local currency payment in China");
        await _optPages.BeneficiaryPage.newPayeeBankId.input(testData.Beneficiary.newPayeeBankId);
        await browser.sleep(6000);
        await _optPages.BeneficiaryPage.bankSelect.click();
        await _optPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.newPayeeAcctNumber);
        domesticPayeeName = 'DomesticPayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _optPages.BeneficiaryPage.newPayeeAdd3.input(testData.Beneficiary.newPayeeAdd3);
        await _optPages.BeneficiaryPage.printedName.input(testData.Beneficiary.newPayeePrintedName);
        await ensure(_optPages.BeneficiaryPage.newPayeeNumber).textContains(testData.Beneficiary.newPayeeAcctNumber);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(domesticPayeeName),
            await ensure(_optPages.BeneficiaryPage.paymentOptions).textContains("CN-Cheque Payment, CN-CNAPS Payment")
        ]);
        await deletePayee(domesticPayeeName);
    });
    
    //Add for IDXP-2004
    it('Check Existing Payee that towncity no value', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.input(testData.Beneficiary.existingPayee);
        await _optPages.BeneficiaryPage.loadCondition();
        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.updatePayeeIcon).isVisible()
        ]);
        await _optPages.BeneficiaryPage.editNewPayee.click();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.updatePayeeInfo).textContains(testData.Beneficiary.updatePayeeInfo)
        ]);
    });
    // Add for IDXP-2045
    it('Check Payee Library Marketing Message.', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.MarketingMessage).textContains(testData.Beneficiary.MarketingMessage)

        ]);
    });

});

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