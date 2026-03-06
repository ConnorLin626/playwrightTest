/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { saveScreen, ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _optPages = new PaymentsPages();
let testData = _optPages.fetchTestData("GC_testData.json");

describe('Beneficiary', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Beneficiary.SIT.loginCompanyId : testData.Beneficiary.UAT.loginCompanyId, SIT ? testData.Beneficiary.SIT.loginUserId : testData.Beneficiary.UAT.loginUserId, "1123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    let GCPayeeName = "";

    it('Create GC Beneficiary.', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        // await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);

        await _optPages.BeneficiaryPage.newPayeeBankId.input(testData.Beneficiary.newPayeeBankId); 
        await _optPages.BeneficiaryPage.bankSelect.click();
        await _optPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.newPayeeAcctNumber);      


        GCPayeeName = 'GCPayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(GCPayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.input(GCPayeeName);
        await _optPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _optPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _optPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode)

        // await _optPages.BeneficiaryPage.retriveName.clickIfExist();
        // await _optPages.BeneficiaryPage.dismiss.clickIfExist();

        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(GCPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(GCPayeeName),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.payeeLocation),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.townCity),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.newPayeeAdd1),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.newPayeeAdd2),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.postalCode),            
        ]);

        await _optPages.BeneficiaryPage.editNewPayee.jsClick();
        // await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForEditBenePage();

        //clean
        await _optPages.BeneficiaryPage.newPayeeName.clean();
        await _optPages.BeneficiaryPage.newPayeeAdd1.clean();
        await _optPages.BeneficiaryPage.newPayeeAdd2.clean();
        
        //input
        let editPayeeName = 'EditPayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(editPayeeName);
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.editNewPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.editNewPayeeAdd2);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(editPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(editPayeeName),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.editNewPayeeAdd1),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.editNewPayeeAdd2),
        ]);

        //delete payee 
        await deletePayee(editPayeeName);
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
